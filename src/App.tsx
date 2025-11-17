// src/App.tsx
import React, { useEffect } from "react"; // <-- Imported useEffect
import { Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import TermsPage from "./pages/TermsPage";
import PolicyPage from "./pages/PolicyPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PricingPage from "./pages/PricingPage";
import InstallPWAButton from "./components/InstallPWAButton";

const App: React.FC = () => {
  // --- FIX: Handle App Resume/Multitasking ---
  // This detects when the user switches back to the app.
  // If the screen is blank (body empty), it forces a reload.
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("App resumed");

        // Safety check: If the app woke up blank, force a reload
        if (document.body.childNodes.length === 0) {
          window.location.reload();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  // -------------------------------------------

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-900 text-white antialiased">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
        <footer className="text-center py-6 text-gray-500 text-sm">
          <p>Powered by Google Gemini</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/terms" className="hover:text-purple-400">
              Terms
            </Link>
            <Link to="/policy" className="hover:text-purple-400">
              Privacy
            </Link>
            <Link to="/disclaimer" className="hover:text-purple-400">
              Disclaimer
            </Link>
          </div>
        </footer>

        <InstallPWAButton />
      </div>
    </AuthProvider>
  );
};

export default App;
