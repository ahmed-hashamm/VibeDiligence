/**
 * @file TermsContent.tsx
 * @description Main assembler for the Terms of Service page content.
 * Rule: Imports and JSX only. Componentized architecture.
 */

import { TERMS_CONTENT } from "@/data/legal";
import { LegalContactCard } from "@/components/ui/LegalContactCard";
import FaqSection from "@/components/landing/FaqSection";
import TermsHero from "./terms/TermsHero";
import TermsSectionsList from "./terms/TermsSectionsList";
import ScrollReveal from "@/components/ScrollReveal";

/**
 * TermsContent component.
 * Assembles the full terms of service demonstration using modular sub-components.
 */
export default function TermsContent() {
  return (
    <div className="text-secondary/90 leading-relaxed mt-20">
      <ScrollReveal>
        <TermsHero 
          intro={TERMS_CONTENT.intro || ""} 
          acknowledgement={TERMS_CONTENT.acknowledgement || ""} 
        />
      </ScrollReveal>
      
      <TermsSectionsList sections={TERMS_CONTENT.sections} />

      {TERMS_CONTENT.faqs && (
        <ScrollReveal delay={0.2}>
          <div className="mt-40 border-t border-white/5 pt-32">
            <FaqSection
              customFaqs={TERMS_CONTENT.faqs}
              customHeading="Governance & General Clauses"
            />
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal delay={0.1}>
        <LegalContactCard 
          title={TERMS_CONTENT.contact.title}
          description={TERMS_CONTENT.contact.description}
          email={TERMS_CONTENT.contact.email}
        />
      </ScrollReveal>
    </div>
  );
}
