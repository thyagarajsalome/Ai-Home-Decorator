const fs = require("fs");

let policy = fs.readFileSync("src/app/policy/page.tsx", "utf8");
policy = policy.replace("6. Contact Us", "7. Contact Us");
policy = policy.replace(/<div className="border-t border-gray-800\\/40"><\\/div>\\s*<div>\\s*<h2\\s*id="contact"/g, `<div className="border-t border-gray-800/40"></div>\n\n          <div>\n            <h2\n              id="ccpa"\n              className="text-xl font-bold text-white mb-3"\n            >\n              6. California Privacy Rights (CCPA)\n            </h2>\n            <p className="mb-3">\n              If you are a resident of California, USA, the California Consumer Privacy Act (CCPA) provides you with specific rights regarding your personal information, including the right to request access to and deletion of your data, and the right to opt-out of the sale of your data. We do not sell your personal data.\n            </p>\n          </div>\n\n          <div className="border-t border-gray-800/40"></div>\n\n          <div>\n            <h2\n              id="contact"`);
fs.writeFileSync("src/app/policy/page.tsx", policy);

let terms = fs.readFileSync("src/app/terms/page.tsx", "utf8");
terms = terms.replace("6. Other Legal Policies", "7. Other Legal Policies");
terms = terms.replace(/<div className="border-t border-gray-800\\/40"><\\/div>\\s*<div>\\s*<h2 id="links"/g, `<div className="border-t border-gray-800/40"></div>\n\n          <div>\n            <h2 id="governing-law" className="text-xl font-bold text-white mb-3">\n              6. Governing Law & Jurisdiction (United States)\n            </h2>\n            <p>\n              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the federal or state courts located within the United States.\n            </p>\n          </div>\n\n          <div className="border-t border-gray-800/40"></div>\n\n          <div>\n            <h2 id="links"`);
fs.writeFileSync("src/app/terms/page.tsx", terms);

let disclaimer = fs.readFileSync("src/app/disclaimer/page.tsx", "utf8");
disclaimer = disclaimer.replace("Any decisions made or actions taken based on the output of our Service are at your own sole risk.", "The Service does not guarantee compliance with United States building codes, safety regulations, zoning laws, or structural integrity. Always consult a licensed US contractor or architect before undertaking physical renovations. Any decisions made or actions taken based on the output of our Service are at your own sole risk.");
fs.writeFileSync("src/app/disclaimer/page.tsx", disclaimer);
