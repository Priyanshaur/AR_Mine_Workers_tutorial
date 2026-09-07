// SafetyLens AR — Multi-object AR Search Engine (used by every module step)
// Several animated virtual objects are placed in the camera view. The worker pans
// to locate the correct one, then selects it. Includes smoothing, a live scout
// readout (name + direction), a focus reticle, a forgiving pick zone, a spatial
// "walk" gate for far objects, and a static fallback layout for non-orientation
// devices so nothing ever overlaps or stalls.

const CHAIN_SPRITES = {
  cylinder:    '<svg viewBox="0 0 120 170"><g stroke="#0F1214" stroke-width="2" stroke-linejoin="round"><path d="M52 24 h16 v16 h-16 z" fill="#868D93"/><rect x="48" y="40" width="5" height="8" fill="#FF5233"/><rect x="40" y="50" width="40" height="102" rx="15" fill="#4FE3C1"/><rect x="40" y="96" width="40" height="22" fill="#FFB020"/><rect x="46" y="60" width="28" height="13" rx="2" fill="#0F1214"/></g></svg>',
  valve:       '<svg viewBox="0 0 120 170"><g stroke="#0F1214" stroke-width="2" stroke-linejoin="round"><rect x="6" y="78" width="108" height="16" fill="#868D93"/><rect x="54" y="66" width="12" height="34" fill="#868D93"/><circle cx="60" cy="50" r="15" fill="#FF5233"/><circle cx="60" cy="50" r="5" fill="#F4F2EC"/></g></svg>',
  monitor:     '<svg viewBox="0 0 120 170"><g stroke="#0F1214" stroke-width="2" stroke-linejoin="round"><rect x="22" y="34" width="76" height="72" rx="7" fill="#171B1E"/><rect x="30" y="44" width="60" height="32" rx="3" fill="#0F1214"/><text x="60" y="66" fill="#FF5233" font-family="monospace" font-size="18" font-weight="bold" text-anchor="middle">LEL</text><circle cx="36" cy="99" r="5" fill="#FF5233"/><circle cx="60" cy="99" r="5" fill="#FFB020"/><circle cx="84" cy="99" r="5" fill="#3ECF8E"/></g></svg>',
  motor:       '<svg viewBox="0 0 120 170"><g stroke="#0F1214" stroke-width="2" stroke-linejoin="round"><rect x="20" y="66" width="64" height="44" rx="11" fill="#4FE3C1"/><path d="M34 70 v36 M56 70 v36 M78 70 v36" stroke="#2A3034" stroke-width="2"/><rect x="84" y="74" width="20" height="28" fill="#868D93"/><rect x="104" y="80" width="12" height="16" fill="#FFB020"/><path d="M30 124 h40" stroke="#868D93" stroke-width="4"/></g></svg>',
  extinguisher:'<svg viewBox="0 0 120 170"><g stroke="#0F1214" stroke-width="2" stroke-linejoin="round"><path d="M40 56 h40 v74 a20 20 0 0 1 -40 0 z" fill="#FF5233"/><rect x="42" y="46" width="36" height="14" rx="3" fill="#FFB020"/><path d="M78 60 q22 8 8 26" fill="none" stroke="#F4F2EC" stroke-width="4"/><rect x="46" y="108" width="28" height="10" rx="2" fill="#0F1214"/></g></svg>',
  door:        '<svg viewBox="0 0 120 170"><g stroke="#0F1214" stroke-width="2" stroke-linejoin="round"><rect x="28" y="28" width="64" height="112" fill="#4FE3C1"/><path d="M28 28 l64 112 M28 140 l64 -112" stroke="#2A3034" stroke-width="2"/><rect x="80" y="82" width="9" height="9" fill="#FFB020"/><rect x="28" y="28" width="64" height="8" fill="#FFB020"/></g></svg>',
  towel_damp:  '<svg viewBox="0 0 120 90"><g stroke="#0F1214" stroke-width="2"><rect x="12" y="18" width="96" height="54" rx="10" fill="#4FE3C1"/><path d="M12 30 q24 10 48 0 t48 0" stroke="#126b57" stroke-width="3" fill="none"/><path d="M12 44 q24 8 48 0 t48 0" stroke="#126b57" stroke-width="3" fill="none"/><rect x="12" y="72" width="96" height="6" fill="#FFB020"/></g></svg>',
  towel_dry:   '<svg viewBox="0 0 120 90"><g stroke="#0F1214" stroke-width="2"><rect x="12" y="18" width="96" height="54" rx="10" fill="#F4F2EC"/><path d="M12 38 h96 M12 54 h96" stroke="#868D93" stroke-width="3" fill="none"/><rect x="12" y="72" width="96" height="6" fill="#868D93"/></g></svg>',
  bucket:      '<svg viewBox="0 0 120 90"><g stroke="#0F1214" stroke-width="2"><path d="M22 28 h76 l-8 46 h-60 z" fill="#FFB020"/><path d="M34 44 h52" stroke="#1a1400" stroke-width="2"/><path d="M30 30 l-14 -10 M90 30 l14 -10" stroke="#868D93" stroke-width="4"/></g></svg>',
  torch:       '<svg viewBox="0 0 120 90"><g stroke="#0F1214" stroke-width="2"><rect x="20" y="40" width="70" height="18" rx="6" fill="#868D93"/><rect x="90" y="36" width="18" height="26" rx="3" fill="#FF5233"/><path d="M98 30 q4 -8 0 -14" stroke="#FFB020" stroke-width="3"/></g></svg>',
  wrench:      '<svg viewBox="0 0 120 90"><g stroke="#0F1214" stroke-width="2" fill="none"><path d="M28 18 a16 16 0 1 1 6 22 l40 40 a8 8 0 1 1 -12 12 l-40 -40 a16 16 0 0 1 -22 -6" fill="#868D93" stroke="#0F1214"/></g></svg>',
  hands:       '<svg viewBox="0 0 120 90"><g stroke="#0F1214" stroke-width="2" fill="#F4F2EC"><path d="M30 50 q0 -20 16 -20 q16 0 16 20 v6 q14 8 16 24 h-64 q2 -16 16 -24 z"/><path d="M46 30 v20 M62 30 v20" stroke="#0F1214" stroke-width="2"/></g></svg>',
  truck:       '<svg viewBox="0 0 120 90"><g stroke="#0F1214" stroke-width="2"><rect x="8" y="26" width="70" height="24" fill="#FFB020"/><path d="M44 26 l10 -14 h30 v14" fill="#868D93"/><rect x="80" y="38" width="28" height="22" fill="#868D93"/><circle cx="24" cy="62" r="12" fill="#0F1214"/><circle cx="88" cy="62" r="12" fill="#0F1214"/><circle cx="24" cy="62" r="4" fill="#868D93"/><circle cx="88" cy="62" r="4" fill="#868D93"/></g></svg>',
  switch:      '<svg viewBox="0 0 120 90"><g stroke="#0F1214" stroke-width="2"><rect x="26" y="18" width="68" height="54" rx="6" fill="#171B1E"/><rect x="38" y="30" width="44" height="14" rx="3" fill="#FF5233"/><path d="M60 44 l0 -20" stroke="#F4F2EC" stroke-width="4"/><rect x="48" y="62" width="12" height="14" rx="3" fill="#FFB020"/></g></svg>',
  panel:       '<svg viewBox="0 0 120 90"><g stroke="#0F1214" stroke-width="2"><rect x="20" y="14" width="80" height="64" rx="6" fill="#171B1E"/><rect x="30" y="24" width="34" height="20" rx="3" fill="#0F1214"/><rect x="70" y="24" width="20" height="20" rx="3" fill="#FF5233"/><circle cx="42" cy="62" r="5" fill="#FFB020"/><circle cx="62" cy="62" r="5" fill="#3ECF8E"/></g></svg>',
  loto:        '<svg viewBox="0 0 120 90"><g stroke="#0F1214" stroke-width="2"><path d="M40 40 v-8 a12 12 0 0 1 24 0 v8" fill="none" stroke="#FFB020" stroke-width="5"/><rect x="30" y="40" width="44" height="30" rx="5" fill="#F4F2EC"/><circle cx="52" cy="55" r="4" fill="#0F1214"/><rect x="52" y="55" width="4" height="14" fill="#868D93"/></g></svg>',
  gloves:      '<svg viewBox="0 0 120 90"><g stroke="#0F1214" stroke-width="2" fill="#4FE3C1"><path d="M28 30 h12 v30 a8 8 0 0 1 -12 0 z"/><path d="M44 26 h10 v52 a10 10 0 0 1 -10 10 z"/><path d="M60 26 h10 v30 a10 10 0 0 1 -20 0 v-24 z"/><path d="M74 32 h10 v20 a10 10 0 0 1 -20 0 z"/></g></svg>',
  vest:        '<svg viewBox="0 0 120 90"><g stroke="#0F1214" stroke-width="2"><path d="M40 14 h40 l4 20 8 34 -18 14 -8 -24 -8 24 -18 -14 8 -34 z" fill="#FFB020"/><path d="M48 24 h24" stroke="#1a1400" stroke-width="4"/></g></svg>',
  guard:       '<svg viewBox="0 0 120 90"><g stroke="#0F1214" stroke-width="2"><rect x="20" y="16" width="80" height="58" rx="6" fill="#868D93"/><path d="M20 38 h80 M20 52 h80" stroke="#0F1214" stroke-width="3"/><path d="M40 16 v58 M60 16 v58 M80 16 v58" stroke="#0F1214" stroke-width="3"/></g></svg>',
  sign:        '<svg viewBox="0 0 120 90"><g stroke="#0F1214" stroke-width="2"><path d="M60 10 l40 70 h-80 z" fill="#FFB020"/><path d="M60 34 v16 M60 60 v0.4" stroke="#1a1400" stroke-width="5"/></g></svg>',
  fan:         '<svg viewBox="0 0 120 90"><g stroke="#0F1214" stroke-width="2"><circle cx="60" cy="44" r="26" fill="#1a2027"/><path d="M60 44 m0 -18 a18 18 0 0 1 15 9 l-15 9 z" fill="#868D93"/><path d="M60 44 m15 9 a18 18 0 0 1 -7 16 l-8 -16 z" fill="#868D93"/><path d="M60 44 m-8 16 a18 18 0 0 1 -8 -16 l16 -8 z" fill="#868D93"/><circle cx="60" cy="44" r="5" fill="#FFB020"/><path d="M42 70 h36 M48 70 v14 M72 70 v14" stroke="#0F1214" stroke-width="3" fill="none"/></g></svg>',
  phone:       '<svg viewBox="0 0 120 90"><g stroke="#0F1214" stroke-width="2"><rect x="38" y="14" width="44" height="58" rx="6" fill="#FF5233"/><rect x="46" y="24" width="28" height="10" rx="2" fill="#F4F2EC"/><circle cx="60" cy="52" r="9" fill="none" stroke="#F4F2EC" stroke-width="4"/><path d="M60 78 v8 M52 86 h16" stroke="#0F1214" stroke-width="3"/></g></svg>',
  crate:       '<svg viewBox="0 0 120 90"><g stroke="#0F1214" stroke-width="2"><rect x="26" y="28" width="68" height="44" rx="3" fill="#4d3d28"/><path d="M26 42 h68 M26 58 h68 M48 28 v44 M72 28 v44" stroke="#241b12" stroke-width="4"/></g></svg>',
  worker:      '<svg viewBox="0 0 120 90"><g stroke="#0F1214" stroke-width="2"><circle cx="60" cy="30" r="12" fill="#c9a06a"/><path d="M44 28 a16 16 0 0 1 32 0 l-3 4 h-26 z" fill="#FFB020"/><path d="M38 84 c2 -16 10 -24 22 -24 s20 8 22 24 z" fill="#4FE3C1"/></g></svg>'
};

const DEG = Math.PI / 180;

const ChainEngine = {
  el: null,
  nodes: null,
  focusIndex: 0,
  _handler: null,
  _currentBearing: 0,
  _initialBearing: null,
  _currentPitch: 0,
  _initialPitchBeta: null,
  _orientationLive: false,
  _active: false,
  _callbacks: null,
  _raf: null,
  _smooth: [],
  _smoothY: [],
  _smoothS: [],
  // First-person pinhole projection. Half-angles of the viewport frustum in
  // degrees; objects outside it are clipped/faded instead of laid on a strip.
  HFOV: 70,
  VFOV: 52,

  start: function (containerId, nodeObjects, callbacks, opts) {
    this.stop();
    this.nodes = nodeObjects;
    this._callbacks = callbacks || {};
    this._currentBearing = 0;
    this._initialBearing = null;
    this._currentPitch = 0;
    this._initialPitchBeta = null;
    this._orientationLive = false;
    this._active = true;
    this._firedFocus = false;
    this._lookKey = null;
    opts = opts || {};

    // Randomise object placement each run so the correct one isn't in a fixed
    // spot — unless the caller needs fixed scenario bearings (opts.fixed).
    if (!opts.fixed) {
      const offsets = nodeObjects.map(o => o.offset || 0);
      for (let i = offsets.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = offsets[i]; offsets[i] = offsets[j]; offsets[j] = tmp;
      }
      nodeObjects.forEach((o, i) => { o.offset = offsets[i]; });
    }
    // Give every candidate a stable 3D placement (bearing, distance, height) so
    // the projection has something real to work with. `el` (elevation, deg) and
    // `far` already exist; fill any not-yet-authored values deterministically so
    // the label distance and the projected size agree.
    nodeObjects.forEach((o, i) => {
      if (o.el == null || !isFinite(o.el)) o.el = this._elevForKey(o.key, i);
      if (o.dist == null || !isFinite(o.dist)) o.dist = parseFloat(this._distFor(o.key)) + (o.far ? 2.2 : 0);
    });
    this._smooth = nodeObjects.map(() => 50);
    this._smoothY = nodeObjects.map(() => 50);
    this._smoothS = nodeObjects.map(() => 1);

    const cont = document.getElementById(containerId);
    this.el = cont;
    if (cont) {
      cont.innerHTML = nodeObjects.map((o, i) =>
        `<button class="chain-obj" data-index="${i}" data-correct="${o.correct ? '1' : '0'}" data-key="${o.key}" style="left:50%;top:50%;">
           <div class="chain-obj-inner">${CHAIN_SPRITES[o.key] || ''}<div class="chain-obj-name">${this._labelFor(o)}</div></div>
         </button>`).join('');
      cont.querySelectorAll('.chain-obj').forEach(btn => {
        btn.addEventListener('click', () => this._select(btn));
      });
    }

    this._attachOrientation();
    this._raf = requestAnimationFrame(() => this._render(true));
  },

  recenter: function () {
    this._initialBearing = null;
    this._initialPitchBeta = null;
    this._currentPitch = 0;
    this._orientationLive = false;
    if (this.nodes) { this._smooth = this.nodes.map(() => 50); this._smoothY = this.nodes.map(() => 50); this._smoothS = this.nodes.map(() => 1); }
  },

  stop: function () {
    this._active = false;
    this._firedFocus = false;
    if (this._handler) { window.removeEventListener('deviceorientation', this._handler, true); this._handler = null; }
    if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
    if (this.el) { this.el.innerHTML = ''; this.el = null; }
  },

  _attachOrientation: function () {
    const self = this;
    const handler = function (e) {
      const raw = (e.webkitCompassHeading != null) ? e.webkitCompassHeading : (e.alpha || 0);
      if (typeof raw !== 'number' || !isFinite(raw)) return;
      self._currentBearing = raw;
      if (self._initialBearing === null) { self._initialBearing = raw; self._smooth = self.nodes.map(() => 50); }
      // Pitch (look up/down): tilting the top of an upright phone away drops
      // beta below its initial value, i.e. positive pitch = looking up.
      // Clamped to ±30° to avoid motion sickness and edge chasing.
      const beta = (typeof e.beta === 'number' && isFinite(e.beta)) ? e.beta : null;
      if (beta !== null) {
        if (self._initialPitchBeta === null) self._initialPitchBeta = beta;
        self._currentPitch = Math.max(-30, Math.min(30, self._initialPitchBeta - beta));
      }
      self._orientationLive = true;
    };
    if (typeof DeviceOrientationEvent !== 'undefined') {
      window.addEventListener('deviceorientation', handler, true);
      self._handler = handler;
    }
  },

  _deltaFor: function (offset) {
    if (this._initialBearing === null) return 0;
    const target = (this._initialBearing + offset) % 360;
    let d = target - this._currentBearing;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    return d;
  },

  // Relative pitch (deg, + = looking up) minus object elevation.
  _pitchDeltaFor: function (o) {
    return this._currentPitch - ((o && o.el) || 0);
  },

  // 2D angular distance (deg) between view centre and object. Focus/pick use
  // this; yaw-only callers (scout arrow, legacy steps) keep working.
  _angDist: function (o) {
    const dy = this._deltaFor(o.offset || 0);
    const dp = this._pitchDeltaFor(o);
    return Math.sqrt(dy * dy + dp * dp);
  },

  // Current first-person view for panorama/scenario consumers.
  getView: function () {
    return { yaw: this._currentBearing, pitch: this._currentPitch, live: this._orientationLive };
  },

  _slotFor: function (i, n) {
    return ((i + 0.5) / n) * 100;
  },

  // Stable pseudo-distance per object (1.5–4.6 m) for the floating "name — X m"
  // label, so each hazard reads as sitting at a fixed spot in the room.
  _distFor: function (key) {
    let h = 0;
    const s = String(key || '');
    for (let i = 0; i < s.length; i++) { h = ((h * 31) + s.charCodeAt(i)) >>> 0; }
    return (1.5 + (h % 32) / 10).toFixed(1);
  },

  _labelFor: function (o) {
    const name = (o.name && (o.name[currentLang] || o.name.en)) || o.key;
    const d = (o.dist != null && isFinite(o.dist)) ? o.dist.toFixed(1) : this._distFor(o.key);
    return name + ' — ' + d + ' m';
  },

  // Deterministic default elevation (deg, + = up) per key so objects that never
  // authored an `el` still scatter across vertical space instead of one line.
  _elevForKey: function (key, i) {
    let h = 0;
    const s = String(key || '');
    for (let k = 0; k < s.length; k++) h = ((h * 31) + s.charCodeAt(k)) >>> 0;
    return Math.round((h % 21) - 10);
  },

  // Simplified first-person pinhole projection. Given an object's fixed bearing
  // (offset), distance (dist) and elevation (el) plus the current view
  // yaw/pitch, returns viewport coords (%), a scale factor, an edge fade (1 in
  // frame → 0 at the frustum edge) and whether it's visibly in the frustum.
  _project: function (o) {
    const tanHF = Math.tan(this.HFOV / 2 * DEG);
    const tanVF = Math.tan(this.VFOV / 2 * DEG);
    const d = this._deltaFor(o.offset || 0);             // signed yaw offset (deg, + right)
    // Vertical offset of the object above the view axis (deg, + = object higher).
    const dup = ((o && o.el) || 0) - this._currentPitch;
    // Clamp to ±90° so tan() never flips sign / blows up for objects behind
    // the viewer; those are reported as out-of-frame and hidden.
    const yaw = Math.max(-90, Math.min(90, d));
    const up = Math.max(-90, Math.min(90, dup));
    const nx = Math.tan(yaw * DEG) / tanHF;
    const ny = Math.tan(up * DEG) / tanVF;
    const x = 50 + nx * 50;                              // + right → screen right
    const y = 50 - ny * 50;                              // object above → screen up
    const dist = o.dist || 2.5;
    // Apparent size falls off with distance and grows smoothly as the object
    // nears the reticle, instead of a two-step near/far toggle.
    const centered = Math.sqrt(nx * nx + ny * ny);
    const closeness = Math.max(0, 1 - centered / 1.4);
    let scale = (2.4 / dist) * (0.72 + closeness * 0.5);
    scale = Math.max(0.62, Math.min(1.35, scale));
    // Fade as the object approaches the frustum edge; hide once past it/behind.
    const edge = Math.max(Math.abs(nx), Math.abs(ny));
    const fade = Math.max(0, Math.min(1, (1.15 - edge) / 0.25));
    const inView = edge <= 1.0 && Math.abs(d) <= 90 && Math.abs(dup) <= 90;
    return { x: x, y: y, scale: scale, fade: fade, inView: inView };
  },

  _render: function (first) {
    if (!this._active) return;
    this._raf = requestAnimationFrame(() => this._render());
    if (!this.el) return;

    const live = this._orientationLive;
    let best = 0, bestAbs = Infinity;
    let viewBest = -1, viewBestAbs = Infinity;
    const btns = this.el.querySelectorAll('.chain-obj');

    // Touch-drag pitch shared with the panorama (fallback mode only).
    const dragPdeg = (window.SLPano && typeof window.SLPano.dragPitch === 'number') ? window.SLPano.dragPitch : 0;
    this.nodes.forEach((o, i) => {
      const dist = live ? this._angDist(o) : 0;
      if (dist < bestAbs) { bestAbs = dist; best = i; }
      const b = btns[i];
      if (!b) return;
      let targetX, targetY, scale, fade = 1;
      const baseY = (o.far ? 55 : 50);
      if (live) {
        // First-person projection: a fixed bearing/distance/height point that
        // swings past as the camera rotates, not a strip item sliding left/right.
        const p = this._project(o);
        targetX = p.x;
        targetY = p.y;
        scale = p.scale;
        fade = p.inView ? p.fade : 0;
        if (p.inView && dist < viewBestAbs) { viewBestAbs = dist; viewBest = i; }
        if (!p.inView) { b.style.display = 'none'; return; }
        if (b.style.display === 'none') b.style.display = '';
      } else {
        // touch-drag pans background + objects together (shared SLPano state)
        var dragP = (window.SLPano && typeof window.SLPano.dragDeg === 'number') ? (window.SLPano.dragDeg / 360) * 100 : 0;
        targetX = ((this._slotFor(i, this.nodes.length) - dragP) % 100 + 100) % 100;
        targetY = Math.max(8, Math.min(92, baseY + dragPdeg * 0.9));
        scale = 1;
        if (b.style.display === 'none') b.style.display = '';
      }
      // smooth so objects glide instead of snapping
      this._smooth[i] += (targetX - this._smooth[i]) * (first ? 1 : 0.22);
      this._smoothY[i] += (targetY - this._smoothY[i]) * (first ? 1 : 0.22);
      this._smoothS[i] += (scale - this._smoothS[i]) * (first ? 1 : 0.22);
      const s = this._smooth[i];
      const sy = this._smoothY[i];
      const ss = this._smoothS[i];
      const near = live && dist <= 12;
      b.style.left = s + '%';
      b.style.top = sy + '%';
      b.style.transform = 'translate(-50%,-50%) scale(' + ss + ')';
      b.style.opacity = live ? fade : '';
      b.style.zIndex = near ? 5 : 1;
      b.classList.toggle('focused', live ? near : false);
    });
    this.focusIndex = viewBest >= 0 ? viewBest : best;

    // Look-targeting for scenario mode: notify once per centred-object change
    // (live mode only; fallback keeps direct tap-to-inspect).
    const lookObj = (live && viewBest >= 0) ? this.nodes[viewBest] : null;
    const lookKey = lookObj ? ('i' + viewBest) : 'none';
    if (lookKey !== this._lookKey) {
      this._lookKey = lookKey;
      if (this._callbacks && this._callbacks.onLook) this._callbacks.onLook(lookObj);
    }

    // Nudge the worker to TAP once an object is first centred (guided onboarding)
    if (live && !this._firedFocus) {
      for (let k = 0; k < btns.length; k++) {
        if (btns[k] && btns[k].classList.contains('focused')) {
          this._firedFocus = true;
          if (this._callbacks && this._callbacks.onFirstFocus) this._callbacks.onFirstFocus();
          break;
        }
      }
    }

    // Scout readout: name + direction of the nearest object (helps identification & tracking)
    const scout = document.getElementById('chain-scout');
    if (scout) {
      if (live && bestAbs !== Infinity) {
        const o = this.nodes[best];
        const d = this._deltaFor(o.offset || 0);
        const name = (o.name && (o.name[currentLang] || o.name.en)) || o.key;
        scout.textContent = d >= 0 ? (name + ' →  ' + Math.round(Math.abs(d)) + '°') : (name + ' ←  ' + Math.round(Math.abs(d)) + '°');
        scout.classList.add('active');
      } else {
        scout.classList.remove('active');
      }
    }
  },

  _select: function (btn) {
    if (!this._active) return;
    const idx = Number(btn.getAttribute('data-index'));
    const o = this.nodes[idx];
    if (!o) return;
    // Forgiving pick: in live mode you must have centred the object within 26°;
    // otherwise pan toward it. In static fallback any object can be tapped.
    if (this._orientationLive) {
      if (this._angDist(o) > 26) { if (this._callbacks.onWrongFocus) this._callbacks.onWrongFocus(o); return; }
    }
    if (o.far) {
      btn.classList.add('approaching');
      this._approachGate(btn, () => this._found(btn, o));
    } else {
      this._found(btn, o);
    }
  },

  _approachGate: function (btn, onDone) {
    if (!this._callbacks.onApproach) { onDone(); return; }
    this._callbacks.onApproach(() => {
      btn.classList.remove('approaching');
      onDone();
    });
  },

  _found: function (btn, o) {
    btn.classList.add('found');
    btn.classList.remove('focused', 'approaching');
    if (o.correct) {
      if (this._callbacks.onFound) this._callbacks.onFound(o);
    } else {
      if (this._callbacks.onWrong) this._callbacks.onWrong(o);
    }
  }
};
