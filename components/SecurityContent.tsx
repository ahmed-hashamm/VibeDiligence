import { Card } from "@/components/ui/Card";
import { SECURITY_CONTENT } from "@/data/legal";
import { Shield, Lock, Zap, Server, Globe, ShieldCheck, AlertCircle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SecurityContent component.
 * Displays security commitment, tech cards, HTTP headers table, and reporting info.
 * Matches the 'Institutional Grade' design exactly.
 */
export default function SecurityContent() {
  const ICON_MAP: Record<string, any> = { Shield, Lock, Zap, Server, ShieldCheck };

  return (
    <>
      {/* Hero Body Text */}
      <div className="max-w-4xl mb-24">
        <p className="text-secondary text-lg leading-relaxed border-l-2 border-pink-500 pl-8 py-2">
          {SECURITY_CONTENT.mainBody}
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-32">
        {SECURITY_CONTENT.pillars.map((pillar) => {
          const Icon = ICON_MAP[pillar.icon] || Shield;
          return (
            <Card key={pillar.title} className="p-10 border-white/5 bg-surface/20 flex flex-col h-full rounded-[2rem] transition-all duration-500 hover:border-pink-500/20 group">
              <div className="flex items-center gap-6 mb-8">
                <div className="p-4 rounded-2xl bg-pink-500/10 text-pink-500 border border-pink-500/20 transition-all duration-300 group-hover:bg-pink-500 group-hover:text-white">
                  <Icon size={28} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{pillar.title}</h3>
              </div>

              {pillar.description && (
                <p className="text-secondary leading-relaxed mb-6">{pillar.description}</p>
              )}

              {/* Specific for Responsible Disclosure Rules */}
              {pillar.rules && (
                <ul className="space-y-4 mb-8">
                  {pillar.rules.map((rule, idx) => (
                    <li key={idx} className="flex gap-4 text-sm text-secondary/80 leading-relaxed italic">
                      <span className="text-pink-500 font-mono font-bold shrink-0">{idx + 1}.</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              )}

              {/* Specific for Feature Lists (Data, Infra, App Security) */}
              {pillar.features && (
                <div className="grid grid-cols-1 gap-6">
                  {pillar.features.map((f) => (
                    <div key={f.label} className="group/item">
                      <h4 className="text-[10px] font-mono font-bold text-pink-500 uppercase tracking-[0.3em] mb-2">
                        {f.label}
                      </h4>
                      <p className="text-sm text-secondary/70 leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Specific for Note/Rewards */}
              {pillar.note && (
                <div className="mt-auto pt-8 border-t border-white/5">
                  <div className="p-5 rounded-xl bg-pink-500/5 border border-pink-500/10 flex gap-4">
                    <Info size={18} className="text-pink-500 shrink-0 mt-1" />
                    <p className="text-[11px] font-mono text-secondary/60 leading-relaxed">
                      {pillar.note}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* HTTP Headers Table */}
      <div className="mb-32">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-success/10 text-success border border-success/20">
              <Globe size={24} />
            </div>
            <div>
              <h3 className="text-3xl font-bold tracking-tight">HTTP Security Headers</h3>
              <p className="text-xs font-mono font-bold text-muted uppercase tracking-[0.3em] mt-1">Institutional Compliance Level</p>
            </div>
          </div>
        </div>
        
        <div className="overflow-hidden rounded-[2rem] border border-white/5 bg-surface/10 backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-6 text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-muted">Header Name</th>
                <th className="px-8 py-6 text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-muted">Status / Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {SECURITY_CONTENT.headers.map((h) => (
                <tr key={h.name} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-8 py-8">
                    <span className="text-sm font-mono font-bold text-primary group-hover:text-pink-500 transition-colors">
                      {h.name}
                    </span>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-success">Enabled & Verified</span>
                      </div>
                      <code className="text-[11px] text-secondary/50 font-mono leading-relaxed max-w-xl truncate">
                        {h.value}
                      </code>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* What We Do Not Do */}
      <div className="mb-32">
        <div className="max-w-4xl">
          <h3 className="text-3xl font-bold mb-12 flex items-center gap-4">
            <XCircle className="text-pink-500" /> What We Do Not Do
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SECURITY_CONTENT.whatWeDoNotDo.map((item) => (
              <div key={item} className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0 mt-2" />
                <span className="text-sm text-secondary/80 leading-relaxed font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reporting / Contact */}
      <div className="p-16 md:p-24 rounded-[3rem] bg-gradient-to-br from-pink-500/10 via-bg to-bg border border-pink-500/20 text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 blur-[120px] -translate-y-1/2 translate-x-1/2 rounded-full" />
        
        <AlertCircle className="mx-auto text-pink-500 mb-8 transition-transform duration-500 group-hover:scale-110" size={64} />
        <h3 className="text-4xl font-bold mb-6 tracking-tight">{SECURITY_CONTENT.reporting.title}</h3>
        <p className="text-secondary text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          {SECURITY_CONTENT.reporting.description} <span className="text-pink-500 font-mono font-bold tracking-tight">{SECURITY_CONTENT.reporting.email}</span>
        </p>
        
        <a 
          href={`mailto:${SECURITY_CONTENT.reporting.email}`} 
          className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 shadow-xl shadow-pink-500/20 hover:shadow-pink-500/40 hover:-translate-y-1"
        >
          Contact Security Team
        </a>
      </div>
    </>
  );
}
