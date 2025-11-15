import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // <-- IMPORT
import App from "./App";
import "./index.css";

// The old service worker registration block that you deleted was correct.
// The new vite-plugin-pwa handles this automatically, so this file
// should no longer contain any service worker code.

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/* <-- WRAP */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
