import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// --- CRITICAL FIX: UNREGISTER ALL SERVICE WORKERS ---
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      console.log("Unregistering Service Worker:", registration);
      registration.unregister();
    }
  });

  // Also clear caches programmatically to be safe
  if ("caches" in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        console.log("Deleting cache:", name);
        caches.delete(name);
      });
    });
  }
}
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
