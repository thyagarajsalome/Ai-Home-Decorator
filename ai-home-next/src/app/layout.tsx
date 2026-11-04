import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstallPWAButton from "@/components/InstallPWAButton";
import HDEPromoBanner from "@/components/HDEPromoBanner";
import PinterestWelcomeBadge from "@/components/PinterestWelcomeBadge";

export const metadata: Metadata = { 
  metadataBase: new URL("https://aihomedecorator.com"),
  title: "AI Home Decorator - Design • Decorate • Visualize | Interior Design App", 
  description: "Reimagine your living room, kitchen, bathroom, and garage with AI Home Decorator. Upload any room photo, choose from 30+ architectural styles, and visualize your dream space instantly on the official Android app.",
  icons: {
    icon: "/brand/logo.jpg",
    apple: "/brand/logo.jpg",
  },
  verification: {
    google: "h75skBgU64mJnx8bnF_UW_o8SHEi9-DO8RM5yjXTo60",
  },
  openGraph: {
    title: "AI Home Decorator - From Empty to Extraordinary",
    description: "See your room's potential in seconds with the official AI Home Decorator Android App.",
    url: "https://aihomedecorator.com",
    siteName: "AI Home Decorator",
    images: [
      {
        url: "/brand/promo-empty-to-extraordinary.jpg",
        width: 1200,
        height: 630,
        alt: "AI Home Decorator Room Transformation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FFFBF7] text-[#382A22] antialiased flex flex-col selection:bg-brand-100 selection:text-brand-900">
        <Providers>
          <HDEPromoBanner />
          <Header />
          <div className="flex-grow">{children}</div>
          <Footer />
          <InstallPWAButton />
          <PinterestWelcomeBadge />
        </Providers>
      </body>
    </html>
  );
}
