import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// --- 1. BACKGROUND KEEPER (Prevents Freeze) ---
setInterval(() => {
  console.log("Keep-alive ping");
}, 25000);

// --- 2. SAFE CLEANUP (Fixes Blank Screen) ---
// We wait for the window to load, then wait an extra second.
window.addEventListener("load", () => {
  setTimeout(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          console.log("Safe Cleanup: Unregistering SW", registration);
          registration.unregister();
        }
      });
    }

    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          console.log("Safe Cleanup: Deleting cache", name);
          caches.delete(name);
        });
      });
    }
  }, 1000); // 1 second delay ensures React has painted
});

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
