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

/**
 * TermsContent component.
 * Assembles the full terms of service demonstration using modular sub-components.
 */
export default function TermsContent() {
  return (
    <div className="text-secondary/90 leading-relaxed mt-20">
      <TermsHero 
        intro={TERMS_CONTENT.intro || ""} 
        acknowledgement={TERMS_CONTENT.acknowledgement || ""} 
      />
      
      <TermsSectionsList sections={TERMS_CONTENT.sections} />

      {TERMS_CONTENT.faqs && (
        <div className="mt-40 border-t border-white/5 pt-32">
          <FaqSection
            customFaqs={TERMS_CONTENT.faqs}
            customHeading="Governance & General Clauses"
          />
        </div>
      )}

      <LegalContactCard 
        title={TERMS_CONTENT.contact.title}
        description={TERMS_CONTENT.contact.description}
        email={TERMS_CONTENT.contact.email}
      />
    </div>
  );
}
