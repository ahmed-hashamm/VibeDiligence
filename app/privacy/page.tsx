import GridBackground from "@/animations/svgs/GridBackground";
import PrivacyContent from "@/components/PrivacyContent";
import { PRIVACY_CONTENT } from "@/data/legal";
import PageHero from "@/components/ui/PageHero";

/**
 * PrivacyPage component.
 * Pure page entry point.
 */
export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-40 pb-20 bg-bg relative overflow-hidden hero-bg">
      <GridBackground />
      <div className="max-w-[1400px] mx-auto px-12 relative z-10">
        <PageHero
          eyebrow={PRIVACY_CONTENT.eyebrow}
          heading={PRIVACY_CONTENT.heading}
          lastUpdated={PRIVACY_CONTENT.lastUpdated}
        />
        <PrivacyContent />
      </div>
    </main>
  );
}
