// src/pages/Legal.tsx
import React from "react";

const Legal: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-300">
      <div className="bg-gray-800/50 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700/50 prose prose-invert prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-white">Legal Information</h1>

        <h2 id="terms">Terms and Conditions</h2>
        <p>
          Welcome to AI Home Decorator. By using our service, you agree to these
          terms.
        </p>
        <p>
          <strong>Service Costs and Fees:</strong> To maintain this AI service,
          we incur expenses from our API providers. To cover these costs and
          ensure the platform's availability, we offer a limited number of free
          generations per user. For additional use, we may charge minimal fees
          per generation or via a subscription plan. All charges will be clearly
          communicated before you make a purchase.
        </p>
        <p>
          You agree not to use the service for any unlawful purpose or to abuse
          the service, such as by creating multiple accounts to bypass free tier
          limits.
        </p>

        {/* Privacy Policy Removed */}

        <h2 id="disclaimer">Disclaimer</h2>
        <p>
          The AI-generated designs are for visualization purposes only. They are
          not architectural plans or professional interior design advice. The
          service is provided "as is" without any warranties. We are not liable
          for any decisions you make based on the generated images.
        </p>
      </div>
    </div>
  );
};

export default Legal;
