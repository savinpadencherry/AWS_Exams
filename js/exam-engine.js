/* State and scoring are independent of rendering. No network or account required. */
class ExamEngine {
  static VERSION = 3;
  constructor(storage = null, now = () => Date.now()) {
    if (!storage) { try { storage = window.localStorage; } catch {} }
    this.storage = storage; this.now = now;
    this.exams = Object.fromEntries([1,2,3,4,5].map(i => [i, window[`EXAM_DATA_${i}`]]));
    this.state = null;
    this.domains = ['Fundamentals of AI and ML','Fundamentals of generative AI','Applications of foundation models','Responsible AI','Security, compliance and governance'];
    this.weights = [20,24,28,14,14];
    this.history = this.read('aif-history', []);
    if (!Array.isArray(this.history)) this.history=[];
    this.mistakes = this.read('aif-mistakes', {});
    if (!this.mistakes || Array.isArray(this.mistakes) || typeof this.mistakes !== 'object') this.mistakes={};
  }
  read(key, fallback) { try { return JSON.parse(this.storage.getItem(key)) ?? fallback; } catch { return fallback; } }
  write(key, value) { try { this.storage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } }
  allQuestions() { return Object.values(this.exams).flatMap(e => e.questions); }
  shuffle(values) { const a = [...values]; for (let i=a.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  start(examId, mode, ids = null) {
    const questions = ids ? this.allQuestions().filter(q=>ids.includes(q.id)) : this.exams[examId].questions;
    if (!questions.length) return false;
    const ordered = mode==='exam' ? this.shuffle(questions) : questions;
    this.state = { version:ExamEngine.VERSION, id:String(this.now())+'-'+Math.random().toString(36).slice(2),examId,mode,index:0,
      ids:ordered.map(q=>q.id),answers:{},firstAnswers:{},revealed:{},flagged:{},startedAt:this.now(),
      deadline: mode==='exam' ? this.now()+90*60*1000 : null,submitted:false,review:false,view:'question',retry:!!ids,
      optionOrder:Object.fromEntries(questions.map(q=>[q.id,this.shuffle(q.options.map((_,i)=>i))])) };
    this.save(); return true;
  }
  questions() { const map = new Map(this.allQuestions().map(q=>[q.id,q])); return (this.state?.ids || []).map(id=>map.get(id)); }
  question() { return this.questions()[this.state.index]; }
  remaining() { return this.state?.deadline ? Math.max(0,Math.ceil((this.state.deadline-this.now())/1000)) : null; }
  expired() { return !!this.state && this.state.mode==='exam' && !this.state.submitted && this.remaining()===0; }
  correct(q, answer) { return Array.isArray(answer) && answer.length===q.correctAnswers.length && (['matching','ordering'].includes(q.type) ? answer.every((v,i)=>v===q.correctAnswers[i]) : [...answer].sort().every((v,i)=>v===[...q.correctAnswers].sort()[i])); }
  complete(q) { const a=this.state.answers[q.id]||[]; return a.length===q.correctAnswers.length && a.every(v=>Number.isInteger(v)&&v>=0&&v<q.options.length) && (q.type==='matching'||new Set(a).size===a.length); }
  select(index) {
    const q=this.question(), s=this.state;
    if (s.submitted || s.revealed[q.id] || !Number.isInteger(index) || index<0 || index>=q.options.length || !['single','multiple'].includes(q.type)) return;
    if(this.expired()) {this.submit();return;}
    let a=s.answers[q.id] || [];
    if(q.type==='single') a=[index];
    else if(a.includes(index)) a=a.filter(v=>v!==index);
    else if(a.length<q.correctAnswers.length) a=[...a,index];
    s.answers[q.id]=a; this.save();
  }
  assign(position, index) {
    const q=this.question(), s=this.state;
    if(!Number.isInteger(position)||!Number.isInteger(index))return;
    if(s.submitted||s.revealed[q.id]||position<0||position>=q.correctAnswers.length||index < -1||index>=q.options.length) return;
    if(this.expired()) {this.submit();return;}
    const a=s.answers[q.id] || Array(q.correctAnswers.length).fill(-1); a[position]=index;s.answers[q.id]=a;this.save();
  }
  check() {
    const q=this.question(),s=this.state;
    if(s.mode!=='learning'||s.submitted||s.revealed[q.id]||!this.complete(q)) return false;
    s.firstAnswers[q.id]=[...s.answers[q.id]];s.revealed[q.id]=true;
    this.recordMistake(q,s.answers[q.id]);this.save();return true;
  }
  recordMistake(q,a) {
    if(this.correct(q,a)) delete this.mistakes[q.id];
    else this.mistakes[q.id]={lastMissed:this.now(),lessonId:q.lessonId};
    this.write('aif-mistakes',this.mistakes);
  }
  jump(index) { if(index>=0&&index<this.state.ids.length) {this.state.index=index;this.state.view='question';this.save();} }
  score() {
    const s=this.state, stats=this.domains.map((title,i)=>({title,weight:this.weights[i],total:0,correct:0}));
    let totalCorrect=0;
    this.questions().forEach(q=>{const a=s.mode==='learning' ? s.firstAnswers[q.id] : s.answers[q.id];const ok=this.correct(q,a); stats[q.domain-1].total++;if(ok){totalCorrect++;stats[q.domain-1].correct++;}});
    return {total:this.questions().length,correct:totalCorrect,percent:Math.round(100*totalCorrect/this.questions().length),stats};
  }
  submit() {
    const s=this.state;if(!s||s.submitted)return;
    s.submitted=true;s.view='results';s.review=false;s.finishedAt=this.now();
    if(s.mode==='exam')this.questions().forEach(q=>this.recordMistake(q,s.answers[q.id]));
    else this.questions().filter(q=>!s.revealed[q.id]).forEach(q=>{s.firstAnswers[q.id]=[];this.recordMistake(q,[]);});
    const result=this.score();
    this.history.unshift({id:s.id,examId:s.examId,mode:s.mode,retry:s.retry,at:this.now(),...result});
    this.history=this.history.slice(0,30);this.write('aif-history',this.history);this.save();
  }
  save() { return this.write('aif-session',this.state); }
  restore() {
    const s=this.read('aif-session',null);if(!s||s.version!==ExamEngine.VERSION)return false;
    const ids=new Set(this.allQuestions().map(q=>q.id));
    if(!Array.isArray(s.ids)||!s.ids.length||s.ids.some(id=>!ids.has(id))||!Number.isInteger(s.index)||s.index<0||s.index>=s.ids.length||!['exam','learning'].includes(s.mode)||!s.answers||!s.firstAnswers||!s.optionOrder||!s.revealed||!s.flagged||(s.mode==='exam'&&!Number.isFinite(s.deadline))) return false;
    for(const id of s.ids){const q=this.allQuestions().find(q=>q.id===id);const order=s.optionOrder[id];if(!Array.isArray(order)||order.length!==q.options.length||new Set(order).size!==order.length||order.some(v=>!Number.isInteger(v)||v<0||v>=q.options.length))return false;}
    this.state=s;if(this.expired())this.submit();return true;
  }
}
window.ExamEngine=ExamEngine;
