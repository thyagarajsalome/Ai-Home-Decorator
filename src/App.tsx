// src/App.tsx
import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext"; // <--- IMPORT
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
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("App resumed");
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

  return (
    <AuthProvider>
      <ThemeProvider>
        {/* UPDATED CLASS NAMES BELOW for Light/Dark support */}
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white antialiased transition-colors duration-300">
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
              <Link
                to="/terms"
                className="hover:text-purple-500 dark:hover:text-purple-400"
              >
                Terms
              </Link>
              <Link
                to="/policy"
                className="hover:text-purple-500 dark:hover:text-purple-400"
              >
                Privacy
              </Link>
              <Link
                to="/disclaimer"
                className="hover:text-purple-500 dark:hover:text-purple-400"
              >
                Disclaimer
              </Link>
            </div>
          </footer>

          <InstallPWAButton />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
