/**
 * @file PrivacySectionsList.tsx
 * @description Iterative container for privacy policy sections.
 */

import { LegalSection } from "@/types/audit";
import PrivacySectionItem from "./PrivacySectionItem";
import ScrollReveal from "@/components/ScrollReveal";

interface PrivacySectionsListProps {
  sections: LegalSection[];
}

/**
 * PrivacySectionsList component.
 * Maps over legal sections and renders each using the PrivacySectionItem component.
 */
export default function PrivacySectionsList({ sections }: PrivacySectionsListProps) {
  return (
    <div className="space-y-32">
      {sections.map((section, index) => (
        <ScrollReveal key={section.id} delay={index * 0.05}>
          <PrivacySectionItem section={section} />
        </ScrollReveal>
      ))}
    </div>
  );
}
