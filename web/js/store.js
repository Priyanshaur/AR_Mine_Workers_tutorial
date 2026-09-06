// SafetyLens AR — Offline persistent store (localStorage)
// Roles (admin/worker), clan/group structure, worker roster, and per-worker
// training results. No backend — completely offline, matching the app design.

const SLStore = (function () {
  const KEY = 'safetylens_v1';
  let state = null;

  function load() {
    if (state) return state;
    try { const raw = localStorage.getItem(KEY); state = raw ? JSON.parse(raw) : null; }
    catch (e) { state = null; }
    if (!state) { state = seed(); save(); }
    return state;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  function seed() {
    return {
      clans: [
        { id: 'clan-mine3', name: 'Mine Site 3 — Joda' },
        { id: 'clan-steel', name: 'Steel Plant Unit B' }
      ],
      users: [
        { username: 'admin',  password: 'safety123', role: 'admin', name: 'Anil Kumar',   clanId: 'clan-mine3' },
        { username: 'sup',    password: 'safety123', role: 'admin', name: 'Meena Kumari', clanId: 'clan-steel' }
      ],
      workers: [
        { id: 'w1', name: 'Ramesh Kumar',  clanId: 'clan-mine3', joined: '2026-01-12' },
        { id: 'w2', name: 'Sita Devi',     clanId: 'clan-mine3', joined: '2026-02-03' },
        { id: 'w3', name: 'Manoj Tirkey',  clanId: 'clan-mine3', joined: '2026-02-18' },
        { id: 'w4', name: 'Phool Mati',    clanId: 'clan-steel', joined: '2026-01-25' }
      ],
      results: [
        { id: 'r1', workerId: 'w1', moduleId: 'mod1', score: 96, ts: '2026-08-20', path: 'Correct on first attempt', skillKeys: ['gas_detect','explosive_limits','scba_use','confined_entry'] },
        { id: 'r2', workerId: 'w1', moduleId: 'mod2', score: 84, ts: '2026-08-28', path: 'Corrected after: 21A', skillKeys: ['electrical_fire','extinguisher_class','vent_control','conveyor_ops'] },
        { id: 'r3', workerId: 'w2', moduleId: 'mod1', score: 78, ts: '2026-08-06', path: 'Corrected after: 11A, 12C', skillKeys: ['gas_detect','explosive_limits','scba_use','confined_entry'] },
        { id: 'r4', workerId: 'w3', moduleId: 'mod1', score: 90, ts: '2026-08-12', path: 'Correct on first attempt', skillKeys: ['gas_detect','explosive_limits','scba_use','confined_entry'] },
        { id: 'r5', workerId: 'w4', moduleId: 'mod2', score: 88, ts: '2026-08-15', path: 'Correct on first attempt', skillKeys: ['electrical_fire','extinguisher_class','vent_control','conveyor_ops'] }
      ],
      session: null
    };
  }

  function uid(p) { return (p || 'x') + Date.now().toString(36); }

  return {
    init: function () { load(); },

    // ── clans ─────────────────────────────────────────────
    listClans: function () { load(); return state.clans; },
    getClan: function (id) { load(); return state.clans.find(c => c.id === id) || null; },

    // ── workers ───────────────────────────────────────────
    listWorkers: function (clanId) { load(); return state.workers.filter(w => w.clanId === clanId); },
    workerById: function (id) { load(); return state.workers.find(w => w.id === id) || null; },
    addWorker: function (name, clanId) {
      load();
      const w = { id: uid('w'), name: name.trim(), clanId: clanId, joined: new Date().toISOString().slice(0,10) };
      state.workers.push(w); save(); return w;
    },

    // ── sessions / auth ───────────────────────────────────
    loginAdmin: function (username, password) {
      load();
      const user = state.users.find(u => u.username === username && u.password === password && u.role === 'admin');
      if (!user) return { ok: false };
      state.session = { role: 'admin', username: user.username, name: user.name, clanId: user.clanId };
      save(); return { ok: true, user: state.session };
    },
    loginWorker: function (name, clanId) {
      load();
      const trimmed = (name || '').trim();
      if (!trimmed) return { ok: false, reason: 'name' };
      let w = state.workers.find(x => x.clanId === clanId && x.name.toLowerCase() === trimmed.toLowerCase());
      if (!w) w = this.addWorker(trimmed, clanId);
      state.session = { role: 'worker', username: w.name, name: w.name, clanId: clanId, workerId: w.id };
      save(); return { ok: true, user: state.session };
    },
    logout: function () { load(); state.session = null; save(); },
    currentUser: function () { load(); return state.session; },

    // ── results ───────────────────────────────────────────
    saveResult: function (rec) {
      load();
      const r = Object.assign({ id: uid('r'), ts: new Date().toISOString().slice(0,10) }, rec);
      state.results.push(r); save(); return r;
    },
    listResults: function (workerId) {
      load(); return state.results.filter(r => r.workerId === workerId);
    },
    listClanResults: function (clanId) {
      load();
      const ids = state.workers.filter(w => w.clanId === clanId).map(w => w.id);
      return state.results.filter(r => ids.indexOf(r.workerId) !== -1);
    },
    latestResult: function (workerId) {
      load();
      const rs = state.results.filter(r => r.workerId === workerId).sort((a,b)=>b.ts.localeCompare(a.ts));
      return rs[0] || null;
    }
  };
})();
