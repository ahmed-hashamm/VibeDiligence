"use client";

import { Card } from "@/components/ui/Card";
import { Lock, CheckCircle } from "lucide-react";
import { PAYWALL_CONTENT } from "@/data/audit-labels";

/** Paddle.js global type declaration for TypeScript */
declare global {
  interface Window {
    Paddle?: {
      Checkout: {
        open: (options: {
          items: { priceId: string; quantity: number }[];
          customData?: Record<string, string>;
        }) => void;
      };
    };
  }
}

interface PaywallOverlayProps {
  auditId: string;
  repoUrl: string;
}

/**
 * PaywallOverlay component.
 * High-fidelity call-to-action for unlocking the full audit report via Paddle checkout.
 * Uses Paddle.js overlay checkout (Paddle Billing v2).
 */
export default function PaywallOverlay({ auditId, repoUrl }: PaywallOverlayProps) {
  const repoName = repoUrl.replace("https://github.com/", "");
  const priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID;

  function handleCheckout() {
    if (!window.Paddle) {
      console.error("Paddle.js not loaded");
      return;
    }
    if (!priceId) {
      console.error("NEXT_PUBLIC_PADDLE_PRICE_ID is not set");
      return;
    }

    window.Paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customData: { audit_id: auditId },
    });
  }

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
      <Card className="max-w-lg w-full p-10 md:p-12 border-pink-500/50 shadow-[0_0_80px_rgba(255,45,107,0.2)] bg-surface-raised/95 backdrop-blur-md text-center">
        <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 mx-auto mb-8">
          <Lock size={32} />
        </div>

        <h3 className="text-3xl font-bold mb-4">{PAYWALL_CONTENT.title}</h3>
        <p className="text-secondary mb-8 leading-relaxed">
          Your institutional-grade audit for <span className="text-primary font-bold">{repoName}</span> is ready. Pay once to unlock the full interactive report and PDF download.
        </p>

        <div className="space-y-4 mb-10 text-left bg-bg/50 p-6 rounded-2xl border border-border">
          {PAYWALL_CONTENT.features.map(f => (
            <div key={f} className="flex items-center gap-3 text-sm">
              <CheckCircle size={16} className="text-success" />
              <span>{f}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleCheckout}
            className="btn-primary w-full py-4 text-lg text-center"
          >
            Unlock Report • ${PAYWALL_CONTENT.price}
          </button>
          
          <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-muted uppercase">
            <span>SECURE PADDLE</span>
            <span>•</span>
            <span>INSTANT ACCESS</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
