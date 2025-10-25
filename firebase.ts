import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  User,
  getIdToken, // Import getIdToken directly
} from "firebase/auth";

// Your web app's Firebase configuration from your Firebase project settings
// Stored in environment variables (VITE_...) in your .env file
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, // Ensure this is included
};

// Initialize Firebase
let app;
let auth: ReturnType<typeof getAuth>; // Define auth type

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  console.log("Firebase initialized successfully.");
} catch (error) {
  console.error("Firebase initialization failed:", error);
  // Prevent the rest of the script from running if init fails
  throw new Error(
    "Could not initialize Firebase. Check config and environment variables."
  );
}

// Store the current user state - managed primarily by the listener
let currentUser: User | null = null;
let authStateKnown = false; // Flag to know if the initial state has been determined
let authStatePromise: Promise<User | null>; // Promise to await initial state

// --- Auth State Promise ---
// Create a promise that resolves when the initial auth state is known
authStatePromise = new Promise((resolve) => {
  // Check if auth is initialized before using it
  if (!auth) {
    console.error(
      "Firebase Auth not initialized before onAuthStateChanged setup."
    );
    resolve(null); // Resolve with null if auth failed
    return;
  }
  const unsubscribe = onAuthStateChanged(
    auth,
    (user) => {
      console.log(
        "onAuthStateChanged triggered. User:",
        user ? user.uid : "null"
      );
      currentUser = user; // Update the global currentUser
      authStateKnown = true;
      resolve(currentUser); // Resolve with the current user (or null)
      unsubscribe(); // Stop listening after the first state determination
    },
    (error) => {
      console.error("Auth state listener error:", error);
      authStateKnown = true;
      currentUser = null; // Ensure user is null on error
      resolve(null); // Resolve with null on error
      unsubscribe();
    }
  );
});

// Function to get the current user (potentially signing in anonymously if needed)
// And then get a valid ID token.
const ensureAnonymousUserAndToken = async (): Promise<string | null> => {
  console.log("ensureAnonymousUserAndToken called.");

  // Wait for the initial auth state to be determined if it hasn't already
  if (!authStateKnown) {
    console.log("Awaiting initial auth state...");
    // Wait for the promise created outside this function
    await authStatePromise;
    console.log(
      "Initial auth state known. Current user:",
      currentUser ? currentUser.uid : "null"
    );
  }

  // If after waiting, there's still no user, sign in anonymously
  if (!currentUser) {
    try {
      // Ensure auth is available before calling signInAnonymously
      if (!auth) throw new Error("Firebase Auth is not initialized.");
      console.log("Attempting anonymous sign-in...");
      const userCredential = await signInAnonymously(auth);
      currentUser = userCredential.user; // Update the global currentUser
      console.log("Signed in anonymously:", currentUser.uid);
    } catch (error) {
      console.error("Anonymous sign-in failed:", error);
      currentUser = null; // Ensure currentUser is null on failure
      return null; // Return null if sign-in fails
    }
  }

  // At this point, currentUser should be non-null if sign-in was successful
  if (!currentUser) {
    console.error("User is unexpectedly null after sign-in attempt.");
    return null;
  }

  // Get/Refresh the ID token
  try {
    console.log("Getting ID token for user:", currentUser.uid);
    // Force refresh (true) ensures you always have a valid, non-expired token
    const idToken = await getIdToken(currentUser, true);
    console.log("Got ID token successfully.");
    return idToken;
  } catch (error) {
    console.error("Error getting ID token:", error);
    // Potentially sign the user out or clear state if token fetching fails persistently
    // Reset currentUser might cause issues if called again quickly, just return null
    return null;
  }
};

// Export auth and the function
export { auth, ensureAnonymousUserAndToken };
