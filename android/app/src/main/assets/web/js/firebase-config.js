// SafetyLens AR — Firebase configuration.
//
// To go live with cloud sync (Firestore + Auth), paste your Firebase web app
// config below and set ENABLED = true. Until then the app runs in offline
// LocalStorage mode (no backend), so it keeps working unchanged.
//
// Steps to enable:
//   1) Firebase console -> Add app (Web) -> copy the firebaseConfig object.
//   2) Enable Firestore (test mode is fine for a demo) and Authentication
//      (Email/Password for admins). Workers use anonymous auth + a Firestore
//      worker document — no sign-up UI required.
//   3) Set ENABLED = true below and rebuild.

window.FIREBASE_CONFIG = {
  ENABLED: false,
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:xxxxxxxxxxxxxxxx"
};
