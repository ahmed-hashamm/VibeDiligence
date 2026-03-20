/**
 * landing.ts - Central data for the VibeDiligence landing page.
 * Includes text content, stats, incidents, feature lists, and example report data.
 */

export const HERO_CONTENT = {
  badge: "System Online",
  title_part1: "Engineering",
  title_part2: "Truth.",
  subheading: "Deep-tech due diligence designed for modern build security and production readiness.",
  cta_primary: "Get Started",
  cta_secondary: "View Sample Report",
};

export const TRUST_SIGNALS = [
  { name: "TechStars", logo: "/logos/techstars.svg" },
  { name: "Y Combinator", logo: "/logos/yc.svg" },
  { name: "Sequoia", logo: "/logos/sequoia.svg" },
  { name: "Andreessen Horowitz", logo: "/logos/a16z.svg" },
];

export const LANDING_STATS = [
  { value: "1,200+", label: "REPOSITORIES AUDITED" },
  { value: "94%", label: "ISSUES FOUND BEFORE INVESTOR MEETING" },
  { value: "< 60s", label: "AVERAGE REPORT DELIVERY TIME" },
];

export const PROBLEM_CONTENT = {
  heading: "Vibe coding ships fast.<br /><span class='text-pink-500'>Security issues ship faster.</span>",
  incidents: [
    {
      type: "CRITICAL_VULNERABILITY",
      content: "Hardcoded AWS credentials found in /utils/db.js. Exposed in public repo for 4 months.",
      color: "red",
    },
    {
      type: "SCALABILITY_BLOCKER",
      content: "Recursive logic in auth middleware causes O(n^2) latency spikes at >1k concurrent users.",
      color: "yellow",
    },
    {
      type: "DUE_DILIGENCE_FAIL",
      content: "34% of core logic depends on unmaintained libraries with known CVE exploits.",
      color: "purple",
    },
  ],
  cost_title: "The real cost of skipping due diligence",
  scenarios: [
    { name: "Security Breach Cleanup", cost: "$120k+", highlight: true },
    { name: "Investor Pulls Funding", cost: "$2.5M - $10M", highlight: true },
    { name: "Emergency Refactor", cost: "$45k / mo", highlight: false },
    { name: "VibeDiligence Audit", cost: "$49", highlight: false, isProduct: true },
  ],
};

export const REAL_WORLD_INCIDENTS = [
  {
    title: "The DAO Hack",
    description: "A reentrancy vulnerability allowed attackers to drain 3.6M ETH.",
    cost: "$60M",
    date: "June 2016",
  },
  {
    title: "Knight Capital Group",
    description: "Deployment error led to $440M loss in 45 minutes.",
    cost: "$440M",
    date: "August 2012",
  },
];

export const STEPS_CONTENT = {
  eyebrow: "WORKFLOW PIPELINE",
  heading: "How it works.",
  subheading: "", // No subheading in screenshot
};

export const STEPS = [
  {
    number: "01",
    title: "Secure Integration",
    description: "Connect via read-only SSH key or GitHub App. Your source code never leaves your perimeter.",
    badges: ["AES-256", "SOC2 Type II"],
  },
  {
    number: "02",
    title: "Neural Dependency Mapping",
    description: "Our engine traverses your entire AST to identify circular dependencies and logic bottlenecks.",
  },
  {
    number: "03",
    title: "Investor-Ready Reports",
    description: "Receive a comprehensive PDF audit with an Investor Readiness Score.",
  },
];

export const FEATURES_CONTENT = {
  eyebrow: "ENGINE CAPABILITIES",
  heading: "Technical depth for modern venture capital.",
  subheading: "", // No subheading in screenshot
};

export const FEATURES = [
  {
    title: ".vulnerability_scan()",
    description: "Continuous monitoring for CVEs, secrets in code, and logic-based security flaws.",
    icon: "Shield",
    color: "pink",
  },
  {
    title: ".scalability_audit()",
    description: "Predictive modeling of how your architecture handles 10x and 100x traffic spikes.",
    icon: "Layers",
    color: "purple",
  },
  {
    title: ".debt_quantification()",
    description: "We put a dollar amount on your technical debt to help prioritize refactoring efforts.",
    icon: "Network",
    color: "pink",
  },
];

export const FAQS_CONTENT = {
  heading: "Common Questions.",
};

export const FAQS = [
  {
    question: "Is my source code stored on your servers?",
    answer: "No. We use a proprietary \"In-Memory Analyzer\" that processes your AST in a transient execution environment. Once the audit is complete, the workspace is wiped. We never store your code.",
  },
  {
    question: "How long does an average audit take?",
    answer: "Standard repositories under 500k lines of code are typically analyzed in under 60 seconds. Larger monorepos may take up to 3 minutes.",
  },
  {
    question: "What languages do you support?",
    answer: "We support JavaScript, TypeScript, Python, Go, and Rust. Our engine is specifically optimized for modern web stacks and cloud-native architectures.",
  },
  {
    question: "Can I share the report with investors?",
    answer: "Absolutely. Our reports are designed to be investment-grade and are frequently used in Seed to Series B due diligence rounds.",
  },
  {
    question: "Do you offer a refund policy?",
    answer: "If our engine fails to provide a meaningful audit for your repository, we offer a full 100% money-back guarantee.",
  },
  {
    question: "Is this a replacement for a manual audit?",
    answer: "It is a highly effective pre-audit and internal vetting tool. While it catches 90%+ of common vulnerabilities and architectural flaws, it complements final-stage human review.",
  },
  {
    question: "How do you calculate the Readiness Score?",
    answer: "The score is an aggregate of security posture, code maintainability, dependency health, and infrastructure configurations.",
  },
  {
    question: "Can I use this for pre-seed due diligence?",
    answer: "Yes, it's perfect for verifying early-stage codebases before committing to an angel or pre-seed investment.",
  },
];

export const PRICING_CONTENT = {
  eyebrow: "PRICING",
  heading: "Investment-Grade Plans",
  subheading: "ENGINEERING CLARITY FOR TEAMS AND INDIVIDUALS.",
};

export const PRICING_TIERS = [
  {
    name: "STANDARD AUDIT",
    price: "$49",
    description: "/PER_AUDIT",
    features: [
      "UNLIMITED_RESCAN",
      "FULL_ARCH_DEEP_DIVE",
      "PDF_EXPORT",
      "PRIORITY_CI_CD",
    ],
    isHighlighted: true,
    cta: "SELECT STANDARD",
  },
  {
    name: "SERIES A+ AUDIT",
    price: "$149",
    description: "/PER_AUDIT",
    features: [
      "CONTINUOUS_MONITOR",
      "TEAM_ACCESS_5_USERS",
      "SLACK_INTEGRATION",
      "CUSTOM_COMPLIANCE_MAPPING",
    ],
    isHighlighted: false,
    comingSoon: true,
    cta: "COMING SOON",
  },
];

export const REASSURANCES = [
  "YOUR CODE IS NEVER STORED",
  "REPORT READY IN 60 SECONDS",
  "REFUND IF WE FAIL TO DELIVER",
];

export const CTA_CONTENT = {
  heading: "Find out what your investors will see before they do.",
  subheading: "Submit your repository. Get your full audit report in under 60 seconds.",
  cta: "START AUDIT — $49 →",
};

export const EXAMPLE_REPORT_DATA = {
  id: "AUDIT_LOG_0X44",
  repo: "facebook/react",
  date: "24 OCT 2024",
  version: "18.2.0",
  global_score: 94,
  verdict: "Ready to Scale",
  verdict_desc: "Architecture exhibits elite-tier modularity. Minimal technical debt identified in core reconciliation engine. Ready for hyper-scale deployment.",
  metrics: [
    { label: "Security", score: 98, status: "MINIMAL VULNERABILITIES DETECTED", color: "success" },
    { label: "Scalability", score: 91, status: "OPTIMAL CONCURRENT RENDERING", color: "success" },
    { label: "Code Quality", score: 82, status: "COMPLEX LOGIC IN LEGACY HOOKS", color: "warning" },
    { label: "Readiness", score: 95, status: "PRODUCTION ENVIRONMENT READY", color: "success" },
  ],
  findings: [
    {
      title: "Virtual DOM Optimization",
      desc: "Refactor deep nesting in fiber nodes to reduce reconciliation cycles by 12%.",
      priority: "LOW PRIORITY",
      variant: "success" as const,
      icon: "check",
    },
    {
      title: "State Management Bottleneck",
      desc: "Context providers at root causing excessive re-renders in leaf components.",
      priority: "MEDIUM PRIORITY",
      variant: "pink" as const,
      icon: "dots",
    },
    {
      title: "Hydration Error Logging",
      desc: "Improve descriptive warnings during SSR hydration mismatches in dev mode.",
      priority: "LOW PRIORITY",
      variant: "success" as const,
      icon: "check",
    },
    {
      title: "Tree Shaking Efficiency",
      desc: "Dead code detected in experimental concurrent builds. Pruning recommended.",
      priority: "MEDIUM PRIORITY",
      variant: "pink" as const,
      icon: "alert",
    },
    {
      title: "Legacy Hook Deprecation",
      desc: "Finalize migration path for deprecated lifecycle methods in core tests.",
      priority: "LOW PRIORITY",
      variant: "success" as const,
      icon: "check",
    },
  ]
};
