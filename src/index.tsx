import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// --- FIX: GENTLE CLEANUP (Load First, Then Clean) ---
const cleanupServiceWorkers = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        console.log("Unregistering Service Worker (Background):", registration);
        registration.unregister();
      }
    });
  }

  if ("caches" in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        console.log("Deleting cache (Background):", name);
        caches.delete(name);
      });
    });
  }
};

// Wait for the window to fully load before cleaning up
// This ensures the app paints successfully first
window.addEventListener("load", () => {
  // Add a small delay to ensure main thread is free
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
