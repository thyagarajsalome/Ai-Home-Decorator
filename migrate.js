const fs = require('fs');
const path = require('path');

const sourceDir = "D:\\My projects\\Ai Homedecorator-web-app\\Ai-Home-Decorator\\src\\pages";
const targetDir = "D:\\My projects\\Ai Homedecorator-web-app\\ai-home-next\\src\\app";

const pagesMap = {
  "Home.tsx": "page.tsx",
  "About.tsx": "about/page.tsx",
  "DisclaimerPage.tsx": "disclaimer/page.tsx",
  "LoginPage.tsx": "login/page.tsx",
  "PolicyPage.tsx": "policy/page.tsx",
  "PricingPage.tsx": "pricing/page.tsx",
  "SignupPage.tsx": "signup/page.tsx",
  "TermsPage.tsx": "terms/page.tsx"
};

for (const [srcFile, targetFile] of Object.entries(pagesMap)) {
  const srcPath = path.join(sourceDir, srcFile);
  const tgtPath = path.join(targetDir, targetFile);

  if (!fs.existsSync(srcPath)) {
    console.error(`Source file not found: ${srcPath}`);
    continue;
  }

  let content = fs.readFileSync(srcPath, 'utf-8');

  // Add "use client";
  if (!content.startsWith('"use client";')) {
    content = '"use client";\n' + content;
  }

  // Replace react-router-dom imports
  content = content.replace(/import\s*\{\s*([^}]*)\s*\}\s*from\s*['"]react-router-dom['"];/g, (match, p1) => {
    let newImports = [];
    if (p1.includes('Link')) {
      newImports.push('import Link from "next/link";');
    }
    if (p1.includes('useNavigate')) {
      newImports.push('import { useRouter } from "next/navigation";');
    }
    return newImports.join('\n');
  });

  // Replace useNavigate() with useRouter()
  content = content.replace(/useNavigate\(\)/g, 'useRouter()');
  
  // Replace navigate( with router.push(
  content = content.replace(/navigate\(/g, 'router.push(');

  // Replace the variable name
  content = content.replace(/const\s+navigate\s*=/g, 'const router =');
  content = content.replace(/navigate([\]},])/g, 'router$1'); // handle in dependencies array like [isAppMode, navigate] -> [isAppMode, router]
  
  // Update Link to prop to href
  content = content.replace(/<Link\s+to=/g, '<Link href=');

  // ensure target dir exists
  fs.mkdirSync(path.dirname(tgtPath), { recursive: true });

  fs.writeFileSync(tgtPath, content);
  console.log(`Migrated ${srcFile} to ${targetFile}`);
}
