/**
 * @file about/page.tsx
 * @description The About page for VibeDiligence.
 * Rule: Imports and JSX only. Pure entry point.
 */

import GridBackground from "@/animations/svgs/GridBackground";
import AboutContent from "@/components/AboutContent";

/**
 * AboutPage component.
 * Assembles the About page using modular components.
 */
export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-40 bg-bg relative overflow-hidden hero-bg">
      <GridBackground />
      <AboutContent />
    </main>
  );
}
