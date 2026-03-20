/**
 * @file PrivacyContent.tsx
 * @description Main assembler for the Privacy page content.
 * Rule: Imports and JSX only. Componentized architecture.
 */

import { PRIVACY_CONTENT } from "@/data/legal";
import { LegalContactCard } from "@/components/ui/LegalContactCard";
import PrivacyHero from "./privacy/PrivacyHero";
import PrivacySectionsList from "./privacy/PrivacySectionsList";
import ScrollReveal from "@/components/ScrollReveal";

/**
 * PrivacyContent component.
 * Assembles the Privacy policy page using modular components.
 */
export default function PrivacyContent() {
  return (
    <div className="text-secondary/90 leading-relaxed mt-20">
      <ScrollReveal>
        <PrivacyHero 
          intro={PRIVACY_CONTENT.intro ?? ""} 
          acknowledgement={PRIVACY_CONTENT.acknowledgement ?? ""} 
          contactLine={PRIVACY_CONTENT.contactLine ?? ""} 
        />
      </ScrollReveal>

      <PrivacySectionsList sections={PRIVACY_CONTENT.sections} />

      <ScrollReveal delay={0.2}>
        <LegalContactCard 
          title={PRIVACY_CONTENT.contact.title}
          description={PRIVACY_CONTENT.contact.description}
          email={PRIVACY_CONTENT.contact.email}
        />
      </ScrollReveal>
    </div>
  );
}
