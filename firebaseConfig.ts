import { initializeApp } from "firebase/app";

// TODO: Replace with your project's Firebase config object
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "...",
  appId: "1:...",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
