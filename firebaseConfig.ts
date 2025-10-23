import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions"; // Import this

// TODO: Replace with your project's Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyCeyA8wGYinpKBWqZwUO8UMd45GYVEsOM0",
  authDomain: "aihomedecorator.firebaseapp.com",
  projectId: "aihomedecorator",
  storageBucket: "aihomedecorator.firebasestorage.app",
  messagingSenderId: "358218923651",
  appId: "1:358218923651:web:1242dc196f5a36ba0fa5b6",
  measurementId: "G-1MTCQ2HXS6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app); // Export this

// Optional: Connect to local emulators when developing
// if (window.location.hostname === "localhost") {
//   connectFunctionsEmulator(functions, "localhost", 5001);
// }
