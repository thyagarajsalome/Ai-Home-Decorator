// App.tsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Legal from "./pages/Legal";
import PolicyPage from "./pages/PolicyPage"; // <-- IMPORT NEW POLICY PAGE
import LoginPage from "./pages/LoginPage"; // Import LoginPage
import SignupPage from "./pages/SignupPage"; // Import SignupPage
import PricingPage from "./pages/PricingPage"; // <-- 1. IMPORT NEW PAGE

const App: React.FC = () => {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap with AuthProvider */}
      <div className="min-h-screen bg-gray-900 text-white antialiased">
        {" "}
        {/* Moved styles here */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/policy" element={<PolicyPage />} />{" "}
          {/* <-- ADD POLICY ROUTE */}
          <Route path="/login" element={<LoginPage />} />{" "}
          {/* Add Login Route */}
          <Route path="/signup" element={<SignupPage />} />{" "}
          {/* Add Signup Route */}
          <Route path="/pricing" element={<PricingPage />} />{" "}
          {/* <-- 2. ADD NEW ROUTE */}
        </Routes>
        <footer className="text-center py-6 text-gray-500 text-sm">
          <p>Powered by Google Gemini</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/legal#terms" className="hover:text-purple-400">
              Terms
            </Link>
            <Link to="/policy" className="hover:text-purple-400">
              {" "}
              {/* <-- UPDATED LINK */}
              Privacy
            </Link>
            <Link to="/legal#disclaimer" className="hover:text-purple-400">
              Disclaimer
            </Link>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
};

export default App;
