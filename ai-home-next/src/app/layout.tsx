import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstallPWAButton from "@/components/InstallPWAButton";
import PinterestWelcomeBadge from "@/components/PinterestWelcomeBadge";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = { 
  metadataBase: new URL("https://aihomedecorator.com"),
  title: "AI Home Decorator — Interior Design Guides, Room Ideas & Home Tips", 
  description: "Explore expert home improvement tips, lighting and painting guides, architectural room ideas, and AI-powered interior design inspiration for American homes.",
  icons: {
    icon: "/brand/logo.jpg",
    apple: "/brand/logo.jpg",
  },
  verification: {
    google: "h75skBgU64mJnx8bnF_UW_o8SHEi9-DO8RM5yjXTo60",
  },
  openGraph: {
    title: "AI Home Decorator — Interior Design Guides & Room Inspiration",
    description: "Expert lighting and painting tips, 30+ architectural style guides, and room transformation ideas for your home.",
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
  other: {
    "pinterest:card": "summary_large_image",
    "article:publisher": "https://www.pinterest.com/aihomedecorator/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className={`${roboto.className} min-h-screen bg-[#FFFBF7] text-[#382A22] antialiased flex flex-col selection:bg-brand-100 selection:text-brand-900`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-95627K30JR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-95627K30JR');
          `}
        </Script>
        <Providers>
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
