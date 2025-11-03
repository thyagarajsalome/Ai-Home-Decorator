// src/pages/PolicyPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const PolicyPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-300">
      {/* --- FIX: Added prose-p:mb-5, prose-h2:mt-10, etc. to this div ---
        This adds more vertical spacing to make the text less cluttered.
      */}
      <div className="bg-gray-800/50 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700/50 prose prose-lg prose-invert max-w-none prose-p:leading-relaxed prose-p:mb-5 prose-h2:mt-10 prose-h2:mb-4 prose-ul:my-5 prose-li:my-2">
        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p>Last updated: [03-11-2025]</p>

        <p>
          Welcome to AI Home Decorator. We respect your privacy and are
          committed to protecting your personal data. This privacy policy will
          inform you as to how we look after your personal data when you visit
          our website and tell you about your privacy rights.
        </p>

        <h2 id="data-we-collect">1. The Data We Collect</h2>
        <p>We may collect, use, and store different kinds of data about you:</p>
        <ul>
          <li>
            <strong>Account Data:</strong> When you register for an account, we
            collect your email address. Your authentication is handled securely
            by our provider, Supabase.
          </li>
          <li>
            <strong>User Content:</strong> We process the images you upload and
            the prompts you provide (e.g., "Living Room," "Japandi") to generate
            your redesigned image.
          </li>
          <li>
            <strong>Transaction Data:</strong> If you purchase credits, our
            payment processor (e.g., Stripe) will handle your payment details.
            We do not store your credit card information.
          </li>
        </ul>

        <h2 id="how-we-use-data">2. How Your Data Is Used</h2>
        <p>We use your data in the following ways:</p>
        <ul>
          <li>
            To manage your account, provide you with access to the service, and
            manage your generation credits.
          </li>
          <li>
            To process your uploaded images and prompts. Your images are sent to
            our secure backend and then to the Google Gemini API to generate the
            new design.
          </li>
          <li>To manage payments for credit packs.</li>
        </ul>

        <h2 id="data-storage">3. Data Storage and Retention</h2>
        <p>
          <strong>We do not store your uploaded or generated images.</strong>{" "}
          Your images are processed in memory and are not saved on our servers
          once the AI generation is complete.
        </p>
        <p>
          Your account information (email, user ID, and credit balance) is
          stored securely in our Supabase database. We will not share your email
          with any third parties for marketing purposes.
        </p>

        <h2 id="third-parties">4. Third-Party Services</h2>
        <ul>
          <li>
            <strong>Supabase:</strong> We use Supabase for secure user
            authentication and database management.
          </li>
          <li>
            <strong>Google Gemini:</strong> We send your images and prompts to
            the Google Gemini API for processing.
          </li>
        </ul>

        <h2 id="contact">5. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy, please contact us
          at{" "}
          <a
            href="mailto:contact@aihomedecorator.com"
            className="text-purple-400 hover:underline"
          >
            contact@toolwebsite.in
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PolicyPage;
