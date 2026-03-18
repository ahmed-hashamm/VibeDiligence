import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQS } from "@/data/landing";
import { Plus } from "lucide-react";

/**
 * FaqSection: Simple accordion-style FAQ.
 */
export default function FaqSection() {
  return (
    <section className="w-full py-24 md:py-32 alt-section-bg">
      <div className="container mx-auto px-6 max-w-3xl">
        <SectionHeader
          eyebrow="FAQ"
          heading="Everything you need to know."
        />

        <div className="space-y-4">
          {FAQS.map((faq) => (
            <div
              key={faq.question}
              className="group border border-border rounded-2xl bg-surface p-6 hover:border-border-glow transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-center gap-4">
                <h4 className="text-lg font-bold text-text-primary group-hover:text-pink-500 transition-colors">
                  {faq.question}
                </h4>
                <div className="p-1 rounded-full bg-border text-text-muted group-hover:bg-pink-500 group-hover:text-white transition-all">
                  <Plus size={18} />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border/50 text-text-secondary text-sm leading-relaxed">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
