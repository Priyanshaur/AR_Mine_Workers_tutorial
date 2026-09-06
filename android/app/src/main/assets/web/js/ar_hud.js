// SafetyLens AR — Embodied AR HUD Engine  (optimised render + orientation + motion)
// Performance fixes: 30fps cap, reduced grid density, hardware-accelerated canvas layer
// Navigation fixes: orientation/motion handlers properly removed on stop()
// Mechanic 4 (new): sequential "find the pseudo-3D object then answer" — object is
//   revealed on bearing-lock and tilts/parallaxes in 3D using the phone's beta/gamma.

const ARHUDEngine = {
  canvas: null,
  ctx: null,
  video: null,
  stream: null,
  animId: null,
  timerInterval: null,
  secondsLeft: 11,
  currentModule: null,
  stepObj: null,
  onTimerExpired: null,

  // Stage 1 scan sweep
  scanSweepY: 0,
  scanComplete: false,

  // Mechanic 1 — Orientation
  orientationSupported: false,
  currentBearing: 0,
  targetBearing: 0,
  initialBearing: null,
  angularDelta: 999,
  reticleVisible: false,
  LOCK_TOLERANCE_DEG: 18,
  _orientationHandler: null,

  // Mechanic 4 — Pseudo-3D object + reveal state
  _revealed: false,
  currentBeta: null,
  currentGamma: null,
  _revealSafetyTimer: null,
  revealTime: null,

  // Pressure system state
  _totalSecs: 11,
  _sirenRunning: false,
  _sirenCtx: null,
  _sirenNodes: null,
  _sirenTimer: null,

  // Render throttle — target 30fps
  _lastFrame: 0,
  FRAME_INTERVAL: 33,  // ms (~30fps)

  // ── init ───────────────────────────────────────────────

  init: function(canvasElem, videoElem, moduleObj, stepObj, onTimerExpiredCallback) {
    this.canvas = canvasElem;
    this.ctx    = canvasElem.getContext('2d');
    this.video  = videoElem;
    this.currentModule = moduleObj;
    this.stepObj = stepObj;
    this.secondsLeft = (stepObj && stepObj.timerSeconds) || (moduleObj.timerSeconds) || 11;
    this.onTimerExpired = onTimerExpiredCallback;

    this.scanSweepY     = 0;
    this.scanComplete   = false;
    this.initialBearing = null;
    this.angularDelta   = 999;
    this.reticleVisible = false;
    this._lastFrame     = 0;
    this._revealed      = false;
    this.currentBeta    = null;
    this.currentGamma   = null;
    this.revealTime     = null;
    this._totalSecs     = this.secondsLeft;
    this._sirenRunning  = false;

    this._stopSiren();
    this._resetRevealUI();
    this._seedTimerDisplay();
    this.resizeCanvas();
    this.startCamera();
    this.startOrientationSensor();
    this.startRenderLoop();
  },

  // Hide object/question/choices until the bearing locks.
  _resetRevealUI: function() {
    const vp = document.getElementById('ar-object-viewport');
    if (vp) { vp.classList.remove('active'); }
    const panel = document.getElementById('choices-container');
    if (panel) { panel.classList.add('locked'); }
  },

  _seedTimerDisplay: function() {
    const display = document.getElementById('alarm-timer-val');
    if (display) display.textContent = `0:${this.secondsLeft.toString().padStart(2,'0')}`;
  },

  resizeCanvas: function() {
    if (!this.canvas) return;
    this.canvas.width  = this.canvas.clientWidth  || 390;
    this.canvas.height = this.canvas.clientHeight || 480;
  },

  // ── Camera — lower resolution for mid-range performance ───

  startCamera: function() {
    const self = this;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment",
        width:  { ideal: 640 },   // was 1280 — halved for mid-range
        height: { ideal: 480 }    // was 720
      }
    }).then(st => {
      self.stream = st;
      if (self.video) {
        self.video.srcObject = st;
        self.video.setAttribute("playsinline", true);
        self.video.play();
      }
    }).catch(err => {
      console.warn("Camera unavailable, running in simulated mode:", err);
      // No crash — grid + reticle still render over black background
    });
  },

  // ── Mechanic 1: DeviceOrientationEvent ────────────────

  startOrientationSensor: function() {
    const self = this;
    const offset = (this.stepObj && this.stepObj.hazardBearingOffset) || 90;

    const handler = function(e) {
      const raw = (e.webkitCompassHeading != null) ? e.webkitCompassHeading : (e.alpha || 0);
      // Ignore non-finite sensor readings (some devices report NaN on cold start)
      if (typeof raw !== 'number' || !isFinite(raw)) return;
      self.currentBearing = raw;
      if (e.beta != null)  self.currentBeta  = e.beta;
      if (e.gamma != null) self.currentGamma = e.gamma;
      if (self.initialBearing === null) {
        self.initialBearing = raw;
        self.targetBearing  = (raw + offset) % 360;
      }
      let delta = self.targetBearing - raw;
      if (delta >  180) delta -= 360;
      if (delta < -180) delta += 360;
      self.angularDelta   = delta;
      self.reticleVisible = Math.abs(delta) <= self.LOCK_TOLERANCE_DEG;
      self._handleLockedReveal();
    };

    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(s => {
          if (s === 'granted') {
            window.addEventListener('deviceorientation', handler, true);
            self._orientationHandler = handler;
            self.orientationSupported = true;
          } else { self._fallbackOrientation(); }
        })
        .catch(() => self._fallbackOrientation());
    } else if (typeof DeviceOrientationEvent !== 'undefined') {
      window.addEventListener('deviceorientation', handler, true);
      this._orientationHandler = handler;
      this.orientationSupported = true;
    } else {
      this._fallbackOrientation();
    }

    // Safety: never let the scene stall if the heading sensor never becomes
    // finite (broken sensor / browser quirk). Auto-reveal after 4s.
    const selfSafe = this;
    if (this._revealSafetyTimer) clearTimeout(this._revealSafetyTimer);
    this._revealSafetyTimer = setTimeout(function() {
      if (!selfSafe._revealed) selfSafe._fallbackOrientation();
    }, 4000);
  },

  _fallbackOrientation: function() {
    this.orientationSupported = false;
    this.reticleVisible       = true;
    this.angularDelta         = 0;
    this.currentBeta          = 34;
    this.currentGamma         = 6;
    this._handleLockedReveal();
  },

  // ── Mechanic 4: reveal the pseudo-3D object once the bearing locks ──

  _handleLockedReveal: function() {
    if (!this.reticleVisible || this._revealed) return;
    this._revealed = true;

    const objKey = (this.stepObj && this.stepObj.objectKey) || 'cylinder';
    const vp = document.getElementById('ar-object-viewport');
    const panel = document.getElementById('choices-container');
    const labelEl = document.getElementById('ar-object-label-val');

    if (vp) { vp.setAttribute('data-object', objKey); vp.classList.add('active'); }
    if (panel) { panel.classList.remove('locked'); }
    if (labelEl) {
      const lbl = (this.stepObj && this.stepObj.objectLabel) ? this.stepObj.objectLabel : {};
      labelEl.textContent = lbl[currentLang] || lbl['en'] || objKey.toUpperCase();
    }

    // Start the countdown only once the object is found (you can't be timed
    // for a question you haven't seen yet).
    this.startTimer();
  },

  // ── Timer countdown (started on reveal) ───────────────

  startTimer: function() {
    const self = this;
    clearInterval(this.timerInterval);
    const display  = document.getElementById('alarm-timer-val');
    const arStage  = document.querySelector('.ar-stage');
    const pWrap    = document.getElementById('alarm-pressure');
    const pFill    = document.getElementById('alarm-pressure-fill');
    if (display) display.textContent = `0:${self.secondsLeft.toString().padStart(2,'0')}`;
    if (arStage)  arStage.classList.remove('danger-pulse', 'critical');
    if (pFill) pFill.style.width = '0%';
    if (pWrap) pWrap.classList.remove('panic');
    this.revealTime = (window.performance && window.performance.now) ? window.performance.now() : Date.now();

    this.timerInterval = setInterval(() => {
      self.secondsLeft--;
      const elapsed = self._totalSecs - self.secondsLeft;
      if (display) display.textContent = `0:${Math.max(0, self.secondsLeft).toString().padStart(2,'0')}`;

      // Pressure gauge ramps with elapsed time
      self._updatePressure(elapsed);

      if (self.secondsLeft <= 5 && arStage) arStage.classList.add('danger-pulse');
      if (self.secondsLeft <= 3) {
        if (arStage) arStage.classList.add('critical');
        self._startSiren();
      }
      if (self.secondsLeft <= 0) {
        clearInterval(self.timerInterval);
        self._stopSiren();
        if (arStage) arStage.classList.remove('danger-pulse', 'critical');
        if (self.onTimerExpired) self.onTimerExpired();
      }
    }, 1000);
  },

  _updatePressure: function(elapsedSecs) {
    const pFill = document.getElementById('alarm-pressure-fill');
    const pWrap = document.getElementById('alarm-pressure');
    if (!pFill) return;
    const total = this._totalSecs || 1;
    const ratio = Math.max(0, Math.min(1, elapsedSecs / total));
    pFill.style.width = Math.round(ratio * 100) + '%';
    if (pWrap) pWrap.classList.toggle('panic', ratio >= 0.66);
  },

  _startSiren: function() {
    if (this._sirenRunning || !TTSEngine.enabled) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      const ctx = new AC();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.value = 640;
      gain.gain.value = 0.045;
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start();
      let up = true;
      const sirenTimer = setInterval(() => { osc.frequency.value = up ? 940 : 620; up = !up; }, 260);
      this._sirenCtx = ctx; this._sirenNodes = osc; this._sirenTimer = sirenTimer;
      this._sirenRunning = true;
    } catch (e) { /* audio unsupported — ignore */ }
  },

  _stopSiren: function() {
    if (!this._sirenRunning) return;
    try { if (this._sirenNodes) this._sirenNodes.stop(); } catch (e) {}
    try { if (this._sirenTimer) clearInterval(this._sirenTimer); } catch (e) {}
    try { if (this._sirenCtx && this._sirenCtx.close) this._sirenCtx.close(); } catch (e) {}
    this._sirenCtx = null; this._sirenNodes = null; this._sirenTimer = null; this._sirenRunning = false;
  },

  // ── Cleanup — ALWAYS called by navigateTo before screen switches ──

  stop: function() {
    // Timer
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    if (this._revealSafetyTimer) { clearTimeout(this._revealSafetyTimer); this._revealSafetyTimer = null; }

    // Render loop
    if (this.animId) { cancelAnimationFrame(this.animId); this.animId = null; }

    // Siren + danger pulse + critical shake
    this._stopSiren();
    const arStage = document.querySelector('.ar-stage');
    if (arStage) arStage.classList.remove('danger-pulse', 'critical');

    // Orientation sensor
    if (this._orientationHandler) {
      window.removeEventListener('deviceorientation', this._orientationHandler, true);
      this._orientationHandler = null;
    }

    // Camera stream — CRITICAL: release track or camera LED stays on
    if (this.stream) {
      this.stream.getTracks().forEach(tr => tr.stop());
      this.stream = null;
    }
    if (this.video) {
      this.video.srcObject = null;
    }

    // Clear canvas so stale frame doesn't show on re-entry
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  },

  // ── Render Loop — 30fps capped ────────────────────────

  startRenderLoop: function() {
    const self = this;
    let spinAngle = 0;
    this._lastFrame = 0;

    function render(timestamp) {
      self.animId = requestAnimationFrame(render);  // schedule first so stop() can cancel

      // Throttle to ~30fps
      if (timestamp - self._lastFrame < self.FRAME_INTERVAL) return;
      self._lastFrame = timestamp;

      if (!self.ctx || !self.canvas) return;
      const w = self.canvas.width;
      const h = self.canvas.height;
      self.ctx.clearRect(0, 0, w, h);

      // ── Stage 1: scan sweep ─────────────────────────────
      if (!self.scanComplete) {
        self.scanSweepY += 6;  // faster sweep at 30fps
        self.ctx.strokeStyle = "rgba(79,227,193,0.8)";
        self.ctx.lineWidth = 2;
        self.ctx.beginPath();
        self.ctx.moveTo(0, self.scanSweepY);
        self.ctx.lineTo(w, self.scanSweepY);
        self.ctx.stroke();
        if (self.scanSweepY >= h) self.scanComplete = true;
      }

      // ── Digital grid — coarser for performance ──────────
      self.ctx.strokeStyle = "rgba(79,227,193,0.08)";
      self.ctx.lineWidth = 1;
      const grid = 56;
      for (let x = 0; x < w; x += grid) {
        self.ctx.beginPath(); self.ctx.moveTo(x,0); self.ctx.lineTo(x,h); self.ctx.stroke();
      }
      for (let y = 0; y < h; y += grid) {
        self.ctx.beginPath(); self.ctx.moveTo(0,y); self.ctx.lineTo(w,y); self.ctx.stroke();
      }

      // ── Corner brackets ─────────────────────────────────
      const cSz = 22, pad = 14;
      self.ctx.strokeStyle = "#4FE3C1";
      self.ctx.lineWidth = 2.5;
      [
        [pad, pad+cSz, pad, pad, pad+cSz, pad],
        [w-pad-cSz, pad, w-pad, pad, w-pad, pad+cSz],
        [pad, h-pad-cSz, pad, h-pad, pad+cSz, h-pad],
        [w-pad-cSz, h-pad, w-pad, h-pad, w-pad, h-pad-cSz]
      ].forEach(([x1,y1,x2,y2,x3,y3]) => {
        self.ctx.beginPath();
        self.ctx.moveTo(x1,y1); self.ctx.lineTo(x2,y2); self.ctx.lineTo(x3,y3);
        self.ctx.stroke();
      });

      // ── Mechanic 1: Reticle or steering arrow ───────────
      spinAngle += 0.04;
      const cx = w * 0.50;
      const cy = h * 0.40;
      const r  = 34;

      if (self.reticleVisible) {
        // Bearing locked — draw full reticle + callout
        self.ctx.save();
        self.ctx.translate(cx, cy);
        self.ctx.strokeStyle = "#4FE3C1";
        self.ctx.lineWidth = 2;
        self.ctx.setLineDash([6,5]);
        self.ctx.beginPath(); self.ctx.arc(0,0,r,0,Math.PI*2); self.ctx.stroke();
        self.ctx.setLineDash([]);
        self.ctx.rotate(spinAngle);
        self.ctx.beginPath();
        self.ctx.moveTo(0,-r-8); self.ctx.lineTo(0,-r+4);
        self.ctx.moveTo(0, r-4); self.ctx.lineTo(0, r+8);
        self.ctx.moveTo(-r-8,0); self.ctx.lineTo(-r+4,0);
        self.ctx.moveTo( r-4,0); self.ctx.lineTo( r+8,0);
        self.ctx.stroke();
        self.ctx.restore();

        // Callout
        const bx = cx+52, by = cy-22;
        self.ctx.strokeStyle = "#4FE3C1"; self.ctx.lineWidth = 1;
        self.ctx.beginPath(); self.ctx.moveTo(cx+r,cy); self.ctx.lineTo(bx,by+16); self.ctx.stroke();
        self.ctx.fillStyle = "rgba(6,10,11,0.92)";
        self.ctx.fillRect(bx,by,155,42); self.ctx.strokeRect(bx,by,155,42);
        self.ctx.fillStyle = "#4FE3C1"; self.ctx.font = "10px 'IBM Plex Mono',monospace";
        self.ctx.fillText(t(self.currentModule.calloutLabelKey), bx+8, by+16);
        self.ctx.fillStyle = "#FFF"; self.ctx.font = "12px 'IBM Plex Mono',monospace";
        self.ctx.fillText(t(self.currentModule.calloutValKey), bx+8, by+34);

        self.ctx.fillStyle = "#3ECF8E"; self.ctx.font = "bold 10px 'IBM Plex Mono',monospace";
        self.ctx.textAlign = "center";
        self.ctx.fillText("● SOURCE LOCKED", cx, cy+r+18);
        self.ctx.textAlign = "left";

      } else if (self.orientationSupported) {
        // Bearing NOT locked — steering arrow
        const delta    = self.angularDelta;
        const absDelta = Math.round(Math.abs(delta));
        const arrow    = delta > 0 ? "→" : "←";
        const label    = delta > 0 ? "PAN RIGHT" : "PAN LEFT";

        // Dim search circle
        self.ctx.save(); self.ctx.translate(cx, cy);
        self.ctx.strokeStyle = "rgba(79,227,193,0.2)"; self.ctx.lineWidth = 2;
        self.ctx.setLineDash([4,6]);
        self.ctx.beginPath(); self.ctx.arc(0,0,r,0,Math.PI*2); self.ctx.stroke();
        self.ctx.setLineDash([]);
        self.ctx.restore();

        self.ctx.textAlign = "center";
        self.ctx.fillStyle = "#FFB020"; self.ctx.font = "bold 34px 'IBM Plex Sans',sans-serif";
        self.ctx.fillText(arrow, cx, cy+12);
        self.ctx.font = "bold 12px 'IBM Plex Mono',monospace";
        self.ctx.fillText(`TURN ${absDelta}° ${label}`, cx, cy+r+22);
        self.ctx.fillStyle = "rgba(244,242,236,0.6)";
        self.ctx.font = "11px 'IBM Plex Sans',sans-serif";
        self.ctx.fillText("Locate the hazard source", cx, cy+r+40);
        self.ctx.textAlign = "left";
      }

      // ── Mechanic 3: Compass minimap ─────────────────────
      self._drawCompass(w, h);

      // ── Mechanic 4: tilt the pseudo-3D object from beta/gamma ──
      self._applyObjectTilt();

      // ── Bottom hint banner ──────────────────────────────
      self.ctx.fillStyle = "rgba(8,8,8,0.80)";
      self.ctx.fillRect(14, h-34, w-28, 24);
      self.ctx.strokeStyle = "#2A3034"; self.ctx.lineWidth = 1;
      self.ctx.strokeRect(14, h-34, w-28, 24);
      self.ctx.fillStyle = "#FFB020"; self.ctx.font = "11px 'IBM Plex Sans',sans-serif";
      self.ctx.textAlign = "center";
      self.ctx.fillText(
        self.reticleVisible ? t('ar_hint_locked') : t('ar_hint_scan'),
        w/2, h-18
      );
      self.ctx.textAlign = "left";
    }

    requestAnimationFrame(render);
  },

  // ── Mechanic 4: pseudo-3D tilting of the revealed object ──

  _applyObjectTilt: function() {
    if (!this._revealed || !this.orientationSupported) return;
    const stage = document.getElementById('ar-object-stage');
    if (!stage) return;

    let yaw  = this.currentGamma || 0;
    let pitch = this.currentBeta;
    if (pitch != null) pitch = pitch - 45;  // neutral-ish tilt baseline
    else pitch = 0;

    // Clamp so the object stays on-screen and looks stable.
    yaw    = Math.max(-30, Math.min(30, yaw));
    pitch  = Math.max(-34, Math.min(34, pitch));

    const scale = 1 + Math.min(0.04, Math.abs(yaw) / 800);
    const tx = (yaw / 30) * 12;      // subtle parallax shift
    const ty = (pitch / 34) * 8;

    stage.style.transform =
      `perspective(560px) translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) ` +
      `rotateX(${pitch.toFixed(1)}deg) rotateY(${yaw.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
  },

  // ── Mechanic 3: Compass minimap ───────────────────────

  _drawCompass: function(w, h) {
    if (!this.orientationSupported) return;
    const ctx = this.ctx;
    const cx = w - 50, cy = 82, r = 30;

    ctx.save();
    ctx.globalAlpha = 0.88;

    // Background
    ctx.fillStyle = "rgba(8,9,10,0.92)";
    ctx.beginPath(); ctx.arc(cx, cy, r+4, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = "#2A3034"; ctx.lineWidth = 1; ctx.stroke();

    // Cardinals
    ctx.fillStyle = "#868D93"; ctx.font = "7px 'IBM Plex Mono',monospace"; ctx.textAlign = "center";
    ctx.fillText("N", cx, cy-r+8);
    ctx.fillText("S", cx, cy+r-1);
    ctx.fillText("W", cx-r+4, cy+3);
    ctx.fillText("E", cx+r-4, cy+3);

    // Target dot (orange = hazard direction)
    const tRad = ((this.targetBearing - this.currentBearing + 360) % 360) * Math.PI / 180;
    ctx.fillStyle = "#FFB020";
    ctx.beginPath();
    ctx.arc(cx + (r-8)*Math.sin(tRad), cy - (r-8)*Math.cos(tRad), 5, 0, Math.PI*2);
    ctx.fill();

    // Current needle (cyan = where phone points — always vertical since canvas rotates with phone)
    ctx.strokeStyle = "#4FE3C1"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy-(r-4)); ctx.stroke();

    // Centre dot
    ctx.fillStyle = "#4FE3C1";
    ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI*2); ctx.fill();

    // Delta label
    const deg = Math.min(Math.abs(Math.round(this.angularDelta)), 180);
    ctx.fillStyle = this.reticleVisible ? "#3ECF8E" : "#FFB020";
    ctx.font = "bold 7px 'IBM Plex Mono',monospace";
    ctx.fillText(this.reticleVisible ? "LOCKED" : `${deg}°`, cx, cy+r+13);

    ctx.globalAlpha = 1;
    ctx.textAlign = "left";
    ctx.restore();
  }
};
