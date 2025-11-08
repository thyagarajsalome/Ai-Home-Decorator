// App.tsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
// --- UPDATED IMPORTS ---
import TermsPage from "./pages/TermsPage"; // Renamed from Legal
import PolicyPage from "./pages/PolicyPage";
import DisclaimerPage from "./pages/DisclaimerPage";
// ---
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PricingPage from "./pages/PricingPage"; // <-- 1. UNCOMMENTED THIS
import InstallPWAButton from "./components/InstallPWAButton";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-900 text-white antialiased">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* --- UPDATED ROUTES --- */}
          <Route path="/terms" element={<TermsPage />} /> {/* Was /legal */}
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />{" "}
          {/* <-- ADD NEW ROUTE */}
          {/* --- */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/pricing" element={<PricingPage />} />{" "}
          {/* <-- 2. UNCOMMENTED THIS */}
        </Routes>
        <footer className="text-center py-6 text-gray-500 text-sm">
          <p>Powered by Google Gemini</p>
          <div className="flex justify-center gap-4 mt-2">
            {/* --- UPDATED FOOTER LINKS --- */}
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
