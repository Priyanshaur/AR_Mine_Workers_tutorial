// SafetyLens AR — Directional scenario sound effects (offline, synthesized).
//
// No audio assets: everything is generated with WebAudio. A gas hiss pans +
// swells as you face the leak (directional cue, StereoPanner fallback to plain
// gain). An alarm loop and soft water drips layer on top during emergencies.
// Master output always respects TTSEngine mute state.

const Sfx = {
  _ctx: null,
  _master: null,
  _hissGain: null,
  _hissPan: null,
  _alarmOsc: null,
  _alarmGain: null,
  _alarmTimer: null,
  _dripTimer: null,
  _enabled: true,

  _ensure: function () {
    if (this._ctx) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    try {
      this._ctx = new AC();
      this._master = this._ctx.createGain();
      this._master.gain.value = 1;
      this._master.connect(this._ctx.destination);
    } catch (e) { this._ctx = null; return false; }
    return true;
  },

  _muted: function () {
    if (!this._enabled) return true;
    try { return (typeof TTSEngine !== 'undefined' && !TTSEngine.enabled); }
    catch (e) { return false; }
  },

  setEnabled: function (on) {
    this._enabled = !!on;
    if (!this._enabled) this.stopAll(true);
  },

  _noiseBuffer: function () {
    const len = this._ctx.sampleRate * 2;
    const buf = this._ctx.createBuffer(1, len, this._ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  },

  // Continuous leak hiss. relDeg: bearing of leak relative to view (0 = ahead).
  // proximity: 0..1 (1 = centred on the source).
  startHiss: function () {
    if (!this._ensure() || this._hissGain) return;
    try {
      const src = this._ctx.createBufferSource();
      src.buffer = this._noiseBuffer();
      src.loop = true;
      const bp = this._ctx.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = 4500; bp.Q.value = 0.8;
      this._hissGain = this._ctx.createGain();
      this._hissGain.gain.value = 0;
      src.connect(bp);
      if (typeof this._ctx.createStereoPanner === 'function') {
        this._hissPan = this._ctx.createStereoPanner();
        bp.connect(this._hissPan);
        this._hissPan.connect(this._hissGain);
      } else {
        bp.connect(this._hissGain);
      }
      this._hissGain.connect(this._master);
      src.start();
      this._hissSrc = src;
    } catch (e) { this._hissGain = null; }
  },

  updateHiss: function (relDeg, proximity) {
    if (!this._hissGain || !this._ctx) return;
    const t = this._ctx.currentTime;
    const prox = Math.max(0, Math.min(1, proximity || 0));
    const vol = this._muted() ? 0 : (0.008 + prox * 0.075);
    this._hissGain.gain.setTargetAtTime(vol, t, 0.25);
    if (this._hissPan) {
      const rad = (relDeg || 0) * Math.PI / 180;
      this._hissPan.pan.setTargetAtTime(Math.max(-1, Math.min(1, Math.sin(rad))), t, 0.25);
    }
  },

  stopHiss: function () {
    try { if (this._hissSrc) this._hissSrc.stop(); } catch (e) {}
    this._hissSrc = null; this._hissGain = null; this._hissPan = null;
  },

  // Two-tone emergency alarm loop. loud01 scales it 0..1.
  setAlarm: function (on, loud01) {
    if (!this._ensure()) return;
    if (!on || this._muted()) {
      if (!on) this._alarmOff();
      else if (this._alarmGain && this._ctx) this._alarmGain.gain.setTargetAtTime(0, this._ctx.currentTime, 0.3);
      return;
    }
    if (this._alarmOsc) {
      this._alarmGain.gain.setTargetAtTime(0.05 + 0.11 * (loud01 == null ? 1 : loud01), this._ctx.currentTime, 0.4);
      return;
    }
    try {
      const osc = this._ctx.createOscillator();
      osc.type = 'square'; osc.frequency.value = 620;
      const g = this._ctx.createGain(); g.gain.value = 0;
      osc.connect(g); g.connect(this._master);
      osc.start();
      this._alarmOsc = osc; this._alarmGain = g;
      const self = this;
      let hi = false;
      this._alarmTimer = setInterval(function () {
        if (!self._alarmOsc) return;
        hi = !hi;
        try { self._alarmOsc.frequency.setValueAtTime(hi ? 830 : 620, self._ctx.currentTime); } catch (e) {}
      }, 450);
      g.gain.setTargetAtTime(0.05 + 0.11 * (loud01 == null ? 1 : loud01), this._ctx.currentTime, 0.4);
    } catch (e) { this._alarmOsc = null; }
  },

  _alarmOff: function () {
    if (this._alarmTimer) { clearInterval(this._alarmTimer); this._alarmTimer = null; }
    try { if (this._alarmOsc) this._alarmOsc.stop(); } catch (e) {}
    this._alarmOsc = null; this._alarmGain = null;
  },

  // Very quiet water drips (gas scenario ambience).
  startDrips: function () {
    if (!this._ensure() || this._dripTimer) return;
    const self = this;
    this._dripTimer = setInterval(function () {
      if (self._muted() || !self._ctx) return;
      try {
        const o = self._ctx.createOscillator();
        const g = self._ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(1400 + Math.random() * 900, self._ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(500, self._ctx.currentTime + 0.09);
        g.gain.setValueAtTime(0.035, self._ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, self._ctx.currentTime + 0.12);
        o.connect(g); g.connect(self._master);
        o.start(); o.stop(self._ctx.currentTime + 0.14);
      } catch (e) {}
    }, 3400);
  },

  stopAll: function (keepCtx) {
    this.stopHiss();
    this._alarmOff();
    if (this._dripTimer) { clearInterval(this._dripTimer); this._dripTimer = null; }
    if (!keepCtx && this._ctx) {
      try { this._ctx.close(); } catch (e) {}
      this._ctx = null; this._master = null;
    }
  }
};
