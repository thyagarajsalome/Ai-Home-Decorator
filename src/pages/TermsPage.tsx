// src/pages/TermsPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const TermsPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-300">
      <div className="bg-gray-800/50 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700/50">
        <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
        <p className="mb-4">Last updated: [03-11-2025]</p>
        <p className="mb-4">
          Welcome to AI Home Decorator ("Service"). By accessing or using our
          Service, you agree to be bound by these Terms of Service ("Terms").
        </p>
        <h2
          id="accounts"
          className="text-2xl font-semibold text-white mt-8 mb-4"
        >
          1. Accounts
        </h2>
        <p className="mb-4">
          You must be at least 13 years old to create an account. You are
          responsible for safeguarding your account and for all activities that
          occur under it. You must notify us immediately upon becoming aware of
          any breach of security or unauthorized use of your account.
        </p>

        {/* --- MODIFIED SECTION 2 --- */}
        <h2
          id="service"
          className="text-2xl font-semibold text-white mt-8 mb-4"
        >
          2. Service Usage
        </h2>
        <p className="mb-4">
          Our Service provides AI-powered image generation ("Generations"). The
          Service is provided to you as a logged-in, verified user. We reserve
          the right to limit or terminate access for any user who violates these
          terms.
        </p>
        {/* --- END MODIFIED SECTION --- */}

        <h2
          id="content"
          className="text-2xl font-semibold text-white mt-8 mb-4"
        >
          3. User Content
        </h2>
        <p className="mb-4">
          You retain all ownership rights to the original images you upload to
          the Service ("User Content").
        </p>
        <p className="mb-4">
          By uploading User Content, you grant us a worldwide, non-exclusive,
          royalty-free license to use, reproduce, modify, and process your
          content solely for the purpose of operating and providing the Service
          to you. We do not store your images after processing.
        </p>
        <p className="mb-4">
          You are responsible for the content you upload and warrant that you
          have all necessary rights to upload it and that it does not violate
          any laws or third-party rights.
        </p>
        <h2
          id="conduct"
          className="text-2xl font-semibold text-white mt-8 mb-4"
        >
          4. Prohibited Conduct
        </h2>
        <p className="mb-4">You agree not to use the Service to:</p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            Upload any content that is illegal, harmful, threatening, abusive,
            or otherwise objectionable.
          </li>
          <li>
            Generate images that infringe on copyright, trademark, or other
            intellectual property rights.
          </li>
          <li>Create multiple accounts to abuse the service.</li>
        </ul>
        <h2
          id="termination"
          className="text-2xl font-semibold text-white mt-8 mb-4"
        >
          5. Termination
        </h2>
        <p className="mb-4">
          We may terminate or suspend your account immediately, without prior
          notice or liability, for any reason, including if you breach these
          Terms.
        </p>
        <h2 id="links" className="text-2xl font-semibold text-white mt-8 mb-4">
          6. Other Legal Policies
        </h2>
        <p className="mb-4">
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
