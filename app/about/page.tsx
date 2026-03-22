/**
 * @file about/page.tsx
 * @description The About page for VibeDiligence.
 * Rule: Imports and JSX only. Pure entry point.
 */

import { Metadata } from "next";
import GridBackground from "@/animations/svgs/GridBackground";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About Us | Our Mission & Tech",
  description: "Learn about VibeDiligence, our mission to bring transparency to software, and the proprietary VibeEngine powering our audits.",
};

/**
 * AboutPage component.
 * Assembles the About page using modular components.
 */
export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-40 bg-bg relative hero-bg">
      <GridBackground />
      <AboutContent />
    </main>
  );
}
