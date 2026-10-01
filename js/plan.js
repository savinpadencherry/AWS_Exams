/* 7-day plan to exam day. Tasks reference study modules (#/study/<id>) and practice actions. */
window.PLAN = [
  { day: 1, title: 'Strategy + Domain 1 foundations (FM selection, design)', hours: '3–4 h', steps: [
    { text: 'Read the exam strategy page (how AIP-C01 questions work)', go: 'study/strategy' },
    { text: 'Study Task 1.1 Analyze requirements and design', go: 'study/1.1' },
    { text: 'Study Task 1.2 Select and configure FMs', go: 'study/1.2' },
    { text: 'Drill: Task 1.1 and 1.2 questions (12 each)', go: 'drill/1.1' },
    { text: 'Skim the services glossary: Bedrock family', go: 'services' }] },
  { day: 2, title: 'Domain 1: data pipelines, vector stores, retrieval', hours: '4 h', steps: [
    { text: 'Study Task 1.3 Data validation and processing', go: 'study/1.3' },
    { text: 'Study Task 1.4 Vector stores', go: 'study/1.4' },
    { text: 'Study Task 1.5 Retrieval mechanisms', go: 'study/1.5' },
    { text: 'Drill: Tasks 1.3, 1.4, 1.5', go: 'drill/1.4' }] },
  { day: 3, title: 'Domain 1 prompts + Domain 2 agents and MCP', hours: '4 h', steps: [
    { text: 'Study Task 1.6 Prompt engineering and governance', go: 'study/1.6' },
    { text: 'Study Task 2.1 Agentic AI and tool integration (the biggest topic)', go: 'study/2.1' },
    { text: 'Drill: Task 1.6 and 2.1', go: 'drill/2.1' },
    { text: 'Review the mistakes queue', go: 'mistakes' }] },
  { day: 4, title: 'Domain 2: deployment, enterprise, APIs, tools', hours: '4 h', steps: [
    { text: 'Study Tasks 2.2 and 2.3', go: 'study/2.2' },
    { text: 'Study Tasks 2.4 and 2.5', go: 'study/2.4' },
    { text: 'Domain 2 drill', go: 'drill-domain/2' },
    { text: 'Full mock exam 1 (timed, 75 questions)', go: 'mock/1' }] },
  { day: 5, title: 'Domain 3 safety, security, governance', hours: '3–4 h', steps: [
    { text: 'Study Tasks 3.1 and 3.2', go: 'study/3.1' },
    { text: 'Study Tasks 3.3 and 3.4', go: 'study/3.3' },
    { text: 'Domain 3 drill', go: 'drill-domain/3' },
    { text: 'Review mock 1 mistakes (study the linked module for each)', go: 'mistakes' }] },
  { day: 6, title: 'Domains 4 and 5 + second mock', hours: '4 h', steps: [
    { text: 'Study Tasks 4.1, 4.2, 4.3', go: 'study/4.1' },
    { text: 'Study Tasks 5.1 and 5.2', go: 'study/5.1' },
    { text: 'Domain 4 and 5 drills', go: 'drill-domain/4' },
    { text: 'Full mock exam 2 (timed)', go: 'mock/2' }] },
  { day: 7, title: 'Weak-spot repair + final mock + rapid review', hours: '3–4 h', steps: [
    { text: 'Use the dashboard readiness chart: drill your two weakest tasks', go: '' },
    { text: 'Full mock exam 3 or the adaptive mix', go: 'mock/3' },
    { text: 'Read Rapid review (all comparison tables and traps)', go: 'rapid' },
    { text: 'Light review of the mistakes queue; stop early and sleep', go: 'mistakes' }] },
  { day: 8, title: 'Exam day', hours: '', steps: [
    { text: 'Skim the strategy page and rapid review for 20 minutes only', go: 'rapid' },
    { text: 'Plan: 75 questions, 180 minutes, about 2.4 min each. Flag and move on; answer every question (no guessing penalty).', go: '' }] }
];
