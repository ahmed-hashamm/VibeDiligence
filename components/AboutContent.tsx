/**
 * @file AboutContent.tsx
 * @description Main content assembler for the About page.
 */

import PageHero from "@/components/ui/PageHero";
import AboutValues from "./about/AboutValues";
import AboutTechnology from "./about/AboutTechnology";
import { LegalContactCard } from "@/components/ui/LegalContactCard";
import { ABOUT_CONTENT } from "@/data/about";
import ScrollReveal from "@/components/ScrollReveal";

/**
 * AboutContent component.
 * Assembles the About page sections.
 */
export default function AboutContent() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
      <ScrollReveal>
        {/* Hero Section */}
        <PageHero
          eyebrow={ABOUT_CONTENT.hero.eyebrow}
          heading={ABOUT_CONTENT.hero.heading}
          subheading={ABOUT_CONTENT.hero.subheading}
          lastUpdated={ABOUT_CONTENT.hero.lastUpdated}
        />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        {/* Core Values */}
        <AboutValues />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        {/* Technology */}
        <AboutTechnology />
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        {/* Global Contact */}
        <LegalContactCard
          title={ABOUT_CONTENT.contact.title}
          description={ABOUT_CONTENT.contact.description}
          email={ABOUT_CONTENT.contact.email}
        />
      </ScrollReveal>
    </div>
  );
}
