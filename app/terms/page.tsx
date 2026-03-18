import { SectionHeader } from "@/components/ui/SectionHeader";
import GridBackground from "@/animations/svgs/GridBackground";

/**
 * TermsPage: Full text legal for terms.
 */
export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using VibeDiligence, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service."
    },
    {
      title: "2. Scope of Service",
      content: "VibeDiligence provides automated technical audits. These reports are for informational purposes only and do not constitute financial or legal advice."
    },
    {
      title: "3. User Responsibilities",
      content: "You are responsible for ensuring you have the legal right to audit the repositories you submit. We are not liable for unauthorized project submissions."
    },
    {
      title: "4. Payments & Refunds",
      content: "Audits are one-time purchases via Paddle. Due to the immediate delivery of digital reports, refunds are only issued for technical failures."
    },
    {
      title: "5. Intellectual Property",
      content: "You retain all rights to your code. VibeDiligence retains all rights to the audit technology, report formats, and the 'Vibe' scoring methodology."
    },
    {
      title: "6. Limitation of Liability",
      content: "VibeDiligence is provided 'as-is'. We are not liable for decisions made based on audit results or any indirect damages arising from service use."
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 bg-bg relative overflow-hidden">
      <GridBackground />
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <SectionHeader
          eyebrow="Legal"
          heading="Terms of Service"
          subheading="Last updated: March 18, 2024. Please read these terms carefully before starting an audit."
        />
        
        <div className="space-y-12 text-text-secondary leading-relaxed mt-20">
          {sections.map((s) => (
            <section key={s.title}>
              <h3 className="text-xl font-bold text-text-primary mb-4 border-b border-white/5 pb-2 inline-block">
                {s.title}
              </h3>
              <p className="text-base">{s.content}</p>
            </section>
          ))}
          
          <div className="p-8 rounded-2xl bg-surface/30 border border-white/5 mt-16">
            <h4 className="text-lg font-bold text-text-primary mb-4 font-mono uppercase tracking-widest text-pink-500">Legal Contact</h4>
            <p className="text-sm">Questions regarding these terms? contact: <span className="text-text-primary font-bold underline">legal@vibediligence.com</span></p>
          </div>
        </div>
      </div>
    </main>
  );
}
