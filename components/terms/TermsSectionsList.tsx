/**
 * @file TermsSectionsList.tsx
 * @description Iterative container for terms of service clauses.
 */

import { LegalSection } from "@/types/audit";
import TermsSectionCard from "./TermsSectionCard";

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
      {sections.map((section) => (
        <TermsSectionCard key={section.id} section={section} />
      ))}
    </div>
  );
}
