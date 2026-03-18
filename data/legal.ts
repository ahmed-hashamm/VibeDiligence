/**
 * @file legal.ts
 * @description Central data for legal and compliance pages.
 */

import { Shield, Lock, Zap, Server, CreditCard, Cloud } from "lucide-react";

export const PRIVACY_CONTENT = {
  eyebrow: "Legal",
  heading: "Privacy Policy — VibeDiligence",
  subheading: "Last updated: March 18, 2024. Your privacy and IP protection are our highest priorities.",
  sections: [
    {
      title: "1. Information We Collect",
      content: "We collect repository URLs and temporary access tokens to perform audits. We also collect basic account information if you choose to create a profile."
    },
    {
      title: "2. How We Use Your Data",
      content: "Your code is analyzed in real-time in isolated, ephemeral environments. We never use your proprietary code to train our AI models."
    },
    {
      title: "3. Data Security",
      content: "We implement industry-standard encryption and security protocols (AES-256) to protect your project metadata and report results."
    },
    {
      title: "4. Third-Party Services",
      content: "We use Paddle for payments and Supabase for database management. These partners are compliant with global privacy standards (GDPR/CCPA)."
    },
    {
      title: "5. Your Rights",
      content: "You have the right to request deletion of your data and results at any time. Reports are stored for your convenience but can be wiped upon request."
    }
  ],
  contact: {
    title: "Contact Us",
    description: "For any privacy-related inquiries, please email:",
    email: "privacy@vibediligence.com"
  }
};

export const TERMS_CONTENT = {
  eyebrow: "Legal",
  heading: "Terms of Service",
  subheading: "Last updated: March 18, 2024. Please read these terms carefully before starting an audit.",
  sections: [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using VibeDiligence, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service."
    },
    {
      title: "2. Scope of Service",
      content: "VibeDiligence provides automated technical audits. These reports are for informational purposes only and do not constitute financial or legal advice."
    },
    {
      title: "3. User Responsibilities",
      content: "You are responsible for ensuring you have the legal right to audit the repositories you submit. We are not liable for unauthorized project submissions."
    },
    {
      title: "4. Payments & Refunds",
      content: "Audits are one-time purchases via Paddle. Due to the immediate delivery of digital reports, refunds are only issued for technical failures."
    },
    {
      title: "5. Intellectual Property",
      content: "You retain all rights to your code. VibeDiligence retains all rights to the audit technology, report formats, and the 'Vibe' scoring methodology."
    },
    {
      title: "6. Limitation of Liability",
      content: "VibeDiligence is provided 'as-is'. We are not liable for decisions made based on audit results or any indirect damages arising from service use."
    }
  ],
  contact: {
    title: "Legal Contact",
    description: "Questions regarding these terms? contact:",
    email: "legal@vibediligence.com"
  }
};

export const SECURITY_CONTENT = {
  eyebrow: "SECURITY — VIBEDILIGENCE",
  heading: "Security <span class='text-pink-500'>—</span> VibeDiligence",
  subheading: "Last updated: March 2026",
  metadata: [
    { icon: "Calendar", text: "Last updated: March 2026" },
    { icon: "ShieldCheck", text: "Verified Infrastructure" }
  ],
  mainBody: "VibeDiligence is a product that audits code for security issues. We hold our own infrastructure and practices to the same standards we recommend. This page describes our security posture honestly — including what we do, what we do not do, and where we rely on third parties.",
  pillars: [
    {
      title: "Responsible Disclosure",
      icon: "Shield",
      intro: "If you discover a potential security vulnerability in VibeDiligence, please report it to us privately before disclosing it publicly.",
      contact: {
        email: "support@vibediligence.com",
        subject: "[SECURITY] Brief description"
      },
      includeInReport: [
        "A clear description of the potential vulnerability",
        "Steps to reproduce or demonstrate the issue",
        "The URL, endpoint, or component affected",
        "Your assessment of the potential impact",
        "Any relevant screenshots, payloads, or logs"
      ],
      whatToExpect: [
        "We will acknowledge receipt of your report within 72 hours",
        "We will investigate and provide a status update within 10 business days",
        "We will notify you when the issue is resolved (if it is confirmed and fixed)"
      ],
      commitment: "Our commitment: We will not pursue legal action against researchers who discover and report vulnerabilities in good faith, who do not access, modify, exfiltrate, or destroy data beyond what is minimally necessary to demonstrate the issue, and who give us reasonable time to respond before any public disclosure.",
      footerNote: "We do not operate a paid bug bounty programme at this time. We will acknowledge researchers publicly with their permission if a valid vulnerability is reported and addressed.",
      outOfScope: "Out of scope: Reports relating to our third-party service providers (Paddle, OpenAI, Supabase, Vercel, GitHub) should be directed to those organisations directly."
    },
    {
      title: "Data Protection",
      icon: "Shield",
      encryptionTransit: "All communication between your browser and VibeDiligence is encrypted using HTTPS with TLS 1.2 or higher. We do not support unencrypted HTTP — all HTTP requests are redirected to HTTPS automatically. All communication between our server-side application and third-party APIs (OpenAI, GitHub, Supabase, Paddle, Resend) uses HTTPS.",
      encryptionRest: "Data stored in our Supabase-managed database is encrypted at rest using AES-256, managed by the underlying AWS infrastructure.",
      repositoryData: {
        intro: "We apply the following practices to repository content:",
        practices: [
          "We only analyse public repositories. We do not use GitHub OAuth and do not request access to private repositories.",
          "We fetch selectively. Only files matching audit-relevant patterns (authentication, API routes, database schema, configuration files) are fetched — not every file in the repository.",
          "Content is processed in memory. Fetched file contents are transmitted to OpenAI's API for analysis and are not intentionally written to persistent storage.",
          "Structured results only are stored. Our database stores audit scores, findings, and recommendations — not raw source code.",
          "We cannot control OpenAI's data practices. Content sent to OpenAI's API is subject to OpenAI's own data usage and retention policies. Refer to OpenAI's privacy policy at openai.com/policies for details."
        ]
      },
      caution: "We strongly recommend that you do not submit repositories containing unrevoked secrets, production credentials, or sensitive personal data. If your repository contains secrets, rotate them before submitting. VibeDiligence is not liable for the consequences of secrets that exist in your repository and are transmitted as part of the audit process."
    },
    {
      title: "Payment Security",
      icon: "CreditCard",
      intro: "We do not handle, process, or store payment card data. All payment processing is handled exclusively by Paddle, which is PCI-DSS Level 1 compliant — the highest level of payment industry security certification.",
      practices: [
        "Your card number, expiry, CVV, and bank details never reach our servers",
        "We receive only a payment confirmation event (via webhook) and your email address after a successful transaction",
        "All payment webhooks from Paddle are verified using HMAC-SHA256 signature verification with constant-time comparison before any processing occurs"
      ]
    },
    {
      title: "Infrastructure Security",
      icon: "Cloud",
      sections: [
        {
          label: "Hosting and Compute",
          desc: "VibeDiligence runs on Vercel, providing automatic HTTPS, network-level DDoS protection, and isolated serverless function execution with no persistent state between requests."
        },
        {
          label: "Database",
          desc: "Managed by Supabase with Row Level Security (RLS) enabled. All application access uses a server-side service role key; anonymous keys have no privileges on data tables."
        },
        {
          label: "Secret Management",
          desc: "All sensitive credentials are stored as encrypted environment variables in Vercel. They are never committed to version control, exposed to the client, or logged."
        }
      ]
    },
    {
      title: "Application Security",
      icon: "Bug",
      features: [
        { label: "Input Validation", desc: "All user-submitted data is validated on the server using Zod schemas. GitHub URLs, dropdown selections, and audit IDs are strictly validated against regex and allowlists." },
        { label: "SSRF Prevention", desc: "GitHub URLs are never fetched directly. They are parsed via regex to construct API endpoints, and every blob URL is verified to belong to the GitHub API domain before fetching." },
        { label: "Prompt Injection Defence", desc: "Code content is wrapped in XML delimiters. The system prompt instructs the AI to ignore instructions in the code. AI output is validated against a strict JSON schema." },
        { label: "Rate Limiting", desc: "Enforced 5 audits per IP/hour and 30 PDF downloads per IP/hour. Oversized request bodies are rejected before parsing to prevent resource exhaustion." }
      ]
    }
  ],
  headers: [
    { name: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    { name: "X-Frame-Options", value: "DENY" },
    { name: "X-Content-Type-Options", value: "nosniff" },
    { name: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { name: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    { name: "Content-Security-Policy", value: "Restricted to known sources only (Mitigates XSS and injection)" },
  ],
  headerFooter: "The Content Security Policy restricts network requests from the browser to only: our own domain, GitHub API, OpenAI API, and Supabase — no other external connections are permitted.",
  whatWeDoNotDo: [
    "We do not store your source code or repository file contents",
    "We do not access private GitHub repositories",
    "We do not use your code or audit results to train AI models",
    "We do not log your repository file contents or audit findings to our server logs",
    "We do not store, log, or have access to your payment card details",
    "We do not use your data for advertising or sell it to third parties",
    "We do not retain data beyond the periods described in our Privacy Policy"
  ],
  limitations: {
    title: "Limitations and Honest Disclosures",
    intro: "We believe in being transparent about what our security measures cannot guarantee:",
    items: [
      { title: "No system is completely secure.", desc: "Despite our measures, we cannot guarantee that VibeDiligence is immune to all security threats, breaches, or attacks." },
      { title: "Third-party security is outside our direct control.", desc: "We rely on Paddle, OpenAI, Supabase, Vercel, and GitHub. Their security postures affect our overall security. We select reputable providers but cannot independently audit them." },
      { title: "AI analysis is probabilistic.", desc: "The AI component may miss vulnerabilities, produce incorrect findings, or behave unexpectedly. Audit reports are not a security guarantee." },
      { title: "Code content reaches OpenAI.", desc: "Selected file contents from your repository are transmitted to OpenAI's API. OpenAI's data handling is governed by their own policies." }
    ]
  },
  reporting: {
    title: "Reporting a Vulnerability",
    email: "support@vibediligence.com",
    subject: "[SECURITY] Brief description of the issue",
    thankYou: "We appreciate the security research community and will handle all reports professionally and confidentially."
  }
};
