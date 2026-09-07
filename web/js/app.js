// SafetyLens AR — Navigation, Auth (Admin/Worker), Clan scoping & unified
// multi-object find-answer module flow (used by every module).

let activeModule = TRAINING_MODULES.mod1;
let moduleStepIndex = 0;
let currentScreen = "screen-splash";
let navigationHistory = ["screen-splash"];
let pendingRole = 'worker';
let selectedChoiceId = null;
let foundStep = null;
let viewingSaved = null;
let torchOn = false;
let compassHandler = null;
let currentQuestionText = '';
let wrongTurnsInSession = [];
let sessionScore = 96;
let sessionResponseTimes = [];
let currentUser = null;
let certSavedKey = null;    // guards the certificate result so it is saved once per completion
let answerArmedAt = null;   // when the question finishing the find became visible
let moduleStartAt = null;   // when the current module run started (for duration)
let briefedModuleId = null; // which module's briefing has been shown this session

// Identification clues shown during the find step (helps users tell objects apart).
const STEP_CLUES = {
  "mod0.0": { en: "Look for the BIG GREEN bottle.", hi: "बड़ी हरी बोतल देखें।", sat: "ᱢᱟᱨᱟᱝ ᱦᱟᱹᱨᱤᱭᱟᱹᱹ ᱧᱮᱞ ᱢᱮ᱾" },
  "mod1.0": { en: "Look for a pressurised vessel with a red handwheel — the source of the smell.", hi: "एक दबाव वाला बर्तन जिसमें लाल हैंडव्हील है — गंध का स्रोत।", sat: "ᱨᱮᱰ ᱦᱮᱱᱰᱣᱦᱤᱞ ᱥᱟᱶ ᱵᱷᱩᱞ-ᱟ" },
  "mod1.1": { en: "Find the spoked handwheel that shuts off the supply line.", hi: "आपूर्ति लाइन बंद करने वाला तीलियों वाला हैंडव्हील खोजें।", sat: "ᱦᱮᱱᱰᱣᱦᱤᱞ ᱠᱷᱩᱡ" },
  "mod1.2": { en: "Find the box with a screen showing a number that keeps climbing.", hi: "ऐसा बॉक्स जिसकी स्क्रीन पर संख्या बढ़ रही है।", sat: "ᱥᱠᱨᱤᱱ ᱟᱜ ᱵᱚᱠᱥ" },
  "mod2.0": { en: "Find the big machine with cooling fins that is smoking.", hi: "धुआं दे रही कूलिंग पंखों वाली बड़ी मशीन खोजें।", sat: "ᱢᱚᱴᱚᱨ ᱠᱷᱩᱡ" },
  "mod2.1": { en: "Find the red wall-mounted canister with a hose and trigger.", hi: "होज़ और ट्रिगर वाली लाल दीवार-माउंटेड कनस्तर खोजें।", sat: "ᱨᱮᱰ ᱤᱬᱤᱡ" },
  "mod2.2": { en: "Find the steel door that controls the tunnel airflow.", hi: "सुरंग की हवा नियंत्रित करने वाला स्टील दरवाज़ा खोजें।", sat: "ᱦᱚᱭ ᱫᱩᱣᱟᱹᱨ" }
};

function moduleNum(m) { return (m.id || 'mod1').replace('mod', ''); }
function stepFailedCount(stepIndex) {
  const prefix = moduleNum(activeModule) + (stepIndex + 1);
  return wrongTurnsInSession.filter(tag => tag.indexOf(prefix) === 0).length;
}
function nowMs() { return (window.performance && window.performance.now) ? window.performance.now() : Date.now(); }
function homeFor(user) {
  if (!user) return 'screen-login';
  return user.role === 'admin' ? 'screen-dashboard' : 'screen-mod-select';
}

// ── Language preference (persisted) ────────────────────────────────────────────
function getStoredLang() { try { return localStorage.getItem('sl_lang') || null; } catch (e) { return null; } }
function langChosen() { try { return localStorage.getItem('sl_lang_set') === '1'; } catch (e) { return false; } }
function chooseLanguage(lang) {
  setLanguage(lang);
  try { localStorage.setItem('sl_lang', lang); localStorage.setItem('sl_lang_set', '1'); } catch (e) {}
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === lang));
}
function showLoginForms() {
  const isAdmin = pendingRole === 'admin';
  const wf = document.getElementById('worker-login-form');
  const af = document.getElementById('admin-login-form');
  if (wf) wf.style.display = isAdmin ? 'none' : 'block';
  if (af) af.style.display = isAdmin ? 'block' : 'none';
}

// ── Navigation Core ────────────────────────────────────────────────────────────

function navigateTo(screenId, isBackNavigation = false) {
  TTSEngine.stop();
  if (!isBackNavigation && currentScreen !== screenId && navigationHistory[navigationHistory.length - 1] !== screenId) navigationHistory.push(screenId);

  document.querySelectorAll('.app-screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) { target.classList.add('active'); currentScreen = screenId; }

  hideBriefing();
  if (screenId !== 'screen-ar-scene') {
    ARHUDEngine.stop(); ChainEngine.stop(); Panorama.destroy(); hideApproach(); stopCompass(); setTorch(false);
    // Preserve scenario state across the consequence screen so retry resumes;
    // a full stop happens on certificate/dashboard/login navigation via stop().
    if (screenId !== 'screen-consequence' && typeof Scenario !== 'undefined' && Scenario.active) Scenario.stop();
    try { Sfx.stopAll(); } catch (e) {}
    try { if (!((typeof Scenario !== 'undefined') && Scenario.active)) document.body.classList.remove('scenario-mode'); } catch (e) {}
  }
  if (screenId !== 'screen-consequence') ParticleEngine.stop();
  if (screenId !== 'screen-qr-verifier') QRVerifier.stopScanner();

  if (screenId === 'screen-intro') {
    TTSEngine.speak(t('stat_num') + " " + t('stat_caption'));
  } else if (screenId === 'screen-login') {
    populateClanSelect();
    showLoginForms();
  } else if (screenId === 'screen-splash') {
    // static splash; auto-advance handled at boot
  } else if (screenId === 'screen-role') {
  } else if (screenId === 'screen-language') {
  } else if (screenId === 'screen-mod-select') {
    if (currentUser && currentUser.role === 'worker') renderWorkerHome();
    setActiveTab('home');
  } else if (screenId === 'screen-found') {
  } else if (screenId === 'screen-correct') {
  } else if (screenId === 'screen-complete') {
  } else if (screenId === 'screen-certs') {
    if (currentUser && currentUser.role === 'worker') renderCertsList();
    setActiveTab('certs');
  } else if (screenId === 'screen-profile') {
    if (currentUser) renderProfile();
    setActiveTab('profile');
  } else if (screenId === 'screen-ar-scene') {
    startARModule(activeModule);
  } else if (screenId === 'screen-consequence') {
    ParticleEngine.init(document.getElementById('ember-canvas'));
    const consTitle = document.getElementById('consequence-label')?.textContent || '';
    const consText  = document.getElementById('consequence-text')?.textContent  || '';
    TTSEngine.speak(consTitle + ". " + consText);
  } else if (screenId === 'screen-certificate') {
    if (viewingSaved) {
      const rec = viewingSaved; viewingSaved = null;
      CertificateModule.updateCertificate(rec.worker, 'cert-qr-holder', rec.score, rec.module, rec.path, rec.ts);
      const mv = document.getElementById('cert-module-val');
      if (mv && TRAINING_MODULES[rec.module]) mv.textContent = t(TRAINING_MODULES[rec.module].titleKey);
      const cv = document.getElementById('cert-id-val');
      if (cv) cv.textContent = rec.certId || ('SLAR-M' + (rec.module || 'mod1').replace('mod', '') + '-' + new Date(rec.ts || Date.now()).getFullYear() + '-001');
    } else {
      const pathStr = wrongTurnsInSession.length === 0
        ? "Correct on first attempt"
        : "Corrected after: " + wrongTurnsInSession.join(", ");
      window.sessionPathString = pathStr;
      window.sessionScore = sessionScore;
      const workerName = (currentUser && currentUser.name) || 'Ramesh Kumar';
      CertificateModule.init(document.getElementById('worker-name-input'), 'cert-qr-holder', sessionScore, activeModule.id, pathStr);
      CertificateModule.updateCertificate(workerName, 'cert-qr-holder', sessionScore, activeModule.id, pathStr);
      const mv = document.getElementById('cert-module-val');
      if (mv) mv.textContent = t(activeModule.titleKey);
      const certId = makeCertId();
      const cv = document.getElementById('cert-id-val');
      if (cv) cv.textContent = certId;
      if (currentUser && currentUser.role === 'worker') {
        const saveKey = activeModule.id + '|' + sessionScore + '|' + wrongTurnsInSession.join(',');
        if (certSavedKey !== saveKey) {
          certSavedKey = saveKey;
          SLStore.saveResult({
            workerId: currentUser.workerId, worker: workerName, moduleId: activeModule.id, score: sessionScore, path: pathStr,
            mistakes: wrongTurnsInSession.length,
            seconds: Math.max(0, Math.round((nowMs() - moduleStartAt) / 1000)),
            skillKeys: activeModule.skills || [], certId: certId
          });
        }
      }
    }
    TTSEngine.speak(t('cert_title') + ". " + t('cert_sub'));
  } else if (screenId === 'screen-dashboard') {
    if (currentUser && currentUser.role === 'admin') DashboardModule.init();
    TTSEngine.speak(t('dash_title') + ". " + t('dash_sub'));
  }
}

function goBack() {
  if (navigationHistory.length > 1) {
    navigationHistory.pop();
    let target = navigationHistory[navigationHistory.length - 1];
    // Skip a finished AR scene: re-entering it would instantly bounce forward
    // to the certificate again (no steps remain), making Back look broken.
    // Also skip forward-only interstitials (correct/complete) so Back from a
    // fresh certificate lands on the module list, not mid-flow screens.
    const skipTarget = (t) => t === 'screen-correct' || t === 'screen-complete' || t === 'screen-debrief'
      || (t === 'screen-ar-scene' && (!activeModule.steps || moduleStepIndex >= activeModule.steps.length));
    while (skipTarget(target) && navigationHistory.length > 1) {
      navigationHistory.pop();
      target = navigationHistory[navigationHistory.length - 1];
    }
    navigateTo(target, true);
  } else {
    navigateTo('screen-login', true);
  }
}

window.onAndroidBackPressed = function () {
  if (currentScreen === 'screen-splash' || currentScreen === 'screen-intro' || currentScreen === 'screen-login') return false;
  goBack();
  return true;
};

// ── Unified multi-object step flow ──────────────────────────────────────────────

function setAlarmCaption(module) {
  const alarmTextElem = document.getElementById('alarm-text-val');
  if (alarmTextElem) alarmTextElem.textContent = t(module.alarmTextKey);
  const capMod = module.caption || module.briefing || {};
  const captionText = capMod[currentLang] || capMod['en'] || '';
  const captionElem = document.getElementById('ar-caption-val');
  if (captionElem) captionElem.textContent = captionText;
  TTSEngine.speak(t(module.alarmTextKey) + ". " + captionText);
}

// Guided 1-2-3 stepper for first-time workers (spoken for low-literacy users)
function setGuide(phase) {
  document.querySelectorAll('.guide-step').forEach(el => el.classList.toggle('active', el.getAttribute('data-phase') === phase));
  if (phase === 'tap') TTSEngine.speak(t('guide_tap'));
  else if (phase === 'answer') TTSEngine.speak(t('guide_answer'));
}

function renderStepUI() {
  // The step UI lives on the AR scene screen — if we were called from an
  // interstitial screen (found / correct), go back there first. navigateTo
  // re-enters via startARModule, so this cannot recurse.
  if (currentScreen !== 'screen-ar-scene') { navigateTo('screen-ar-scene'); return; }
  ARHUDEngine.stop();
  ChainEngine.stop();
  hideApproach();

  // First entry into a module → present the scenario briefing first.
  if (moduleStepIndex === 0 && briefedModuleId !== activeModule.id) {
    showBriefing();
    return;
  }

  // First-person scenario mode (currently the Gas module): explore →
  // discover → inspect → decide. Legacy step flow below is untouched.
  if (typeof SCENARIOS !== 'undefined' && SCENARIOS[activeModule.id]) {
    if (typeof Scenario !== 'undefined' && Scenario.active) Scenario.resume();
    else if (typeof Scenario !== 'undefined') Scenario.start(activeModule.id);
    return;
  }

  const step = activeModule.steps[moduleStepIndex];
  if (!step) { navigateTo('screen-certificate'); return; }

  // mine panorama background (replaces the live camera feed)
  Panorama.init(activeModule.id);

  setAlarmCaption(activeModule);

  const stepEl = document.getElementById('ar-step-indicator');
  if (stepEl) stepEl.textContent = `${t('step')} ${moduleStepIndex + 1}/${activeModule.steps.length}`;
  const ts2 = document.getElementById('ar-topbar-step');
  if (ts2) ts2.textContent = `STEP ${moduleStepIndex + 1}/${activeModule.steps.length}`;

  // numbered step sequence: done / current / upcoming
  const seq = document.getElementById('step-sequence');
  if (seq) {
    let dots = '';
    for (let i = 0; i < activeModule.steps.length; i++) {
      const cls = i < moduleStepIndex ? 'done' : (i === moduleStepIndex ? 'current' : '');
      dots += `<span class="seq-dot ${cls}">${i + 1}</span>`;
      if (i < activeModule.steps.length - 1) dots += '<span class="seq-line"></span>';
    }
    seq.innerHTML = `<span class="seq-label">${t('step')} ${moduleStepIndex + 1}/${activeModule.steps.length}</span><span class="seq-dots">${dots}</span>`;
  }

  // prompt
  const cp = document.getElementById('chain-prompt');
  if (cp) { cp.textContent = (step.prompt[currentLang] || step.prompt['en']); cp.classList.add('active'); }

  const panel = document.getElementById('choices-container');
  if (panel) panel.classList.add('locked');
  const q = document.getElementById('ar-question-text'); if (q) q.textContent = '';
  const h = document.getElementById('ar-hint-text'); if (h) h.style.display = 'none';
  const c = document.getElementById('choices-buttons'); if (c) c.innerHTML = '';

  // identification clue (what to look for, and how it is used)
  const ch = document.getElementById('chain-hint');
  if (ch) {
    const clue = STEP_CLUES[activeModule.id + '.' + moduleStepIndex] || {};
    ch.textContent = clue[currentLang] || clue['en'] || '';
    ch.style.display = 'block';
  }

  // Phase 1: FIND — guide always visible
  setGuide('find');

  // AR top bar step readout
  const ts = document.getElementById('ar-topbar-step');
  if (ts) ts.textContent = `STEP ${moduleStepIndex + 1}/${activeModule.steps.length}`;
  startCompass();

  // Place the candidate objects
  ChainEngine.start('ar-object-grid', step.objects, {
    onFound: function (o) { if (o.correct) showFoundScreen(step, o); else wrongSelect(step, o); },
    onWrong: function (o) { wrongSelect(step, o); },
    onFocusLost: function (o) {},
    onFirstFocus: function () { setGuide('tap'); },
    onApproach: function (done) { runApproachGate(done); }
  });
}

function showFoundScreen(step, o) {
  const icon = document.getElementById('found-obj-icon');
  if (icon) icon.innerHTML = (typeof CHAIN_SPRITES !== 'undefined' && CHAIN_SPRITES[o.key]) ? CHAIN_SPRITES[o.key] : '';
  const pill = document.getElementById('found-obj-pill');
  if (pill) pill.textContent = (o.name ? (o.name[currentLang] || o.name.en) : o.key);
  foundStep = step;
  navigateTo('screen-found');
}

function revealQuestion(step) {
  selectedChoiceId = null;
  const sub0 = document.getElementById('btn-submit-answer'); if (sub0) sub0.disabled = true;
  const panel = document.getElementById('choices-container');
  if (panel) panel.classList.remove('locked');
  const q = document.getElementById('ar-question-text');
  if (q) q.textContent = (step.question[currentLang] || step.question['en']) || '';

  // confirm which object was found + what it is for
  const ch = document.getElementById('chain-hint');
  const correct = step.objects && step.objects.find(o => o.correct);
  if (ch) {
    const cName = correct && (correct.name ? (correct.name[currentLang] || correct.name.en) : '');
    ch.textContent = (cName ? '✔ ' + cName + ' — ' : '') + (t('now_what'));
    ch.classList.add('found');
  }

  const h = document.getElementById('ar-hint-text');
  if (h) {
    if (stepFailedCount(moduleStepIndex) > 0) {
      const hm = STEP_HINTS[activeModule.id + '.' + moduleStepIndex];
      if (hm) { h.textContent = hm[currentLang] || hm['en'] || ''; h.style.display = 'block'; }
      else { h.style.display = 'none'; }
    } else { h.style.display = 'none'; }
  }

  currentQuestionText = (step.question[currentLang] || step.question['en']) || '';
  const c = document.getElementById('choices-buttons');
  if (c) {
    c.innerHTML = step.choices.map(ch => `<button class="choice-row" data-choice-id="${ch.id}"><span class="letter">${ch.letter}</span><span class="choice-text">${ch.text[currentLang] || ch.text['en']}</span></button>`).join('');
    c.querySelectorAll('.choice-row').forEach(btn => btn.addEventListener('click', function () {
      selectedChoiceId = this.getAttribute('data-choice-id');
      c.querySelectorAll('.choice-row').forEach(b => b.classList.toggle('selected', b === btn));
      const sub = document.getElementById('btn-submit-answer'); if (sub) sub.disabled = false;
    }));
  }
  answerArmedAt = nowMs();
  // Phase 3: ANSWER
  setGuide('answer');
}

function wrongSelect(step, o) {
  ChainEngine.stop();
  const tag = moduleNum(activeModule) + (moduleStepIndex + 1) + (o.key || 'X');
  if (!wrongTurnsInSession.includes(tag)) { wrongTurnsInSession.push(tag); sessionScore = Math.max(50, sessionScore - 10); }
  setConsequence({
    title: { en: "WRONG OBJECT", hi: "गलत वस्तु", sat: "ᱵᱟᱝ ᱴᱷᱤᱠ" },
    explanation: {
      en: "That is not the item you need here. Re-read the prompt and find the correct one before continuing.",
      hi: "यह यहाँ आवश्यक वस्तु नहीं है। संकेत फिर से पढ़ें और सही वस्तु खोजें।",
      sat: "ᱱᱚᱣᱟ ᱵᱷᱟᱜᱽ ᱵᱟᱝ ᱦᱩᱭᱩᱜᱼᱟ᱾ ᱠᱷᱩᱡ ᱢᱮ᱾"
    }
  });
  navigateTo('screen-consequence');
}

function handleChoiceSelection(choiceId) {
  const step = activeModule.steps[moduleStepIndex];
  if (!step) return; // module already finished (e.g. double-tap on the final answer) — ignore
  const selectedChoice = step.choices.find(c => c.id === choiceId);

  if (answerArmedAt != null) sessionResponseTimes.push(Math.max(0, (nowMs() - answerArmedAt) / 1000));

  if (selectedChoice && selectedChoice.correct) {
    ChainEngine.stop();
    const cs = document.getElementById('correct-sub');
    if (cs) cs.textContent = selectedChoice.text[currentLang] || selectedChoice.text['en'];
    navigateTo('screen-correct');
  } else {
    ChainEngine.stop();
    const wrongTag = moduleNum(activeModule) + (moduleStepIndex + 1) + 'Q' + choiceId;
    if (!wrongTurnsInSession.includes(wrongTag)) { wrongTurnsInSession.push(wrongTag); sessionScore = Math.max(50, sessionScore - 12); }
    const consequenceObj = (selectedChoice && selectedChoice.consequence) ? selectedChoice.consequence : {
      title: { en: "SAFETY PROTOCOL VIOLATED", hi: "सुरक्षा प्रोटोकॉल उल्लंघन", sat: "ᱨᱩᱠᱷᱤᱭᱟᱹ ᱱᱤᱭᱚᱢ ᱵᱚᱛᱚᱨ" },
      explanation: { en: "This action violated standard mining safety protocols, resulting in immediate hazard escalation.", hi: "इस कार्रवाई ने मानक खनन सुरक्षा प्रोटोकॉल का उल्लंघन किया।", sat: "ᱱᱚᱣᱟ ᱠᱟᱢ ᱥᱟᱱᱟᱢ ᱱᱤᱭᱚᱢ ᱵᱚᱛᱚᱨ ᱮᱱᱟ᱾" }
    };
    setConsequence(consequenceObj);
    navigateTo('screen-consequence');
  }
}

function advanceStep() {
  moduleStepIndex++;
  if (!activeModule.steps[moduleStepIndex]) { showCompleteScreen(); } else { renderStepUI(); }
}

function showCompleteScreen() {
  const secs = Math.max(0, Math.round((nowMs() - moduleStartAt) / 1000));
  const t1 = document.getElementById('complete-time');
  if (t1) t1.textContent = Math.floor(secs / 60) + ':' + String(secs % 60).padStart(2, '0');
  const a1 = document.getElementById('complete-attempts');
  if (a1) a1.textContent = wrongTurnsInSession.length + 1;
  const s1 = document.getElementById('complete-score');
  if (s1) s1.textContent = sessionScore + '%';
  const mn = document.getElementById('complete-mod-name');
  if (mn) mn.textContent = t(activeModule.titleKey);
  navigateTo('screen-complete');
}

function makeCertId() {
  const n = moduleNum(activeModule);
  const y = new Date().getFullYear();
  let seq = 1;
  try {
    if (currentUser && currentUser.role === 'worker') seq = SLStore.listResults(currentUser.workerId).length + 1;
  } catch (e) {}
  return 'SLAR-M' + n + '-' + y + '-' + String(seq).padStart(3, '0');
}

function certShareText() {
  const p = CertificateModule.currentPayload || {};
  const mod = p.module && TRAINING_MODULES[p.module] ? t(TRAINING_MODULES[p.module].titleKey) : (p.module || '');
  return `SafetyLens AR — ${t('cert_heading')}: ${p.worker || ''}, ${mod}, ${p.score || ''}%, ${p.timestamp || ''} (${p.sig || ''})`;
}
function shareCertificate() {
  const text = certShareText();
  if (navigator.share) { navigator.share({ title: 'SafetyLens AR', text: text }).catch(() => {}); return; }
  try {
    const done = () => {
      const b = document.getElementById('btn-cert-share');
      if (b) { const o = b.textContent; b.textContent = '✓'; setTimeout(() => { b.textContent = o; }, 1200); }
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
    else done();
  } catch (e) {}
}
function downloadCertificate() {
  try {
    const p = CertificateModule.currentPayload || {};
    const blob = new Blob([JSON.stringify(p, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'safetylens-certificate.json';
    document.body.appendChild(a); a.click();
    setTimeout(() => { try { URL.revokeObjectURL(a.href); a.remove(); } catch (e) {} }, 500);
  } catch (e) {}
}

function startARModule(moduleObj) {
  activeModule = moduleObj;
  renderStepUI();
}

function setConsequence(obj) {
  const titleElem = document.getElementById('consequence-label');
  if (titleElem) titleElem.textContent = obj.title[currentLang] || obj.title['en'];
  const fullText = obj.explanation[currentLang] || obj.explanation['en'];
  const sub = document.getElementById('consequence-sub');
  if (sub) {
    const cut = fullText.indexOf('.');
    sub.textContent = (cut > 20 ? fullText.slice(0, cut + 1) : fullText);
  }
  const textElem = document.getElementById('consequence-text');
  if (textElem) textElem.textContent = fullText;
  const hint = document.getElementById('consequence-hint');
  if (hint) {
    const hm = STEP_HINTS[activeModule.id + '.' + moduleStepIndex] || {};
    hint.textContent = hm[currentLang] || hm['en'] || '';
  }
  const wrap = document.getElementById('consequence-expl-wrap');
  if (wrap) wrap.style.display = 'none';
  const sh = document.getElementById('btn-show-expl');
  if (sh) { const lbl = sh.querySelector('[data-i18n="show_expl"],[data-i18n="hide_expl"]'); if (lbl) lbl.setAttribute('data-i18n', 'show_expl'); }
  updateDOMTranslations();
}

// ── Worker home / certificates tab / profile ────────────────────────────────────

function renderWorkerHome() {
  const name = (currentUser && currentUser.name) || 'Ramesh Kumar';
  const first = (name.trim().split(/\s+/)[0]) || 'Ramesh';
  const hn = document.getElementById('home-hello-name'); if (hn) hn.textContent = first;
  const av = document.getElementById('home-avatar-initial'); if (av) av.textContent = (first[0] || 'R').toUpperCase();
  let done = 0, total = 0;
  try {
    total = Object.keys(TRAINING_MODULES).length;
    if (currentUser && currentUser.role === 'worker') {
      done = new Set(SLStore.listResults(currentUser.workerId).map(r => r.moduleId)).size;
    }
  } catch (e) {}
  const pt = document.getElementById('home-progress-text');
  if (pt) pt.textContent = done + ' / ' + total + ' ' + t('completed');
  const arc = document.getElementById('home-progress-arc');
  if (arc) { const C = 163.3; arc.setAttribute('stroke-dashoffset', String(C * (1 - (total ? done / total : 0)))); }
}

function renderCertsList() {
  const list = document.getElementById('certs-list');
  const empty = document.getElementById('certs-empty');
  if (!list) return;
  let recs = [];
  try {
    if (currentUser && currentUser.role === 'worker') {
      recs = SLStore.listResults(currentUser.workerId).slice().sort((a, b) => (b.ts || '').localeCompare(a.ts || ''));
    }
  } catch (e) {}
  if (empty) empty.style.display = recs.length ? 'none' : 'block';
  list.innerHTML = recs.map((r, i) => {
    const mod = TRAINING_MODULES[r.module];
    const modName = mod ? t(mod.titleKey) : r.module;
    return `<button class="cert-row-card" data-cert-idx="${i}"><span class="cert-row-ico" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l8 3v6c0 5-3.2 8.4-8 11-4.8-2.6-8-6-8-11V5z" stroke="#3ECF8E" stroke-width="1.8" fill="rgba(62,207,142,0.12)"/><path d="M8.5 12.2l2.4 2.4 4.6-4.8" stroke="#3ECF8E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="cert-row-meta"><span class="cert-row-mod">${modName}</span><span class="cert-row-sub">${r.score}% · ${r.ts || ''}</span></span></button>`;
  }).join('');
  list.querySelectorAll('.cert-row-card').forEach(btn => btn.addEventListener('click', function () {
    const rec = recs[Number(this.getAttribute('data-cert-idx'))];
    if (rec) { viewingSaved = rec; navigateTo('screen-certificate'); }
  }));
}

function renderProfile() {
  const name = (currentUser && currentUser.name) || 'Ramesh Kumar';
  const first = (name.trim().split(/\s+/)[0]) || 'R';
  const pn = document.getElementById('profile-name'); if (pn) pn.textContent = name;
  const pa = document.getElementById('profile-avatar-initial'); if (pa) pa.textContent = first[0].toUpperCase();
  const pc = document.getElementById('profile-clan'); if (pc) pc.textContent = clanNameOf(currentUser);
}
function clanNameOf(user) {
  try {
    if (!user || !user.clanId) return '';
    const clans = SLStore.listClans();
    const c = clans.find(x => x.id === user.clanId);
    return c ? c.name : user.clanId;
  } catch (e) { return ''; }
}
function setActiveTab(tab) {
  document.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === tab));
}

// ── AR chrome: compass, flashlight, recenter, close ──────────────────────────────

function startCompass() {
  stopCompass();
  if (typeof DeviceOrientationEvent === 'undefined') return;
  const needle = document.getElementById('ar-compass-needle');
  if (!needle) return;
  compassHandler = function (e) {
    const raw = (e.webkitCompassHeading != null) ? e.webkitCompassHeading : (e.alpha || 0);
    if (typeof raw !== 'number' || !isFinite(raw)) return;
    needle.style.transform = `rotate(${(-raw).toFixed(1)}deg)`;
  };
  window.addEventListener('deviceorientation', compassHandler, true);
}
function stopCompass() {
  if (compassHandler) { window.removeEventListener('deviceorientation', compassHandler, true); compassHandler = null; }
}
function videoTrack() {
  try {
    const v = document.getElementById('ar-camera-video');
    const s = v && v.srcObject;
    const tracks = s ? s.getVideoTracks() : [];
    return tracks.length ? tracks[0] : null;
  } catch (e) { return null; }
}
function setTorch(on) {
  torchOn = !!on;
  const b = document.getElementById('btn-ar-torch');
  if (b) b.classList.toggle('on', torchOn);
}
async function toggleTorch() {
  try {
    const track = videoTrack();
    const caps = track && track.getCapabilities ? track.getCapabilities() : {};
    if (!track || !caps.torch) { const b = document.getElementById('btn-ar-torch'); if (b) b.style.display = 'none'; return; }
    await track.applyConstraints({ advanced: [{ torch: !torchOn }] });
    setTorch(!torchOn);
  } catch (e) { const b = document.getElementById('btn-ar-torch'); if (b) b.style.display = 'none'; }
}

// ── Briefing ───────────────────────────────────────────────────────────────────

function showBriefing() {
  const overlay = document.getElementById('briefing-overlay');
  const sb = document.getElementById('briefing-step');
  if (sb) sb.textContent = `STEP ${moduleStepIndex + 1}/${activeModule.steps.length}`;
  const body = document.getElementById('briefing-text');
  if (body) body.textContent = (activeModule.briefing && (activeModule.briefing[currentLang] || activeModule.briefing['en'])) || '';
  const title = document.getElementById('briefing-title');
  if (title) title.textContent = t(activeModule.titleKey);
  if (overlay) overlay.classList.add('active');
}

function hideBriefing() {
  const overlay = document.getElementById('briefing-overlay');
  if (overlay) overlay.classList.remove('active');
}

// Spatial "walk" gate for far objects — motion-based with graceful fallback.
function runApproachGate(done) {
  const overlay = document.getElementById('approach-overlay');
  const bar = document.getElementById('approach-bar');
  if (overlay) overlay.classList.add('active');
  if (bar) bar.style.width = '0%';
  const duration = 4000;
  let total = 0, moving = 0, elapsed = 0;
  const handler = function (e) {
    const a = e.accelerationIncludingGravity;
    if (!a) return;
    const mag = Math.sqrt((a.x||0)**2 + (a.y||0)**2 + (a.z||0)**2);
    total++;
    if (Math.abs(mag - 9.8) > 1.8) moving++;
  };
  try { window.addEventListener('devicemotion', handler); } catch (e) {}
  const tick = setInterval(() => {
    elapsed += 250;
    if (bar) bar.style.width = Math.min(100, Math.round((elapsed / duration) * 100)) + '%';
    if (elapsed >= duration) {
      clearInterval(tick);
      try { window.removeEventListener('devicemotion', handler); } catch (e) {}
      if (overlay) overlay.classList.remove('active');
      done();
    }
  }, 250);
}

function hideApproach() {
  const overlay = document.getElementById('approach-overlay');
  if (overlay) overlay.classList.remove('active');
}

// ── Auth / routing ──────────────────────────────────────────────────────────────

function populateClanSelect() {
  const sel = document.getElementById('login-clan-select');
  if (!sel) return;
  sel.innerHTML = SLStore.listClans().map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}
function routeHome() {
  currentUser = SLStore.currentUser();
  applySessionUI(currentUser);
  navigateTo(homeFor(currentUser));
}
function applySessionUI(user) {
  const logout = document.getElementById('btn-logout');
  if (logout) logout.style.display = user ? 'inline-block' : 'none';
  const dashLink = document.getElementById('nav-dashboard-link');
  if (dashLink) dashLink.style.display = (user && user.role === 'admin') ? 'block' : 'none';
}
async function doLogin(worker, admin) {
  if (worker) {
    const name = document.getElementById('login-worker-name').value;
    const clan = document.getElementById('login-clan-select').value;
    const res = await SLStore.loginWorker(name, clan);
    if (res && res.ok) { routeHome(); return; }
    const m = document.getElementById('login-msg'); if (m) m.textContent = 'Could not join clan — try again.';
  } else {
    const u = document.getElementById('login-admin-user').value;
    const p = document.getElementById('login-admin-pass').value;
    const res = await SLStore.loginAdmin(u, p);
    if (res && res.ok) { routeHome(); return; }
    const m = document.getElementById('login-msg-admin'); if (m) m.textContent = 'Invalid credentials';
  }
}

// ── Intro hero count-up (visual only) ────────────────────────────────────────────
function runIntroCountup() {
  const el = document.querySelector('#screen-intro .intro-num');
  if (!el) return;
  const target = parseInt(el.textContent.replace(/\D/g, ''), 10) || 48;
  const dur = 1200;
  const start = nowMs();
  function step(tt) { const p = Math.min(1, (tt - start) / dur); el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); }
  requestAnimationFrame(step);
}

// ── App Initialization ─────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {

  SLStore.init();

  document.querySelectorAll('.btn-back-nav').forEach(btn => btn.addEventListener('click', e => { e.preventDefault(); goBack(); }));
  document.getElementById('btn-tts-toggle')?.addEventListener('click', function () { TTSEngine.toggle(this); });

  document.querySelectorAll('.lang-btn:not(#btn-tts-toggle)').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.lang-btn:not(#btn-tts-toggle)').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      setLanguage(this.getAttribute('data-lang'));
      if (currentScreen === 'screen-ar-scene') startARModule(activeModule);
    });
  });

  document.querySelectorAll('[data-go-role]').forEach(btn => btn.addEventListener('click', function () {
    pendingRole = this.getAttribute('data-go-role') === 'admin' ? 'admin' : 'worker';
    if (langChosen()) { navigateTo('screen-login'); }
    else { navigateTo('screen-language'); }
  }));
  document.querySelectorAll('[data-pick-lang]').forEach(btn => btn.addEventListener('click', function () {
    chooseLanguage(this.getAttribute('data-pick-lang'));
    navigateTo('screen-login');
  }));
  document.querySelectorAll('[data-tab]').forEach(btn => btn.addEventListener('click', function () {
    const tab = this.getAttribute('data-tab');
    if (tab === 'certs') navigateTo('screen-certs');
    else if (tab === 'profile') navigateTo('screen-profile');
    else navigateTo('screen-mod-select');
  }));
  document.getElementById('btn-role-back')?.addEventListener('click', () => navigateTo('screen-role'));
  document.getElementById('btn-logout-2')?.addEventListener('click', () => { SLStore.logout(); currentUser = null; applySessionUI(null); navigateTo('screen-login'); });

  populateClanSelect();
  document.getElementById('btn-worker-login')?.addEventListener('click', () => doLogin(true, false));
  document.getElementById('btn-admin-login')?.addEventListener('click', () => doLogin(false, true));
  document.getElementById('quick-admin')?.addEventListener('click', async () => { const r = await SLStore.loginAdmin('admin','safety123'); if (r && r.ok) routeHome(); });
  document.getElementById('quick-worker')?.addEventListener('click', async () => { const r = await SLStore.loginWorker('Ramesh Kumar','clan-mine3'); if (r && r.ok) routeHome(); });
  document.getElementById('btn-logout')?.addEventListener('click', () => { SLStore.logout(); currentUser = null; applySessionUI(null); navigateTo('screen-login'); });

  document.getElementById('btn-intro-continue')?.addEventListener('click', () => {
    if (SLStore.currentUser()) routeHome();
    else navigateTo('screen-role');
  });

  // Splash: auto-advance + tap to skip
  setTimeout(() => { if (currentScreen === 'screen-splash') navigateTo('screen-intro'); }, 2400);
  document.getElementById('screen-splash')?.addEventListener('click', () => { if (currentScreen === 'screen-splash') navigateTo('screen-intro'); });

  // AR chrome controls
  document.getElementById('btn-ar-close')?.addEventListener('click', () => goBack());
  document.getElementById('btn-ar-recenter')?.addEventListener('click', () => { if (typeof ChainEngine.recenter === 'function') ChainEngine.recenter(); });
  document.getElementById('btn-ar-torch')?.addEventListener('click', () => toggleTorch());

  // Found / correct / complete flow
  document.getElementById('btn-found-next')?.addEventListener('click', () => { if (foundStep) { navigateTo('screen-ar-scene'); revealQuestion(foundStep); } });
  document.getElementById('btn-correct-next')?.addEventListener('click', () => advanceStep());
  document.getElementById('btn-complete-cert')?.addEventListener('click', () => navigateTo('screen-certificate'));
  document.getElementById('btn-complete-next')?.addEventListener('click', () => navigateTo('screen-mod-select'));

  // Question helpers
  document.getElementById('btn-listen-question')?.addEventListener('click', () => { if (currentQuestionText) TTSEngine.speak(currentQuestionText); });
  document.getElementById('btn-submit-answer')?.addEventListener('click', () => {
    if (!selectedChoiceId) {
      const h = document.getElementById('ar-hint-text');
      if (h) { h.textContent = t('choose_first'); h.style.display = 'block'; }
      TTSEngine.speak(t('choose_first'));
      return;
    }
    handleChoiceSelection(selectedChoiceId);
  });
  document.getElementById('btn-show-expl')?.addEventListener('click', function () {
    const wrap = document.getElementById('consequence-expl-wrap');
    const open = wrap && wrap.style.display !== 'none';
    if (wrap) wrap.style.display = open ? 'none' : 'block';
    const lbl = this.querySelector('[data-i18n]');
    if (lbl) { lbl.setAttribute('data-i18n', open ? 'show_expl' : 'hide_expl'); lbl.textContent = t(open ? 'show_expl' : 'hide_expl'); }
  });

  // Certificate share / download
  document.getElementById('btn-cert-share')?.addEventListener('click', shareCertificate);
  document.getElementById('btn-cert-download')?.addEventListener('click', downloadCertificate);

  function startModule(m) {
    activeModule = m; moduleStepIndex = 0; wrongTurnsInSession = []; sessionScore = 96; sessionResponseTimes = [];
    moduleStartAt = nowMs(); briefedModuleId = null; certSavedKey = null;
    navigateTo('screen-ar-scene');
  }
  document.getElementById('card-mod0')?.addEventListener('click', () => startModule(TRAINING_MODULES.mod0));
  document.getElementById('card-mod1')?.addEventListener('click', () => startModule(TRAINING_MODULES.mod1));
  document.getElementById('card-mod2')?.addEventListener('click', () => startModule(TRAINING_MODULES.mod2));
  document.getElementById('card-mod3')?.addEventListener('click', () => startModule(TRAINING_MODULES.mod3));
  document.getElementById('card-mod4')?.addEventListener('click', () => startModule(TRAINING_MODULES.mod4));
  document.getElementById('card-mod5')?.addEventListener('click', () => startModule(TRAINING_MODULES.mod5));

  // Briefing "Begin"
  document.getElementById('btn-briefing-begin')?.addEventListener('click', () => {
    briefedModuleId = activeModule.id;
    moduleStartAt = nowMs();
    hideBriefing();
    renderStepUI();
  });

  // Scenario inspect close + debrief continue
  document.getElementById('btn-inspect-close')?.addEventListener('click', () => { if (typeof Scenario !== 'undefined') Scenario.closeInspect(); });
  document.getElementById('btn-debrief-continue')?.addEventListener('click', () => showCompleteScreen());

  // Consequence retry
  document.getElementById('btn-retry-consequence')?.addEventListener('click', () => navigateTo('screen-ar-scene'));

  // QR verifier
  document.getElementById('btn-open-verifier')?.addEventListener('click', () => {
    navigateTo('screen-qr-verifier');
    QRVerifier.startCameraScanner(document.getElementById('verifier-video'), document.getElementById('verifier-result'));
  });
  document.getElementById('btn-back-from-verifier')?.addEventListener('click', () => goBack());

  document.getElementById('nav-dashboard-link')?.addEventListener('click', () => { if (currentUser && currentUser.role === 'admin') navigateTo('screen-dashboard'); });
  document.getElementById('nav-back-to-mods')?.addEventListener('click', () => goBack());

  setLanguage(getStoredLang() || 'en');
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === currentLang));
  TTSEngine.speak(t('stat_num') + " " + t('stat_caption'));
  applySessionUI(SLStore.currentUser());
});
