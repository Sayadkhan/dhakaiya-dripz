import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DHAKAIYA DRIPZ | High-Performance Urban Streetwear",
  description:
    "Elevated unisex casualwear, heavyweight oversized tees, and tactical pleated trousers engineered for Dhaka city. Cash on delivery nationwide.",
  keywords: [
    "Dhakaiya Dripz",
    "Dhaka Streetwear",
    "Parachute Pants Bangladesh",
    "Oversized T-shirt Dhaka",
    "Tactical Trousers",
    "Cash on delivery fashion",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-[#0088ff] selection:text-white transition-colors duration-200">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
