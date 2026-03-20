/**
 * @file about.ts
 * @description Centralized data for the About page.
 */

import { Target, Zap, Shield } from "lucide-react";

export const ABOUT_CONTENT = {
  hero: {
    eyebrow: "OUR MISSION",
    heading: 'Engineering <span class="text-pink-500">Truth</span>',
    subheading: "VibeDiligence was built to bridge the gap between rapid development and institutional-grade stability. We provide the technical clarity needed to scale with confidence.",
    lastUpdated: "LAST UPDATED: MARCH 2026",
  },
  values: [
    {
      title: "Precision",
      desc: "Our VibeEngine reconciliation logic identifies deep architectural patterns that traditional linters miss.",
      icon: Target,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Speed",
      desc: "Receive comprehensive, institutional-grade audit reports in seconds, not weeks.",
      icon: Zap,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
    {
      title: "Security",
      desc: "Zero-retention policy on private code. We audit the 'vibe' and leave no trace.",
      icon: Shield,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
  ],
  technology: {
    systemId: "SYSTEM: VIBE-ENGINE-V4",
    title: "Institutional Intelligence",
    subtitle: "at the edge of innovation.",
    description: "VibeDiligence leverages the proprietary VibeEngine to perform cross-repository pattern recognition. By reconciling intent with implementation, we provide a verdict that goes beyond simple code coverage.",
    status: "STATUS: OPERATIONAL",
    cycle: "Reconciliation Cycle: 0.04s",
  },
  contact: {
    title: "Connect with Diligence",
    description: "Interested in enterprise-grade custom audits or strategic partnerships? Our team is available for high-level technical consultation.",
    email: "support@vibediligence.tech",
  }
};
