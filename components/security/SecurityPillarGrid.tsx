/**
 * @file SecurityPillarGrid.tsx
 * @description Grid container for all security pillars.
 */

import { Lock, Zap, Server, ShieldCheck, CreditCard, Cloud } from "lucide-react";
import SecurityPillarCard from "./SecurityPillarCard";

import { SecurityPillar } from "@/types/audit";

interface SecurityPillarGridProps {
  pillars: SecurityPillar[];
}

/**
 * SecurityPillarGrid component.
 * Maps over security pillars and renders them using individual cards.
 */
export default function SecurityPillarGrid({ pillars }: SecurityPillarGridProps) {
  const ICON_MAP: Record<string, any> = { Lock, Zap, Server, ShieldCheck, CreditCard, Cloud };

  return (
    <div className="flex flex-col gap-12 mb-32">
      {pillars.map((pillar) => (
        <SecurityPillarCard 
          key={pillar.title} 
          pillar={pillar} 
          Icon={ICON_MAP[pillar.icon] || ShieldCheck} 
        />
      ))}
    </div>
  );
}
