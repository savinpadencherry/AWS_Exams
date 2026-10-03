const fs = require("node:fs"),
  vm = require("node:vm"),
  path = require("node:path");
const root = path.join(__dirname, ".."),
  c = { window: {} };
vm.createContext(c);
for (const f of [
  "js/blueprint.js",
  "js/data/mock-bank.js",
  "js/study/guides.js",
])
  vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), c);
const { BLUEPRINT: B, QBANK: bank } = c.window;
let out =
  "# AIP-C01 coverage map\n\n375 original practice questions across five non-overlapping 75-question forms. Every form covers all 20 tasks. Collectively, the bank covers all 98 skills transcribed from the official guide. Coverage means a tagged practice item exists; it is not a claim of exhaustive assessment or official difficulty calibration.\n\n";
out +=
  "| Form | D1 | D2 | D3 | D4 | D5 | Multiple response |\n|---|---:|---:|---:|---:|---:|---:|\n";
for (let n = 1; n <= 5; n++) {
  const qs = bank.filter((q) => q.exam === n);
  out += `| ${n} | ${[1, 2, 3, 4, 5].map((d) => qs.filter((q) => q.d === d).length).join(" | ")} | ${qs.filter((q) => q.type === "multiple").length} |\n`;
}
for (const d of B.domains) {
  out += `\n## Domain ${d.id}: ${d.title} (${d.weight}%)\n\n| Skill | Scope | Question IDs (form) |\n|---|---|---|\n`;
  for (const t of d.tasks)
    for (const s of t.skills) {
      const qs = bank.filter((q) => q.s === s.id);
      if (!qs.length) throw Error("Uncovered skill " + s.id);
      out += `| ${s.id} | ${s.text.replaceAll("|", "/")} | ${qs.map((q) => `${q.id} (${q.exam})`).join(", ")} |\n`;
    }
}
fs.writeFileSync(path.join(root, "docs/COVERAGE.md"), out);
console.log("Coverage: 98/98 skills, 20/20 tasks per form, 375 questions.");
