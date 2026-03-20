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
import ScrollReveal from "@/components/ScrollReveal";

/**
 * SecurityContent component.
 * Assembles the Security page using modular sub-components.
 */
export default function SecurityContent() {
  const content = SECURITY_CONTENT as any;

  return (
    <>
      <ScrollReveal>
        <SecurityHero body={content.mainBody} />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <SecurityPillarGrid pillars={content.pillars} />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <SecurityHeadersTable headers={content.headers} footer={content.headerFooter} />
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <SecurityExclusions items={content.whatWeDoNotDo} />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <SecurityLimitations 
          title={content.limitations.title} 
          intro={content.limitations.intro} 
          items={content.limitations.items} 
        />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <SecurityReporting 
          title={content.reporting.title} 
          email={content.reporting.email} 
          subject={content.reporting.subject} 
          thankYou={content.reporting.thankYou} 
        />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <LegalContactCard 
          title={content.contact.title}
          description={content.contact.description}
          email={content.contact.email}
        />
      </ScrollReveal>
    </>
  );
}
