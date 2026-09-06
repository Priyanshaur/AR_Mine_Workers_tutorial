// SafetyLens AR — Persistent store.
// Two modes:
//   'local'    → offline localStorage (default; no backend). Seeded demo data.
//   'firebase' → Firestore + Auth with built-in offline persistence. Realtime
//                listeners feed an in-memory cache so the synchronous read API
//                (used by the dashboard) keeps working. Writes queue locally and
//                sync when connectivity returns.
// Enabled by setting window.FIREBASE_CONFIG.ENABLED = true.

const SLStore = (function () {
  const KEY = 'safetylens_v1';
  let mode = 'local';
  let state = null;   // in firebase mode this is the cached, synced view
  let fb = null;      // { app, db, auth }
  let unsubs = [];

  function uid(p) { return (p || 'x') + Date.now().toString(36); }
  function today() { return new Date().toISOString().slice(0, 10); }

  // ── localStorage helpers ──────────────────────────────────────────────────
  function loadLocal() {
    try { const raw = localStorage.getItem(KEY); state = raw ? JSON.parse(raw) : null; }
    catch (e) { state = null; }
    if (!state) { state = seed(); saveLocal(); }
    return state;
  }
  function saveLocal() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function seed() {
    return {
      clans: [
        { id: 'clan-mine3', name: 'Mine Site 3 — Joda' },
        { id: 'clan-steel', name: 'Steel Plant Unit B' }
      ],
      users: [
        { username: 'admin', password: 'safety123', role: 'admin', name: 'Anil Kumar', clanId: 'clan-mine3' },
        { username: 'sup', password: 'safety123', role: 'admin', name: 'Meena Kumari', clanId: 'clan-steel' }
      ],
      workers: [
        { id: 'w1', name: 'Ramesh Kumar', clanId: 'clan-mine3', joined: '2026-01-12' },
        { id: 'w2', name: 'Sita Devi', clanId: 'clan-mine3', joined: '2026-02-03' },
        { id: 'w3', name: 'Manoj Tirkey', clanId: 'clan-mine3', joined: '2026-02-18' },
        { id: 'w4', name: 'Phool Mati', clanId: 'clan-steel', joined: '2026-01-25' }
      ],
      results: [
        { id: 'r1', workerId: 'w1', moduleId: 'mod1', score: 96, ts: '2026-08-20', path: 'Correct on first attempt', mistakes: 0, seconds: 95, skillKeys: ['gas_detect','explosive_limits','scba_use','confined_entry'] },
        { id: 'r2', workerId: 'w1', moduleId: 'mod2', score: 84, ts: '2026-08-28', path: 'Corrected after: 21A', mistakes: 1, seconds: 122, skillKeys: ['electrical_fire','extinguisher_class','vent_control','conveyor_ops'] },
        { id: 'r3', workerId: 'w2', moduleId: 'mod1', score: 78, ts: '2026-08-06', path: 'Corrected after: 11A, 12C', mistakes: 2, seconds: 150, skillKeys: ['gas_detect','explosive_limits','scba_use','confined_entry'] },
        { id: 'r4', workerId: 'w3', moduleId: 'mod1', score: 90, ts: '2026-08-12', path: 'Correct on first attempt', mistakes: 0, seconds: 88, skillKeys: ['gas_detect','explosive_limits','scba_use','confined_entry'] },
        { id: 'r5', workerId: 'w4', moduleId: 'mod2', score: 88, ts: '2026-08-15', path: 'Correct on first attempt', mistakes: 0, seconds: 102, skillKeys: ['electrical_fire','extinguisher_class','vent_control','conveyor_ops'] }
      ],
      session: null
    };
  }

  // ── Firebase init (lazy) ──────────────────────────────────────────────────
  function firebaseAvailable() { return typeof window.firebase !== 'undefined' && typeof window.firebase.initializeApp === 'function'; }

  function loadFirebaseBundle() {
    return new Promise((resolve) => {
      if (firebaseAvailable()) return resolve(true);
      let settled = false;
      const done = (v) => { if (!settled) { settled = true; resolve(v); } };
      const s = document.createElement('script');
      s.src = 'js/firebase-bundle.js';
      s.onload = () => done(true);
      s.onerror = () => done(false);
      document.head.appendChild(s);
      // never hang the app: fall back to local if the bundle doesn't load
      setTimeout(() => done(false), 8000);
    });
  }

  function subscribe() {
    const db = fb.db;
    unsubs.push(db.collection('clans').onSnapshot(snap => { state.clans = snap.docs.map(d => ({ id: d.id, ...d.data() })); }));
    unsubs.push(db.collection('workers').onSnapshot(snap => { state.workers = snap.docs.map(d => ({ id: d.id, ...d.data() })); }));
    unsubs.push(db.collection('certificates').onSnapshot(snap => {
      state.results = snap.docs.map(d => { const x = { id: d.id, ...d.data() }; x.workerId = x.workerId || x.worker_id; return x; });
    }));
  }

  function initFirebase(cfg) {
    mode = 'firebase';
    const f = window.firebase;
    const app = f.initializeApp({ apiKey: cfg.apiKey, authDomain: cfg.authDomain, projectId: cfg.projectId, storageBucket: cfg.storageBucket, messagingSenderId: cfg.messagingSenderId, appId: cfg.appId });
    const db = f.firestore(app);
    const auth = f.auth(app);
    fb = { app: app, db: db, auth: auth };
    state = { clans: [], users: [], workers: [], results: [], session: null };

    // Offline persistence: writes queue locally and sync when back online.
    db.enablePersistence({ synchronizeTabs: true }).catch(() => {}).then(() => { subscribe(); });
    // Keep session in sync with the signed-in user.
    auth.onAuthStateChanged(user => {
      if (user) {
        const uidv = user.uid;
        db.collection('workers').doc(uidv).get().then(d => {
          if (d.exists) {
            const w = { id: d.id, ...d.data() };
            state.session = { role: 'worker', username: w.name, name: w.name, clanId: w.clanId, workerId: w.id };
          }
        }).catch(() => {});
      } else { state.session = null; }
    });
  }

  function init() {
    const cfg = window.FIREBASE_CONFIG || {};
    if (cfg.ENABLED) {
      loadFirebaseBundle().then(ok => {
        if (ok && firebaseAvailable()) { try { initFirebase(cfg); return; } catch (e) { console.warn('Firebase init failed → local fallback:', e); } }
        initLocal();
      });
      return;
    }
    initLocal();
  }
  function initLocal() { mode = 'local'; state = loadLocal(); }

  // ── Public API ─────────────────────────────────────────────────────────────
  return {
    init: init,
    mode: function () { return mode; },
    getState: function () { return state; },

    listClans: function () { return state ? state.clans : []; },
    getClan: function (id) { return (state ? state.clans : []).find(c => c.id === id) || null; },

    listWorkers: function (clanId) { return (state ? state.workers : []).filter(w => w.clanId === clanId); },
    workerById: function (id) { return (state ? state.workers : []).find(w => w.id === id) || null; },
    addWorker: function (name, clanId) {
      const w = { id: uid('w'), name: name.trim(), clanId: clanId, joined: today() };
      if (mode === 'firebase' && fb) { fb.db.collection('workers').doc(w.id).set(w); }
      state.workers.push(w); if (mode === 'local') saveLocal();
      return w;
    },

    // ── auth ────────────────────────────────────────────────────────────────
    loginAdmin: function (username, password) {
      if (!state) { initLocal(); }
      if (mode === 'firebase' && fb) {
        return fb.auth.signInWithEmailAndPassword(username, password).then(res => {
          const uidv = res.user.uid;
          return fb.db.collection('clans').where('adminUid', '==', uidv).get().then(q => {
            const clan = q.docs.length ? q.docs[0] : null;
            const user = { role: 'admin', username: username, name: username, clanId: clan ? clan.id : null };
            state.session = user;
            return { ok: !!clan, user: user };
          });
        }).catch(() => ({ ok: false }));
      }
      const user = state.users.find(u => u.username === username && u.password === password && u.role === 'admin');
      if (!user) return { ok: false };
      state.session = { role: 'admin', username: user.username, name: user.name, clanId: user.clanId };
      if (mode === 'local') saveLocal();
      return { ok: true, user: state.session };
    },

    loginWorker: function (name, clanId) {
      if (!state) { initLocal(); }
      const trimmed = (name || '').trim();
      if (!trimmed) return Promise ? Promise.resolve({ ok: false, reason: 'name' }) : { ok: false, reason: 'name' };
      if (mode === 'firebase' && fb) {
        return fb.auth.signInAnonymously().then(res => {
          const uidv = res.user.uid;
          const w = { id: uidv, name: trimmed, clanId: clanId, joined: today() };
          fb.db.collection('workers').doc(uidv).set(w);
          state.session = { role: 'worker', username: trimmed, name: trimmed, clanId: clanId, workerId: uidv };
          if (mode === 'local') saveLocal();
          return { ok: true, user: state.session };
        }).catch(() => ({ ok: false }));
      }
      let w = state.workers.find(x => x.clanId === clanId && x.name.toLowerCase() === trimmed.toLowerCase());
      if (!w) w = this.addWorker(trimmed, clanId);
      state.session = { role: 'worker', username: w.name, name: w.name, clanId: clanId, workerId: w.id };
      saveLocal();
      return { ok: true, user: state.session };
    },

    logout: function () {
      if (mode === 'firebase' && fb) { try { fb.auth.signOut(); } catch (e) {} }
      state.session = null;
      if (mode === 'local') saveLocal();
    },
    currentUser: function () { return state ? state.session : null; },

    // ── results ─────────────────────────────────────────────────────────────
    saveResult: function (rec) {
      const r = Object.assign({ id: uid('r'), ts: today() }, rec);
      if (mode === 'firebase' && fb) { const ref = fb.db.collection('certificates').doc(r.id); ref.set(r); }
      else { state.results.push(r); saveLocal(); }
      return r;
    },
    listResults: function (workerId) { return (state ? state.results : []).filter(r => r.workerId === workerId); },
    listClanResults: function (clanId) {
      const ids = (state ? state.workers : []).filter(w => w.clanId === clanId).map(w => w.id);
      return (state ? state.results : []).filter(r => ids.indexOf(r.workerId) !== -1);
    },
    latestResult: function (workerId) {
      const rs = this.listResults(workerId).sort((a, b) => (b.ts || '').localeCompare(a.ts || ''));
      return rs[0] || null;
    }
  };
})();
