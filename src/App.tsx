// src/App.tsx
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer"; // <-- Import the new Footer
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
  // Handle App Resume/Multitasking
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

  return (
    <AuthProvider>
      {/* Added flex & flex-col to parent div to handle sticky footer */}
      <div className="min-h-screen bg-gray-900 text-white antialiased flex flex-col">
        <Header />

        {/* flex-grow pushes the footer to the bottom if page content is short */}
        <div className="flex-grow">
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
        </div>

        {/* New Footer Component */}
        <Footer />

        <InstallPWAButton />
      </div>
    </AuthProvider>
  );
};

export default App;
