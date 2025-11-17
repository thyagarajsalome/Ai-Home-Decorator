import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// --- FIX: GENTLE CLEANUP (Load First, Then Clean) ---
const cleanupServiceWorkers = () => {
  console.log("App loaded. Starting cleanup...");

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        console.log("Unregistering Service Worker:", registration);
        registration.unregister();
      }
    });
  }

  if ("caches" in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        console.log("Deleting cache:", name);
        caches.delete(name);
      });
    });
  }
};

// CRITICAL: Wait for the 'load' event before running cleanup.
// This ensures the app paints the screen FIRST, then deletes the cache.
window.addEventListener("load", () => {
  // Add a tiny delay (1s) just to be safe
  setTimeout(cleanupServiceWorkers, 1000);
});

// Keep-alive ping for Android background
setInterval(() => {
  console.log("Keep-alive ping");
}, 30000);
// ----------------------------------------------------

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
