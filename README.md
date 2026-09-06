# SafetyLens AR — Industrial AR Safety Training & Certification

**PS 26041 · AR-Based Vocational Training Simulator for Industrial Safety in Jharkhand's Mining & Manufacturing Sector**
Smart India Hackathon — Grand Finale

> A fully offline Android AR training and certification platform that tests what a worker would **actually do** under pressure — in English, Hindi and Santali — not what they remember from a manual.

---

## 1. The problem

Jharkhand's mines, steel plants and mica units employ many young tribal recruits with no prior industrial exposure. Classroom safety training (static manuals) shows **under 20% retention after one week**. Live drills disrupt production. VR headsets are out of reach for small-scale mines and contract workers. DGMS Dhanbad recorded **48 fatal mine accidents in Jharkhand in 2022–23**, many involving workers with **fewer than 30 days** on the job.

The gap is not *knowledge* — it is *behavior under pressure*. A rule read in a calm room does not survive a real incident. The Factories Act 1948 and Mines Act 1952 mandate periodic certification, but nothing exists that tests real comprehension or tracks skill decay in regional languages.

---

## 2. Innovation

1. **Tests what workers *do*, not what they *know*.** Wrong answers in the scenarios are *instinct traps* — a light switch can ignite gas; gas incapacitates before you notice. This is the tacit, domain-specific knowledge new recruits genuinely lack.
2. **Honest certificates that decay.** A certificate's readiness score is a fading, signed number — not "trained, forever." The dashboard predicts **who is at risk and which skill faded fastest**.
3. **Embodied "find-the-hazard".** You physically **pan the camera** to locate a correct object among several distractors — closer to a live drill than a passive manual.
4. **Multiple-object search + chained questioning.** Every module step places **4 candidate objects**; you identify the correct one, then answer a question about how to use it, then progress.
5. **Pressure, not a timer.** A rising pressure gauge, red edge‑pulse, critical shake and a synthesized siren model the real stress of an incident.
6. **Adaptive coaching.** Fail a step → a targeted, localized hint appears on retry.
7. **Verifiable, tamper‑evident certificates.** Signed with **real HMAC‑SHA256** and encoded as a **real, scannable QR** that is decoded and re‑verified on‑device — fully offline.
8. **Skill‑level analytics.** The admin dashboard shows per‑skill readiness and per‑module **mistakes + time** for every worker.
9. **Triple‑encoded language.** Icon + color + text carry every state, so low‑literacy workers are never blocked by reading alone.

---

## 3. What is built (current state)

### Roles, clan & accounts
- **Admin / Worker login** with distinct account types and routing.
- **Clan/group structure**: every worker belongs to an admin's clan (a mine site / contractor / supervisor). Admins only ever see their own clan.
- Admin credentials (demo seed): `admin / safety123` (Mine Site 3), `sup / safety123` (Steel Plant Unit B).
- Data persists in `localStorage` (offline, no backend).

### Training modules
- **Practice — Learn the App** (marked START HERE, first card): a gentle, zero-pressure run that teaches the three gestures every module uses — **move the phone to find, tap the glowing object, choose an answer** — with a persistent 1‑2‑3 guide strip and short spoken cues in the worker's language.
- **Module 1 — Gas Leak & Confined Space** (3 steps)
- **Module 2 — Fire & Explosion Response** (3 steps)
- **Module 3 — Machinery & Equipment Safety** (machine guarding, lockout‑tagout, conveyor/crusher safe operation — 3 steps)
- **Module 4 — Electrical Hazard Safety** (arc flash, high‑voltage lockout, wet‑condition equipment — 3 steps)
- **Module 5 — Transport & Heavy Vehicle Safety** (haul‑truck blind spots, dumper awareness, safe pedestrian‑vehicle separation — 3 steps)

A persistent **1‑2‑3 guide strip** (find → tap → answer, spoken aloud) and a numbered **step‑sequence strip** (done / current / upcoming) keep every worker oriented; large high‑contrast AR objects make each candidate easy to identify.

Each step is a **multi‑object search chain**:
1. A **scenario briefing** introduces the situation.
2. A prompt + an **identification clue** tell you what to look for.
3. **4 candidate objects** are placed in the AR scene (randomized positions each run). Pan/look to bring the correct one under the **focus reticle**; a live **scout readout** names the nearest object and its direction.
4. On finding it, a **usage cue** confirms the object ("✔ Gas cylinder — now decide what to do") and a question appears.
5. Answer correctly → advance; wrong object/answer → a **consequence explanation** and you retry the same step. **Adaptive hints** appear after a miss.
6. Finishing the module → the **certificate**.

### AR engine
- Camera passthrough + orientation‑guided pan‑to‑find (no ARCore / SLAM — reliable on mid‑range Android).
- Pseudo‑3D tilting hazard objects (CSS `perspective` + `rotateX/rotateY` from pitch/roll).
- **Animated objects** (idle float, focus highlight, found pulse), **focus reticle**, **scout readout**, and a **static fallback layout** for non‑orientation devices (no answer giveaway).
- **Spatial distance**: some objects are "far" and require the **walk‑closer** gate (motion‑based, with a graceful fallback so the demo never stalls).
- **Pressure system** (gauge + shake + synthesized siren, respects the 🔊 mute).

### Assessment & certification
- Score starts at 96; each wrong turn / wrong object deducts points.
- Tracks **wrong‑turn path** and **response time** per decision.
- **Real HMAC‑SHA256** signature (pure‑JS, verified byte‑for‑byte against .NET).
- **Real scannable QR** (qrcode‑generator, bundled offline) encodes the signed payload.
- **On‑device verification**: in‑app scanner (native `BarcodeDetector` + bundled **jsQR**) decodes the QR, recomputes the HMAC, and shows **VALID / INVALID**.

### Admin clan dashboard (clan‑scoped)
- **KPI strip**: workers, runs, average readiness, at‑risk count.
- **Worker chips** (tap to select) → a single detail panel with the worker header and a per‑module **results** table: module, score, **mistakes**, **time taken** (with retry count).
- Collapsible **skill‑level readiness** bars and a **readiness decay curve**, plus a "Simulate +90 days" control.
- A **Refresh** button re‑reads the store so newly completed results appear immediately.
- Everything is scoped to the logged‑in admin's clan only (data updates from worker results saved to `localStorage`).

### Other
- **Localization**: English, Hindi, Santali (UI, briefings, questions, consequences, hints, skills, dashboard).
- **Offline‑first**: asset service‑worker cache, no CDN, no backend.
- **PWA‑style screens** with a high‑contrast industrial AR theme (amber = physical hazard, cyan = digital AR layer).

---

## 4. Architecture & tech stack

| Layer | Choice |
|---|---|
| Frontend | Vanilla HTML/CSS/JS (no framework) |
| AR | `getUserMedia` + Canvas HUD + `DeviceOrientationEvent` |
| 3D feel | CSS `perspective` + `rotateX/rotateY` + SVG sprites |
| Input | Orientation‑guided pan + tap, motion walk‑gate |
| Signature | Pure‑JS **HMAC‑SHA256** |
| QR encode | **qrcode‑generator** (bundled) |
| QR decode | **jsQR** (bundled) + `BarcodeDetector` |
| Offline | Service Worker cache + `localStorage` |
| i18n | Dictionary (en / hi / sat) |
| Persistence | **Firestore + Firebase Auth** (realtime, offline‑persisted) with a LocalStorage fallback |
| Mobile shell | Kotlin **WebView**, `minSdk 24`, `compileSdk 34` |

**Deliberately not used:** Unity, ARCore, Three.js, ML object detection, server backend, real SMS/notifications.

---

## 5. Run & build

### Preview in a browser
Open `web/index.html` (camera/orientation/QR‑scan features need a real phone; a static fallback keeps the demo usable on desktop).

### Build the Android APK
The Android wrapper is in `android/`. Requires Android Studio (or `gradle`, an Android SDK, and JDK 17).

```
cd android
gradlew assembleDebug
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`
Install on an Android 7.0+ phone ("allow from unknown sources"), grant camera permission after first launch.

> The APK bundles the entire `web/` app into `android/app/src/main/assets/web/`. To rebuild after editing `web/`, re‑run `gradlew assembleDebug`.

---

## 6. Repository layout

```
SIH_AR/
├─ README.md                      ← you are here
├─ .gitignore
├─ web/                           ← the app source (source of truth)
│  ├─ index.html, styles.css, manifest.json, sw.js, dashboard.html
│  └─ js/
│     ├─ i18n.js                  translations (en/hi/sat)
│     ├─ store.js                 offline persistence (roles, clans, results)
│     ├─ modules.js               training modules + multi-object steps
│     ├─ chain.js                 multi-object search engine
│     ├─ ar_hud.js                AR HUD / orientation / pressure / siren
│     ├─ app.js                   navigation, auth, routing, chain flow
│     ├─ dashboard.js             clan-scoped admin dashboard
│     ├─ qrcode.min.js            real QR encoder
│     ├─ qr_decoder.js            jsQR decoder (bundled)
│     ├─ qr_verifier.js           HMAC-SHA256 + verify
│     ├─ certificate.js, particles.js, tts.js
└─ android/                       Kotlin WebView wrapper + bundled assets
   └─ app/src/main/  (MainActivity.kt, AndroidManifest.xml, assets/web/…)
```

---

## 7. Status & honest gaps

**Built, verified, and packaged in a debug APK.** All logic is regression‑tested via a headless harness (auth, clan scoping, dashboard, chain flow, HMAC, QR round‑trip).

### Cloud sync (Firebase) — live for project `safetylens-ar`
The app ships with a bundled **Firebase SDK** (`js/firebase-bundle.js`) and a **Firestore + Auth** data layer (`js/firebase-config.js`, `js/store.js`), now **enabled** against the `safetylens-ar` project. When live it:
- uses **Firestore** for `clans`, `workers`, and `certificates`, with **built‑in offline persistence** — writes queue locally and sync when connectivity returns, so the offline requirement is retained;
- uses **Firebase Auth** for real logins (email/password for admins, anonymous + Firestore doc for workers);
- feeds realtime **`onSnapshot`** listeners into an in‑memory cache, so the **admin dashboard queries real Firestore data scoped to `clanId`**.
Console prerequisites (one time): Firestore database + **Email/Password and Anonymous** providers on, one admin Auth user, and a `clans/<clanId>` doc carrying that user's UID in `adminUid`. If the bundle ever fails to load, the app falls back to offline LocalStorage mode rather than hanging.

### Security note (Firebase web key + rules)
The `apiKey` in `js/firebase-config.js` is a **Firebase *Web* API key — public by design** (it ships inside every client app, so GitHub's secret scanner will always flag it). Real protection comes from two console steps, not from hiding the key:
1. **Restrict the key** — Google Cloud Console → APIs & Services → Credentials → your Web key → Application restrictions: **Android apps**, package `com.safetylens.ar` (+ your SHA-1); API restrictions: **Identity Toolkit API, Token Service API, Cloud Firestore API** only.
2. **Replace test-mode Firestore rules** with authenticated-only rules matching this app's model:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /clans/{clanId} {
      allow read: if request.auth != null;
      allow write: if false; // clan setup via console only
    }
    match /workers/{workerId} {
      allow read: if request.auth != null;
      allow create, update: if request.auth != null;
      allow delete: if false;
    }
    match /certificates/{certId} {
      allow read, create: if request.auth != null;
      allow update, delete: if false;
    }
  }
}
```
After applying both, the GitHub alert can be marked resolved. Rotating the key is optional (it would just mean updating the config + rebuilding); restrictions + rules are what actually secure it.

**Known limitations / next steps:**
- With Firebase disabled it falls back to **client‑side `localStorage`** (no backend), so data doesn't sync across devices.
- The **walk‑closer** gate is motion‑based with a fallback (indoor accelerometers are unreliable).
- **Release‑signed APK** not produced yet (debug APK is sideloadable for the demo).
- **Demo video** not yet recorded.
- Modules for the remaining safety domains (e.g. PPE/dust exposure, blasting) are roadmap — Modules 1–5 are built.
