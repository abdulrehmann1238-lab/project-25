import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AURA Athletics | Youth Athlete Performance & Predictive Recovery",
  description: "The elite youth sports-tech performance telemetry platform. Empowering elite academies, dedicated coaches, and tomorrow's champions with precision physiological insights, AI training load recommendations, and real-time biomechanical scanners.",
  keywords: ["youth sports tech", "athlete monitoring", "sports analytics", "readiness score", "whoop for youth", "nike academy performance", "formula 1 telemetry", "biomechanics scanner", "injury prediction AI"],
  authors: [{ name: "AURA Technology Engineers" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${outfit.variable} h-full antialiased lenis-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-champagne/20 selection:text-graphite">
        {children}
      </body>
    </html>
  );
}
