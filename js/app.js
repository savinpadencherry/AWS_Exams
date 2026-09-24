/**
 * AWS Certified AI Practitioner (AIF-C01)
 * Application Orchestrator & UI Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const engine = window.examEngine;
  
  // DOM Elements
  const dashboardView = document.getElementById('dashboardView');
  const examActiveView = document.getElementById('examActiveView');
  const reviewScreenView = document.getElementById('reviewScreenView');
  const resultsView = document.getElementById('resultsView');
  
  const questionContainer = document.getElementById('questionContainer');
  const pvHeaderCenter = document.getElementById('pvHeaderCenter');
  const pvSubbar = document.getElementById('pvSubbar');
  const pvFooter = document.getElementById('pvFooter');
  
  const currentExamTitle = document.getElementById('currentExamTitle');
  const qNumDisplay = document.getElementById('qNumDisplay');
  const domainTagDisplay = document.getElementById('domainTagDisplay');
  const flagBtn = document.getElementById('flagBtn');
  
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const navGridBtn = document.getElementById('navGridBtn');
  const reviewBtn = document.getElementById('reviewBtn');
  const endExamBtn = document.getElementById('endExamBtn');
  
  const navModal = document.getElementById('navModal');
  const closeNavModal = document.getElementById('closeNavModal');
  const navGridContainer = document.getElementById('navGridContainer');
  const navFilterSelect = document.getElementById('navFilterSelect');
  
  const modeExamBtn = document.getElementById('modeExamBtn');
  const modeLearningBtn = document.getElementById('modeLearningBtn');
  const dashboardBtn = document.getElementById('dashboardBtn');

  // Initialize Exam Cards on Dashboard
  function renderDashboard() {
    dashboardView.classList.remove('hidden');
    examActiveView.classList.add('hidden');
    reviewScreenView.classList.add('hidden');
    resultsView.classList.add('hidden');
    
    pvSubbar.classList.add('hidden');
    pvFooter.classList.add('hidden');
    pvHeaderCenter.classList.add('hidden');

    const grid = document.getElementById('examCardsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    for (let id = 1; id <= 5; id++) {
      const exam = engine.exams[id];
      if (!exam || !exam.meta) continue;
      const meta = exam.meta;

      const card = document.createElement('div');
      card.className = 'exam-card';
      card.innerHTML = `
        <div>
          <span class="exam-badge ${meta.badge}">${meta.badgeText}</span>
          <h3>${meta.title}</h3>
          <p>${meta.description}</p>
          <div class="exam-specs">
            <span><strong>Questions:</strong> ${meta.questionsCount}</span>
            <span><strong>Time Limit:</strong> ${meta.timeLimitMinutes} Mins</span>
            <span><strong>Passing Score:</strong> 700 / 1000</span>
          </div>
        </div>
        <div class="exam-card-actions">
          <button class="btn btn-primary" style="flex:1;" data-exam-id="${id}" data-mode="exam">
            <span>&#9201;</span> Timed Exam
          </button>
          <button class="btn btn-aws" style="flex:1;" data-exam-id="${id}" data-mode="learning">
            <span>&#128161;</span> Learn Mode
          </button>
        </div>
      `;
      grid.appendChild(card);
    }

    // Attach start buttons
    grid.querySelectorAll('button[data-exam-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const examId = parseInt(btn.getAttribute('data-exam-id'), 10);
        const mode = btn.getAttribute('data-mode');
        startExam(examId, mode);
      });
    });
  }

  function startExam(examId, mode) {
    engine.loadExam(examId, mode);
    updateModeButtons();
    showExamView();
  }

  function showExamView() {
    dashboardView.classList.add('hidden');
    examActiveView.classList.remove('hidden');
    reviewScreenView.classList.add('hidden');
    resultsView.classList.add('hidden');
    
    pvSubbar.classList.remove('hidden');
    pvFooter.classList.remove('hidden');
    pvHeaderCenter.classList.remove('hidden');

    const exam = engine.getCurrentExam();
    currentExamTitle.textContent = exam.meta.title;
    
    renderCurrentQuestion();
    updateFooterButtons();
  }

  function updateModeButtons() {
    if (engine.mode === 'learning') {
      modeLearningBtn.classList.add('active');
      modeExamBtn.classList.remove('active');
    } else {
      modeExamBtn.classList.add('active');
      modeLearningBtn.classList.remove('active');
    }
  }

  // Render Question
  function renderCurrentQuestion() {
    const q = engine.getCurrentQuestion();
    const exam = engine.getCurrentExam();
    if (!q) return;

    // Header info
    qNumDisplay.textContent = `Question ${engine.currentQuestionIdx + 1} of ${exam.questions.length}`;
    domainTagDisplay.textContent = q.domainTitle;
    
    // Flag status
    const isFl = engine.isFlagged(q.id);
    flagBtn.classList.toggle('flagged', isFl);
    flagBtn.innerHTML = `<span>${isFl ? '&#127988;' : '&#9873;'}</span> ${isFl ? 'Flagged for Review' : 'Flag for Review'}`;

    // Options mapping (A, B, C, D, E)
    const markers = ['A', 'B', 'C', 'D', 'E'];
    const userAns = engine.userAnswers[q.id] || [];
    const isRevealed = engine.mode === 'learning' && engine.revealedLearning[q.id];
    const isCorrect = engine.isQuestionCorrect(q);

    let optionsHtml = '';
    q.options.forEach((optText, idx) => {
      const isSelected = userAns.includes(idx);
      const isAnsCorrect = q.correctAnswers.includes(idx);

      let itemClass = 'option-item';
      let feedbackBadge = '';

      if (isSelected) itemClass += ' selected';

      if (isRevealed) {
        if (isAnsCorrect) {
          itemClass += ' correct-answer';
          feedbackBadge = `<span class="option-feedback-badge correct">&#10004; Correct</span>`;
        } else if (isSelected && !isAnsCorrect) {
          itemClass += ' user-incorrect';
          feedbackBadge = `<span class="option-feedback-badge incorrect">&#10006; Incorrect</span>`;
        }
      }

      optionsHtml += `
        <div class="${itemClass}" data-idx="${idx}">
          <div class="option-marker">${markers[idx]}</div>
          <div class="option-text">${optText} ${feedbackBadge}</div>
        </div>
      `;
    });

    // Learning Card HTML (if revealed in learning mode)
    let learningCardHtml = '';
    if (isRevealed) {
      learningCardHtml = renderLearningCard(q, isCorrect);
    }

    questionContainer.className = `question-container ${isRevealed ? 'learning-active' : ''}`;
    questionContainer.innerHTML = `
      <div class="question-header">
        <span class="question-num">Question ${engine.currentQuestionIdx + 1}</span>
        <span class="question-type-hint">${q.type === 'multiple' ? 'Multiple Response (Select TWO)' : 'Multiple Choice (Select ONE)'}</span>
      </div>
      <div class="question-stem">
        <div class="scenario-box">
          <strong>Scenario:</strong> ${q.scenario}
        </div>
        <p><strong>${q.question}</strong></p>
      </div>
      <div class="options-list">
        ${optionsHtml}
      </div>
      ${learningCardHtml}
    `;

    // Attach option click handlers
    questionContainer.querySelectorAll('.option-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.getAttribute('data-idx'), 10);
        engine.selectOption(idx);
        renderCurrentQuestion();
        updateFooterButtons();
      });
    });

    // Attach learning tab switch handlers
    if (isRevealed) {
      questionContainer.querySelectorAll('.learning-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const tab = btn.getAttribute('data-tab');
          engine.activeLearningTab = tab;
          renderCurrentQuestion();
        });
      });
    }
  }

  // Render Hyper-Learning Card
  function renderLearningCard(q, isCorrect) {
    const activeTab = engine.activeLearningTab || 'explanation';
    
    // Distractor analysis list
    let distractorsListHtml = '';
    q.distractors.forEach((dText, idx) => {
      const isRightOpt = q.correctAnswers.includes(idx);
      distractorsListHtml += `
        <div class="distractor-item ${isRightOpt ? 'is-correct' : 'is-distractor'}">
          <div class="distractor-label ${isRightOpt ? 'correct' : 'incorrect'}">
            <span>${isRightOpt ? '&#10004;' : '&#10006;'}</span> Option ${String.fromCharCode(65 + idx)}
          </div>
          <div class="distractor-desc">${dText}</div>
        </div>
      `;
    });

    // Architecture diagram SVG
    const diagramSvg = window.getDiagramSvg ? window.getDiagramSvg(q.diagramKey) : '<div class="p-4">Diagram loading...</div>';

    // AWS Console Simulator HTML
    const consoleHtml = window.buildAwsConsoleHtml ? window.buildAwsConsoleHtml(q.consoleViewKey) : '<div class="p-4">Console view loading...</div>';

    return `
      <div class="learning-card">
        <div class="learning-card-header">
          <div class="learning-card-title">
            <span class="bulb-icon">&#128161;</span>
            <span>Hyper-Learning Breakdown: ${q.subtopic}</span>
          </div>
          <span class="answer-status-pill ${isCorrect ? 'success' : 'failure'}">
            ${isCorrect ? '&#10004; Correct Answer' : '&#10006; Review Answer'}
          </span>
        </div>

        <div class="learning-tabs">
          <button class="learning-tab-btn ${activeTab === 'explanation' ? 'active' : ''}" data-tab="explanation">
            <span>&#128214;</span> Simplified Explanation
          </button>
          <button class="learning-tab-btn ${activeTab === 'distractors' ? 'active' : ''}" data-tab="distractors">
            <span>&#129300;</span> Distractor Analysis
          </button>
          <button class="learning-tab-btn ${activeTab === 'diagram' ? 'active' : ''}" data-tab="diagram">
            <span>&#128506;</span> Architecture Dataflow
          </button>
          <button class="learning-tab-btn ${activeTab === 'console' ? 'active' : ''}" data-tab="console">
            <span>&#9881;</span> AWS Console Simulation
          </button>
        </div>

        <div class="learning-tab-content">
          ${activeTab === 'explanation' ? `
            <div class="concept-explanation-box">
              <h4>Core Concept &amp; Solution</h4>
              <p>${q.explanation}</p>
            </div>
            <div class="exam-trap-box">
              <span class="exam-trap-icon">&#9888;</span>
              <div class="exam-trap-text">
                <h5>Pearson VUE Exam Heuristic</h5>
                <p>${q.examTrap}</p>
              </div>
            </div>
          ` : ''}

          ${activeTab === 'distractors' ? `
            <div class="distractor-grid">
              ${distractorsListHtml}
            </div>
          ` : ''}

          ${activeTab === 'diagram' ? `
            <div class="diagram-container">
              ${diagramSvg}
            </div>
          ` : ''}

          ${activeTab === 'console' ? `
            <div class="console-view-container">
              ${consoleHtml}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  function updateFooterButtons() {
    const exam = engine.getCurrentExam();
    prevBtn.disabled = engine.currentQuestionIdx === 0;
    
    if (engine.currentQuestionIdx >= exam.questions.length - 1) {
      nextBtn.textContent = 'Review & Submit';
    } else {
      nextBtn.innerHTML = 'Next <span>&rarr;</span>';
    }
  }

  // Question Navigator Modal
  function openNavigator() {
    const exam = engine.getCurrentExam();
    const filter = navFilterSelect.value; // 'all', 'flagged', 'unanswered'
    navGridContainer.innerHTML = '';

    exam.questions.forEach((q, idx) => {
      const isAns = engine.isAnswered(q.id);
      const isFl = engine.isFlagged(q.id);
      const isCurrent = idx === engine.currentQuestionIdx;

      if (filter === 'flagged' && !isFl) return;
      if (filter === 'unanswered' && isAns) return;

      const btn = document.createElement('button');
      btn.className = `nav-grid-btn ${isAns ? 'answered' : ''} ${isFl ? 'flagged' : ''} ${isCurrent ? 'current' : ''}`;
      btn.textContent = idx + 1;
      btn.title = `Question ${idx + 1}: ${q.subtopic}`;

      btn.addEventListener('click', () => {
        engine.jumpToQuestion(idx);
        navModal.classList.add('hidden');
        showExamView();
      });

      navGridContainer.appendChild(btn);
    });

    navModal.classList.remove('hidden');
  }

  // Pre-submission Review Screen
  function showReviewScreen() {
    dashboardView.classList.add('hidden');
    examActiveView.classList.add('hidden');
    reviewScreenView.classList.remove('hidden');
    resultsView.classList.add('hidden');

    const exam = engine.getCurrentExam();
    const tbody = document.getElementById('reviewTableBody');
    tbody.innerHTML = '';

    let answeredCount = 0;
    let flaggedCount = 0;

    exam.questions.forEach((q, idx) => {
      const isAns = engine.isAnswered(q.id);
      const isFl = engine.isFlagged(q.id);
      if (isAns) answeredCount++;
      if (isFl) flaggedCount++;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>#${idx + 1}</strong></td>
        <td><span class="badge" style="background:#e0f2fe; color:#0369a1;">Domain ${q.domain}</span></td>
        <td>${q.subtopic}</td>
        <td>
          <span class="badge" style="background:${isAns ? '#d1fae5; color:#065f46;' : '#fee2e2; color:#991b1b;'}">
            ${isAns ? 'Answered' : 'Unanswered'}
          </span>
        </td>
        <td>${isFl ? '<span style="color:#d97706; font-weight:700;">&#127988; Flagged</span>' : '-'}</td>
        <td>
          <button class="btn btn-secondary" style="padding:4px 10px; font-size:12px;" data-jump="${idx}">
            Jump
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.getElementById('reviewTotalAnswered').textContent = `${answeredCount} / ${exam.questions.length}`;
    document.getElementById('reviewTotalFlagged').textContent = flaggedCount;
    document.getElementById('reviewTotalUnanswered').textContent = exam.questions.length - answeredCount;

    tbody.querySelectorAll('button[data-jump]').forEach(b => {
      b.addEventListener('click', () => {
        const idx = parseInt(b.getAttribute('data-jump'), 10);
        engine.jumpToQuestion(idx);
        showExamView();
      });
    });
  }

  // Final Results & Score Report
  function showResults() {
    const results = engine.calculateScore();
    dashboardView.classList.add('hidden');
    examActiveView.classList.add('hidden');
    reviewScreenView.classList.add('hidden');
    resultsView.classList.remove('hidden');

    pvSubbar.classList.add('hidden');
    pvFooter.classList.add('hidden');

    const banner = document.getElementById('scoreBanner');
    banner.className = `score-banner ${results.passed ? 'pass' : 'fail'}`;
    banner.innerHTML = `
      <div class="score-badge">${results.passed ? 'PASSED - CONGRATULATIONS' : 'DID NOT PASS - REMEDIATION REQUIRED'}</div>
      <div class="score-number">${results.scaledScore}</div>
      <div class="score-details">
        Scaled Score Range: 100 &ndash; 1000 | Required Passing Score: 700<br>
        Overall Accuracy: <strong>${results.rawPercent}%</strong> (${results.totalCorrect} / ${results.totalQuestions} Questions Correct)
      </div>
    `;

    // Domain breakdown
    const container = document.getElementById('domainBreakdownList');
    container.innerHTML = '';

    for (let d = 1; d <= 5; d++) {
      const stats = results.domainStats[d];
      if (!stats || stats.total === 0) continue;
      const pct = Math.round((stats.correct / stats.total) * 100);
      const isDomainPass = pct >= 70;

      const row = document.createElement('div');
      row.className = 'domain-row';
      row.innerHTML = `
        <div class="domain-label-group">
          <span><strong>${stats.title}</strong> (${stats.weight}% of exam)</span>
          <span>
            ${stats.correct}/${stats.total} correct (${pct}%) &bull; 
            <strong style="color:${isDomainPass ? '#059669' : '#d97706'}">
              ${isDomainPass ? 'Meets Competency' : 'Needs Improvement'}
            </strong>
          </span>
        </div>
        <div class="progress-track">
          <div class="progress-fill ${isDomainPass ? 'pass' : 'fail'}" style="width: ${pct}%;"></div>
        </div>
      `;
      container.appendChild(row);
    }
  }

  // Event Listeners
  prevBtn.addEventListener('click', () => {
    if (engine.prevQuestion()) {
      renderCurrentQuestion();
      updateFooterButtons();
    }
  });

  nextBtn.addEventListener('click', () => {
    const exam = engine.getCurrentExam();
    if (engine.currentQuestionIdx >= exam.questions.length - 1) {
      showReviewScreen();
    } else {
      engine.nextQuestion();
      renderCurrentQuestion();
      updateFooterButtons();
    }
  });

  flagBtn.addEventListener('click', () => {
    engine.toggleFlag();
    renderCurrentQuestion();
  });

  navGridBtn.addEventListener('click', openNavigator);
  closeNavModal.addEventListener('click', () => navModal.classList.add('hidden'));
  navFilterSelect.addEventListener('change', openNavigator);

  reviewBtn.addEventListener('click', showReviewScreen);
  
  endExamBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to end and submit this exam for final scoring?")) {
      engine.submitExam();
      showResults();
    }
  });

  document.getElementById('returnToExamBtn').addEventListener('click', showExamView);
  document.getElementById('finalSubmitBtn').addEventListener('click', () => {
    engine.submitExam();
    showResults();
  });

  document.getElementById('retakeExamBtn').addEventListener('click', () => {
    startExam(engine.currentExamId, engine.mode);
  });

  document.getElementById('dashboardReturnBtn').addEventListener('click', renderDashboard);
  dashboardBtn.addEventListener('click', renderDashboard);

  document.getElementById('reviewAllAnswersBtn').addEventListener('click', () => {
    engine.mode = 'learning';
    // Reveal all questions in learning mode
    const exam = engine.getCurrentExam();
    exam.questions.forEach(q => { engine.revealedLearning[q.id] = true; });
    engine.currentQuestionIdx = 0;
    updateModeButtons();
    showExamView();
  });

  // Mode toggling
  modeExamBtn.addEventListener('click', () => {
    engine.mode = 'exam';
    updateModeButtons();
    renderCurrentQuestion();
  });

  modeLearningBtn.addEventListener('click', () => {
    engine.mode = 'learning';
    const q = engine.getCurrentQuestion();
    if (q) engine.revealedLearning[q.id] = true;
    updateModeButtons();
    renderCurrentQuestion();
  });

  // Keyboard navigation (1-4 / A-D, Left/Right arrows)
  document.addEventListener('keydown', (e) => {
    if (examActiveView.classList.contains('hidden')) return;

    if (e.key === 'ArrowRight') {
      nextBtn.click();
    } else if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
      const idx = parseInt(e.key, 10) - 1;
      engine.selectOption(idx);
      renderCurrentQuestion();
      updateFooterButtons();
    } else if (['a', 'b', 'c', 'd', 'e'].includes(e.key.toLowerCase())) {
      const idx = e.key.toLowerCase().charCodeAt(0) - 97;
      engine.selectOption(idx);
      renderCurrentQuestion();
      updateFooterButtons();
    }
  });

  // Initial load
  if (!engine.restoreState()) {
    renderDashboard();
  } else {
    if (engine.isExamSubmitted) {
      showResults();
    } else {
      showExamView();
    }
  }
});
