/**
 * @file TermsSectionsList.tsx
 * @description Iterative container for terms of service clauses.
 */

import { LegalSection } from "@/types/audit";
import TermsSectionCard from "./TermsSectionCard";
import ScrollReveal from "@/components/ScrollReveal";

interface TermsSectionsListProps {
  sections: LegalSection[];
}

/**
 * TermsSectionsList component.
 * Maps over legal terms and renders each within a high-fidelity card component.
 */
export default function TermsSectionsList({ sections }: TermsSectionsListProps) {
  return (
    <div className="space-y-32">
      {sections.map((section, index) => (
        <ScrollReveal key={section.id} delay={index * 0.05}>
          <TermsSectionCard section={section} />
        </ScrollReveal>
      ))}
    </div>
  );
}
