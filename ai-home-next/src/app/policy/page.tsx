"use client";
// src/pages/PolicyPage.tsx
import React from "react";

const PolicyPage: React.FC = () => {
  return (
    <div className="relative min-h-[75vh] max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="glass-card rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-800/80 dark:border-gray-800/50 backdrop-blur-md relative z-10 animate-fade">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-500 mb-8">Last updated: June 15, 2026</p>

        <div className="space-y-8 text-gray-300 leading-relaxed text-sm md:text-base">
          <p>
            Welcome to AI Home Decorator. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
          </p>

          <div className="border-t border-gray-800/40"></div>

          <div>
            <h2
              id="data-we-collect"
              className="text-xl font-bold text-white mb-4"
            >
              1. The Data We Collect
            </h2>
            <p className="mb-4">
              We may collect, use, and store different kinds of data about you:
            </p>
            <ul className="list-disc list-inside space-y-2.5 text-gray-400 ml-2">
              <li>
                <strong className="text-gray-300">Account Data:</strong> When you register for an account, we collect your email address. Your authentication is handled securely by our provider, Supabase.
              </li>
              <li>
                <strong className="text-gray-300">User Content:</strong> We process the images you upload and the prompts you provide (e.g., "Living Room," "Japandi") to generate your redesigned image.
              </li>
            </ul>
          </div>

          <div className="border-t border-gray-800/40"></div>

          <div>
            <h2
              id="how-we-use-data"
              className="text-xl font-bold text-white mb-4"
            >
              2. How Your Data Is Used
            </h2>
            <p className="mb-4">We use your data in the following ways:</p>
            <ul className="list-disc list-inside space-y-2.5 text-gray-400 ml-2">
              <li>
                To manage your account and provide you with access to the service.
              </li>
              <li>
                To process your uploaded images and prompts. Your images are sent to our secure backend and then to the Google Gemini API to generate the new design.
              </li>
            </ul>
          </div>

          <div className="border-t border-gray-800/40"></div>

          <div>
            <h2
              id="data-storage"
              className="text-xl font-bold text-white mb-3"
            >
              3. Data Storage and Retention
            </h2>
            <p className="mb-3">
              <strong className="text-purple-300">We do not store your uploaded or generated images.</strong> Your images are processed in memory and are not saved on our servers once the AI generation is complete.
            </p>
            <p>
              Your account information (email and user ID) is stored securely in our Supabase database. We will not share your email with any third parties for marketing purposes.
            </p>
          </div>

          <div className="border-t border-gray-800/40"></div>

          <div>
            <h2
              id="third-parties"
              className="text-xl font-bold text-white mb-3"
            >
              4. Third-Party Services
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400 ml-2">
              <li>
                <strong className="text-gray-300">Supabase:</strong> We use Supabase for secure user authentication and database management.
              </li>
              <li>
                <strong className="text-gray-300">Google Gemini:</strong> We send your images and prompts to the Google Gemini API for processing.
              </li>
            </ul>
          </div>

          <div className="border-t border-gray-800/40"></div>

          <div>
            <h2
              id="deletion"
              className="text-xl font-bold text-white mb-3"
            >
              5. Account Deletion
            </h2>
            <p className="mb-3">
              If you wish to delete your account and associated personal data (your email address and user ID), please send a request to us at{" "}
              <a
                href="mailto:contactaihomedecorator@gmail.com"
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors hover:underline"
              >
                contactaihomedecorator@gmail.com
              </a>
              . We will process your request and delete your account information from our database.
            </p>
          </div>

          <div className="border-t border-gray-800/40"></div>

          <div>
            <h2
              id="contact"
              className="text-xl font-bold text-white mb-3"
            >
              6. Contact Us
            </h2>
            <p>
              If you have any questions about this privacy policy, please contact us at{" "}
              <a
                href="mailto:contact@toolwebsite.in"
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors hover:underline"
              >
                contact@toolwebsite.in
              </a>{" "}
              or contact:{" "}
              <a
                href="mailto:contactaihomedecorator@gmail.com"
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors hover:underline"
              >
                contactaihomedecorator@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
