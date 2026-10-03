/* Run against a local HTTP server: BASE_URL=http://127.0.0.1:8000 node tests/browser.test.cjs */
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const base = process.env.BASE_URL || "http://127.0.0.1:8000";
(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.BROWSER_EXECUTABLE
      ? { executablePath: process.env.BROWSER_EXECUTABLE }
      : {}),
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    }),
    errors = [];
  async function seed(fn, arg) {
    const state = await page.evaluate(fn, arg);
    // Leave the app first so its legitimate pagehide autosave cannot overwrite the test seed.
    await page.goto(base + "/js/blueprint.js");
    await page.evaluate(
      (s) => localStorage.setItem("aip-pro-v2-session", JSON.stringify(s)),
      state,
    );
    await page.goto(base + "/#/session");
  }
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.url().startsWith(base) && r.status() >= 400)
      errors.push(r.status() + " " + r.url());
  });
  await page.goto(base);
  await page.waitForSelector(".exam-card");
  assert.equal(await page.locator(".exam-card").count(), 5);
  await page.screenshot({ path: "/tmp/aip-five-home.png", fullPage: true });
  await page.locator('[data-action="start"][data-exam="1"]').click();
  assert.equal(await page.locator(".learning").count(), 0);
  assert.equal(await page.locator("#timer").textContent(), "Untimed");
  // A real wrong answer unlocks a diagnosis, independent option reasons, theory and a console exercise.
  const wrong = await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem("aip-pro-v2-session"));
    const q = QBANK.find((q) => q.id === s.ids[0]);
    return q.o.findIndex((_, i) => !q.a.includes(i));
  });
  await page.locator(`[data-option="${wrong}"]`).click();
  await page.locator('input[value="confident"]').check();
  await page.locator('[data-action="flag"]').click();
  await page.locator('[data-action="check"]').click();
  assert.equal(await page.locator(".diagnosis").count(), 1);
  assert.equal(await page.locator(".service-guide").count(), 1);
  await page.locator(".theory summary").click();
  await page.locator(".console-lab summary").click();
  await page.locator('[data-lab="1.1"]').check();
  await page.reload();
  assert.equal(await page.locator(".diagnosis").count(), 1);
  assert.equal(await page.locator('[data-lab="1.1"]').isChecked(), true);
  assert.equal(await page.locator(".option:not([disabled])").count(), 0);
  await page.locator(".theory summary").click();
  await page.locator(".console-lab summary").click();
  await page.screenshot({ path: "/tmp/aip-five-lesson.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "/tmp/aip-five-mobile.png", fullPage: true });
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  // Submit through the dialog, inspect mistakes and retry only the missed set.
  await page.locator('[data-action="map"]').first().click();
  await page.locator("#nav-filter").selectOption("flagged");
  assert.equal(await page.locator(".nav-cell").count(), 1);
  await page.locator('[data-action="submit"]').click();
  await page.locator("#cancel-submit").click();
  assert.equal(
    await page.locator("#confirm-dialog").evaluate((el) => el.open),
    false,
  );
  await page.locator('[data-action="submit"]').click();
  await page.locator("#confirm-submit").click();
  await page.waitForSelector(".results");
  await page.locator('[data-action="retry"]').click();
  assert.match(
    await page.locator("#session-label").textContent(),
    /Mistake review/,
  );
  // Timed flow: answers stay hidden; option order and deadline survive reload; expiry submits.
  await seed(() => {
    const e = new ExamEngine();
    e.start(5, "exam");
    return e.state;
  });
  const order = await page.evaluate(
    () => JSON.parse(localStorage.getItem("aip-pro-v2-session")).optionOrder,
  );
  await page.locator(".option").first().click();
  assert.equal(await page.locator(".learning").count(), 0);
  await page.reload();
  assert.deepEqual(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("aip-pro-v2-session")).optionOrder,
    ),
    order,
  );
  await seed(() => {
    const s = JSON.parse(localStorage.getItem("aip-pro-v2-session"));
    s.deadline = Date.now() - 1;
    return s;
  });
  await page.waitForSelector(".results");
  // Every question is rendered on desktop and mobile; inspect real SVG text bounds and lesson/reference presence.
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (let n = 1; n <= 5; n++) {
      await seed((n) => {
        const e = new ExamEngine();
        e.start(n, "exam");
        for (const q of e.questions()) e.state.answers[q.id] = [...q.a];
        e.submit();
        e.jump(0);
        return e.state;
      }, n);
      await page.waitForSelector(".learning");
      const findings = await page.evaluate(() => {
        const failures = [];
        for (let i = 0; i < 75; i++) {
          const s = JSON.parse(localStorage.getItem("aip-pro-v2-session")),
            id = s.ids[s.index];
          if (document.querySelectorAll(".service-guide").length !== 1)
            failures.push(id + " missing/duplicate guide");
          if (document.querySelectorAll(".concept-svg").length !== 2)
            failures.push(id + " missing diagram");
          for (const a of document.querySelectorAll(
            ".sources a,.guide-references a",
          ))
            if (!a.href.startsWith("https://") || a.href.includes("undefined"))
              failures.push(id + " bad source");
          const svg = document.querySelector(
            innerWidth < 600 ? ".mobile-diagram" : ".desktop-diagram",
          );
          const rects = [...svg.querySelectorAll("rect")];
          const texts = [...svg.querySelectorAll("text")];
          texts.forEach((t, j) => {
            const b = t.getBBox(),
              r = rects[Math.floor(j / 3)];
            const x = +r.getAttribute("x"),
              y = +r.getAttribute("y"),
              w = +r.getAttribute("width"),
              h = +r.getAttribute("height");
            if (
              b.x < x - 1 ||
              b.x + b.width > x + w + 1 ||
              b.y < y - 1 ||
              b.y + b.height > y + h + 1
            )
              failures.push(id + " SVG overflow " + t.textContent);
          });
          if (document.documentElement.scrollWidth > innerWidth)
            failures.push(id + " viewport overflow");
          if (i < 74) document.querySelector('[data-action="next"]').click();
        }
        return failures;
      });
      assert.deepEqual(findings, [], `form ${n}, width ${width}`);
    }
  }
  // Exercise code is rendered literally, and completed exercise state remains independent of attempts.
  await seed(() => {
    const q = QBANK.find((q) => q.t === "2.4");
    const e = new ExamEngine();
    e.start(q.exam, "learning", [q.id]);
    for (const i of q.a) e.select(i);
    e.check();
    return e.state;
  });
  await page.locator(".console-lab summary").click();
  assert.match(
    await page.locator(".lab-code").textContent(),
    /aws bedrock-runtime converse/,
  );
  await page.locator(".home-link").click();
  await page.waitForSelector(".exam-card");
  assert.equal(await page.locator(".exam-card").count(), 5);
  assert.match(
    await page.locator(".learning-progress summary").textContent(),
    /375\/375/,
  );
  await page.setViewportSize({ width: 320, height: 720 });
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  assert.deepEqual(errors, []);
  await browser.close();
  console.log(
    "Browser checks passed: five exams, 375 lessons at two widths, scoring/review, persistence, expiry, practical progress, no runtime errors.",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
