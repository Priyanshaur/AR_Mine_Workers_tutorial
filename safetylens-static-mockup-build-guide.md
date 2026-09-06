# SafetyLens AR — Static Mockup Build Guide

This covers the **static image mockups only** (the five PNG screens), not the interactive HTML/JS prototype. It documents exactly what was built, every design detail, and the complete step-by-step pipeline to reproduce or extend it.

---

## 1. What was produced

Five phone-screen PNGs (390×844px, iPhone-sized canvas), rendered from real HTML/CSS — not AI-generated images, not a generic template. Each is a "frozen frame" of one moment in the SafetyLens AR flow:

| File | Screen | Purpose |
|---|---|---|
| `safetylens-01-intro.png` | Cinematic opening stat | Opens the pitch with "48 workers died in Jharkhand mines in 2022–23 alone" — the emotional hook, borrowed directly from the pitch script |
| `safetylens-02-ar-scene.png` | AR HUD decision fork | The core mechanic: scan-lock reticle, alarm banner, countdown timer, and the three-option decision fork |
| `safetylens-03-consequence.png` | Consequence sequence | Shows the outcome of picking "Switch on the light" — fire iconography, ember particles, plain-text explanation |
| `safetylens-04-certificate.png` | Signed certificate | Completion state: drawn checkmark, "VERIFIED" stamp, cert details, a real-looking QR code |
| `safetylens-05-dashboard.png` | Readiness dashboard | Decay curve chart + color-coded refresher-due worker list |

Each screen is a **standalone static HTML file** rendered to PNG with a headless browser engine — no JavaScript execution needed at render time (unlike the interactive prototype, which needs a live browser to run state changes).

---

## 2. Design system used

### Color tokens (hardcoded hex — no CSS variables, see §5 gotchas)

| Token | Hex | Used for |
|---|---|---|
| Void | `#08090A` | Deepest background (consequence screen) |
| Background | `#0F1214` | Base app background |
| Panel | `#171B1E` | Cards, input fields, list rows |
| Panel raised | `#202528` | (reserved for hover/active states) |
| Hazard (amber) | `#FFB020` | Physical hazard signage — alarm stripes, primary buttons, decay curve line |
| Hazard dark | `#1a1400` | Paired with amber in the diagonal caution-stripe pattern |
| Scan (cyan) | `#4FE3C1` | Digital/AR HUD layer — grid lines, corner brackets, reticle, scan callouts |
| Danger | `#FF5233` | Consequence label text, the "48" stat number |
| Success | `#3ECF8E` | Checkmark, stamp, success tag, green score pills |
| Text primary | `#F4F2EC` | Body text |
| Text muted | `#868D93` | Captions, metadata, secondary labels |
| Border | `#2A3034` | Hairline borders, dashed dividers |

**Design rule**: amber and cyan each do one job only — amber = physical/analog hazard signage (the kind painted on real equipment), cyan = the digital AR overlay layer. They never mix roles.

### Typography

Three families, loaded as local `.woff2` files (see §4):

- **Oswald** (weights 500/600/700) — headlines, the big "48" stat, alarm banner text, consequence labels. Condensed industrial feel, reads like safety signage.
- **IBM Plex Sans** (weights 400/500/600) — all body copy, buttons, choice text.
- **IBM Plex Mono** (weight 500) — HUD readouts, timers, signed-payload text, worker metadata. Gives the "system/data" moments a technical feel distinct from human-written copy.

### Layout

- Canvas: 390×844px (iPhone-standard mobile viewport)
- Hazard stripe: 7px tall, `repeating-linear-gradient(135deg, #FFB020 0 13px, #1a1400 13px 26px)` — used as a structural divider only where a real warning belongs, never decoratively
- Cards: 1px solid border (`#2A3034`), no border-radius rounding beyond default, padding ~20px

---

## 3. Full source — screen by screen

### 3.1 Shared stylesheet (`base.css`)

Every screen links this file. It declares the local font-face rules and base resets.

```css
@font-face{font-family:'Oswald';src:url('fonts/oswald-500.woff2') format('woff2');font-weight:500;}
@font-face{font-family:'Oswald';src:url('fonts/oswald-600.woff2') format('woff2');font-weight:600;}
@font-face{font-family:'Oswald';src:url('fonts/oswald-700.woff2') format('woff2');font-weight:700;}
@font-face{font-family:'IBM Plex Sans';src:url('fonts/plexsans-400.woff2') format('woff2');font-weight:400;}
@font-face{font-family:'IBM Plex Sans';src:url('fonts/plexsans-500.woff2') format('woff2');font-weight:500;}
@font-face{font-family:'IBM Plex Sans';src:url('fonts/plexsans-600.woff2') format('woff2');font-weight:600;}
@font-face{font-family:'IBM Plex Mono';src:url('fonts/plexmono-500.woff2') format('woff2');font-weight:500;}

*{box-sizing:border-box; margin:0; padding:0;}
body{
  width:390px; height:844px; overflow:hidden;
  background:#0F1214; color:#F4F2EC;
  font-family:'IBM Plex Sans', Arial, sans-serif;
  position:relative;
}
.oswald{font-family:'Oswald', sans-serif; font-weight:600;}
.mono{font-family:'IBM Plex Mono', monospace;}

.hazard-strip{
  height:7px; width:100%;
  background: repeating-linear-gradient(135deg, #FFB020 0 13px, #1a1400 13px 26px);
}
```

### 3.2 Screen 1 — Intro stat (`screen1-intro.html`)

```html
<!DOCTYPE html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="base.css">
<style>
body{background:#000;}
.wrap{position:absolute; top:0; left:0; right:0; bottom:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:0 40px;}
.num{font-family:'Oswald',sans-serif; font-weight:700; font-size:180px; line-height:0.9; color:#FF5233; letter-spacing:-0.02em;}
.cap{font-size:17px; color:#F4F2EC; margin-top:22px; max-width:280px; line-height:1.5;}
.bar-track{position:absolute; bottom:0; left:0; right:0; height:2px; background:#171B1E;}
.bar-fill{position:absolute; bottom:0; left:0; height:2px; width:62%; background:#FFB020;}
.skip{position:absolute; bottom:26px; right:24px; font-family:'IBM Plex Mono',monospace; font-size:11px; color:#868D93; letter-spacing:0.05em;}
</style></head><body>
  <div class="wrap">
    <div class="num">48</div>
    <div class="cap">workers died in Jharkhand mines in 2022–23 alone.</div>
  </div>
  <div class="bar-track"></div><div class="bar-fill"></div>
  <div class="skip">tap to continue</div>
</body></html>
```

### 3.3 Screen 2 — AR HUD decision scene (`screen2-ar-scene.html`)

```html
<!DOCTYPE html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="base.css">
<style>
body{background:#000;}
.stage{position:absolute; top:0; left:0; right:0; bottom:220px; overflow:hidden;}
.fallback{
  position:absolute; top:0; left:0; right:0; bottom:0;
  background:
    radial-gradient(ellipse at 28% 22%, rgba(255,176,32,0.10), transparent 55%),
    radial-gradient(ellipse at 74% 78%, rgba(79,227,193,0.07), transparent 50%),
    linear-gradient(160deg, #14181a 0%, #08090a 100%);
}
.grid{
  position:absolute; top:0; left:0; right:0; bottom:0;
  background-image:
    linear-gradient(rgba(79,227,193,0.10) 1px, transparent 1px),
    linear-gradient(90deg, rgba(79,227,193,0.10) 1px, transparent 1px);
  background-size: 34px 34px;
}
.corner{position:absolute; width:26px; height:26px; border:2px solid #4FE3C1; opacity:0.85;}
.c-tl{top:14px; left:14px; border-right:none; border-bottom:none;}
.c-tr{top:14px; right:14px; border-left:none; border-bottom:none;}
.c-bl{bottom:14px; left:14px; border-right:none; border-top:none;}
.c-br{bottom:14px; right:14px; border-left:none; border-top:none;}

.reticle{position:absolute; left:38%; top:44%; width:64px; height:64px;}
.callout{position:absolute; left:38%; top:44%; margin-left:74px; margin-top:-10px; background:rgba(6,10,11,0.85); border:1px solid #4FE3C1; padding:8px 11px; min-width:150px;}
.cl-label{font-family:'IBM Plex Mono',monospace; font-size:10px; color:#4FE3C1; letter-spacing:0.06em; margin-bottom:2px;}
.cl-val{font-family:'IBM Plex Mono',monospace; font-size:12px; color:#fff;}

.alarm{
  position:absolute; top:0; left:0; right:0; padding:12px 16px 10px;
  background: repeating-linear-gradient(135deg, #FFB020 0 10px, #1a1400 10px 20px);
  display:flex; align-items:center; justify-content:space-between;
}
.alarm-text{background:#0A0A0A; color:#FFB020; font-family:'Oswald',sans-serif; font-weight:700; font-size:14px; letter-spacing:0.03em; padding:6px 10px;}
.alarm-timer{background:#0A0A0A; color:#fff; font-family:'IBM Plex Mono',monospace; font-size:16px; padding:6px 10px; min-width:52px; text-align:center;}

.caption{position:absolute; left:16px; right:16px; top:76px; font-size:13px; color:#fff; background:rgba(0,0,0,0.55); padding:10px 12px; border-left:3px solid #FFB020; line-height:1.5; max-width:280px;}

.choices{position:absolute; left:0; right:0; bottom:0; height:220px; padding:16px; display:flex; flex-direction:column; gap:10px; background:linear-gradient(0deg, rgba(0,0,0,0.92), rgba(0,0,0,0.6) 75%, transparent);}
.choice{background:rgba(23,27,30,0.95); border:1px solid #2A3034; color:#F4F2EC; padding:14px 16px; font-size:14px; line-height:1.4;}
.letter{display:inline-block; width:20px; height:20px; line-height:20px; text-align:center; background:#FFB020; color:#1A1400; font-family:'IBM Plex Mono',monospace; font-size:11px; font-weight:600; margin-right:10px;}
</style></head><body>
  <div class="stage">
    <div class="fallback"></div>
    <div class="grid"></div>
    <div class="corner c-tl"></div><div class="corner c-tr"></div><div class="corner c-bl"></div><div class="corner c-br"></div>
    <svg class="reticle" viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="none" stroke="#4FE3C1" stroke-width="1.5" stroke-dasharray="6 5"/><line x1="32" y1="0" x2="32" y2="14" stroke="#4FE3C1" stroke-width="2"/><line x1="32" y1="50" x2="32" y2="64" stroke="#4FE3C1" stroke-width="2"/><line x1="0" y1="32" x2="14" y2="32" stroke="#4FE3C1" stroke-width="2"/><line x1="50" y1="32" x2="64" y2="32" stroke="#4FE3C1" stroke-width="2"/></svg>
    <div class="callout"><div class="cl-label">GAS CONCENTRATION</div><div class="cl-val">RISING</div></div>
    <div class="alarm"><div class="alarm-text">GAS LEAK DETECTED</div><div class="alarm-timer">0:11</div></div>
    <div class="caption">Gas smell detected near the confined space entry. Alarm sounds.</div>
  </div>
  <div class="choices">
    <div class="choice"><span class="letter">A</span>Switch on the light to see better</div>
    <div class="choice"><span class="letter">B</span>Rush in to shut the valve immediately</div>
    <div class="choice"><span class="letter">C</span>Evacuate the area, alert others, then approach with PPE and ventilation per protocol</div>
  </div>
</body></html>
```

### 3.4 Screen 3 — Consequence (`screen3-consequence.html`)

```html
<!DOCTYPE html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="base.css">
<style>
body{background:#08090A;}
.visual{position:absolute; top:0; left:0; right:0; height:420px; overflow:hidden;
  background: radial-gradient(ellipse at 50% 42%, rgba(196,65,20,0.30), transparent 60%), #08090A;}
.ember{position:absolute; border-radius:50%; background:rgba(255,140,50,0.55); filter:blur(1px);}
.icon-wrap{position:absolute; top:0; left:0; right:0; bottom:0; display:flex; align-items:center; justify-content:center;}
.panel{position:absolute; top:420px; left:0; right:0; bottom:0; background:#171B1E; border-top:1px solid #2A3034; padding:22px 24px 28px;}
.label{color:#FF5233; font-family:'Oswald',sans-serif; font-weight:600; font-size:20px; margin-bottom:10px;}
.text{color:#868D93; font-size:14px; line-height:1.6; margin-bottom:20px;}
.btn{background:#FFB020; color:#1A1400; font-family:'IBM Plex Sans',sans-serif; font-weight:600; font-size:14px; padding:13px 18px; text-align:center;}
</style></head><body>
  <div class="visual">
    <div class="ember" style="width:6px;height:6px; left:120px; top:280px;"></div>
    <div class="ember" style="width:4px;height:4px; left:200px; top:200px;"></div>
    <div class="ember" style="width:8px;height:8px; left:260px; top:320px;"></div>
    <div class="ember" style="width:5px;height:5px; left:90px; top:150px;"></div>
    <div class="ember" style="width:7px;height:7px; left:300px; top:220px;"></div>
    <div class="ember" style="width:4px;height:4px; left:160px; top:340px;"></div>
    <div class="icon-wrap">
      <svg width="110" height="110" viewBox="0 0 24 24" fill="none">
        <path d="M12 2c1 3-2 4-2 7a3 3 0 0 0 6 0c0-1-0.5-2-1-2.5 1.5 0.5 3 2.5 3 5.5a6 6 0 0 1-12 0c0-4 2-5 3-7 0.5-1 0.5-2 1-3-0.5 1.5 1 2 2 0z" fill="#FF8C32" stroke="#FF5233" stroke-width="0.5"/>
      </svg>
    </div>
  </div>
  <div class="panel">
    <div class="label">Ignition</div>
    <div class="text">The electrical switch sparked near flammable gas concentration. This is one of the most common causes of flash fire in confined spaces — light switches are not rated for gas-hazard zones.</div>
    <div class="btn">Return to decision point</div>
  </div>
</body></html>
```

### 3.5 Screen 4 — Certificate (`screen4-certificate.html`)

This one has a generated QR-pattern block (`${QR_CONTENT}` below) — see §3.7 for the generator script.

```html
<!DOCTYPE html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="base.css">
<style>
.hazard-strip{height:7px;}
.body{padding:26px 24px;}
.check{display:block; margin-bottom:6px;}
.tag{color:#3ECF8E; font-family:'Oswald',sans-serif; font-weight:600; font-size:20px; margin-bottom:6px;}
.sub{color:#868D93; font-size:13px; margin-bottom:22px; line-height:1.5;}
.field-label{display:block; font-size:12px; color:#868D93; margin-bottom:6px; font-family:'IBM Plex Mono',monospace;}
.input{width:100%; background:#171B1E; border:1px solid #2A3034; color:#F4F2EC; padding:12px 14px; font-size:15px; margin-bottom:18px;}
.card{border:1px solid #2A3034; background:#171B1E; padding:20px; position:relative;}
.stamp{position:absolute; top:-20px; right:-8px; border:3px solid #3ECF8E; color:#3ECF8E; font-family:'Oswald',sans-serif; font-weight:700; font-size:12px; padding:5px 10px; letter-spacing:0.08em; transform:rotate(-11deg);}
.row{display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px dashed #2A3034; font-size:13px;}
.row:last-of-type{border-bottom:none;}
.k{color:#868D93;}
.score{font-family:'IBM Plex Mono',monospace; font-weight:600;}
.qr-holder{position:relative; width:168px; height:168px; background:#fff; margin:16px auto 0;}
.sig{font-family:'IBM Plex Mono',monospace; font-size:10px; color:#868D93; margin-top:10px; line-height:1.6; word-break:break-all;}
</style></head><body>
<div class="hazard-strip"></div>
<div class="body">
  <svg class="check" width="52" height="52" viewBox="0 0 56 56"><circle cx="28" cy="28" r="24" fill="none" stroke="#3ECF8E" stroke-width="4"/><path d="M17 29 L24 36 L39 20" fill="none" stroke="#3ECF8E" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <div class="tag">Protocol followed correctly</div>
  <div class="sub">Generate a signed completion certificate for this worker.</div>
  <span class="field-label">WORKER NAME</span>
  <div class="input">Ramesh Kumar</div>
  <div class="card">
    <div class="stamp">VERIFIED</div>
    <div class="row"><span class="k">Worker</span><span>Ramesh Kumar</span></div>
    <div class="row"><span class="k">Module</span><span>Gas Leak &amp; Confined Space</span></div>
    <div class="row"><span class="k">Date</span><span>2026-09-02</span></div>
    <div class="row"><span class="k">Path</span><span>Correct on first attempt, both decision points</span></div>
    <div class="row"><span class="k">Readiness score</span><span class="score">96</span></div>
    <div class="qr-holder">${QR_CONTENT}</div>
    <div class="sig">signed payload &middot; {"worker":"Ramesh Kumar","module":"gas-leak-confined-space","score":96} &middot; sig:8f2a91c0e4b7...</div>
  </div>
</div>
</body></html>
```

### 3.6 Screen 5 — Dashboard (`screen5-dashboard.html`)

Uses two generated SVG paths (`${LINE_PATH}` and `${FILL_PATH}`) — see §3.8.

```html
<!DOCTYPE html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="base.css">
<style>
.header{padding:26px 24px 8px; display:flex; align-items:center; justify-content:space-between;}
.h2{font-family:'Oswald',sans-serif; font-weight:600; font-size:19px;}
.back{font-family:'IBM Plex Mono',monospace; font-size:12px; color:#868D93;}
.dash-body{padding:8px 24px 32px;}
.sim-row{display:flex; align-items:center; justify-content:space-between; background:#171B1E; border:1px solid #2A3034; padding:14px 16px; margin-bottom:18px;}
.lbl{font-size:13px; color:#868D93;}
.val{font-family:'IBM Plex Mono',monospace; font-size:13px;}
.btn{background:#FFB020; color:#1A1400; font-family:'IBM Plex Sans',sans-serif; font-weight:600; font-size:13px; padding:10px 14px;}
.section-title{font-size:11px; letter-spacing:0.09em; color:#868D93; margin:20px 0 10px; font-family:'IBM Plex Mono',monospace;}
.worker-row{display:flex; align-items:center; justify-content:space-between; padding:13px 0; border-bottom:1px solid #2A3034;}
.wname{font-size:14px; margin-bottom:3px;}
.wmeta{font-size:11px; color:#868D93; font-family:'IBM Plex Mono',monospace;}
.pill{font-family:'IBM Plex Mono',monospace; font-size:13px; font-weight:600; padding:6px 12px; min-width:44px; text-align:center;}
.green{background:rgba(62,207,142,0.16); color:#3ECF8E;}
.amber{background:rgba(255,176,32,0.16); color:#FFB020;}
.red{background:rgba(255,82,51,0.16); color:#FF5233;}
</style></head><body>
<div class="header"><div class="h2">Readiness Dashboard</div><div class="back">&larr; modules</div></div>
<div class="dash-body">
  <div class="sim-row"><div><div class="lbl">Time simulation</div><div class="val">+0 days</div></div><div class="btn">Simulate 90 days passing</div></div>
  <div class="section-title">Decay curve &mdash; selected worker</div>
  <svg width="342" height="150" viewBox="0 0 342 150">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FFB020" stop-opacity="0.28"/><stop offset="100%" stop-color="#FFB020" stop-opacity="0"/></linearGradient></defs>
    <path d="M 30,10 L 30,130 L 332,130" fill="none" stroke="#2A3034" stroke-width="1"/>
    <path d="${FILL_PATH}" fill="url(#g)"/>
    <path d="${LINE_PATH}" fill="none" stroke="#FFB020" stroke-width="2"/>
    <circle cx="120.6" cy="67.1" r="4" fill="#FFB020"/>
    <text x="30" y="12" fill="#F4F2EC" font-family="IBM Plex Sans" font-size="11">Sita Devi</text>
    <text x="2" y="16" fill="#868D93" font-family="IBM Plex Mono" font-size="10">100</text>
    <text x="12" y="134" fill="#868D93" font-family="IBM Plex Mono" font-size="10">0</text>
    <text x="308" y="146" fill="#868D93" font-family="IBM Plex Mono" font-size="10">150d</text>
  </svg>
  <div class="section-title">Refresher-due list</div>
  <div class="worker-row"><div><div class="wname">Sita Devi</div><div class="wmeta">Gas Leak &middot; last trained 45d ago</div></div><div class="pill amber">52</div></div>
  <div class="worker-row"><div><div class="wname">Manoj Tirkey</div><div class="wmeta">Gas Leak &middot; last trained 30d ago</div></div><div class="pill green">75</div></div>
  <div class="worker-row"><div><div class="wname">Ramesh Kumar</div><div class="wmeta">Gas Leak &middot; last trained 5d ago</div></div><div class="pill green">85</div></div>
  <div class="worker-row"><div><div class="wname">Anil Yadav</div><div class="wmeta">Gas Leak &middot; last trained 2d ago</div></div><div class="pill green">87</div></div>
</div>
</body></html>
```

### 3.7 QR pattern generator (Python)

This is a **visual stand-in** for a QR code, not a real scannable one — it draws finder squares (the three corner boxes real QR codes have) plus deterministic noise to look convincing at a glance. `random.seed(7)` makes it reproducible.

```python
import random
random.seed(7)
cells = []
n = 21
for r in range(n):
    row = []
    for c in range(n):
        val = random.random() < 0.5
        row.append(val)
    cells.append(row)

def set_finder(cells, r0, c0):
    for r in range(7):
        for c in range(7):
            edge = (r in (0,6) or c in (0,6))
            inner = (2<=r<=4 and 2<=c<=4)
            cells[r0+r][c0+c] = edge or inner

set_finder(cells, 0, 0)
set_finder(cells, 0, n-7)
set_finder(cells, n-7, 0)

divs = []
size = 8
for r in range(n):
    for c in range(n):
        if cells[r][c]:
            divs.append(f'<div style="position:absolute; left:{c*size}px; top:{r*size}px; width:{size}px; height:{size}px; background:#0F1214;"></div>')

open('qr_divs.html', 'w').write(''.join(divs))
```

Then substitute the generated file's contents into `screen4-certificate.html` wherever `${QR_CONTENT}` appears (a simple shell variable substitution works — see §4).

### 3.8 Decay curve generator (Python)

Computes the exponential decay formula `readiness(t) = base * e^(-rate * t)` as SVG path coordinates, so the chart is drawn from the real formula rather than hand-placed.

```python
import math
w, h = 342, 150
pad_l, pad_r, pad_t, pad_b = 30, 10, 10, 20
plot_w = w - pad_l - pad_r
plot_h = h - pad_t - pad_b
base, rate = 90, 0.012
max_days = 150

pts = []
for d in range(0, max_days+1, 3):
    score = base * math.exp(-rate*d)
    x = pad_l + (d/max_days)*plot_w
    y = pad_t + plot_h - (max(0,min(100,score))/100)*plot_h
    pts.append((round(x,1), round(y,1)))

line_path = 'M ' + ' L '.join(f'{x},{y}' for x,y in pts)
fill_path = line_path + f' L {pad_l+plot_w},{pad_t+plot_h} L {pad_l},{pad_t+plot_h} Z'

open('line_path.txt', 'w').write(line_path)
open('fill_path.txt', 'w').write(fill_path)

# marker position for a specific day, e.g. day 45
d = 45
score = base * math.exp(-rate*d)
cx = pad_l + (d/max_days)*plot_w
cy = pad_t + plot_h - (max(0,min(100,score))/100)*plot_h
print('marker at', round(cx,1), round(cy,1), 'score', round(score,1))
```

Adjust `base` and `rate` per worker to regenerate different curves (matches the same formula used in the interactive prototype's dashboard).

---

## 4. Complete build pipeline (step-by-step, from a clean machine)

### Step 1 — Install a rendering engine

The renders use `wkhtmltoimage` (a headless WebKit-based HTML-to-image tool), not a full modern browser. It's lightweight and doesn't need a Chromium download.

```bash
apt-get update
apt-get install -y wkhtmltopdf   # ships wkhtmltoimage alongside wkhtmltopdf
```

### Step 2 — Get real font files locally

Google Fonts' CDN may not be reachable from every build environment, so pull the actual font files via npm packages instead of a `<link>` tag:

```bash
mkdir -p project/fonts && cd project
npm install @fontsource/oswald @fontsource/ibm-plex-sans @fontsource/ibm-plex-mono
cp node_modules/@fontsource/oswald/files/oswald-latin-500-normal.woff2 fonts/oswald-500.woff2
cp node_modules/@fontsource/oswald/files/oswald-latin-600-normal.woff2 fonts/oswald-600.woff2
cp node_modules/@fontsource/oswald/files/oswald-latin-700-normal.woff2 fonts/oswald-700.woff2
cp node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2 fonts/plexsans-400.woff2
cp node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff2 fonts/plexsans-500.woff2
cp node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff2 fonts/plexsans-600.woff2
cp node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2 fonts/plexmono-500.woff2
```

### Step 3 — Write `base.css` and the five screen HTML files

Use the exact contents from §3.1–3.6 above, saved as separate files in the same folder as `fonts/`.

### Step 4 — Generate the QR pattern and decay chart paths

Run the two Python scripts from §3.7 and §3.8. Then inject their output into the certificate and dashboard HTML using shell variable substitution:

```bash
QR_CONTENT=$(cat qr_divs.html)
LINE_PATH=$(cat line_path.txt)
FILL_PATH=$(cat fill_path.txt)

# Use envsubst, sed, or a heredoc with variable interpolation to drop
# these into screen4-certificate.html and screen5-dashboard.html
# wherever ${QR_CONTENT}, ${LINE_PATH}, ${FILL_PATH} appear.
```

### Step 5 — Render each screen to PNG

```bash
for f in screen1-intro screen2-ar-scene screen3-consequence screen4-certificate screen5-dashboard; do
  wkhtmltoimage --enable-local-file-access --width 390 --height 844 --quality 92 "${f}.html" "${f}.png"
done
```

`--enable-local-file-access` is required — without it, the local `.woff2` font files are blocked and text falls back to a default system font.

### Step 6 — Inspect and iterate

Open each PNG and check against the source HTML. Common issues and fixes are in §5.

---

## 5. Gotchas encountered (and fixes)

| Problem | Cause | Fix |
|---|---|---|
| Entire top section of a screen renders as blank black | `wkhtmltoimage` uses an old WebKit engine that does **not** support the CSS `inset` shorthand (e.g. `inset: 0;`) | Replace every `inset: 0;` with explicit `top:0; left:0; right:0; bottom:0;` |
| Fonts fall back to a generic system font despite `@font-face` rules | Local file access is blocked by default for security | Add `--enable-local-file-access` to the `wkhtmltoimage` command |
| Google Fonts don't load at all | The build environment's network egress may not include `fonts.googleapis.com` / `fonts.gstatic.com` | Bundle the actual `.woff2` files locally via the `@fontsource/*` npm packages instead of a CDN `<link>` |
| A decorative element (e.g. a "stamp") overlaps text it shouldn't | Absolute-positioned element's `top`/`right` values put it inside the card's padding box instead of hanging over the edge | Use negative `top`/`right` values (e.g. `top:-20px; right:-8px;`) so it visually "sits on" the card border, not inside it |
| All rendered PNGs report the exact same file size regardless of content | `wkhtmltoimage` PNG output at a fixed canvas size is close to uncompressed — file size is dominated by pixel dimensions, not content | Not a bug — verify correctness by viewing the image, not by comparing byte sizes |
| Emoji characters don't render, or render as boxes | The bundled WebKit engine has no color-emoji font support | Use hand-drawn inline SVG icons instead of emoji characters for anything that needs to render reliably |

---

## 6. How to extend this

- **Add a new screen**: copy the pattern in §3 — a standalone HTML file linking `base.css`, hardcoded colors from §2, rendered with the same `wkhtmltoimage` command in §4 step 5.
- **Change the decay curve data**: edit `base` and `rate` in the §3.8 script, regenerate, re-inject into `screen5-dashboard.html`.
- **Change worker names/scores on the dashboard**: edit the `.worker-row` blocks directly in `screen5-dashboard.html` — they're static markup, no data binding.
- **Render at a different size** (e.g. for a slide background instead of a phone screen): change `--width` / `--height` in the `wkhtmltoimage` command and adjust the CSS `body{width;height}` values in `base.css` to match — layouts are currently authored assuming a 390px-wide canvas and will need proportion adjustments at other aspect ratios.
- **Swap the QR pattern for a real scannable code**: replace the Python generator in §3.7 with an actual QR-encoding library (e.g. Python's `qrcode` package) that encodes real certificate data, then render its SVG/PNG output into the same `.qr-holder` div.
