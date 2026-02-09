import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { MainNav } from "@/components/layout/MainNav";
import { APP_CONFIG } from "@/lib/config";

import "@/styles/globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  manifest: "/manifest.webmanifest",
  title: APP_CONFIG.TITLE,
  description: APP_CONFIG.DESCRIPTION,
  appleWebApp: {
    title: "yaswapi app",
  },
  icons: [
    {
      url: "/favicon.ico",
      sizes: "any",
      type: "image/x-icon",
    },
    {
      url: "/icon_vector.svg",
      sizes: "any",
      type: "image/svg+xml",
    },
    {
      url: "/icon.png",
      sizes: "any",
      type: "image/png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans text-foreground`}
      >
        <MainNav />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
