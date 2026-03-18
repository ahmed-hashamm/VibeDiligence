import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import GridBackground from "@/animations/svgs/GridBackground";
import { Shield, Lock, ShieldCheck, Server, Globe, Zap, AlertCircle } from "lucide-react";

/**
 * SecurityPage: Comprehensive overview of security practices.
 */
export default function SecurityPage() {
  const securitySections = [
    {
      title: "Responsible Disclosure",
      description: "We value the work of security researchers. Our Reward Program encourages ethical disclosure of vulnerabilities.",
      icon: Shield,
    },
    {
      title: "Data Protection",
      description: "AES-256 encryption at rest and TLS 1.3 in transit. We ensure your code is processed in ephemeral memory.",
      icon: Lock,
    },
    {
      title: "Payment Security",
      description: "All transactions are handled securely via Paddle. We never store credit card information on our servers.",
      icon: Zap,
    },
    {
      title: "Infrastructural Security",
      description: "Isolated VPC, advanced firewalls, and strict IAM policies to prevent unauthorized access.",
      icon: Server,
    },
  ];

  const headerTable = [
    { name: "Content-Security-Policy", value: "Strict-dynamic" },
    { name: "Strict-Transport-Security", value: "max-age=63072000" },
    { name: "X-Content-Type-Options", value: "nosniff" },
    { name: "X-Frame-Options", value: "DENY" },
    { name: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 bg-bg relative overflow-hidden">
      <GridBackground />
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          eyebrow="Trust & Safety"
          heading="Security — VibeDiligence"
          subheading="Proactive measures and robust protection for institutional-grade auditing."
        />

        <div className="max-w-4xl mx-auto mb-20 text-text-secondary leading-relaxed">
          <p className="border-l-2 border-pink-500 pl-6 py-2">
            This page outlines our commitment to security. We recognize that your source code is your most valuable asset, and we have built VibeDiligence with a security-first architecture from day one.
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {securitySections.map((s) => (
            <Card key={s.title} className="p-8 border-white/5 bg-surface/30">
              <div className="p-3 rounded-lg bg-pink-500/10 text-pink-500 border border-pink-500/20 w-fit mb-6">
                <s.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">{s.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{s.description}</p>
            </Card>
          ))}
        </div>

        {/* HTTP Headers Table */}
        <div className="max-w-5xl mx-auto mb-20">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Globe className="text-pink-500" /> HTTP Security Headers
          </h3>
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-surface/20 backdrop-blur-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-muted">Header</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-muted">Status / Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {headerTable.map((h) => (
                  <tr key={h.name} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-text-primary">{h.name}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-[10px] font-bold uppercase">
                        <ShieldCheck size={12} /> Enabled
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What's Being Done Section */}
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-12">What's Being Done</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "Real-time Monitoring", "Penetration Testing", "Access Control (IAM)", 
              "Audit Log Logging", "DDoS Mitigation", "2FA Enforcement"
            ].map((item) => (
              <div key={item} className="p-6 rounded-xl border border-white/5 bg-surface/10 hover:border-pink-500/30 transition-all flex flex-col items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500">
                  <Shield size={20} />
                </div>
                <span className="text-xs font-bold tracking-widest uppercase">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reporting Vulnerability */}
        <div className="mt-24 max-w-4xl mx-auto p-12 rounded-3xl bg-gradient-to-br from-pink-500/10 to-purple-500/5 border border-pink-500/20 text-center">
          <AlertCircle className="mx-auto text-pink-500 mb-6" size={48} />
          <h3 className="text-2xl font-bold mb-4">Reporting a Vulnerability</h3>
          <p className="text-text-secondary mb-8">
            If you have discovered a potential security vulnerability in VibeDiligence, please report it immediately to our security team.
          </p>
          <a 
            href="mailto:support@vibediligence.com" 
            className="inline-block px-8 py-4 rounded-full bg-pink-500 text-white font-bold uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Contact Security Team
          </a>
        </div>
      </div>
    </main>
  );
}
