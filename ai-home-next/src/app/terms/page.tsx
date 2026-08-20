"use client";
// src/pages/TermsPage.tsx
import React from "react";
import Link from "next/link";

const TermsPage: React.FC = () => {
  return (
    <div className="relative min-h-[75vh] max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="glass-card rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-800/80 dark:border-gray-800/50 backdrop-blur-md relative z-10 animate-fade">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <p className="text-xs text-gray-500 mb-8">Last updated: June 15, 2026</p>
        
        <p className="text-gray-300 mb-8 leading-relaxed text-sm md:text-base">
          Welcome to AI Home Decorator ("Service"). By accessing or using our Service, you agree to be bound by these Terms of Service ("Terms").
        </p>

        <div className="space-y-8 text-gray-300 leading-relaxed text-sm md:text-base">
          <div>
            <h2
              id="accounts"
              className="text-xl font-bold text-white mb-3"
            >
              1. Accounts
            </h2>
            <p>
              You must be at least 13 years old to create an account. You are responsible for safeguarding your account and for all activities that occur under it. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
          </div>

          <div className="border-t border-gray-800/40"></div>

          <div>
            <h2
              id="service"
              className="text-xl font-bold text-white mb-3"
            >
              2. Service Usage
            </h2>
            <p>
              Our Service provides AI-powered image generation ("Generations"). The Service is provided to you as a logged-in, verified user. We reserve the right to limit or terminate access for any user who violates these terms.
            </p>
          </div>

          <div className="border-t border-gray-800/40"></div>

          <div>
            <h2
              id="content"
              className="text-xl font-bold text-white mb-3"
            >
              3. User Content
            </h2>
            <p className="mb-3">
              You retain all ownership rights to the original images you upload to the Service ("User Content").
            </p>
            <p className="mb-3">
              By uploading User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and process your content solely for the purpose of operating and providing the Service to you. We do not store your images after processing.
            </p>
            <p>
              You are responsible for the content you upload and warrant that you have all necessary rights to upload it and that it does not violate any laws or third-party rights.
            </p>
          </div>

          <div className="border-t border-gray-800/40"></div>

          <div>
            <h2
              id="conduct"
              className="text-xl font-bold text-white mb-3"
            >
              4. Prohibited Conduct
            </h2>
            <p className="mb-3">You agree not to use the Service to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 ml-2">
              <li>Upload any content that is illegal, harmful, threatening, abusive, or otherwise objectionable.</li>
              <li>Generate images that infringe on copyright, trademark, or intellectual property rights.</li>
              <li>Create multiple accounts to abuse the service's credit systems.</li>
            </ul>
          </div>

          <div className="border-t border-gray-800/40"></div>

          <div>
            <h2
              id="termination"
              className="text-xl font-bold text-white mb-3"
            >
              5. Termination
            </h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including if you breach these Terms.
            </p>
          </div>

          <div className="border-t border-gray-800/40"></div>

          <div>
            <h2 id="governing-law" className="text-xl font-bold text-white mb-3">
              6. Governing Law & Jurisdiction (United States)
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the federal or state courts located within the United States.
            </p>
          </div>

          <div className="border-t border-gray-800/40"></div>

          <div>
            <h2 id="links" className="text-xl font-bold text-white mb-3">
              7. Other Legal Policies
            </h2>
            <p>
              By agreeing to these Terms, you also agree to our{" "}
              <Link href="/policy" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/disclaimer" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors hover:underline">
                Disclaimer
              </Link>
              , which are incorporated herein by reference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
