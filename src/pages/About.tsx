import React from "react";

const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-300">
      <div className="bg-gray-800/50 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700/50">
        <h1 className="text-3xl font-bold text-white mb-6">
          About AI Home Decorator
        </h1>

        <p className="mb-4">
          Welcome to AI Home Decorator! Our mission is to help you visualize
          your dream space without the guesswork. Built with the power of
          Google's Gemini AI, this tool allows you to upload a photo of any room
          and instantly see it redesigned in a variety of styles.
        </p>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
          How It Works
        </h2>
        <ol className="list-decimal list-inside space-y-2 mb-4">
          <li>
            <strong>Upload:</strong> Snap a photo of your room and upload it.
          </li>
          <li>
            <strong>Describe:</strong> Give the AI some context, like "messy
            bedroom" or "empty living room".
          </li>
          <li>
            <strong>Select:</strong> Choose from a curated list of design
            styles, from Japandi to Cyberpunk.
          </li>
          <li>
            <strong>Decorate:</strong> Let our AI generate a photorealistic
            redesign in seconds.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
          Contact Us
        </h2>
        <p>
          Have questions, feedback, or suggestions? We'd love to hear from you!
        </p>
        <p className="mt-2">
          Please reach out to us at:{" "}
          <a
            href="mailto:contact@aihomedecorator.com"
            className="text-purple-400 hover:underline"
          >
            contact@aihomedecorator.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
