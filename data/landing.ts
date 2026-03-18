export const TRUST_SIGNALS = [
  { name: "TechStars", logo: "/logos/techstars.svg" },
  { name: "Y Combinator", logo: "/logos/yc.svg" },
  { name: "Sequoia", logo: "/logos/sequoia.svg" },
  { name: "Andreessen Horowitz", logo: "/logos/a16z.svg" },
];

export const LANDING_STATS = [
  { value: "85%", label: "Reduction in audit costs" },
  { value: "24h", label: "Average turnaround time" },
  { value: "+100", label: "Projects audited this month" },
];

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

export const STEPS = [
  {
    number: "01",
    title: "Source Integration",
    description: "Connect your GitHub repository securely in seconds.",
  },
  {
    number: "02",
    title: "Deep Read-Only Scrutiny",
    description: "Our platform scans for production readiness, security, and scalability.",
  },
  {
    number: "03",
    title: "Investment-Grade Report",
    description: "Receive a comprehensive PDF with scores, issues, and a clear verdict.",
  },
];

export const FEATURES = [
  {
    title: "AUTOMATED SCANNING",
    description: "Continuous monitoring of your repository.",
    icon: "Shield",
  },
  {
    title: "SECURITY AUDITS",
    description: "Identify vulnerabilities before they reach production.",
    icon: "Lock",
  },
  {
    title: "CODE QUALITY",
    description: "Metrics on readability, maintainability, and complexity.",
    icon: "Code",
  },
];

export const FAQS = [
  {
    question: "Is my code secure?",
    answer: "Yes, we use read-only ephemeral sessions and never store your source code.",
  },
  {
    question: "How long does an audit take?",
    answer: "Our automated engine delivers full results in under 24 hours.",
  },
  {
    question: "What frameworks do you support?",
    answer: "We support Next.js, React, Node.js, and most modern web frameworks.",
  },
  {
    question: "Does this replace a human audit?",
    answer: "It complements and accelerates human review by catching low-level issues instantly.",
  },
];

export const PRICING_TIERS = [
  {
    name: "AUDIT",
    price: "$49",
    description: "Perfect for single project due diligence.",
    features: [
      "3-Factor Scan (Security, Quality, Readiness)",
      "24-Hour Delivery",
      "Private Dashboard Teaser",
    ],
    isHighlighted: false,
    cta: "START AUDIT",
  },
  {
    name: "PROFESSIONAL",
    price: "$149",
    description: "For serious investors & technical teams.",
    features: [
      "Full Stack Diligence",
      "DDO-Grade PDF Report",
      "Investment Readiness Scoring",
      "Direct Analyst Email Support",
    ],
    isHighlighted: true,
    cta: "GO PREMIUM",
  },
];

export const REASSURANCES = [
  "No subscription. Pay per audit.",
  "Trusted by leading VCs.",
  "100% Secure & Confidential.",
];
