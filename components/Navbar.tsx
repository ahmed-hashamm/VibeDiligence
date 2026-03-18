"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/data/navigation";

/**
 * Sticky Navbar with glassmorphism and scroll-aware background.
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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent px-6",
        scrolled ? "bg-bg/80 backdrop-blur-xl border-white/5 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          {/* <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(255,46,109,0.4)] transition-transform group-hover:scale-110">
            V
          </div> */}
          <span className="text-xl font-bold tracking-tight">
            Vibe<span className="text-pink-500">Diligence</span>
          </span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-pink-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-4">
          {/* <Link href="/login" className="hidden sm:block text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-white transition-colors mr-4">
            Login
          </Link> */}
          <Link href="/audit">
            <Button className="px-6 py-2.5 h-auto text-[10px] tracking-[0.2em] font-bold uppercase rounded-full shadow-[0_0_15px_rgba(255,46,109,0.3)]">
              Audit Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
