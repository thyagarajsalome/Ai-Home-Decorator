import { Metadata } from "next";
import { headers } from "next/headers";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing Plans & Credits | AI Home Decorator",
  description:
    "Choose affordable credit packs to transform your room with AI. Instant photorealistic redesigns for living rooms, kitchens, bedrooms, and bathrooms.",
  alternates: {
    canonical: "https://aihomedecorator.com/pricing",
  },
  openGraph: {
    title: "Pricing Plans & Credits | AI Home Decorator",
    description: "Affordable credit packs for AI-powered interior redesigns.",
    url: "https://aihomedecorator.com/pricing",
  },
};

export const revalidate = 86400;

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const headersList = await headers();
  const resolvedParams = await searchParams;
  const devCountry = typeof resolvedParams.country === "string" ? resolvedParams.country : null;
  const country = devCountry || headersList.get("x-vercel-ip-country") || "US";

  return <PricingClient country={country} />;
}
