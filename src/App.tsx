// App.tsx
import React from "react";
// Import useLocation
import { Routes, Route, Link, useLocation } from "react-router-dom";
// Import AnimatePresence and motion
import { AnimatePresence, motion } from "framer-motion";
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
  // Get the location object to track route changes
  const location = useLocation();

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-900 text-white antialiased">
        <Header />

        {/*
          MODIFICATION HERE:
          Wrap Routes in AnimatePresence to animate pages on exit.
          We use location.pathname as a key to tell AnimatePresence 
          that the page has changed.
        */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }} // Start invisible and slightly to the right
            animate={{ opacity: 1, x: 0 }} // Fade in and slide to center
            exit={{ opacity: 0, x: -20 }} // Fade out and slide to the left
            transition={{ duration: 0.2 }} // Make it quick and snappy
          >
            {/* Pass location to Routes to ensure it animates correctly.
             */}
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/policy" element={<PolicyPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/pricing" element={<PricingPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>

        <footer className="text-center py-6 text-gray-500 text-sm">
          {/* ... (footer content unchanged) ... */}
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
