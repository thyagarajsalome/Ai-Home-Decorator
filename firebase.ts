// firebase.ts
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth"; // Only import what's needed now

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// --- Firebase Initialization ---
let app: FirebaseApp | null = null;
let auth: Auth | null = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  console.log("Firebase initialized successfully.");
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

// NOTE: The onAuthStateChanged logic and token fetching are now handled
// primarily within AuthContext.tsx.
// You can remove ensureAnonymousUserAndToken if you only want email/password auth.

// Export auth for use in AuthContext and login/signup pages
export { auth };
