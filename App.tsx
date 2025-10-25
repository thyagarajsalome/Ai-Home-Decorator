import React from "react";
// --- ADD THIS LINE ---
import { Routes, Route, Link } from "react-router-dom";
// --- END ---
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Legal from "./pages/Legal";

// NOTE: You will need to create and import an AuthProvider
// to wrap your app and manage login state.

const App: React.FC = () => {
  return (
    // <AuthProvider> {/* <-- You will wrap your app in an Auth Provider */}
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/legal" element={<Legal />} />
        {/* Add other routes here, e.g., <Route path="/login" element={<Login />} /> */}
      </Routes>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Google Gemini</p>
        <div className="flex justify-center gap-4 mt-2">
          {/* These Links now have the component definition imported */}
          <Link to="/legal#terms" className="hover:text-purple-400">
            Terms
          </Link>
          <Link to="/legal#policy" className="hover:text-purple-400">
            Privacy
          </Link>
          <Link to="/legal#disclaimer" className="hover:text-purple-400">
            Disclaimer
          </Link>
        </div>
      </footer>
    </div>
    // </AuthProvider>
  );
};

export default App;
