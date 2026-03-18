/**
 * @file CtaSection.tsx
 * @description Final call-to-action section at the bottom of the landing page.
 */

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CTA_CONTENT } from "@/data/landing";

/**
 * CtaSection component.
 * Features a high-impact heading and direct link to the audit intake form.
 */
export default function CtaSection() {
  return (
    <section className="w-full py-24 md:py-40 bg-bg relative overflow-hidden text-center flex flex-col items-center justify-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-pink-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-[1.1] tracking-tight text-white drop-shadow-sm">
            {CTA_CONTENT.heading}
          </h2>
          <p className="text-base md:text-lg text-secondary/70 mb-12 max-w-2xl mx-auto font-medium">
            {CTA_CONTENT.subheading}
          </p>

          <Link href="/audit">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-5 rounded-md font-mono font-bold text-sm tracking-[0.2em] transition-all duration-300 shadow-[0_0_40px_rgba(255,46,109,0.3)] hover:shadow-[0_0_60px_rgba(255,46,109,0.5)] active:scale-95 flex items-center gap-3">
              {CTA_CONTENT.cta}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
