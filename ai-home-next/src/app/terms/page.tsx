import { Metadata } from "next";
import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | AI Home Decorator",
  description: "Terms of Service and legal agreements for AI Home Decorator.",
  alternates: {
    canonical: "https://aihomedecorator.com/terms",
  },
};

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-[#382A22]">
      <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12 border border-[#F1E4D5]">
        <h1 className="text-3xl md:text-4xl font-black text-[#4A2508] mb-2 font-heading">
          Terms of Service
        </h1>
        <p className="text-xs text-[#7A4B27] mb-8 font-semibold">Last updated: June 15, 2026</p>
        
        <p className="text-[#5C3314] mb-8 leading-relaxed text-sm md:text-base">
          Welcome to AI Home Decorator (&quot;Service&quot;). By accessing our website or downloading our mobile application, you agree to be bound by these Terms of Service (&quot;Terms&quot;).
        </p>

        <div className="space-y-8 text-[#5C3314] leading-relaxed text-sm md:text-base">
          <div>
            <h2 id="accounts" className="text-xl font-bold text-[#4A2508] mb-3 font-heading">
              1. Accounts &amp; Access
            </h2>
            <p>
              You must be at least 13 years old to use the Service. You are responsible for safeguarding your device and account, and for all activities that occur under your session.
            </p>
          </div>

          <div className="border-t border-[#F1E4D5]"></div>

          <div>
            <h2 id="service" className="text-xl font-bold text-[#4A2508] mb-3 font-heading">
              2. Service Usage
            </h2>
            <p className="mb-3">
              AI Home Decorator provides automated architectural and interior visualization tools. You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
              <li>Use the Service for any illegal, infringing, or harmful purpose.</li>
              <li>Upload images that violate any third-party intellectual property or privacy rights.</li>
              <li>Attempt to reverse-engineer or disrupt the service infrastructure.</li>
            </ul>
          </div>

          <div className="border-t border-[#F1E4D5]"></div>

          <div>
            <h2 id="intellectual" className="text-xl font-bold text-[#4A2508] mb-3 font-heading">
              3. Intellectual Property
            </h2>
            <p>
              You retain all ownership rights to the images you upload. You grant AI Home Decorator a limited, non-exclusive license solely to process and deliver your requested redesign outputs.
            </p>
          </div>

          <div className="border-t border-[#F1E4D5]"></div>

          <div>
            <h2 id="liability" className="text-xl font-bold text-[#4A2508] mb-3 font-heading">
              4. Limitation of Liability
            </h2>
            <p>
              The Service and its generated visualizations are provided for aesthetic and conceptual purposes only. AI Home Decorator is not liable for contractor decisions, structural remodeling, or building permits based on generated conceptual images.
            </p>
          </div>

          <div className="border-t border-[#F1E4D5]"></div>

          <div>
            <h2 id="contact" className="text-xl font-bold text-[#4A2508] mb-3 font-heading">
              5. Contact Us
            </h2>
            <p>
              If you have any questions regarding these Terms, please contact us at:{" "}
              <a href="mailto:contactaihomedecorator@gmail.com" className="text-[#E87A1E] font-bold underline">
                contactaihomedecorator@gmail.com
              </a>
            </p>
          </div>

          <div className="pt-6 border-t border-[#F1E4D5]">
            <Link href="/" className="text-xs font-bold text-[#E87A1E] hover:underline">
              &larr; Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
