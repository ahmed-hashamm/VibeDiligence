import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * CtaSection: Final conversion push.
 */
export default function CtaSection() {
  return (
    <section className="w-full py-24 md:py-40 bg-bg relative overflow-hidden text-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-pink-500/10 blur-[180px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">
            Find out what your investors will see <br className="hidden md:block" /> before they do.
          </h2>
          <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Stop hoping. Start hearing the truth about your codebase.
          </p>
          
          <Link href="/audit">
            <Button className="text-lg px-12 py-6 h-auto font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(255,46,109,0.4)]">
              Start Your Audit Now
            </Button>
          </Link>
          
          <p className="mt-8 text-sm font-mono text-text-muted uppercase tracking-widest">
            Ephemeral Scan • 24H Delivery • Secure Confidential
          </p>
        </div>
      </div>
    </section>
  );
}
