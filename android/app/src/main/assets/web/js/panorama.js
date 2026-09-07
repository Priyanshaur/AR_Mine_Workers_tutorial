// SafetyLens AR — Parallax Mine Panorama Engine
//
// Replaces the live camera feed with a per-module 3D-feel mine scene: three
// tileable depth layers (far / mid / near) panning at different speeds for
// parallax depth, plus a condition overlay (gas haze, fire glow, dust, arc
// flashes), drifting fog and condition particles. No WebGL / ARCore needed,
// so it runs on any mid-range Android phone and looks identical everywhere.
//
// Rotation uses the same orientation signal as the hazard objects, so the
// background and the objects stay in sync. Touch-drag pans the scene on
// devices without sensors (same condition as the chain fallback layout).

window.SLPano = window.SLPano || { yaw: 0, live: false, dragDeg: 0 };

const Panorama = {
  TILE_W: 720,
  TILE_H: 320,
  PX: { far: 0.6, mid: 1.3, near: 2.6 }, // px shift per degree of yaw
  DRAG_K: 0.35, // degrees of pan per px of touch drag

  sceneId: null,
  _active: false,
  _raf: null,
  _handler: null,
  _yaw: 0,
  _base: null,
  _live: false,
  _drag: 0,
  _touchX: null,
  _stage: null,
  _els: null,
  _pctx: null,
  _parts: [],
  _mode: null,

  // ---- tileable tunnel geometry (shared by all scenes; conditions tint it) ----

  _farSVG: function () {
    let dots = '', halos = '';
    for (let x = 60; x < 720; x += 120) {
      dots += '<circle cx="' + x + '" cy="118" r="4" fill="#ffd9a0"/>';
      halos += '<circle cx="' + x + '" cy="118" r="13" fill="#ffd9a0" opacity="0.16"/>';
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="320" viewBox="0 0 720 320">'
      + '<defs><linearGradient id="w" x1="0" y1="0" x2="0" y2="1">'
      + '<stop offset="0" stop-color="#04060a"/><stop offset="0.45" stop-color="#0d1117"/><stop offset="1" stop-color="#06080b"/>'
      + '</linearGradient></defs>'
      + '<rect width="720" height="320" fill="url(#w)"/>'
      + '<rect y="36" width="720" height="4" fill="#1c222c"/>'
      + '<rect y="40" width="720" height="200" fill="#11141a" opacity="0.6"/>'
      + halos + dots
      + '<rect y="272" width="720" height="48" fill="#07080a"/></svg>';
  },

  _midSVG: function () {
    let posts = '', ticks = '';
    for (let c = 90; c < 720; c += 180) {
      posts += '<rect x="' + (c - 13) + '" y="26" width="26" height="254" fill="#241b12"/>'
        + '<rect x="' + (c - 13) + '" y="26" width="5" height="254" fill="#4d3d28"/>';
    }
    for (let x = 45; x < 720; x += 90) {
      ticks += '<rect x="' + x + '" y="272" width="6" height="20" fill="#0d0f12"/>';
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="320" viewBox="0 0 720 320">'
      + '<rect y="60" width="720" height="120" fill="#101319" opacity="0.55"/>'
      + posts
      + '<rect y="26" width="720" height="26" fill="#241b12"/>'
      + '<rect y="26" width="720" height="4" fill="#4d3d28"/>'
      + '<rect y="148" width="720" height="4" fill="#0e1114"/>'
      + '<rect y="196" width="720" height="15" fill="#1a1e24"/>'
      + '<rect y="196" width="720" height="3" fill="#3a434e"/>'
      + '<rect y="268" width="720" height="52" fill="#0b0d10"/>'
      + ticks + '</svg>';
  },

  _nearSVG: function () {
    let rubble = '';
    [72, 216, 360, 504, 648].forEach(function (x) {
      rubble += '<polygon points="' + x + ',292 ' + (x + 34) + ',284 ' + (x + 22) + ',306" fill="#0c0e11"/>';
    });
    return '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="320" viewBox="0 0 720 320">'
      + '<rect x="-24" y="0" width="72" height="320" fill="#171008"/>'
      + '<rect x="672" y="0" width="72" height="320" fill="#171008"/>'
      + '<rect x="44" y="0" width="5" height="320" fill="#3d2f1e"/>'
      + '<rect x="671" y="0" width="5" height="320" fill="#3d2f1e"/>'
      + '<path d="M -10,46 Q 360,150 730,46" fill="none" stroke="#0b0d10" stroke-width="7"/>'
      + '<rect y="290" width="720" height="30" fill="#14171b"/>'
      + '<rect y="290" width="720" height="3" fill="#2c333c"/>'
      + rubble
      + '<radialGradient id="v" cx="0.5" cy="0.5" r="0.75">'
      + '<stop offset="0.55" stop-color="#000" stop-opacity="0"/>'
      + '<stop offset="1" stop-color="#000" stop-opacity="0.55"/></radialGradient>'
      + '<rect width="720" height="320" fill="url(#v)"/></svg>';
  },

  _uri: function (svg) {
    return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
  },

  // ---- per-module conditions ----

  SCENES: {
    mod0: { fog: 'fog-clean', flicker: 'flick-none', particles: 'dust', count: 8 },
    mod1: { fog: 'fog-gas', flicker: 'flick-soft', particles: 'gas', count: 18 },
    mod2: { fog: 'fog-fire', flicker: 'flick-hard', particles: 'smoke', count: 16, embers: true },
    mod3: { fog: 'fog-dust', flicker: 'flick-soft', particles: 'dust', count: 22 },
    mod4: { fog: 'fog-arc', flicker: 'flick-arc', particles: 'rain', count: 40 },
    mod5: { fog: 'fog-road', flicker: 'flick-none', particles: 'dust', count: 26 }
  },

  _sceneFor: function (id) {
    return this.SCENES[id] || this.SCENES.mod0;
  },

  // ---- lifecycle ----

  init: function (sceneId) {
    if (this._active && this.sceneId === sceneId) return;
    this.destroy();
    this.sceneId = sceneId;
    const scene = this._sceneFor(sceneId);

    this._els = {
      far: document.getElementById('pano-far'),
      mid: document.getElementById('pano-mid'),
      near: document.getElementById('pano-near'),
      fog: document.getElementById('pano-fog'),
      flicker: document.getElementById('pano-flicker'),
      canvas: document.getElementById('pano-particles')
    };
    if (this._els.far) this._els.far.style.backgroundImage = this._uri(this._farSVG());
    if (this._els.mid) this._els.mid.style.backgroundImage = this._uri(this._midSVG());
    if (this._els.near) this._els.near.style.backgroundImage = this._uri(this._nearSVG());
    if (this._els.fog) this._els.fog.className = 'pano-fog ' + scene.fog;
    if (this._els.flicker) this._els.flicker.className = 'pano-flicker ' + scene.flicker;

    this._mode = scene.particles;
    this._seedParticles(scene.count || 0, !!scene.embers);

    this._yaw = 0; this._base = null; this._live = false; this._drag = 0;
    this._syncShared();
    this._attachOrientation();
    this._attachTouch();
    this._active = true;
    this.update();
    const self = this;
    this._raf = requestAnimationFrame(function () { self._loop(); });
  },

  destroy: function () {
    this._active = false;
    this.sceneId = null;
    if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
    if (this._handler) { window.removeEventListener('deviceorientation', this._handler, true); this._handler = null; }
    if (this._stage) {
      try {
        this._stage.removeEventListener('touchstart', this._ts);
        this._stage.removeEventListener('touchmove', this._tm);
        this._stage.removeEventListener('touchend', this._te);
      } catch (e) {}
      this._stage = null;
    }
    if (this._els) {
      if (this._els.far) this._els.far.style.backgroundImage = '';
      if (this._els.mid) this._els.mid.style.backgroundImage = '';
      if (this._els.near) this._els.near.style.backgroundImage = '';
      if (this._els.fog) this._els.fog.className = 'pano-fog';
      if (this._els.flicker) this._els.flicker.className = 'pano-flicker';
      if (this._pctx && this._els.canvas) this._pctx.clearRect(0, 0, this._els.canvas.width, this._els.canvas.height);
    }
    this._els = null;
    this._parts = [];
    this._pctx = null;
    window.SLPano = { yaw: 0, live: false, dragDeg: 0 };
  },

  // ---- input: orientation + touch drag (drag only when sensors are dead) ----

  _attachOrientation: function () {
    const self = this;
    const handler = function (e) {
      const raw = (e.webkitCompassHeading != null) ? e.webkitCompassHeading : (e.alpha || 0);
      if (typeof raw !== 'number' || !isFinite(raw)) return;
      if (self._base === null) self._base = raw;
      self._yaw = ((raw - self._base) % 360 + 360) % 360;
      self._live = true;
      self._syncShared();
    };
    if (typeof DeviceOrientationEvent !== 'undefined') {
      window.addEventListener('deviceorientation', handler, true);
      self._handler = handler;
    }
  },

  _attachTouch: function () {
    const self = this;
    const stage = document.querySelector('.ar-stage');
    if (!stage || !stage.addEventListener) return;
    this._stage = stage;
    this._ts = function (e) {
      const t = e.touches && e.touches[0];
      if (t) self._touchX = t.clientX;
    };
    this._tm = function (e) {
      const t = e.touches && e.touches[0];
      if (t == null || self._touchX == null) return;
      if (e.cancelable !== false) { try { e.preventDefault(); } catch (err) {} }
      // drag pans the scene only when orientation is dead (mirrors chain fallback)
      if (!self._live) {
        self._drag = ((self._drag - (t.clientX - self._touchX) * self.DRAG_K) % 360 + 360) % 360;
        self._syncShared();
      }
      self._touchX = t.clientX;
    };
    this._te = function () { self._touchX = null; };
    stage.addEventListener('touchstart', this._ts, { passive: true });
    stage.addEventListener('touchmove', this._tm, { passive: false });
    stage.addEventListener('touchend', this._te);
  },

  _syncShared: function () {
    window.SLPano = { yaw: this._live ? this._yaw : this._drag, live: this._live, dragDeg: this._drag };
  },

  // ---- per-frame ----

  _wrapPx: function (x) {
    return ((x % this.TILE_W) + this.TILE_W) % this.TILE_W;
  },

  update: function () {
    if (!this._els) return;
    const yaw = this._live ? this._yaw : this._drag;
    if (this._els.far) this._els.far.style.backgroundPositionX = this._wrapPx(-(yaw * this.PX.far)) + 'px';
    if (this._els.mid) this._els.mid.style.backgroundPositionX = this._wrapPx(-(yaw * this.PX.mid)) + 'px';
    if (this._els.near) this._els.near.style.backgroundPositionX = this._wrapPx(-(yaw * this.PX.near)) + 'px';
    this._syncShared();
    this._drawParticles();
  },

  _loop: function () {
    if (!this._active) return;
    const self = this;
    this.update();
    this._raf = requestAnimationFrame(function () { self._loop(); });
  },

  // ---- condition particles ----

  _seedParticles: function (count, embers) {
    this._parts = [];
    const c = this._els && this._els.canvas;
    if (!c) return;
    c.width = c.clientWidth || 390;
    c.height = c.clientHeight || 420;
    this._pctx = c.getContext('2d');
    const w = c.width, h = c.height;
    for (let i = 0; i < count; i++) {
      this._parts.push({ x: Math.random() * w, y: Math.random() * h, r: 0, vx: 0, vy: 0, a: 0, seed: Math.random() });
    }
    if (embers) {
      for (let i = 0; i < 14; i++) {
        this._parts.push({ x: Math.random() * w, y: Math.random() * h, r: 0, vx: 0, vy: 0, a: 0, seed: Math.random(), ember: true });
      }
    }
  },

  _drawParticles: function () {
    const ctx = this._pctx, c = this._els && this._els.canvas;
    if (!ctx || !c) return;
    const w = c.width, h = c.height, mode = this._mode;
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < this._parts.length; i++) {
      const p = this._parts[i];
      if (p.ember) {
        p.y -= 1.6 + p.seed; p.x += Math.sin((p.y + i * 40) / 22) * 0.7;
        p.a = 0.35 + 0.4 * Math.abs(Math.sin(p.y / 9 + p.seed * 7));
        if (p.y < -6) { p.y = h + 6; p.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4 + p.seed * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = (i % 2 ? 'rgba(255,140,50,' : 'rgba(255,82,51,') + p.a.toFixed(2) + ')';
        ctx.fill();
        continue;
      }
      if (mode === 'gas') {
        p.y -= 0.28 + p.seed * 0.25; p.x += Math.sin((p.y + i * 55) / 40) * 0.5;
        p.a = 0.10 + 0.10 * Math.abs(Math.sin(p.y / 60 + p.seed * 5));
        if (p.y < -20) { p.y = h + 20; p.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 7 + p.seed * 9, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(190,220,120,' + p.a.toFixed(2) + ')';
        ctx.fill();
      } else if (mode === 'smoke') {
        p.y -= 1.0 + p.seed * 0.6; p.x += Math.sin((p.y + i * 30) / 30) * 0.6;
        p.a = 0.16 + 0.10 * p.seed;
        if (p.y < -24) { p.y = h + 24; p.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 9 + p.seed * 12, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(125,125,130,' + p.a.toFixed(2) + ')';
        ctx.fill();
      } else if (mode === 'rain') {
        p.y += 6.5 + p.seed * 2.5; p.x -= 1.1;
        if (p.y > h + 14) { p.y = -14; p.x = Math.random() * (w + 40); }
        ctx.beginPath();
        ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + 1.6, p.y + 12);
        ctx.strokeStyle = 'rgba(170,200,255,0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else { // dust (also used lightly for clean/road scenes)
        p.x += 0.25 + p.seed * 0.35; p.y -= 0.12;
        p.a = 0.10 + 0.10 * p.seed;
        if (p.x > w + 12) { p.x = -12; p.y = Math.random() * h; }
        if (p.y < -12) { p.y = h + 12; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5 + p.seed * 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(190,170,140,' + p.a.toFixed(2) + ')';
        ctx.fill();
      }
    }
  }
};
