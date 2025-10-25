import { initializeApp, FirebaseApp } from "firebase/app"; // Import FirebaseApp type
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  User,
  getIdToken,
  Auth, // Import Auth type
} from "firebase/auth";

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
let auth: Auth | null = null; // Use Auth type, initialize as null

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  console.log("Firebase initialized successfully.");
} catch (error) {
  console.error("Firebase initialization failed:", error);
  // Optional: Display a user-friendly error message on the UI
}

// --- Authentication State Management ---
let currentUser: User | null = null;
let authStatePromise: Promise<User | null> | null = null; // Allow null initially

// Function to establish the initial authentication state
const initializeAuthState = (): Promise<User | null> => {
  if (!auth) {
    console.error("Cannot initialize auth state: Firebase Auth not available.");
    return Promise.resolve(null); // Return a resolved promise with null
  }
  // If already initializing or initialized, return the existing promise
  if (authStatePromise) {
    return authStatePromise;
  }

  authStatePromise = new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(
      auth as Auth, // Cast auth as Auth since we checked it's not null
      (user) => {
        console.log(
          "onAuthStateChanged initial check. User:",
          user ? user.uid : "null"
        );
        currentUser = user;
        resolve(currentUser); // Resolve with the user (or null)
        unsubscribe(); // Important: Unsubscribe after first state received
      },
      (error) => {
        console.error("Auth state listener error during init:", error);
        currentUser = null;
        resolve(null); // Resolve with null on error
        unsubscribe(); // Unsubscribe on error too
      }
    );
  });
  return authStatePromise;
};

// Initialize auth state when the module loads
initializeAuthState().then((user) => {
  console.log("Initial auth state determined. User:", user ? user.uid : "null");
});

// --- Get Token Function ---
// Ensures user is signed in (anonymously if needed) and returns a valid token
const ensureAnonymousUserAndToken = async (): Promise<string | null> => {
  console.log("ensureAnonymousUserAndToken called.");

  // Ensure Firebase app and auth are initialized
  if (!app || !auth) {
    console.error("Firebase not initialized. Cannot proceed.");
    return null;
  }

  // Make sure initial auth state check is complete
  if (!authStatePromise) {
    // This case should ideally not happen if initializeAuthState was called on load,
    // but as a fallback, we can try initializing again.
    console.warn("Auth state promise not found, re-initializing...");
    await initializeAuthState();
  } else {
    // Wait for the initial state check if it's still pending
    await authStatePromise;
  }

  let localCurrentUser = currentUser; // Use a local variable within the function scope

  // If still no user after initial check, attempt anonymous sign-in
  if (!localCurrentUser) {
    try {
      console.log("Attempting anonymous sign-in...");
      const userCredential = await signInAnonymously(auth);
      localCurrentUser = userCredential.user; // Update local variable
      currentUser = userCredential.user; // Also update global state
      console.log("Signed in anonymously:", localCurrentUser.uid);
    } catch (error) {
      console.error("Anonymous sign-in failed:", error);
      currentUser = null; // Reset global state on failure
      return null; // Return null if sign-in fails
    }
  }

  // If after all attempts, user is still null, we cannot get a token
  if (!localCurrentUser) {
    console.error("Failed to establish user session after sign-in attempt.");
    return null;
  }

  // Get/Refresh the ID token
  try {
    console.log("Getting ID token for user:", localCurrentUser.uid);
    // Force refresh (true) ensures you always have a valid, non-expired token
    const idToken = await getIdToken(localCurrentUser, true);
    console.log("Got ID token successfully.");
    return idToken;
  } catch (error) {
    console.error("Error getting ID token:", error);
    // Invalidate user state if token fails? Maybe not, could be temporary.
    return null; // Return null if token fetch fails
  }
};

// Re-export auth (or null) and the function
export { auth, ensureAnonymousUserAndToken };
