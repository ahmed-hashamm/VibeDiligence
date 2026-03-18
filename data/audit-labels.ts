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
    color: "#FF7A00",
    icon: "AlertTriangle",
  },
  needs_work: {
    label: "Needs Significant Work",
    color: "#FF4444",
    icon: "XCircle",
  },
};

export const PRIORITY_COLORS = {
  critical: "#FF4444",
  high: "#FF7A00",
  medium: "#F0A500",
};
