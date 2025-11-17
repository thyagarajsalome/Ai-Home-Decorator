import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// --- SAFE CLEANUP LOGIC ---
// This runs only AFTER the app has fully loaded and painted the screen.
window.addEventListener("load", () => {
  // 1. Unregister Service Workers
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        console.log("Safe Cleanup: Unregistering SW", registration);
        registration.unregister();
      }
    });
  }

  // 2. Clear Caches (Optional but good for fixing broken files)
  if ("caches" in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        console.log("Safe Cleanup: Deleting cache", name);
        caches.delete(name);
      });
    });
  }
});
// ---------------------------

// --- BACKGROUND KEEPER (Keep this) ---
setInterval(() => {
  console.log("Keep-alive ping");
}, 25000);
// -------------------------------------

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
