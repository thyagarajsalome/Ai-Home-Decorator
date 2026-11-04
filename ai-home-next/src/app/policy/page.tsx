import { Metadata } from "next";
import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | AI Home Decorator",
  description: "Privacy Policy and data practices for AI Home Decorator.",
  alternates: {
    canonical: "https://aihomedecorator.com/policy",
  },
};

const PolicyPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-[#382A22]">
      <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12 border border-[#F1E4D5]">
        <h1 className="text-3xl md:text-4xl font-black text-[#4A2508] mb-2 font-heading">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#7A4B27] mb-8 font-semibold">Last updated: June 15, 2026</p>

        <div className="space-y-8 text-[#5C3314] leading-relaxed text-sm md:text-base">
          <div>
            <h2 className="text-xl font-bold text-[#4A2508] mb-3 font-heading">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us when using our app, including photos you upload for room redesigns, your preferences, and anonymous analytics to improve app performance and user experience.
            </p>
          </div>

          <div className="border-t border-[#F1E4D5]"></div>

          <div>
            <h2 className="text-xl font-bold text-[#4A2508] mb-3 font-heading">
              2. How We Use Your Information
            </h2>
            <p>
              Your uploaded images are processed solely to generate the interior designs and architectural styles you request. We do not sell or rent your personal data or photos to third parties for advertising purposes.
            </p>
          </div>

          <div className="border-t border-[#F1E4D5]"></div>

          <div>
            <h2 className="text-xl font-bold text-[#4A2508] mb-3 font-heading">
              3. Data Security
            </h2>
            <p>
              We employ standard encryption protocols and secure server architectures to protect your data both in transit and at rest.
            </p>
          </div>

          <div className="border-t border-[#F1E4D5]"></div>

          <div>
            <h2 className="text-xl font-bold text-[#4A2508] mb-3 font-heading">
              4. Contact Privacy Team
            </h2>
            <p>
              For privacy-related questions or data deletion requests, contact us at:{" "}
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

export default PolicyPage;
