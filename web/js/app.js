// SafetyLens AR — Navigation, Auth (Admin/Worker), Clan scoping & unified
// multi-object find-answer module flow (used by every module).

let activeModule = TRAINING_MODULES.mod1;
let moduleStepIndex = 0;
let currentScreen = "screen-intro";
let navigationHistory = ["screen-intro"];
let wrongTurnsInSession = [];
let sessionScore = 96;
let sessionResponseTimes = [];
let currentUser = null;
let answerArmedAt = null;   // when the question finishing the find became visible
let moduleStartAt = null;   // when the current module run started (for duration)
let briefedModuleId = null; // which module's briefing has been shown this session

// Identification clues shown during the find step (helps users tell objects apart).
const STEP_CLUES = {
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

// ── Navigation Core ────────────────────────────────────────────────────────────

function navigateTo(screenId, isBackNavigation = false) {
  TTSEngine.stop();
  if (!isBackNavigation && currentScreen !== screenId) navigationHistory.push(screenId);

  document.querySelectorAll('.app-screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) { target.classList.add('active'); currentScreen = screenId; }

  hideBriefing();
  if (screenId !== 'screen-ar-scene') { ARHUDEngine.stop(); ChainEngine.stop(); hideApproach(); }
  if (screenId !== 'screen-consequence') ParticleEngine.stop();
  if (screenId !== 'screen-qr-verifier') QRVerifier.stopScanner();

  if (screenId === 'screen-intro') {
    TTSEngine.speak(t('stat_num') + " " + t('stat_caption'));
  } else if (screenId === 'screen-login') {
    populateClanSelect();
  } else if (screenId === 'screen-ar-scene') {
    startARModule(activeModule);
  } else if (screenId === 'screen-consequence') {
    ParticleEngine.init(document.getElementById('ember-canvas'));
    const consTitle = document.getElementById('consequence-label')?.textContent || '';
    const consText  = document.getElementById('consequence-text')?.textContent  || '';
    TTSEngine.speak(consTitle + ". " + consText);
  } else if (screenId === 'screen-certificate') {
    const pathStr = wrongTurnsInSession.length === 0
      ? "Correct on first attempt"
      : "Corrected after: " + wrongTurnsInSession.join(", ");
    window.sessionPathString = pathStr;
    window.sessionScore = sessionScore;
    CertificateModule.init(document.getElementById('worker-name-input'), 'cert-qr-holder', sessionScore, activeModule.id, pathStr);
    if (currentUser && currentUser.role === 'worker') {
      SLStore.saveResult({
        workerId: currentUser.workerId, moduleId: activeModule.id, score: sessionScore, path: pathStr,
        mistakes: wrongTurnsInSession.length,
        seconds: Math.max(0, Math.round((nowMs() - moduleStartAt) / 1000)),
        skillKeys: activeModule.skills || []
      });
    }
    const timeEl = document.getElementById('cert-time-val');
    if (timeEl) timeEl.textContent = sessionResponseTimes.length
      ? (sessionResponseTimes.reduce((a,b)=>a+b,0)/sessionResponseTimes.length).toFixed(1) + 's avg' : '—';
    const skillsEl = document.getElementById('cert-skills');
    if (skillsEl) skillsEl.innerHTML = (activeModule.skills || []).map(k => `<span class="skill-chip">${t('skill_' + k)}</span>`).join('');
    TTSEngine.speak(t('cert_title') + ". " + t('cert_sub'));
  } else if (screenId === 'screen-dashboard') {
    if (currentUser && currentUser.role === 'admin') DashboardModule.init();
    TTSEngine.speak(t('dash_title') + ". " + t('dash_sub'));
  }
}

function goBack() {
  if (navigationHistory.length > 1) {
    navigationHistory.pop();
    navigateTo(navigationHistory[navigationHistory.length - 1], true);
  } else {
    navigateTo('screen-login', true);
  }
}

window.onAndroidBackPressed = function () {
  if (currentScreen === 'screen-intro' || currentScreen === 'screen-login') return false;
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

function renderStepUI() {
  ARHUDEngine.stop();
  ChainEngine.stop();
  hideApproach();

  // First entry into a module → present the scenario briefing first.
  if (moduleStepIndex === 0 && briefedModuleId !== activeModule.id) {
    showBriefing();
    return;
  }

  const step = activeModule.steps[moduleStepIndex];
  if (!step) { navigateTo('screen-certificate'); return; }

  // live camera passthrough
  ARHUDEngine.video = document.getElementById('ar-camera-video');
  ARHUDEngine.startCamera();

  setAlarmCaption(activeModule);

  const stepEl = document.getElementById('ar-step-indicator');
  if (stepEl) stepEl.textContent = `${t('step')} ${moduleStepIndex + 1}/${activeModule.steps.length}`;

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

  // Place the candidate objects
  ChainEngine.start('ar-object-grid', step.objects, {
    onFound: function (o) { if (o.correct) revealQuestion(step); else wrongSelect(step, o); },
    onWrong: function (o) { wrongSelect(step, o); },
    onFocusLost: function (o) {},
    onApproach: function (done) { runApproachGate(done); }
  });
}

function revealQuestion(step) {
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

  const c = document.getElementById('choices-buttons');
  if (c) {
    c.innerHTML = step.choices.map(ch => `<button class="choice-btn" data-choice-id="${ch.id}"><span class="letter">${ch.letter}</span><span class="choice-text">${ch.text[currentLang] || ch.text['en']}</span></button>`).join('');
    c.querySelectorAll('.choice-btn').forEach(btn => btn.addEventListener('click', function () { handleChoiceSelection(this.getAttribute('data-choice-id')); }));
  }
  answerArmedAt = nowMs();
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
  const selectedChoice = step && step.choices.find(c => c.id === choiceId);

  if (answerArmedAt != null) sessionResponseTimes.push(Math.max(0, (nowMs() - answerArmedAt) / 1000));

  if (selectedChoice && selectedChoice.correct) {
    ChainEngine.stop();
    advanceStep();
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
  if (!activeModule.steps[moduleStepIndex]) { navigateTo('screen-certificate'); } else { renderStepUI(); }
}

function startARModule(moduleObj) {
  activeModule = moduleObj;
  renderStepUI();
}

function setConsequence(obj) {
  const titleElem = document.getElementById('consequence-label');
  if (titleElem) titleElem.textContent = obj.title[currentLang] || obj.title['en'];
  const textElem = document.getElementById('consequence-text');
  if (textElem) textElem.textContent = obj.explanation[currentLang] || obj.explanation['en'];
}

// ── Briefing ───────────────────────────────────────────────────────────────────

function showBriefing() {
  const overlay = document.getElementById('briefing-overlay');
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
function doLogin(worker, admin) {
  if (worker) {
    const name = document.getElementById('login-worker-name').value;
    const clan = document.getElementById('login-clan-select').value;
    SLStore.loginWorker(name, clan);
  } else {
    const u = document.getElementById('login-admin-user').value;
    const p = document.getElementById('login-admin-pass').value;
    const res = SLStore.loginAdmin(u, p);
    if (!res.ok) { const m = document.getElementById('login-msg-admin'); if (m) m.textContent = 'Invalid credentials'; return; }
  }
  routeHome();
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

  document.querySelectorAll('.role-btn').forEach(btn => btn.addEventListener('click', function () {
    document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const isAdmin = this.getAttribute('data-role') === 'admin';
    document.getElementById('worker-login-form').style.display = isAdmin ? 'none' : 'block';
    document.getElementById('admin-login-form').style.display = isAdmin ? 'block' : 'none';
  }));

  populateClanSelect();
  document.getElementById('btn-worker-login')?.addEventListener('click', () => doLogin(true, false));
  document.getElementById('btn-admin-login')?.addEventListener('click', () => doLogin(false, true));
  document.getElementById('quick-admin')?.addEventListener('click', () => { if (SLStore.loginAdmin('admin','safety123').ok) routeHome(); });
  document.getElementById('quick-worker')?.addEventListener('click', () => { if (SLStore.loginWorker('Ramesh Kumar','clan-mine3').ok) routeHome(); });
  document.getElementById('btn-logout')?.addEventListener('click', () => { SLStore.logout(); currentUser = null; applySessionUI(null); navigateTo('screen-login'); });

  document.getElementById('btn-intro-continue')?.addEventListener('click', () => routeHome());

  function startModule(m) {
    activeModule = m; moduleStepIndex = 0; wrongTurnsInSession = []; sessionScore = 96; sessionResponseTimes = [];
    moduleStartAt = nowMs(); briefedModuleId = null;
    navigateTo('screen-ar-scene');
  }
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

  setLanguage('en');
  TTSEngine.speak(t('stat_num') + " " + t('stat_caption'));
  applySessionUI(SLStore.currentUser());
});
