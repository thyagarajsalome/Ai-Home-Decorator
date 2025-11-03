// src/pages/PolicyPage.tsx
import React from "react";

const PolicyPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-300">
      <div className="bg-gray-800/50 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700/50 prose prose-invert prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>

        <p>
          We respect your privacy. When you upload an image, it is sent to our
          secure backend and the Google Gemini API for processing. We do not
          store your images after the generation is complete, nor do we claim
          any ownership over them. Generated images may be temporarily cached
          for your convenience.
        </p>
        <p>
          If you create an account, we will store your email address and
          authentication details securely using{" "}
          <strong>Supabase Authentication</strong>. We will not share your email
          with third parties.
        </p>
      </div>
    </div>
  );
};

export default PolicyPage;
