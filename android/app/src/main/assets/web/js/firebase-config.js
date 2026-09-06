// SafetyLens AR — Firebase configuration.
//
// To go live with cloud sync (Firestore + Auth), paste your Firebase web app
// config below and set ENABLED = true. Until then the app runs in offline
// LocalStorage mode (no backend), so it keeps working unchanged.
//
// Project: safetylens-ar (ID: safetylens-ar, number: 7009322970).
// Still needed: apiKey + appId — both appear in the firebaseConfig snippet
// shown after you register a Web app (Project Settings -> General ->
// "Your apps" -> Add app (Web) if none yet). Anonymous + Email/Password
// sign-in methods and a Firestore database must also be enabled. Until
// ENABLED is true the app runs in offline LocalStorage mode.

window.FIREBASE_CONFIG = {
  ENABLED: false, // flip to true once apiKey + appId below are filled in
  apiKey: "YOUR_API_KEY",
  authDomain: "safetylens-ar.firebaseapp.com",
  projectId: "safetylens-ar",
  storageBucket: "safetylens-ar.appspot.com",
  messagingSenderId: "7009322970",
  appId: "1:7009322970:web:YOUR_APP_ID_SUFFIX"
};
