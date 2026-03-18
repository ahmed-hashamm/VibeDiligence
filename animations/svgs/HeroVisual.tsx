"use client";

import { cn } from "@/lib/utils";

/**
 * Premium Hero Visual SVG with 5 layers of animation.
 * Spec from STYLES.md: rotating rings, pulsing orb, nodes, circuit lines.
 */
export default function HeroVisual({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full aspect-square max-w-[500px] animate-float mx-auto", className)}>
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ transformOrigin: 'center' }}
      >
        {/* Layer 5: Circuit Lines */}
        <g stroke="#1E1E35" strokeWidth="1">
          <line x1="200" y1="200" x2="313" y2="87" />
          <line x1="200" y1="200" x2="313" y2="313" />
          <line x1="200" y1="200" x2="87" y2="313" />
          <line x1="200" y1="200" x2="87" y2="87" />
          <line x1="200" y1="200" x2="360" y2="200" />
          <line x1="200" y1="200" x2="40" y2="200" />
          <line x1="200" y1="200" x2="200" y2="360" />
          <line x1="200" y1="200" x2="200" y2="40" />
          {/* Terminals */}
          <circle cx="313" cy="87" r="2" fill="#1E1E35" />
          <circle cx="313" cy="313" r="2" fill="#1E1E35" />
          <circle cx="87" cy="313" r="2" fill="#1E1E35" />
          <circle cx="87" cy="87" r="2" fill="#1E1E35" />
        </g>

        {/* Layer 1: Outer Ring - Rotating Slow */}
        <circle
          cx="200"
          cy="200"
          r="160"
          stroke="#FF2D6B"
          strokeWidth="1.5"
          strokeDasharray="6 18"
          strokeOpacity="0.2"
          className="animate-spin-slow"
          style={{ transformOrigin: 'center' }}
        />

        {/* Layer 2: Inner Arc - Rotating Reverse */}
        <circle
          cx="200"
          cy="200"
          r="110"
          stroke="#7B2FBE"
          strokeWidth="2"
          strokeDasharray="190 124"
          strokeOpacity="0.35"
          className="animate-spin-reverse"
          style={{ transformOrigin: 'center' }}
        />

        {/* Layer 4: Nodes - Rotating at different speeds */}
        <g style={{ transformOrigin: 'center' }} className="animate-spin-slow">
          <circle cx="280" cy="200" r="4" fill="#FF2D6B" className="animate-dot-pulse" />
          <circle cx="120" cy="200" r="4" fill="#7B2FBE" className="animate-dot-pulse" />
        </g>
        <g style={{ transformOrigin: 'center' }} className="animate-spin-reverse">
          <circle cx="200" cy="90" r="3" fill="#FF2D6B" className="animate-dot-pulse" />
          <circle cx="200" cy="310" r="3" fill="#7B2FBE" className="animate-dot-pulse" />
        </g>

        {/* Layer 3: Orb Core */}
        <g className="animate-orb-pulse" style={{ transformOrigin: 'center' }}>
          <circle cx="200" cy="200" r="55" fill="#FF2D6B" fillOpacity="0.09" />
          {/* <circle cx="200" cy="200" r="38" fill="#FF2D6B" fillOpacity="0.08" /> */}
          {/* <circle cx="200" cy="200" r="22" fill="#FF2D6B" fillOpacity="0.12" /> */}
          <circle
            cx="200"
            cy="200"
            r="9"
            fill="#FF2D6B"
            style={{ filter: "drop-shadow(0 0 12px #FF2D6B)" }}
          />
        </g>
      </svg>

      {/* Background Glow */}
      <div className="absolute inset-0 bg-pink-500/10 blur-[120px] rounded-full -z-10" />
    </div>
  );
}
