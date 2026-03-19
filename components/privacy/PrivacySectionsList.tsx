/**
 * @file PrivacySectionsList.tsx
 * @description Iterative container for privacy policy sections.
 */

import { LegalSection } from "@/types/audit";
import PrivacySectionItem from "./PrivacySectionItem";

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
      {sections.map((section) => (
        <PrivacySectionItem key={section.id} section={section} />
      ))}
    </div>
  );
}
