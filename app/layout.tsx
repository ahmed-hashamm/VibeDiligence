/**
 * @file layout.tsx
 * @description Root layout for the VibeDiligence application.
 * Defines fonts, metadata, and core structure (Navbar/Footer).
 */

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-var" });

/**
 * Metadata for the application.
 */
export const metadata: Metadata = {
  title: "VibeDiligence — Premium GitHub Repo Audits",
  description: "Advanced repo auditing for technical due diligence. Get instant security, scalability, and quality scores for any repository.",
};

/**
 * RootLayout component.
 * Provides the global HTML/Body structure and common UI elements.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Support for Spline custom element */}
        <script
          type="module"
          src="https://unpkg.com/@splinetool/viewer@1.12.69/build/spline-viewer.js"
        />
      </head>
      <body className={cn(inter.variable, jetbrains.variable, "bg-bg text-primary antialiased")}>
        <Navbar />
        {children}
        <Footer />
        
        {/* Chatbase Widget: Implement using NEXT_PUBLIC_CHATBASE_BOT_ID when available */}
      </body>
    </html>
  );
}
