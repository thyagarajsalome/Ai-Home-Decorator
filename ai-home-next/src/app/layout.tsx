import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstallPWAButton from "@/components/InstallPWAButton";
export const metadata: Metadata = { title: "Ai Home Decorator", description: "Design your home with AI" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{colorScheme: "dark"}}>
      <body className="min-h-screen bg-obsidian-950 text-gray-100 antialiased flex flex-col">
        <Providers>
          <Header />
          <div className="flex-grow">{children}</div>
          <Footer />
          <InstallPWAButton />
        </Providers>
      </body>
    </html>
  );
}
