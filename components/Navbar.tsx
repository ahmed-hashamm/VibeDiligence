/**
 * @file Navbar.tsx
 * @description Sticky navigation bar with glassmorphism and scroll-aware styling.
 */

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/data/navigation";

/**
 * Navbar component.
 * Handles scroll state to adjust background transparency and height.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent px-6",
        scrolled ? "bg-bg/80 backdrop-blur-xl border-white/5 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-8xl mx-auto flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold tracking-tight">
            Vibe<span className="text-pink-500">Diligence</span>
          </span>
        </Link>

        {/* Center Nav - Only visible on Home to avoid broken anchor links */}
        {isHome && (
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[10px] font-light uppercase tracking-widest text-secondary hover:text-pink-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right Action */}
        <div className="flex items-center gap-4">
          <Link href="/audit">
            <Button className="px-6 py-2.5 h-auto text-[8px] tracking-[0.2em] font-bold uppercase rounded-sm shadow-[0_0_15px_rgba(255,46,109,0.3)]">
              Analyze Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
