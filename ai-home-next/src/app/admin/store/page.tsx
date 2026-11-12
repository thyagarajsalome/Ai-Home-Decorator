import { Metadata } from "next";
import AdminStoreClient from "./AdminStoreClient";

export const metadata: Metadata = {
  title: "Store Admin Dashboard — AI Home Decorator",
  description: "Manage digital books, pricing, publication status, and Cloudflare storage keys.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminStorePage() {
  return (
    <main className="min-h-screen bg-[#FFFBF7] pb-20">
      <AdminStoreClient />
    </main>
  );
}
