import Link from "next/link";
import { Button } from "@/components/ui/Button";
import HeroVisual from "@/animations/svgs/SplineHero";
import GridBackground from "@/animations/svgs/GridBackground";

/**
 * Hero Section: The hook. Top of the landing page.
 */
export default function HeroSection() {
  return (
    <section className="relative w-full pt-32 pb-20 md:pt-28 md:pb-32 overflow-hidden hero-bg">
      <GridBackground />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-start text-left z-10">
          <div className="hero-badge mb-6">
            <span className="badge-dot" />
            V3.0 AGENTIC AUDITS NOW LIVE
          </div>

          <h1 className="text-5xl md:text-8xl font-bold font-sans leading-[1.0] mb-8 tracking-tighter">
            Engineering <br />
            <span className="gradient-text">Truth.</span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-lg leading-relaxed font-medium">
            Deep-tech due diligence designed for modern build security and production readiness.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/audit">
              <Button className="text-sm tracking-widest px-10 py-4 h-auto uppercase font-bold">Get Started</Button>
            </Link>
            <Link href="/example-report">
              <Button variant="ghost" className="text-sm tracking-widest px-10 py-4 h-auto uppercase font-bold border border-white/10">View Sample Report</Button>
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <HeroVisual />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
