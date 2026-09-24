/* DOM controller. Question content and state live in separate modules. */
document.addEventListener('DOMContentLoaded',()=>{
 const engine=new ExamEngine(); const main=document.querySelector('#main');
 const timer=document.querySelector('#timer'), label=document.querySelector('#session-label');
 const guide='https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html';
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let screen='dashboard',filter='all';
 const btn=(text,action,cls='',extra='')=>`<button class="${cls}" data-action="${action}" ${extra}>${text}</button>`;
 const announce=text=>document.querySelector('#announcer').textContent=text;
 function focusMain(){main.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
 function save(){if(!engine.save())announce('Progress cannot be saved in this browser. Keep this tab open.');}
 function dashboard(){
  screen='dashboard';label.textContent='';timer.textContent='';
  const misses=Object.keys(engine.mistakes).length;
  main.innerHTML=`<section class="hero"><div class="eyebrow">UNDERSTAND IT. PRACTISE IT. REMEMBER IT.</div><h1>Build understanding.<br>Then test it under pressure.</h1><p>Five complete mixed exams. Every one covers all five AIF-C01 domains. Learn with plain-language explanations and visuals, then try a fresh timed attempt.</p><div class="hero-meta"><span>5 × 65 questions</span><span>90 minutes in exam mode</span><span>Untimed learning</span><span>4 question formats</span></div></section>
  ${engine.state?`<div class="resume"><div><strong>${engine.state.submitted?'Your latest result is saved':'Continue where you stopped'}</strong><p>${engine.state.mode==='exam'?'The timed exam clock continues while you are away.':'Learning mode lets you take your time.'}</p></div>${btn(engine.state.submitted?'View latest result':'Resume attempt','resume')}</div>`:''}
  <section class="section-heading"><div><div class="eyebrow">FULL MIXED MOCK EXAMS</div><h2>Choose an attempt</h2></div><p>Each exam: 13 AI/ML · 16 GenAI · 18 foundation-model applications · 9 responsible AI · 9 security questions.</p></section>
  <div class="exam-grid">${Object.values(engine.exams).map((e,i)=>`<article class="exam-card"><span class="exam-number">0${i+1}</span><h3>Practice Exam ${i+1}</h3><p>All five domains · 65 questions</p><ul class="mini-list"><li>Single choice, multiple response, ordering and matching</li><li>Shuffled questions and choices in timed mode</li><li>Explanations and visual lessons for every question</li></ul><div class="card-actions">${btn('Start timed exam','start','',`data-exam="${i+1}" data-mode="exam"`)}${btn('Learn at my pace','start','secondary',`data-exam="${i+1}" data-mode="learning"`)}</div></article>`).join('')}</div>
  <section class="revision"><div><div class="eyebrow">YOUR REVISION QUEUE</div><h2>${misses} question${misses===1?'':'s'} to revisit</h2><p>Wrong or skipped questions go here. Answer correctly on a fresh retry to clear them. Progress stays in this browser.</p></div>${btn('Practise my mistakes','mistakes','secondary',misses?'':'disabled')}</section>
  <details class="info"><summary>How practice differs from the real exam</summary><p>AWS uses 65 questions in 90 minutes: 50 scored and 15 unidentified unscored items. The pass mark is 700 on a scaled 100–1000 scale; AWS does not publish a raw-percentage conversion. This app scores all 65 practice items equally and reports raw accuracy. An 80% study target is only a practice goal.</p><p>Domain counts approximate the official 20 / 24 / 28 / 14 / 14 weights. Question difficulty has not been psychometrically calibrated. The interface practises navigation, flagging, reviewing and timing; it is not the official Pearson VUE interface. Some retained technical questions go deeper than the foundational exam.</p><a href="${guide}" target="_blank" rel="noopener">Read the current AWS exam guide ↗</a></details>
  ${engine.history.length?`<section class="history"><h2>Recent attempts</h2><div class="table-scroll"><table><thead><tr><th>Attempt</th><th>Mode</th><th>Accuracy</th><th>Date</th></tr></thead><tbody>${engine.history.slice(0,8).map(h=>`<tr><td>${h.retry?'Mistake retry':`Exam ${h.examId}`}</td><td>${h.mode==='exam'?'Timed':'Learning · first checks'}</td><td>${h.correct}/${h.total} · ${h.percent}%</td><td>${new Date(h.at).toLocaleDateString()}</td></tr>`).join('')}</tbody></table></div></section>`:''}`;
 }
 function render(){
  if(!engine.state)return dashboard();
  if(engine.expired()){engine.submit();announce('Time is up. Your attempt was submitted.');}
  if(engine.state.view==='results')return results();
  if(engine.state.view==='review')return navigator();
  question();
 }
 function sessionHeader(){
  const s=engine.state;
  label.textContent=`${s.retry?'Mistake practice':`Practice Exam ${s.examId}`} · ${s.submitted?'Review':s.mode==='exam'?'Timed exam':'Learning mode'}`;
  tick();
 }
 function question(){
  screen='question';sessionHeader();
  const s=engine.state,q=engine.question(),a=s.answers[q.id]||[],revealed=s.review||s.revealed[q.id];
  const ok=engine.correct(q,s.mode==='learning'?s.firstAnswers[q.id]:a);
  const order=s.optionOrder[q.id],disabled=s.submitted||revealed;
  const hints={single:'Choose one answer',multiple:`Choose ${q.correctAnswers.length} answers`,ordering:'Choose one unique step for each position',matching:'Match each prompt to one answer'};
  let controls;
  if(['single','multiple'].includes(q.type)){
   controls=`<div class="options" role="group" aria-label="Answer choices">${order.map((oi,i)=>{
    const right=q.correctAnswers.includes(oi),selected=a.includes(oi);
    return `<button class="option ${selected?'selected':''} ${revealed&&right?'correct':''} ${revealed&&selected&&!right?'incorrect':''}" data-action="select" data-option="${oi}" aria-pressed="${selected}" ${disabled?'disabled':''}><span class="letter">${String.fromCharCode(65+i)}</span><span>${esc(q.options[oi])}${revealed&&right?'<b class="choice-status">Correct answer</b>':revealed&&selected?'<b class="choice-status">Your selection</b>':''}</span></button>`;
   }).join('')}</div>`;
  } else {
   controls=`<div class="assignments">${q.correctAnswers.map((_,i)=>`<label class="assignment"><span>${q.type==='matching'?esc(q.prompts[i]):`Step ${i+1}`}</span><select data-position="${i}" ${disabled?'disabled':''}><option value="-1">Choose…</option>${order.map(oi=>`<option value="${oi}" ${a[i]===oi?'selected':''}>${esc(q.options[oi])}</option>`).join('')}</select>${revealed?`<small>Correct: ${esc(q.options[q.correctAnswers[i]])}</small>`:''}</label>`).join('')}</div>`;
  }
  main.innerHTML=`<div class="question-toolbar"><span>Question ${s.index+1} <span class="muted">of ${s.ids.length}</span></span><div>${btn(s.flagged[q.id]?'⚑ Flagged':'⚐ Flag for review','flag','secondary',`aria-pressed="${!!s.flagged[q.id]}"`)}${btn('Question navigator','navigator','secondary')}</div></div>
  <div class="progress-track" aria-hidden="true"><div style="width:${100*(s.index+1)/s.ids.length}%"></div></div>
  <article class="question"><div class="eyebrow">${esc(hints[q.type])}</div><p class="scenario">${esc(q.scenario)}</p><h1 class="question-title">${esc(q.question)}</h1>${controls}
  ${s.mode==='learning'&&!revealed&&!s.submitted?`<div class="check-row">${btn('Check answer & learn','check','',engine.complete(q)?'':'disabled')}<span class="muted">${q.type==='multiple'?`${a.length} of ${q.correctAnswers.length} selected. `:''}Your first checked answer is saved.</span></div>`:''}
  ${revealed?learning(q,ok):''}</article>
  <nav class="question-nav" aria-label="Question navigation">${btn('← Previous','prev','secondary',s.index===0?'disabled':'')}<span>${s.submitted?btn('Back to results','results','secondary'):btn(s.mode==='exam'?'Review & submit':'Finish learning','navigator','secondary')}</span>${btn(s.index===s.ids.length-1?'Review attempt':'Next →',s.index===s.ids.length-1?'navigator':'next')}</nav>`;
 }
 function learning(q,ok){
  const l=window.LESSONS[q.lessonId],s=engine.state,a=s.mode==='learning'?s.firstAnswers[q.id]||[]:s.answers[q.id]||[];
  const ordered=['matching','ordering'].includes(q.type);
  const correct=q.correctAnswers.map((oi,i)=>`${q.type==='matching'?`${q.prompts[i]} → `:q.type==='ordering'?`${i+1}. `:''}${q.options[oi]}`);
  return `<section class="learning" aria-label="Answer explanation"><div class="learning-heading"><span class="result-chip ${ok?'good':'bad'}">${ok?'Correct on this attempt':a.length?'Let’s understand the mistake':'Not answered'}</span><span class="muted">Domain ${q.domain} · ${esc(engine.domains[q.domain-1])}</span></div><h2>${esc(l.title)}</h2>
  <div class="answer-box"><h3>Correct ${ordered?'solution':'answer'}</h3>${correct.map(t=>`<p>${esc(t)}</p>`).join('')}</div>
  <div class="lesson-grid"><div><h3>In simple terms</h3><p>${esc(l.plain)}</p><h3>A concrete example</h3><p>${esc(l.example)}</p></div><div><h3>Why this answer fits</h3><p>${esc(q.explanation)}</p><div class="remember"><strong>Remember the distinction</strong><p>${esc(l.tip)}</p></div></div></div>
  <figure class="concept-figure"><figcaption><div><span class="eyebrow">VISUAL EXPLANATION</span><h3>${esc(l.title)}</h3></div>${btn('Enlarge visual','enlarge','secondary',`data-lesson="${q.lessonId}"`)}</figcaption><a href="assets/lessons/${q.lessonId}.svg" target="_blank" rel="noopener" aria-label="Open ${esc(l.title)} diagram at full size"><picture><source media="(max-width: 600px)" srcset="assets/lessons/${q.lessonId}-mobile.svg"><img src="assets/lessons/${q.lessonId}.svg" alt="${esc(l.nodes.map(n=>n.title+': '+n.detail).join('. '))}" loading="lazy"></picture></a><p class="visual-caption">Original teaching diagram, not an AWS console screenshot. Read the ${l.layout==='comparison'?'panels as a comparison':'numbered steps with the explanation'}.</p></figure>
  <details class="why-options" ${!ok?'open':''}><summary>${ordered?'Understand each component':'Why the other choices do not fit'}</summary>${s.optionOrder[q.id].map(oi=>`<div class="reason ${q.correctAnswers.includes(oi)?'right-reason':''}"><strong>${esc(q.options[oi])}</strong>${a.includes(oi)?'<span class="your-pick">Your selection</span>':''}<p>${esc(q.distractors[oi])}</p></div>`).join('')}</details>
  <div class="recall"><div class="eyebrow">SAY IT IN YOUR OWN WORDS</div><h3>${esc(l.check)}</h3><details><summary>Reveal the recall answer</summary><p>${esc(l.answer)}</p></details></div>
  ${l.console?`<div class="console-guide"><h3>Where this appears in AWS</h3><p>${esc(l.console)}</p><p class="muted">Navigation is a guide and can change. Use the AWS documentation below for current steps and screenshots. Some features require an account and may incur charges.</p></div>`:''}
  <p class="sources"><a href="${esc(q.source||l.source)}" target="_blank" rel="noopener">AWS reference for this concept ↗</a><a href="${guide}" target="_blank" rel="noopener">Exam scope ↗</a></p>
  ${!ok?'<p class="queue-note">Added to your revision queue. Retry it later without the answer showing.</p>':''}</section>`;
 }
 function navigator(){
  screen='review';engine.state.view='review';save();sessionHeader();
  const s=engine.state,qs=engine.questions(),answered=qs.filter(q=>engine.complete(q)).length,flagged=qs.filter(q=>s.flagged[q.id]).length;
  main.innerHTML=`<section class="review"><div class="eyebrow">${s.submitted?'REVIEW ANSWERS':'BEFORE YOU FINISH'}</div><h1>Review your attempt</h1><p>${answered} complete · ${qs.length-answered} unanswered or incomplete · ${flagged} flagged</p>
  <label class="filter">Show <select id="review-filter"><option value="all">All questions</option><option value="flagged" ${filter==='flagged'?'selected':''}>Flagged</option><option value="unanswered" ${filter==='unanswered'?'selected':''}>Unanswered / incomplete</option>${s.submitted?`<option value="wrong" ${filter==='wrong'?'selected':''}>Incorrect answers</option>`:''}</select></label>
  <div class="nav-grid">${qs.map((q,i)=>({q,i})).filter(({q})=>filter==='all'||(filter==='flagged'&&s.flagged[q.id])||(filter==='unanswered'&&!engine.complete(q))||(filter==='wrong'&&!engine.correct(q,s.mode==='learning'?s.firstAnswers[q.id]:s.answers[q.id]))).map(({q,i})=>`<button data-action="jump" data-index="${i}" class="nav-cell ${engine.complete(q)?'answered':''} ${s.flagged[q.id]?'flagged':''}" aria-label="Question ${i+1}, ${engine.complete(q)?'answered':'incomplete'}${s.flagged[q.id]?', flagged':''}">${i+1}${s.flagged[q.id]?' ⚑':''}</button>`).join('')||'<p>No questions match this filter.</p>'}</div>
  <p class="muted">Filled = answered. Flag = marked for review. Select a number to revisit it.</p><div class="actions">${btn('Return to question','return','secondary')}${s.submitted?btn('Back to results','results'):btn('Submit attempt','submit')}</div></section>`;
 }
 function results(){
  screen='results';engine.state.view='results';engine.state.review=false;save();sessionHeader();
  const s=engine.state,r=engine.score(),wrong=engine.questions().filter(q=>!engine.correct(q,s.mode==='learning'?s.firstAnswers[q.id]:s.answers[q.id]));
  main.innerHTML=`<section class="results"><div class="eyebrow">${s.mode==='exam'?'TIMED PRACTICE RESULT':'LEARNING · FIRST CHECKED ANSWERS'}</div><h1>${r.percent}% <span>practice accuracy</span></h1><p class="score-count">${r.correct} of ${r.total} correct</p><p>${r.percent>=80?'You met the 80% study target for this attempt. Try an unseen timed set to check transfer.':'Use the missed concepts below to guide your next study session.'}</p><p class="score-note">Raw practice accuracy. All questions count equally. This is not AWS’s scaled score, an official pass/fail result, or a prediction of your exam result.</p><div class="actions">${btn('Review all explanations','review-all')}${btn('Retry these mistakes','retry','secondary',wrong.length?'':'disabled')}${btn('Dashboard','home','secondary')}</div></section>
  <section class="domain-results"><h2>Where to focus next</h2>${r.stats.map((d,i)=>d.total?`<article><div><h3>${esc(d.title)}</h3><span>${d.correct}/${d.total} correct · ${Math.round(d.correct/d.total*100)}%</span></div><div class="progress-track"><div style="width:${d.correct/d.total*100}%"></div></div>${d.correct<d.total?btn('Review missed concepts','domain-review','text-button',`data-domain="${i+1}"`):'<p class="muted">All correct on this attempt.</p>'}</article>`:'').join('')}</section>
  ${wrong.length?`<section class="missed"><h2>Your missed concepts</h2>${wrong.map(q=>`<button class="missed-row" data-action="review-question" data-id="${q.id}"><span>${esc(window.LESSONS[q.lessonId].title)}</span><span>Review →</span></button>`).join('')}</section>`:''}`;
 }
 function tick(){
  const s=engine.state;if(!s||screen==='dashboard')return;
  if(s.submitted){timer.textContent='Attempt complete';timer.className='';return;}
  if(s.mode==='learning'){timer.textContent='Untimed';timer.className='';return;}
  const sec=engine.remaining();timer.textContent=`${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;timer.className=sec<=300?'urgent':'';
 }
 function start(id,mode,ids){
  if(engine.state&&!engine.state.submitted&&!confirm('Starting a new attempt replaces the current in-progress attempt. Continue?'))return;
  if(engine.start(id,mode,ids)){filter='all';render();focusMain();}
 }
 document.querySelector('#home').addEventListener('click',e=>{e.preventDefault();dashboard();focusMain();});
 main.addEventListener('click',e=>{
  const b=e.target.closest('button[data-action]');if(!b||b.disabled)return;const action=b.dataset.action,s=engine.state;
  if(action==='home'){dashboard();focusMain();return;}
  if(action==='start'){start(+b.dataset.exam,b.dataset.mode);return;}
  if(action==='resume'){render();focusMain();return;}
  if(action==='mistakes'){start(1,'learning',Object.keys(engine.mistakes));return;}
  if(!s)return;
  if(engine.expired()){engine.submit();render();return;}
  if(action==='select'){engine.select(+b.dataset.option);render();main.querySelector(`[data-option="${b.dataset.option}"]`)?.focus({preventScroll:true});return;}
  if(action==='check'){if(engine.check()){render();announce('Answer checked. Explanation and visual are below.');main.querySelector('.learning')?.scrollIntoView({block:'start',behavior:'smooth'});}return;}
  if(action==='enlarge'){const l=window.LESSONS[b.dataset.lesson];document.querySelector('#visual-content').innerHTML=`<h2>${esc(l.title)}</h2><img src="assets/lessons/${b.dataset.lesson}.svg" alt="${esc(l.nodes.map(n=>n.title+': '+n.detail).join('. '))}">`;document.querySelector('#visual-dialog').showModal();return;}
  if(action==='flag'){const q=engine.question();s.flagged[q.id]=!s.flagged[q.id];save();render();return;}
  if(action==='next')engine.jump(s.index+1);
  if(action==='prev')engine.jump(s.index-1);
  if(action==='jump')engine.jump(+b.dataset.index);
  if(action==='navigator'){s.view='review';filter='all';}
  if(action==='return')s.view='question';
  if(action==='results')s.view='results';
  if(action==='review-all'){s.review=true;s.view='question';s.index=0;}
  if(action==='review-question'){s.review=true;engine.jump(s.ids.indexOf(b.dataset.id));}
  if(action==='domain-review'){s.review=true;s.view='question';s.index=engine.questions().findIndex(q=>q.domain===+b.dataset.domain&&!engine.correct(q,s.mode==='learning'?s.firstAnswers[q.id]:s.answers[q.id]));}
  if(action==='retry'){const ids=engine.questions().filter(q=>!engine.correct(q,s.mode==='learning'?s.firstAnswers[q.id]:s.answers[q.id])).map(q=>q.id);start(s.examId,'learning',ids);return;}
  if(action==='submit'){const n=engine.questions().filter(q=>!engine.complete(q)).length;document.querySelector('#confirm-copy').textContent=`${n} questions are unanswered or incomplete. ${s.mode==='learning'?'Unchecked questions count as unattempted in learning results. ':''}You can review explanations after submitting.`;document.querySelector('#confirm-dialog').showModal();return;}
  save();render();focusMain();
 });
 main.addEventListener('change',e=>{
  if(e.target.matches('[data-position]')){engine.assign(+e.target.dataset.position,+e.target.value);if(engine.state.submitted){render();return;}const b=main.querySelector('[data-action="check"]');if(b)b.disabled=!engine.complete(engine.question());}
  if(e.target.id==='review-filter'){filter=e.target.value;navigator();}
 });
 document.querySelector('#cancel-submit').addEventListener('click',()=>document.querySelector('#confirm-dialog').close());
 document.querySelector('#confirm-submit').addEventListener('click',()=>{document.querySelector('#confirm-dialog').close();engine.submit();render();focusMain();});
 setInterval(()=>{if(engine.expired()){engine.submit();document.querySelector('#confirm-dialog').close();if(screen!=='dashboard'){render();announce('Time is up. Your attempt was submitted.');}}tick();},500);
 document.addEventListener('visibilitychange',()=>{if(engine.expired()){engine.submit();render();}tick();});
 engine.restore();dashboard();
});
