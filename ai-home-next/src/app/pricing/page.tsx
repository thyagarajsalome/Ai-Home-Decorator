import { headers } from "next/headers";
import PricingClient from "./PricingClient";

export default async function PricingPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const headersList = await headers();
  const resolvedParams = await searchParams;
  const devCountry = typeof resolvedParams.country === 'string' ? resolvedParams.country : null;
  const country = devCountry || headersList.get("x-vercel-ip-country") || "IN";
  return <PricingClient country={country} />;
}
