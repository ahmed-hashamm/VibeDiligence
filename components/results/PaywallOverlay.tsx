"use client";

import { Card } from "@/components/ui/Card";
import { Lock, CheckCircle, Loader2, BrainCircuit } from "lucide-react";
import { PAYWALL_CONTENT } from "@/data/audit-labels";
import { UNLOCKING_MESSAGES } from "@/data/loading-messages";
import { useState, useEffect, useCallback } from "react";
import ScrollReveal from "@/components/ScrollReveal";

/** Paddle.js v2 global type declaration for TypeScript */
declare const Paddle: {
  Checkout: {
    open: (options: {
      items: { priceId: string; quantity: number }[];
      customData?: Record<string, string>;
    }) => void;
  };
  Initialize: (options: { token: string; environment?: string }) => void;
} | undefined;

interface PaywallOverlayProps {
  auditId: string;
  repoUrl: string;
  email?: string | null;
}

/**
 * PaywallOverlay component.
 * High-fidelity call-to-action for unlocking the full audit report via Paddle checkout.
 * After successful checkout, polls payment status and auto-reloads when paid.
 */
export default function PaywallOverlay({ auditId, repoUrl, email }: PaywallOverlayProps) {
  const repoName = repoUrl.replace("https://github.com/", "");
  const priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID;
  const [isProcessing, setIsProcessing] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    if (!isProcessing) return;
    const interval = setInterval(() => {
      setTickerIndex(prev => (prev + 1) % UNLOCKING_MESSAGES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isProcessing]);

  /**
   * Polls the payment status API until paid=true, then reloads the page.
   */
  const pollPaymentStatus = useCallback(async () => {
    const maxAttempts = 30; // 60 seconds max
    let attempts = 0;

    const poll = async () => {
      attempts++;
      try {
        const res = await fetch(`/api/audit/${auditId}/status`);
        const data = await res.json() as { paid: boolean };
        if (data.paid) {
          window.location.reload();
          return;
        }
      } catch {
        // Network error, keep polling
      }

      if (attempts < maxAttempts) {
        setTimeout(poll, 2000);
      } else {
        // Fallback: reload anyway after 60s
        window.location.reload();
      }
    };

    // Wait 3 seconds for webhook to process, then start polling
    setTimeout(poll, 3000);
  }, [auditId]);

  /**
   * Listen for Paddle checkout.completed event dispatched from layout.tsx
   */
  useEffect(() => {
    function handleCheckoutComplete(e: Event) {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail === auditId || !customEvent.detail) {
        setIsProcessing(true);
        pollPaymentStatus();
      }
    }

    window.addEventListener("paddle:checkout-completed", handleCheckoutComplete);
    return () => {
      window.removeEventListener("paddle:checkout-completed", handleCheckoutComplete);
    };
  }, [auditId, pollPaymentStatus]);

  function handleCheckout() {
    if (typeof Paddle === 'undefined') {
      console.error("Paddle.js not loaded");
      return;
    }
    if (!priceId) {
      console.error("NEXT_PUBLIC_PADDLE_PRICE_ID is not set");
      return;
    }

    const checkoutConfig: any = {
      items: [{ priceId, quantity: 1 }],
      customData: { audit_id: auditId },
    };

    // Explicitly pass the customer email if we have it
    // This forces Paddle to use it for invoices and webhook payloads
    if (email) {
      checkoutConfig.customer = { email };
    }

    Paddle.Checkout.open(checkoutConfig);
  }

  // Processing state — show after successful checkout
  if (isProcessing) {
    return (
      <div className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-bg/80 backdrop-blur-sm">
        <ScrollReveal>
          <Card className="max-w-lg w-full p-10 md:p-12 border-emerald-500/30 shadow-[0_0_80px_rgba(16,199,132,0.15)] bg-surface-raised/95 backdrop-blur-md text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto mb-8 border border-emerald-500/20">
              <Loader2 size={40} className="animate-spin" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Payment Received!</h3>
            <p className="text-secondary leading-relaxed mb-10">
              Unlocking your institutional-grade audit for <span className="text-primary font-bold">{repoName}</span>...
            </p>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-left min-h-[90px]">
              <BrainCircuit size={20} className="text-emerald-500 flex-shrink-0 mt-1" />
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-emerald-500/60 uppercase tracking-widest font-bold">Process Sync</p>
                <p className="text-sm text-secondary leading-relaxed transition-all duration-500 animate-in fade-in slide-in-from-bottom-1">
                  {UNLOCKING_MESSAGES[tickerIndex]}
                </p>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    );
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
