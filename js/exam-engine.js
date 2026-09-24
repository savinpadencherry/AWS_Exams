/**
 * AWS Certified AI Practitioner (AIF-C01)
 * Core Exam & Learning Engine
 */

class ExamEngine {
  constructor() {
    this.exams = {
      1: window.EXAM_DATA_1,
      2: window.EXAM_DATA_2,
      3: window.EXAM_DATA_3,
      4: window.EXAM_DATA_4,
      5: window.EXAM_DATA_5
    };
    
    this.currentExamId = 1;
    this.currentQuestionIdx = 0;
    this.mode = 'learning'; // 'learning' or 'exam'
    this.userAnswers = {}; // { qid: [0, 2] }
    this.flagged = {}; // { qid: true }
    this.revealedLearning = {}; // { qid: true }
    this.timerInterval = null;
    this.secondsRemaining = 90 * 60; // 90 minutes
    this.isExamSubmitted = false;
    this.activeLearningTab = 'explanation'; // 'explanation', 'distractors', 'diagram', 'console'
    
    // Domain metadata
    this.domainWeights = {
      1: { title: "Domain 1: Fundamentals of AI and ML", weight: 20 },
      2: { title: "Domain 2: Fundamentals of Generative AI", weight: 24 },
      3: { title: "Domain 3: Applications of Foundation Models", weight: 28 },
      4: { title: "Domain 4: Guidelines for Responsible AI", weight: 14 },
      5: { title: "Domain 5: Security, Compliance, and Governance", weight: 14 }
    };
  }

  getCurrentExam() {
    return this.exams[this.currentExamId];
  }

  getCurrentQuestion() {
    const exam = this.getCurrentExam();
    if (!exam || !exam.questions) return null;
    return exam.questions[this.currentQuestionIdx];
  }

  loadExam(examId, mode = 'learning') {
    this.currentExamId = examId;
    this.mode = mode;
    this.currentQuestionIdx = 0;
    this.userAnswers = {};
    this.flagged = {};
    this.revealedLearning = {};
    this.isExamSubmitted = false;
    this.activeLearningTab = 'explanation';
    
    const exam = this.getCurrentExam();
    this.secondsRemaining = (exam.meta.timeLimitMinutes || 90) * 60;
    
    this.startTimer();
    this.saveState();
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    
    this.timerInterval = setInterval(() => {
      if (this.secondsRemaining > 0 && !this.isExamSubmitted) {
        this.secondsRemaining--;
        this.updateTimerDisplay();
      } else if (this.secondsRemaining <= 0 && !this.isExamSubmitted) {
        clearInterval(this.timerInterval);
        alert("Time is up! Your exam will now be submitted automatically.");
        this.submitExam();
      }
    }, 1000);
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  updateTimerDisplay() {
    const timerEl = document.getElementById('pvTimer');
    if (!timerEl) return;
    
    timerEl.textContent = this.formatTime(this.secondsRemaining);
    const container = document.getElementById('pvTimerContainer');
    if (container) {
      if (this.secondsRemaining <= 300) { // 5 mins
        container.classList.add('low-time');
      } else {
        container.classList.remove('low-time');
      }
    }
  }

  toggleFlag() {
    const q = this.getCurrentQuestion();
    if (!q) return;
    this.flagged[q.id] = !this.flagged[q.id];
    this.saveState();
  }

  isFlagged(qid) {
    return !!this.flagged[qid];
  }

  selectOption(optionIdx) {
    const q = this.getCurrentQuestion();
    if (!q || this.isExamSubmitted) return;

    if (q.type === 'multiple') {
      // Multiple selection (e.g. Select TWO)
      const current = this.userAnswers[q.id] || [];
      const exists = current.indexOf(optionIdx);
      if (exists > -1) {
        current.splice(exists, 1);
      } else {
        // Enforce max selections matching correctAnswers length
        const maxAllowed = q.correctAnswers.length || 2;
        if (current.length < maxAllowed) {
          current.push(optionIdx);
        } else {
          current.shift();
          current.push(optionIdx);
        }
      }
      this.userAnswers[q.id] = current;
    } else {
      // Single selection
      this.userAnswers[q.id] = [optionIdx];
    }

    // In Learning Mode, automatically reveal feedback upon selection
    if (this.mode === 'learning') {
      this.revealedLearning[q.id] = true;
    }

    this.saveState();
  }

  checkAnswerLearning(qid) {
    this.revealedLearning[qid] = true;
    this.saveState();
  }

  nextQuestion() {
    const exam = this.getCurrentExam();
    if (this.currentQuestionIdx < exam.questions.length - 1) {
      this.currentQuestionIdx++;
      this.activeLearningTab = 'explanation';
      this.saveState();
      return true;
    }
    return false;
  }

  prevQuestion() {
    if (this.currentQuestionIdx > 0) {
      this.currentQuestionIdx--;
      this.activeLearningTab = 'explanation';
      this.saveState();
      return true;
    }
    return false;
  }

  jumpToQuestion(idx) {
    const exam = this.getCurrentExam();
    if (idx >= 0 && idx < exam.questions.length) {
      this.currentQuestionIdx = idx;
      this.activeLearningTab = 'explanation';
      this.saveState();
      return true;
    }
    return false;
  }

  isAnswered(qid) {
    const ans = this.userAnswers[qid];
    return ans && ans.length > 0;
  }

  isQuestionCorrect(q) {
    const user = this.userAnswers[q.id];
    if (!user || user.length === 0) return false;
    
    if (user.length !== q.correctAnswers.length) return false;
    const sortedUser = [...user].sort();
    const sortedCorrect = [...q.correctAnswers].sort();
    return sortedUser.every((val, idx) => val === sortedCorrect[idx]);
  }

  calculateScore() {
    const exam = this.getCurrentExam();
    let totalQuestions = exam.questions.length;
    let totalCorrect = 0;
    
    const domainStats = {
      1: { total: 0, correct: 0, title: this.domainWeights[1].title, weight: 20 },
      2: { total: 0, correct: 0, title: this.domainWeights[2].title, weight: 24 },
      3: { total: 0, correct: 0, title: this.domainWeights[3].title, weight: 28 },
      4: { total: 0, correct: 0, title: this.domainWeights[4].title, weight: 14 },
      5: { total: 0, correct: 0, title: this.domainWeights[5].title, weight: 14 }
    };

    exam.questions.forEach(q => {
      const d = q.domain || 1;
      if (!domainStats[d]) {
        domainStats[d] = { total: 0, correct: 0, title: `Domain ${d}`, weight: 20 };
      }
      domainStats[d].total++;
      if (this.isQuestionCorrect(q)) {
        totalCorrect++;
        domainStats[d].correct++;
      }
    });

    // Scaled Pearson score formula: 100 to 1000 scale
    // AWS Passing Score: 700 / 1000
    const rawPercent = totalCorrect / totalQuestions;
    const scaledScore = Math.round(100 + (rawPercent * 900));
    const passed = scaledScore >= 700;

    return {
      totalQuestions,
      totalCorrect,
      rawPercent: Math.round(rawPercent * 100),
      scaledScore,
      passed,
      domainStats
    };
  }

  submitExam() {
    this.isExamSubmitted = true;
    if (this.timerInterval) clearInterval(this.timerInterval);
    const results = this.calculateScore();
    this.saveState();
    return results;
  }

  saveState() {
    try {
      const state = {
        currentExamId: this.currentExamId,
        currentQuestionIdx: this.currentQuestionIdx,
        mode: this.mode,
        userAnswers: this.userAnswers,
        flagged: this.flagged,
        revealedLearning: this.revealedLearning,
        secondsRemaining: this.secondsRemaining,
        isExamSubmitted: this.isExamSubmitted
      };
      localStorage.setItem('aws_ai_exam_state', JSON.stringify(state));
    } catch (e) {
      console.warn("Storage not available:", e);
    }
  }

  restoreState() {
    try {
      const saved = localStorage.getItem('aws_ai_exam_state');
      if (saved) {
        const state = JSON.parse(saved);
        this.currentExamId = state.currentExamId || 1;
        this.currentQuestionIdx = state.currentQuestionIdx || 0;
        this.mode = state.mode || 'learning';
        this.userAnswers = state.userAnswers || {};
        this.flagged = state.flagged || {};
        this.revealedLearning = state.revealedLearning || {};
        this.secondsRemaining = state.secondsRemaining || 90 * 60;
        this.isExamSubmitted = state.isExamSubmitted || false;
        
        if (!this.isExamSubmitted) {
          this.startTimer();
        }
        return true;
      }
    } catch (e) {
      console.warn("Failed to restore state:", e);
    }
    return false;
  }
}

window.examEngine = new ExamEngine();
