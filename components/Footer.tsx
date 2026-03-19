/**
 * @file Footer.tsx
 * @description Site-wide footer with branding, navigation links, and social icons.
 */

import Link from "next/link";
import { FOOTER_COLUMNS } from "@/data/navigation";
import { Twitter, Linkedin, Github } from "lucide-react";

/**
 * Footer component.
 * Displays brand description, multi-column navigation, and legal/social links.
 */
export default function Footer() {
  return (
    <footer className="w-full bg-bg border-t border-white/5 pt-20 pb-10 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(255,46,109,0.4)]">
                V
              </div>
              <span className="text-xl font-bold tracking-tight">
                Vibe<span className="text-pink-500">Diligence</span>
              </span>
            </Link>
            <p className="text-secondary text-sm max-w-xs leading-relaxed mb-8">
              Engineering Truth. <br />
              Institutional-grade repository auditing for modern software teams.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-6 px-1 border-l-2 border-pink-500">
                {column.title}
              </h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-pink-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-mono text-muted">
            © {new Date().getFullYear()} VibeDiligence. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="https://twitter.com" className="text-muted hover:text-pink-500 transition-colors" target="_blank" rel="noopener noreferrer">
              <Twitter size={18} />
            </a>
            <a href="https://linkedin.com" className="text-muted hover:text-pink-500 transition-colors" target="_blank" rel="noopener noreferrer">
              <Linkedin size={18} />
            </a>
            <a href="https://github.com" className="text-muted hover:text-pink-500 transition-colors" target="_blank" rel="noopener noreferrer">
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Glow */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-500/5 blur-[100px] rounded-full pointer-events-none" />
    </footer>
  );
}
