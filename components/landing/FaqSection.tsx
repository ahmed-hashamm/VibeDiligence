"use client";

import { useState } from "react";
import { FAQS, FAQS_CONTENT } from "@/data/landing";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * FaqSection component.
 * Features an interactive accordion for common questions.
 * Matches the design exactly: Dark cards, pink icons, and smooth transitions.
 */
export default function FaqSection() {
  return (
    <section id="faq" className="w-full py-24 md:py-32 bg-bg relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <FaqItem key={index} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Individual FAQ Item Component.
 */
function FaqItem({ faq }: { faq: { question: string; answer: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={cn(
        "group rounded-2xl border transition-all duration-300 overflow-hidden",
        isOpen ? "bg-surface/50 border-white/10" : "bg-surface/30 border-white/5 hover:border-white/10"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
      >
        <span className="text-lg font-bold text-primary md:pr-8">
          {faq.question}
        </span>
        <div className="p-1 rounded-full text-pink-500 shrink-0">
          {isOpen ? <X size={24} /> : <Plus size={24} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-8 md:px-8 md:pb-10 text-secondary text-sm md:text-base leading-relaxed border-t border-white/5 pt-6">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
