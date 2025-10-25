import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  User,
} from "firebase/auth"; // Import User type

// Your web app's Firebase configuration from your Firebase project settings
// Stored in environment variables (VITE_...) in your .env file
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, // <-- ADDED THIS LINE
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Store the current user and token state
let currentUser: User | null = auth.currentUser; // Use User type
let currentToken: string | null = null;
let authInitialized = false; // Flag to ensure sign-in runs only once initially
let signInPromise: Promise<string | null> | null = null; // To handle concurrent calls

// Automatically sign in the user anonymously when the app initializes
const ensureAnonymousUser = async (): Promise<string | null> => {
  // If already signed in and have a token, return it
  if (currentUser && currentToken) {
    // Optionally: Check token expiry here if needed, but getIdToken(true) handles refresh
    try {
      // Attempt to refresh token silently if needed, maybe not necessary with forceRefresh: true later
      // This is a safety check; getIdToken(true) below is the primary mechanism
      await currentUser.getIdToken();
      return currentToken;
    } catch (error) {
      console.warn("Error checking existing token, will refresh:", error);
      // Fall through to refresh the token
      currentToken = null;
    }
  }

  // If a sign-in is already in progress, wait for it
  if (signInPromise) {
    console.log("Sign-in already in progress, awaiting...");
    return await signInPromise;
  }

  // Start the sign-in process
  console.log("Starting sign-in or token fetch process...");
  signInPromise = (async () => {
    try {
      if (!currentUser) {
        console.log("Attempting anonymous sign-in...");
        const userCredential = await signInAnonymously(auth);
        currentUser = userCredential.user;
        console.log("Signed in anonymously:", currentUser.uid);
      } else {
        console.log("User already exists:", currentUser.uid);
      }

      // Get/Refresh the ID token
      console.log("Getting ID token...");
      // Force refresh (true) ensures you always have a valid token
      currentToken = await currentUser!.getIdToken(true);
      console.log("Got ID token.");
      return currentToken;
    } catch (error) {
      console.error("Firebase Auth Error:", error);
      // Reset state on error
      currentUser = null;
      currentToken = null;
      return null; // Handle error appropriately in the calling function
    } finally {
      // Clear the promise once it's resolved or rejected
      signInPromise = null;
      console.log("Sign-in/token fetch process finished.");
    }
  })();

  return await signInPromise;
};

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  authInitialized = true; // Mark auth as initialized
  if (user) {
    console.log("Auth state changed, user:", user.uid);
    currentUser = user;
    // You could pre-fetch token here, but ensureAnonymousUser handles it on demand
  } else {
    console.log("Auth state changed, user signed out/null.");
    currentUser = null;
    currentToken = null;
    // Attempt to sign in again if the app requires a user always
    // ensureAnonymousUser(); // Be careful not to create infinite loops if sign-in keeps failing
  }
});

// Initial check/sign-in attempt when the module loads.
// ensureAnonymousUser handles preventing duplicate calls.
if (!authInitialized && !signInPromise) {
  console.log("Initial auth check triggered.");
  ensureAnonymousUser();
}

// Export auth and the function to get the token
export { auth, ensureAnonymousUser };
