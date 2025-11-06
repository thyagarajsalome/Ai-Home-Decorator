// src/pages/TermsPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const TermsPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-300">
      {/* --- FIX: Added prose-p:mb-5, prose-h2:mt-10, etc. to this div ---
        This adds more vertical spacing to make the text less cluttered.
      */}
      <div className="bg-gray-800/50 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700/50 prose prose-lg prose-invert max-w-none prose-p:leading-relaxed prose-p:mb-5 prose-h2:mt-10 prose-h2:mb-4 prose-ul:my-5 prose-li:my-2">
        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p>Last updated: [03-11-2025]</p>
        <p>
          Welcome to AI Home Decorator ("Service"). By accessing or using our
          Service, you agree to be bound by these Terms of Service ("Terms").
        </p>
        <h2 id="accounts">1. Accounts</h2>
        <p>
          You must be at least 13 years old to create an account. You are
          responsible for safeguarding your account and for all activities that
          occur under it. You must notify us immediately upon becoming aware of
          any breach of security or unauthorized use of your account.
        </p>
        <h2 id="credits">2. Service and Credits</h2>
        <p>
          Our Service provides AI-powered image generation ("Generations"). We
          provide new users with a limited number of free Generations
          ("Credits"). Once these free Credits are used, you must purchase
          additional Credits to continue using the Service.
        </p>
        <p>
          All purchases of Credits are final and non-refundable. Prices for
          Credits are subject to change without notice.
        </p>
        <h2 id="content">3. User Content</h2>
        <p>
          You retain all ownership rights to the original images you upload to
          the Service ("User Content").
        </p>
        <p>
          By uploading User Content, you grant us a worldwide, non-exclusive,
          royalty-free license to use, reproduce, modify, and process your
          content solely for the purpose of operating and providing the Service
          to you. We do not store your images after processing.
        </p>
        <p>
          You are responsible for the content you upload and warrant that you
          have all necessary rights to upload it and that it does not violate
          any laws or third-party rights.
        </p>
        <h2 id="conduct">4. Prohibited Conduct</h2>
        <p>You agree not to use the Service to:</p>
        <ul>
          <li>
            Upload any content that is illegal, harmful, threatening, abusive,
            or otherwise objectionable.
          </li>
          <li>
            Generate images that infringe on copyright, trademark, or other
            intellectual property rights.
          </li>
          <li>
            Create multiple accounts to bypass free tier limits or abuse our
            promotional offers.
          </li>
          <li>Reverse-engineer or attempt to bypass our credit system.</li>
        </ul>
        <h2 id="termination">5. Termination</h2>
        <p>
          We may terminate or suspend your account immediately, without prior
          notice or liability, for any reason, including if you breach these
          Terms.
        </p>
        <h2 id="links">6. Other Legal Policies</h2>
        <p>
          By agreeing to these Terms, you also agree to our{" "}
          <Link to="/policy" className="text-purple-400 hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link to="/disclaimer" className="text-purple-400 hover:underline">
            Disclaimer
          </Link>
          , which are incorporated herein by reference.
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
