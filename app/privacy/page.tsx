import { SectionHeader } from "@/components/ui/SectionHeader";
import GridBackground from "@/animations/svgs/GridBackground";

/**
 * PrivacyPage: Full text legal for privacy.
 */
export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect repository URLs and temporary access tokens to perform audits. We also collect basic account information if you choose to create a profile."
    },
    {
      title: "2. How We Use Your Data",
      content: "Your code is analyzed in real-time in isolated, ephemeral environments. We never use your proprietary code to train our AI models."
    },
    {
      title: "3. Data Security",
      content: "We implement industry-standard encryption and security protocols (AES-256) to protect your project metadata and report results."
    },
    {
      title: "4. Third-Party Services",
      content: "We use Paddle for payments and Supabase for database management. These partners are compliant with global privacy standards (GDPR/CCPA)."
    },
    {
      title: "5. Your Rights",
      content: "You have the right to request deletion of your data and results at any time. Reports are stored for your convenience but can be wiped upon request."
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 bg-bg relative overflow-hidden">
      <GridBackground />
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <SectionHeader
          eyebrow="Legal"
          heading="Privacy Policy — VibeDiligence"
          subheading="Last updated: March 18, 2024. Your privacy and IP protection are our highest priorities."
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
            <h4 className="text-lg font-bold text-text-primary mb-4 font-mono uppercase tracking-widest text-pink-500">Contact Us</h4>
            <p className="text-sm">For any privacy-related inquiries, please email: <span className="text-text-primary font-bold underline">privacy@vibediligence.com</span></p>
          </div>
        </div>
      </div>
    </main>
  );
}
