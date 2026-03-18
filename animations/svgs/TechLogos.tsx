/**
 * @file TechLogos.tsx
 * @description SVG assembly of technology logos for the StatsBar.
 */

import React from 'react';

/**
 * TechLogos component.
 * Renders a row of tech icons using simple SVG paths or placeholders.
 */
export default function TechLogos() {
  return (
    <div className="flex items-center gap-6  animate-pulse transition-opacity duration-500">
      {/* Node.js */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L4.5 6.34v8.66L12 19.34l7.5-4.34V6.34L12 2zm.6 14.5l-4.1-2.35v-4.3l4.1 2.35v4.3zm0-5.7l-4.1-2.35 4.1-2.35 4.1 2.35-4.1 2.35z" />
      </svg>

      {/* React */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="2" />
        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      </svg>

      {/* Typescript (T) */}
      <div className="text-sm font-bold border-2 border-current px-1 rounded-sm leading-none">TS</div>

      {/* Bun */}
      <div className="text-xl">🥟</div>

      {/* Remix */}
      <div className="font-bold skew-x-12">Remix</div>

      {/* Supabase */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 10.12h-6.78l2.74-8.12c.03-.1-.01-.21-.1-.26-.1-.05-.21-.02-.27.07L7.04 12.12h6.78l-2.74 8.12c-.03.1.01.21.1.26.04.02.07.03.11.03.06 0 .12-.03.16-.08l9.55-10.26c.06-.09.05-.21-.04-.27z" />
      </svg>
    </div>
  );
}
