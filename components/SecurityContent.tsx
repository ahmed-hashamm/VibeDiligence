/**
 * @file SecurityContent.tsx
 * @description Main assembler for the Security page content.
 * Rule: Imports and JSX only. Componentized architecture.
 */

import { SECURITY_CONTENT } from "@/data/legal";
import { LegalContactCard } from "@/components/ui/LegalContactCard";
import SecurityHero from "./security/SecurityHero";
import SecurityPillarGrid from "./security/SecurityPillarGrid";
import SecurityHeadersTable from "./security/SecurityHeadersTable";
import SecurityExclusions from "./security/SecurityExclusions";
import SecurityLimitations from "./security/SecurityLimitations";
import SecurityReporting from "./security/SecurityReporting";

/**
 * SecurityContent component.
 * Assembles the Security page using modular sub-components.
 */
export default function SecurityContent() {
  const content = SECURITY_CONTENT as any;

  return (
    <>
      <SecurityHero body={content.mainBody} />
      <SecurityPillarGrid pillars={content.pillars} />
      <SecurityHeadersTable headers={content.headers} footer={content.headerFooter} />
      <SecurityExclusions items={content.whatWeDoNotDo} />
      <SecurityLimitations 
        title={content.limitations.title} 
        intro={content.limitations.intro} 
        items={content.limitations.items} 
      />
      <SecurityReporting 
        title={content.reporting.title} 
        email={content.reporting.email} 
        subject={content.reporting.subject} 
        thankYou={content.reporting.thankYou} 
      />
      <LegalContactCard 
        title={content.contact.title}
        description={content.contact.description}
        email={content.contact.email}
      />
    </>
  );
}
