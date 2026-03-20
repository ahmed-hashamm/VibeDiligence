export const SECTION_LABELS = {
  security: "Security & Vulnerabilities",
  production_readiness: "Production Readiness",
  code_quality: "Code Quality & Patterns",
  scalability: "Scalability & Load",
};

export const VERDICT_CONFIG = {
  ready_to_raise: {
    label: "Ready to Raise",
    color: "#16C784",
    icon: "CheckCircle",
  },
  fix_first: {
    label: "Fix Critical Issues First",
    color: "#F0A500",
    icon: "AlertTriangle",
  },
  needs_work: {
    label: "Needs Work",
    color: "#FF4444",
    icon: "XCircle",
  },
};

export const PRIORITY_COLORS = {
  critical: "#FF4444",
  high: "#FF7A00",
  medium: "#F0A500",
};

export const RESULTS_LABELS = {
  teaserRepo: "organization/private-repo",
  teaserScore: 68,
};

export const PAYWALL_CONTENT = {
  title: "Report Locked",
  description: "Your institutional-grade audit for <span class='text-primary font-bold'>organization/private-repo</span> is ready. Pay once to unlock the full interactive report and PDF download.",
  price: 49,
  features: [
    "Full Security Vulnerability List",
    "Interactive Scalability Analysis",
    "PDF Export for VC/LPs",
  ],
};
