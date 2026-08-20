import { headers } from "next/headers";
import PricingClient from "./PricingClient";

export default async function PricingPage() {
  const headersList = await headers();
  const country = headersList.get("x-vercel-ip-country") || "IN";
  return <PricingClient country={country} />;
}
