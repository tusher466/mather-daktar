import type { Metadata, Viewport } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { STRINGS_BN } from "@/lib/strings.bn";
import { ClientShell } from "@/components/layout/ClientShell";

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-noto-bengali",
});

export const metadata: Metadata = {
  title: `${STRINGS_BN.appName} - ${STRINGS_BN.appTagline}`,
  description:
    "বাংলাদেশের কৃষক ও ছাদবাগানীদের জন্য সহজ বাংলায় কৃত্রিম বুদ্ধিমত্তাভিত্তিক উদ্ভিদ ও শস্য রোগ নির্ণয় সেবা।",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-64.png", sizes: "64x64", type: "image/png" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon-192.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1F6B3A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={notoBengali.variable}>
      <body className="min-h-screen bg-ground text-ink antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
