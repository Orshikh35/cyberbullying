import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

// Hero гарчгийн онцлох мөрөнд ашиглах elegant serif italic (Cyrillic дэмжинэ).
const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  style: ["italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Цахим дээрэлхэлтийн эсрэг хамтдаа",
  description: "Хүүхдийн цахим аюулгүй байдал, үнэлгээ, зөвлөгөө, дата график.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="mn"
      className={`h-full antialiased ${playfair.variable}`}
    >
      <body className="min-h-full bg-[#f5f6f8] text-slate-900">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
