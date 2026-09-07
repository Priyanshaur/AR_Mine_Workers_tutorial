// SafetyLens AR — First-person scenario engine (vertical slice: Gas Leak).
//
// Replaces the conveyor-belt step flow with explore → discover → inspect →
// decide → consequence → debrief for modules listed in SCENARIOS. Legacy
// modules keep the step flow untouched. Scoring merges into the existing
// session vars so certificate, dashboard and persistence keep working.

const SCENARIOS = {
  mod1: {
    objective: {
      en: "Investigate the area and determine whether it is safe to continue.",
      hi: "क्षेत्र की जाँच करें और तय करें कि आगे बढ़ना सुरक्षित है या नहीं।",
      sat: "ᱴᱷᱟᱶ ᱧᱮᱞ ᱢᱮ ᱟᱨ ᱜᱚᱴᱟ ᱢᱮ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱢᱮᱱᱟᱜᱼᱟ ᱥᱮ ᱵᱟᱝ᱾"
    },
    objectives: [
      { id: 'assess', text: {
        en: "Assess the situation: inspect the gas detector",
        hi: "स्थिति का आकलन करें: गैस डिटेक्टर देखें",
        sat: "ᱜᱮᱥ ᱧᱮᱞ ᱢᱮ" } },
      { id: 'evacuate', text: {
        en: "Make the safe call on the detector reading",
        hi: "डिटेक्टर रीडिंग पर सुरक्षित निर्णय लें",
        sat: "ᱴᱷᱤᱠ ᱜᱚᱴᱟ ᱦᱟᱛᱟᱣ ᱢᱮ" } },
      { id: 'alert', text: {
        en: "Raise the alarm: call the supervisor",
        hi: "अलार्म बजाएँ: पर्यवेक्षक को बुलाएँ",
        sat: "ᱥᱩᱯᱚᱨᱵᱷᱟᱭᱡᱚᱨ ᱦᱚᱦᱚ ᱟᱭ ᱢᱮ" } }
    ],
    leakBearing: -115,
    debrief: {
      en: "A rising detector reading with a hissing damaged pipe means gas above safe limits. The only safe call is to stop work, evacuate, and raise the alarm — never keep working, never kill the ventilation that dilutes the gas.",
      hi: "बढ़ती डिटेक्टर रीडिंग और फुफकारती क्षतिग्रस्त पाइप का मतलब है सुरक्षित सीमा से ऊपर गैस। एकमात्र सुरक्षित निर्णय है काम रोकें, बाहर निकलें और अलार्म बजाएँ।",
      sat: "ᱜᱮᱥ ᱵᱟᱹᱲᱛᱤ ᱠᱷᱟᱹᱛᱤᱨ ᱠᱟᱹᱢᱤ ᱵᱚᱸᱫᱚ ᱢᱮ, ᱚᱰᱚᱠ ᱢᱮ, ᱟᱨ ᱦᱚᱦᱚ ᱟᱭ ᱢᱮ᱾"
    },
    objects: [
      { id: 'detector', key: 'monitor',
        name: { en: "Gas detector", hi: "गैस डिटेक्टर", sat: "ᱜᱮᱥ ᱧᱮᱞᱟᱜ" },
        offset: -60, el: 12, role: 'evidence', completes: 'assess',
        inspect: {
          reading: { en: "Reading: HIGH — above safe limit", hi: "रीडिंग: उच्च — सुरक्षित सीमा से ऊपर", sat: "ᱨᱤᱰᱤᱝ: ᱪᱮᱛᱟᱱ" },
          info: { en: "The display climbs past the safe threshold and keeps rising. The alarm light blinks red.", hi: "डिस्प्ले सुरक्षित सीमा से ऊपर बढ़ रहा है। अलार्म लाइट लाल जल रही है।", sat: "ᱨᱤᱰᱤᱝ ᱨᱟᱠᱟᱵ ᱠᱟᱱᱟ᱾" }
        },
        decision: {
          question: {
            en: "The detector reads HIGH. What should you do?",
            hi: "डिटेक्टर HIGH दिखा रहा है। आपको क्या करना चाहिए?",
            sat: "ᱨᱤᱰᱤᱝ ᱪᱮᱛᱟᱱ ᱢᱮᱱᱟᱜᱼᱟ᱾ ᱪᱮᱫ ᱮᱢ ᱦᱩᱭᱩᱜᱼᱟ?"
          },
          choices: [
            { id: 'd1', text: { en: "Stop work and evacuate", hi: "काम रोकें और बाहर निकलें", sat: "ᱠᱟᱹᱢᱤ ᱵᱚᱸᱫᱚ ᱢᱮ" }, correct: true, completes: 'evacuate', alarm: true },
            { id: 'd2', text: { en: "Continue working", hi: "काम जारी रखें", sat: "ᱠᱟᱹᱢᱤ ᱫᱚᱦᱚ ᱢᱮ" }, correct: false,
              consequence: { title: { en: "EXPOSURE RISK", hi: "संपर्क जोखिम", sat: "ᱵᱚᱛᱚᱨ" },
                explanation: { en: "You continued working despite the gas alarm. This increases the risk of exposure and ignition. Return to the decision and choose the appropriate emergency response.", hi: "गैस अलार्म के बावजूद आपने काम जारी रखा। वापस जाकर सही आपात प्रतिक्रिया चुनें।", sat: "ᱟᱞᱟᱨᱢ ᱢᱮᱱᱟᱜ ᱨᱮᱦᱚᱸ ᱠᱟᱹᱢᱤ ᱫᱚᱦᱚ ᱠᱮᱫᱟ᱾" } } },
            { id: 'd3', text: { en: "Turn off ventilation", hi: "वेंटिलेशन बंद करें", sat: "ᱦᱚᱭ ᱵᱚᱸᱫᱚ ᱢᱮ" }, correct: false,
              consequence: { title: { en: "GAS BUILDUP", hi: "गैस जमाव", sat: "ᱜᱮᱥ" },
                explanation: { en: "Ventilation dilutes the gas. Switching it off lets concentration climb toward explosive limits.", hi: "वेंटिलेशन गैस को हल्का करता है। इसे बंद करने से सांद्रता विस्फोटक सीमा की ओर बढ़ती है।", sat: "ᱦᱚᱭ ᱵᱚᱸᱫᱚ ᱞᱮᱠᱷᱟᱱ ᱜᱮᱥ ᱵᱟᱹᱲᱛᱤᱜᱼᱟ᱾" } } },
            { id: 'd4', text: { en: "Ignore the reading", hi: "रीडिंग अनदेखा करें", sat: "ᱟᱞᱚᱢ ᱧᱮᱞ" }, correct: false,
              consequence: { title: { en: "IGNORED WARNING", hi: "चेतावनी की अनदेखी", sat: "ᱵᱟᱝ ᱟᱸᱡᱚᱢ" },
                explanation: { en: "A HIGH reading is never background noise. Ignoring it leaves everyone in the zone exposed.", hi: "HIGH रीडिंग कभी सामान्य नहीं होती। अनदेखा करने से सभी जोखिम में रहते हैं।", sat: "ᱪᱮᱛᱟᱱ ᱨᱤᱰᱤᱝ ᱟᱞᱚᱢ ᱧᱮᱞᱟ᱾" } } }
          ]
        } },
      { id: 'pipe', key: 'valve',
        name: { en: "Damaged pipe", hi: "क्षतिग्रस्त पाइप", sat: "ᱨᱟᱹᱯᱩᱫ ᱯᱟᱭᱤᱯ" },
        offset: -115, el: -8, role: 'evidence',
        inspect: {
          reading: { en: "You hear faint hissing", hi: "हल्की फुफकार सुनाई दे रही है", sat: "ᱥᱤᱸᱜᱤ ᱟᱸᱡᱚᱢᱚᱜ ᱠᱟᱱᱟ" },
          info: { en: "A joint on the gas line is cracked and hissing. This is the likely leak source.", hi: "गैस लाइन का एक जोड़ टूटा है और फुफकार रहा है। यही संभावित रिसाव स्रोत है।", sat: "ᱯᱟᱭᱤᱯ ᱨᱟᱹᱯᱩᱫ ᱟᱠᱟᱱᱟ᱾" }
        },
        decision: null },
      { id: 'fan', key: 'motor',
        name: { en: "Ventilation fan", hi: "वेंटिलेशन पंखा", sat: "ᱦᱚᱭ ᱯᱟᱝᱠᱷᱟ" },
        offset: 70, el: 10, role: 'evidence',
        inspect: {
          reading: { en: "Status: OFF", hi: "स्थिति: बंद", sat: "ᱵᱚᱸᱫᱚ ᱢᱮᱱᱟᱜᱼᱟ" },
          info: { en: "The auxiliary fan is switched off. With no airflow, leaking gas will pool instead of clearing.", hi: "सहायक पंखा बंद है। हवा के बिना रिसती गैस जमा होगी।", sat: "ᱯᱟᱝᱠᱷᱟ ᱵᱚᱸᱫᱚ ᱢᱮᱱᱟᱜᱼᱟ᱾" }
        },
        decision: null },
      { id: 'phone', key: 'switch',
        name: { en: "Emergency phone", hi: "आपातकालीन फोन", sat: "ᱯᱷᱚᱱ" },
        offset: 150, el: 5, role: 'target', requires: 'evacuate',
        lockedInfo: {
          en: "No emergency declared yet. Assess the situation first.",
          hi: "अभी कोई आपातकाल घोषित नहीं है। पहले स्थिति का आकलन करें।",
          sat: "ᱞᱟᱦᱟ ᱧᱮᱞ ᱢᱮ᱾"
        },
        inspect: {
          reading: { en: "Line to surface control: READY", hi: "सतह नियंत्रण लाइन: तैयार", sat: "ᱞᱟᱭᱤᱱ ᱛᱮᱭᱟᱨ" },
          info: { en: "Direct line to the surface control room. One call raises the mine alarm.", hi: "सतह नियंत्रण कक्ष की सीधी लाइन। एक कॉल से खान अलार्म बजता है।", sat: "ᱢᱤᱫ ᱦᱚᱦᱚ ᱛᱮ ᱟᱞᱟᱨᱢ ᱡᱩᱞᱚᱜᱼᱟ᱾" }
        },
        decision: {
          question: {
            en: "The area must be evacuated. What now?",
            hi: "क्षेत्र खाली करना है। अब क्या?",
            sat: "ᱱᱤᱛᱚᱜ ᱪᱮᱫ?"
          },
          choices: [
            { id: 'p1', text: { en: "Call the supervisor", hi: "पर्यवेक्षक को बुलाएँ", sat: "ᱦᱚᱦᱚ ᱟᱭ ᱢᱮ" }, correct: true, completes: 'alert', finish: true }
          ]
        } },
      { id: 'worker', key: 'hands',
        name: { en: "Coworker", hi: "सहकर्मी", sat: "ᱜᱟᱛᱮ" },
        offset: 20, el: 0, role: 'evidence',
        inspect: {
          reading: { en: "Ravi is still working the face", hi: "रवि अभी भी काम कर रहा है", sat: "ᱨᱟᱹᱵᱤ ᱠᱟᱹᱢᱤ ᱮᱫᱟᱭ" },
          info: { en: "Your coworker hasn't noticed the alarm. He must leave with you.", hi: "आपके सहकर्मी ने अलार्म नहीं सुना। उसे भी साथ निकालें।", sat: "ᱜᱟᱛᱮ ᱦᱚᱸ ᱚᱰᱚᱠ ᱦᱩᱭᱩᱜ ᱞᱟᱹᱠᱛᱤᱜᱼᱟ᱾" }
        },
        decision: null },
      { id: 'torch', key: 'torch',
        name: { en: "Flashlight", hi: "टॉर्च", sat: "ᱴᱚᱨᱪ" },
        offset: 100, el: -5, role: 'distractor',
        inspect: {
          reading: null,
          info: { en: "Just a dropped flashlight. Nothing to do with the gas.", hi: "बस गिरी हुई टॉर्च है। गैस से कोई संबंध नहीं।", sat: "ᱪᱮᱫ ᱦᱚᱸ ᱵᱟᱝ᱾" }
        },
        decision: null },
      { id: 'crate', key: 'bucket',
        name: { en: "Supply crate", hi: "सामान का डिब्बा", sat: "ᱥᱟᱢᱟᱱ" },
        offset: -160, el: -12, role: 'distractor',
        inspect: {
          reading: null,
          info: { en: "Spare parts and rags. Not relevant right now.", hi: "फालतू पुर्जे हैं। अभी प्रासंगिक नहीं।", sat: "ᱪᱮᱫ ᱦᱚᱸ ᱵᱟᱝ᱾" }
        },
        decision: null }
    ]
  }
};

const Scenario = {
  active: false,
  moduleId: null,
  def: null,
  inspected: null,
  decisions: null,
  mistakes: 0,
  startTime: 0,
  objectivesDone: null,
  alarmOn: false,
  _centered: null,
  _inspectObj: null,
  _stageTap: null,

  start: function (moduleId) {
    const def = SCENARIOS[moduleId];
    if (!def) return false;
    this.stop();
    this.active = true;
    this.moduleId = moduleId;
    this.def = def;
    this.inspected = {};
    this.decisions = [];
    this.mistakes = 0;
    this.startTime = (typeof nowMs === 'function') ? nowMs() : Date.now();
    this.objectivesDone = {};
    this.alarmOn = false;
    this._centered = null;
    this._inspectObj = null;
    try { document.body.classList.add('scenario-mode'); } catch (e) {}
    Panorama.init(moduleId);
    const nodes = def.objects.map(function (o) {
      return { key: o.key, name: o.name, offset: o.offset, el: o.el || 0, far: false, correct: false, scId: o.id };
    });
    const self = this;
    ChainEngine.start('ar-object-grid', nodes, {
      onLook: function (o) { self._onLook(o); },
      onFound: function (o) { self.inspect(o); },
      onWrong: function (o) { self.inspect(o); },
      onApproach: function (done) { done(); }
    }, { fixed: true });
    this._wireStageTap();
    this._renderHUD();
    const obj = def.objective[currentLang] || def.objective.en;
    try { TTSEngine.speak(obj); } catch (e) {}
    try { Sfx.startHiss(); Sfx.startDrips(); } catch (e) {}
    return true;
  },

  stop: function () {
    this.active = false;
    this.moduleId = null;
    try { document.body.classList.remove('scenario-mode'); } catch (e) {}
    this._unwireStageTap();
    const p = (typeof document !== 'undefined') ? document.getElementById('inspect-panel') : null;
    if (p) p.classList.remove('active');
    this._inspectObj = null;
    this._hidePrompt();
    try { Sfx.stopAll(); } catch (e) {}
  },

  resume: function () {
    if (!this.active || !this.def) return false;
    try { document.body.classList.add('scenario-mode'); } catch (e) {}
    Panorama.init(this.moduleId);
    const nodes = this.def.objects.map(function (o) {
      return { key: o.key, name: o.name, offset: o.offset, el: o.el || 0, far: false, correct: false, scId: o.id };
    });
    const self = this;
    ChainEngine.start('ar-object-grid', nodes, {
      onLook: function (o) { self._onLook(o); },
      onFound: function (o) { self.inspect(o); },
      onWrong: function (o) { self.inspect(o); },
      onApproach: function (done) { done(); }
    }, { fixed: true });
    this._wireStageTap();
    this._renderHUD();
    try { Sfx.startHiss(); Sfx.startDrips(); } catch (e) {}
    return true;
  },

  _byId: function (id) {
    for (let i = 0; i < this.def.objects.length; i++) {
      if (this.def.objects[i].id === id) return this.def.objects[i];
    }
    return null;
  },

  _nodeById: function (id) {
    if (!ChainEngine.nodes) return null;
    for (let i = 0; i < ChainEngine.nodes.length; i++) {
      if (ChainEngine.nodes[i].scId === id) return ChainEngine.nodes[i];
    }
    return null;
  },

  // ---- look targeting ----

  _onLook: function (o) {
    this._centered = o || null;
    const bar = document.getElementById('look-prompt');
    if (!bar) return;
    if (!o) { bar.classList.remove('active'); return; }
    const name = (o.name && (o.name[currentLang] || o.name.en)) || o.key;
    const label = bar.querySelector('.look-name');
    if (label) label.textContent = name;
    bar.classList.add('active');
    try {
      const v = (typeof ChainEngine.getView === 'function') ? ChainEngine.getView() : null;
      const leak = this._byId('pipe');
      const leakB = leak ? leak.offset : 0;
      const yaw = v ? v.yaw : 0;
      let rel = leakB - yaw;
      while (rel > 180) rel -= 360;
      while (rel < -180) rel += 360;
      Sfx.updateHiss(rel, 0);
    } catch (e) {}
  },

  _wireStageTap: function () {
    const self = this;
    const stage = document.querySelector('.ar-stage');
    if (!stage || !stage.addEventListener) return;
    let downX = null, downY = null;
    let lastTouchAt = 0;
    this._ts = function (e) {
      const t = e.touches && e.touches[0];
      if (t) { downX = t.clientX; downY = t.clientY; lastTouchAt = Date.now(); }
      else if (e.clientX != null) { downX = e.clientX; downY = e.clientY; }
    };
    this._tg = function (e) {
      // Ignore the browser-synthesised mouse events that follow a real touch
      // tap, so inspecting doesn't fire twice on mobile.
      const isTouchLike = (e.type === 'touchstart' || e.type === 'touchend');
      if (!isTouchLike && (Date.now() - lastTouchAt) < 600) return;
      let dx = 0, dy = 0;
      const t = e.touches && e.touches[0];
      if (t && downX != null) { dx = Math.abs(t.clientX - downX); dy = Math.abs(t.clientY - downY); }
      else if (e.clientX != null && downX != null) { dx = Math.abs(e.clientX - downX); dy = Math.abs(e.clientY - downY); }
      downX = downY = null;
      if (dx + dy > 14) return; // it was a drag, not a tap
      self.inspectCentered();
    };
    stage.addEventListener('touchstart', this._ts, { passive: true });
    stage.addEventListener('touchend', this._tg);
    stage.addEventListener('mousedown', this._ts);
    stage.addEventListener('mouseup', this._tg);
  },

  _unwireStageTap: function () {
    const stage = document.querySelector('.ar-stage');
    if (!stage || !stage.removeEventListener) return;
    try {
      stage.removeEventListener('touchstart', this._ts);
      stage.removeEventListener('touchend', this._tg);
      stage.removeEventListener('mousedown', this._ts);
      stage.removeEventListener('mouseup', this._tg);
    } catch (e) {}
    this._ts = this._tg = null;
  },

  inspectCentered: function () {
    if (this._centered) this.inspect(this._centered);
  },

  // ---- inspection + decisions ----

  inspect: function (nodeObj) {
    if (!this.active || !nodeObj) return;
    const o = this._byId(nodeObj.scId || nodeObj.key) || nodeObj;
    const locked = o.requires && !this.objectivesDone[o.requires];
    this._inspectObj = o;
    const p = document.getElementById('inspect-panel');
    if (!p) return;
    const title = p.querySelector('.inspect-title');
    const reading = p.querySelector('.inspect-reading');
    const info = p.querySelector('.inspect-info');
    const chWrap = p.querySelector('.inspect-choices');
    const actWrap = p.querySelector('.inspect-actions');
    const name = (o.name && (o.name[currentLang] || o.name.en)) || o.key;
    if (title) title.textContent = name;
    if (locked) {
      const li = (o.lockedInfo && (o.lockedInfo[currentLang] || o.lockedInfo.en)) || '';
      if (reading) { reading.textContent = ''; reading.style.display = 'none'; }
      if (info) { info.textContent = li; info.style.display = li ? 'block' : 'none'; }
      if (chWrap) { chWrap.innerHTML = ''; chWrap.style.display = 'none'; }
      if (actWrap) { actWrap.innerHTML = ''; actWrap.style.display = 'none'; }
    } else {
      const ins = o.inspect || {};
      const rd = (ins.reading && (ins.reading[currentLang] || ins.reading.en)) || '';
      const inf = (ins.info && (ins.info[currentLang] || ins.info.en)) || '';
      if (reading) { reading.textContent = rd; reading.style.display = rd ? 'block' : 'none'; }
      if (info) { info.textContent = inf; info.style.display = inf ? 'block' : 'none'; }
      const dec = o.decision;
      if (dec) this._decideT0 = (typeof nowMs === 'function') ? nowMs() : Date.now();
      if (chWrap) {
        if (dec && dec.choices && dec.choices.length > 1) {
          chWrap.innerHTML = '';
          chWrap.style.display = 'block';
          const q = document.createElement('div');
          q.className = 'inspect-q';
          q.textContent = (dec.question && (dec.question[currentLang] || dec.question.en)) || '';
          chWrap.appendChild(q);
          const self = this;
          dec.choices.forEach(function (ch) {
            const b = document.createElement('button');
            b.className = 'choice-row';
            b.textContent = (ch.text && (ch.text[currentLang] || ch.text.en)) || ch.id;
            b.addEventListener('click', function () { self.decide(o.id, ch.id); });
            chWrap.appendChild(b);
          });
        } else { chWrap.innerHTML = ''; chWrap.style.display = 'none'; }
      }
      if (actWrap) {
        actWrap.innerHTML = '';
        if (dec && dec.choices && dec.choices.length === 1) {
          const b = document.createElement('button');
          b.className = 'action-btn';
          b.textContent = (dec.choices[0].text && (dec.choices[0].text[currentLang] || dec.choices[0].text.en)) || 'OK';
          const self = this;
          b.addEventListener('click', function () { self.decide(o.id, dec.choices[0].id); });
          actWrap.appendChild(b);
          actWrap.style.display = 'block';
        } else { actWrap.style.display = 'none'; }
      }
      if (!this.inspected[o.id]) {
        this.inspected[o.id] = true;
        if (o.completes) this.completeObjective(o.completes);
        this._renderHUD();
      }
    }
    p.classList.add('active');
    try {
      let say = name + '. ';
      if (locked) say += ((o.lockedInfo && (o.lockedInfo[currentLang] || o.lockedInfo.en)) || '');
      else {
        if (reading && reading.style.display !== 'none') say += reading.textContent + '. ';
        if (info && info.style.display !== 'none') say += info.textContent;
      }
      TTSEngine.speak(say);
    } catch (e) {}
  },

  closeInspect: function () {
    const p = document.getElementById('inspect-panel');
    if (p) p.classList.remove('active');
    this._inspectObj = null;
  },

  decide: function (objId, choiceId) {
    if (!this.active) return;
    const o = this._byId(objId);
    if (!o || !o.decision) return;
    const ch = o.decision.choices.find(function (c) { return c.id === choiceId; });
    if (!ch) return;
    const t0 = this._decideT0 || this.startTime;
    this.decisions.push({ obj: objId, choice: choiceId, correct: !!ch.correct, secs: Math.max(0, Math.round((((typeof nowMs === 'function') ? nowMs() : Date.now()) - t0) / 1000)) });
    if (ch.correct) {
      if (ch.completes) this.completeObjective(ch.completes);
      if (ch.alarm) this._setAlarm(true);
      this.closeInspect();
      this._renderHUD();
      if (this.isComplete()) { this.finish(); return; }
      try { TTSEngine.speak(t('sc_correct')); } catch (e) {}
    } else {
      this.mistakes++;
      this.closeInspect();
      this._renderHUD();
      const cons = ch.consequence || { title: { en: 'Wrong call' }, explanation: { en: 'That was not the safe choice.' } };
      setConsequence({
        title: { en: cons.title[currentLang] || cons.title.en, hi: cons.title.hi || cons.title.en, sat: cons.title.sat || cons.title.en },
        explanation: { en: cons.explanation[currentLang] || cons.explanation.en, hi: cons.explanation.hi || cons.explanation.en, sat: cons.explanation.sat || cons.explanation.en }
      });
      navigateTo('screen-consequence');
    }
  },

  completeObjective: function (id) {
    this.objectivesDone[id] = true;
    this._renderHUD();
  },

  objectivesTotal: function () {
    return this.def ? this.def.objectives.length : 0;
  },

  objectivesDoneCount: function () {
    const self = this;
    return this.def ? this.def.objectives.filter(function (o) { return self.objectivesDone[o.id]; }).length : 0;
  },

  isComplete: function () {
    return this.def && this.objectivesDoneCount() >= this.def.objectives.length;
  },

  _setAlarm: function (on) {
    this.alarmOn = !!on;
    try {
      const stage = document.querySelector('.ar-stage');
      if (stage) stage.classList.toggle('danger-pulse', !!on);
    } catch (e) {}
    try { Sfx.setAlarm(!!on, 1); } catch (e) {}
  },

  _hidePrompt: function () {
    const bar = document.getElementById('look-prompt');
    if (bar) bar.classList.remove('active');
  },

  _renderHUD: function () {
    const hud = document.getElementById('scenario-hud');
    if (hud && this.def) {
      const mod = (typeof TRAINING_MODULES !== 'undefined' && TRAINING_MODULES[this.moduleId]) ? TRAINING_MODULES[this.moduleId] : null;
      const mname = mod ? t(mod.titleKey) : this.moduleId;
      const obj = this.def.objective[currentLang] || this.def.objective.en;
      hud.innerHTML = '<div class="sc-mod">' + mname + '</div>'
        + '<div class="sc-obj">' + obj + '</div>'
        + '<div class="sc-prog">' + this.objectivesDoneCount() + '/' + this.objectivesTotal() + ' ' + t('sc_objectives') + '</div>';
    }
  },

  // ---- finish + debrief ----

  finish: function () {
    if (!this.active) return;
    const self = this;
    if (typeof sessionScore !== 'undefined') sessionScore = Math.max(50, 96 - 12 * this.mistakes);
    this.decisions.forEach(function (d) {
      const tag = self.moduleId.replace('mod', '') + '-SC-' + d.obj + '-' + d.choice;
      if (d.correct) {
        if (typeof sessionResponseTimes !== 'undefined') sessionResponseTimes.push(d.secs);
      } else {
        if (typeof wrongTurnsInSession !== 'undefined' && wrongTurnsInSession.indexOf(tag) === -1) {
          wrongTurnsInSession.push(tag);
        }
        if (typeof sessionResponseTimes !== 'undefined') sessionResponseTimes.push(d.secs);
      }
    });
    try { Sfx.setAlarm(false); } catch (e) {}
    this._populateDebrief();
    navigateTo('screen-debrief');
  },

  getDebrief: function () {
    const noticed = [], missed = [];
    const self = this;
    this.def.objects.forEach(function (o) {
      if (o.role === 'distractor') return;
      const nm = (o.name && (o.name[currentLang] || o.name.en)) || o.key;
      if (self.inspected[o.id]) noticed.push(nm);
      else missed.push(nm);
    });
    return {
      noticed: noticed,
      missed: missed,
      decisions: this.decisions.slice(),
      mistakes: this.mistakes,
      secs: Math.max(0, Math.round((((typeof nowMs === 'function') ? nowMs() : Date.now()) - this.startTime) / 1000)),
      explanation: this.def.debrief[currentLang] || this.def.debrief.en
    };
  },

  _populateDebrief: function () {
    const d = this.getDebrief();
    const set = function (id, txt) { const el = document.getElementById(id); if (el) el.textContent = txt; };
    const list = function (id, arr) {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = arr.length ? arr.map(function (x) { return '<li>' + x + '</li>'; }).join('') : '<li>—</li>';
    };
    set('debrief-time', Math.floor(d.secs / 60) + ':' + String(d.secs % 60).padStart(2, '0'));
    set('debrief-mistakes', String(d.mistakes));
    set('debrief-expl', d.explanation);
    list('debrief-noticed', d.noticed);
    list('debrief-missed', d.missed);
    const dl = document.getElementById('debrief-decisions');
    if (dl) {
      dl.innerHTML = d.decisions.length ? d.decisions.map(function (x) {
        const o = this._byId(x.obj);
        const onm = o ? ((o.name && (o.name[currentLang] || o.name.en)) || o.id) : x.obj;
        let ctxt = x.choice;
        if (o && o.decision) {
          const ch = o.decision.choices.find(function (c) { return c.id === x.choice; });
          if (ch) ctxt = (ch.text && (ch.text[currentLang] || ch.text.en)) || x.choice;
        }
        return '<li class="' + (x.correct ? 'ok' : 'bad') + '">' + (x.correct ? '✓ ' : '✗ ') + onm + ' — ' + ctxt + '</li>';
      }, this).join('') : '<li>—</li>';
    }
  }
};
