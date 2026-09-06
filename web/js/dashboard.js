// SafetyLens AR — Clan-scoped Admin Readiness Dashboard (offline, store-driven)

const SKILL_RATES = {
  gas_detect: 0.012, explosive_limits: 0.010, scba_use: 0.009, confined_entry: 0.014,
  electrical_fire: 0.011, extinguisher_class: 0.013, vent_control: 0.010, conveyor_ops: 0.012
};
function _daysSince(iso) { try { return Math.max(0, Math.floor((Date.now() - Date.parse(iso)) / 86400000)); } catch (e) { return 0; } }

const DashboardModule = {
  simulatedDays: 0,
  clan: null,
  workers: [],
  selectedWorkerId: null,

  init: function () {
    const user = SLStore.currentUser();
    if (!user || user.role !== 'admin') return;
    this.clan = SLStore.getClan(user.clanId);
    this.workers = SLStore.listWorkers(user.clanId);
    this.simulatedDays = 0;
    this.selectedWorkerId = this.workers.length ? this.workers[0].id : null;
    this.renderClanHeader();
    this.renderKPIs('kpi-strip');
    this.renderWorkerList('dash-worker-list');
    this.renderForSelected();
    this.bindControls();
  },

  renderClanHeader: function () {
    const el = document.getElementById('dash-clan');
    if (el) el.textContent = (this.clan ? this.clan.name : '') + ' · ' + this.workers.length + ' workers';
  },

  renderKPIs: function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    const totalRuns = this.workers.reduce((a, w) => a + SLStore.listResults(w.id).length, 0);
    const latest = this.workers.map(w => SLStore.latestResult(w.id) ? SLStore.latestResult(w.id).score : 80);
    const avg = latest.length ? Math.round(latest.reduce((a, b) => a + b, 0) / latest.length) : 0;
    const atRisk = latest.filter(s => s < 75).length;
    const modules = this.workers.reduce((a, w) => a + new Set((SLStore.listResults(w.id) || []).map(r => r.moduleId)).size, 0);
    const card = (label, val, cls) => `<div class="kpi ${cls || ''}"><div class="kpi-val">${val}</div><div class="kpi-lbl">${label}</div></div>`;
    el.innerHTML = card(t('workers'), this.workers.length, 'cyan')
      + card(t('runs'), totalRuns, '')
      + card(t('avg_ready'), avg, avg<75?'red':(avg<90?'amber':'green'))
      + card(t('at_risk'), atRisk, atRisk>0?'red':'green');
  },

  renderWorkerList: function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    let html = '';
    this.workers.forEach(w => {
      const last = SLStore.latestResult(w.id);
      const score = last ? last.score : 80;
      let cls = 'green'; if (score < 60) cls = 'red'; else if (score < 75) cls = 'amber';
      const sel = w.id === this.selectedWorkerId ? 'selected' : '';
      html += `<button class="chip ${sel}" data-id="${w.id}"><span>${w.name}</span><span class="chip-score ${cls}">${score}</span></button>`;
    });
    el.innerHTML = html;
    el.querySelectorAll('.chip').forEach(chip => chip.addEventListener('click', function () {
      DashboardModule.selectedWorkerId = this.getAttribute('data-id');
      DashboardModule.renderWorkerList('dash-workers');
      DashboardModule.renderForSelected();
    }));
  },

  selectedWorker: function () { return this.workers.find(w => w.id === this.selectedWorkerId) || null; },

  renderForSelected: function () {
    const w = this.selectedWorker();
    if (!w) return;
    this.renderWorkerHead('dash-worker-head', w);
    this.renderModuleResults('dash-mod-results', w);
    const rs = SLStore.listResults(w.id).sort((a,b)=>b.ts.localeCompare(a.ts));
    const last = rs[0] || null;
    const lastScore = last ? last.score : 80;
    const lastTs = last ? last.ts : new Date().toISOString().slice(0,10);
    const days = _daysSince(lastTs);
    const rate = 0.010;
    const skillKeys = (last && last.skillKeys && last.skillKeys.length) ? last.skillKeys
      : (TRAINING_MODULES.mod1 ? TRAINING_MODULES.mod1.skills : []);
    this.renderDecayCurve('decay-line-path','decay-fill-path','decay-marker-dot', lastScore, rate, days, w);
    this.renderSkillPanel('skill-panel', lastScore, skillKeys, days);
  },

  renderWorkerHead: function (id, w) {
    const el = document.getElementById(id);
    if (!el) return;
    const rs = SLStore.listResults(w.id).sort((a,b)=>b.ts.localeCompare(a.ts));
    const last = rs[0] || null;
    const score = last ? last.score : 80;
    let cls = 'green'; if (score < 60) cls = 'red'; else if (score < 75) cls = 'amber';
    const modules = new Set((SLStore.listResults(w.id)||[]).map(r=>r.moduleId)).size;
    el.innerHTML = `<div class="wh-top"><span class="wh-name">${w.name}</span><span class="pill ${cls}">${score}</span></div><div class="wh-meta">${modules} ${t('completed')} · ${t('last_trained')} ${last ? _daysSince(last.ts)+t('days_ago') : '—'}</div>`;
  },

  renderModuleResults: function (id, w) {
    const el = document.getElementById(id);
    if (!el) return;
    const rs = SLStore.listResults(w.id).sort((a,b)=>b.ts.localeCompare(a.ts));
    if (!rs.length) { el.innerHTML = `<div class="ms-none">${t('no_results')}</div>`; return; }
    // group by module, keep best (latest) + aggregate mistakes/time
    const mods = {};
    rs.forEach(r => {
      if (!mods[r.moduleId]) mods[r.moduleId] = { score: r.score, mistakes: 0, secs: 0, tries: 0, ts: r.ts };
      const e = mods[r.moduleId];
      e.tries++; e.mistakes += (r.mistakes || 0); e.secs += (r.seconds || 0); if (r.ts > e.ts) { e.score = r.score; e.ts = r.ts; }
    });
    let html = '';
    Object.keys(mods).forEach(mid => {
      const e = mods[mid];
      const mod = TRAINING_MODULES[mid];
      const name = mod ? t(mod.titleKey) : mid;
      let cls = 'g'; if (e.score < 60) cls = 'r'; else if (e.score < 75) cls = 'a';
      html += `<div class="mod-row"><div class="mr-name">${name}</div><div class="mr-stat"><span class="pill ${cls}">${e.score}</span></div><div class="mr-stat mis">${e.mistakes} ${t('mistakes')}</div><div class="mr-stat time">${e.secs}s${e.tries>1?' ×'+e.tries:''}</div></div>`;
    });
    el.innerHTML = html;
  },

  renderDecayCurve: function (lineId, fillId, markerId, base, rate, baseDays, w) {
    const line = document.getElementById(lineId), fill = document.getElementById(fillId), marker = document.getElementById(markerId);
    if (!line || !fill) return;
    const wpx = 342, h = 150, padL = 30, padR = 10, padT = 10, padB = 20;
    const plotW = wpx - padL - padR, plotH = h - padT - padB, maxDays = 150;
    let pts = [];
    for (let d = 0; d <= maxDays; d += 3) {
      const s = Math.max(0, Math.min(100, base * Math.exp(-rate * d)));
      pts.push(`${(padL + (d/maxDays)*plotW).toFixed(1)},${(padT + plotH - (s/100)*plotH).toFixed(1)}`);
    }
    const lp = 'M ' + pts.join(' L ');
    line.setAttribute('d', lp);
    fill.setAttribute('d', lp + ` L ${padL+plotW},${padT+plotH} L ${padL},${padT+plotH} Z`);
    const curDay = Math.min(maxDays, baseDays + this.simulatedDays);
    const curScore = Math.max(0, Math.min(100, base * Math.exp(-rate * curDay)));
    if (marker) { marker.setAttribute('cx', (padL + (curDay/maxDays)*plotW).toFixed(1)); marker.setAttribute('cy', (padT + plotH - (curScore/100)*plotH).toFixed(1)); }
    // update the chart label to the selected worker
    const label = document.querySelector('.decay-svg text');
    if (label && w) label.textContent = w.name;
  },

  renderSkillPanel: function (id, base, skillKeys, baseDays) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = (skillKeys || []).map(k => {
      const rate = SKILL_RATES[k] !== undefined ? SKILL_RATES[k] : 0.010;
      let v = Math.round(Math.max(10, Math.min(100, base * Math.exp(-rate * (baseDays + this.simulatedDays)))));
      let color = 'linear-gradient(90deg, #3ECF8E, #2fbf7e)';
      if (v < 60) color = 'linear-gradient(90deg, #FF5233, #c7442a)';
      else if (v < 75) color = 'linear-gradient(90deg, #FFB020, #e2a213)';
      return `<div class="skill-row"><div class="skill-row-head"><span class="skill-row-label">${t('skill_'+k)}</span><span class="skill-row-val">${v}</span></div><div class="skill-track"><div class="skill-fill" style="width:${v}%; background:${color};"></div></div></div>`;
    }).join('');
  },

  bindControls: function () {
    const self = this;
    const btn = document.getElementById('sim-90-btn');
    const val = document.getElementById('sim-val-display');
    if (btn) btn.addEventListener('click', function () {
      if (self.simulatedDays === 0) { self.simulatedDays = 90; this.textContent = t('reset_sim_btn'); }
      else { self.simulatedDays = 0; this.textContent = t('sim_90_btn'); }
      if (val) val.textContent = `+${self.simulatedDays} ${t('days_passed')}`;
      self.renderForSelected();
    });

    // Refresh re-reads the store so newly completed results appear immediately.
    const rf = document.getElementById('dash-refresh');
    if (rf) rf.addEventListener('click', function () { self.init(); });
  }
};
