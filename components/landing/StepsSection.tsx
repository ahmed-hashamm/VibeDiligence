import { SectionHeader } from "@/components/ui/SectionHeader";
import { STEPS } from "@/data/landing";

/**
 * StepsSection: Visualizes the 3-step audit process.
 */
export default function StepsSection() {
  return (
    <section id="how-it-works" className="w-full py-24 md:py-32 bg-surface/30 relative">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Workflow"
          heading="How it works."
          subheading="Automated deep-tech scrutiny in three simple steps."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 max-w-6xl mx-auto">
          {STEPS.map((step, idx) => (
            <div key={step.title} className="flex flex-col items-center text-center group">
              <div className="relative mb-8">
                {/* Step Number Badge */}
                <div className="w-16 h-16 rounded-2xl bg-pink-500 flex items-center justify-center text-2xl font-bold shadow-[0_0_20px_rgba(255,46,109,0.4)] group-hover:scale-110 transition-transform duration-500 z-10 relative">
                  {step.number}
                </div>
                {/* Connecting Line (Only on MD+) */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 left-16 w-full h-[1px] bg-gradient-to-r from-pink-500/50 to-transparent z-0" />
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-4 tracking-tight">{step.title}</h3>
              <p className="text-text-secondary text-base leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
