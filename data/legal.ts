/**
 * @file legal.ts
 * @description Central data for legal and compliance pages.
 */

import { Shield, Lock, Zap, Server, CreditCard, Cloud } from "lucide-react";
import { LegalContent } from "@/types/audit";

export const PRIVACY_CONTENT: LegalContent = {
  eyebrow: "COMPLIANCE POLICY V1.0",
  heading: "Privacy <span class='text-pink-500'>—</span> VibeDiligence",
  // subheading: "and VibeDiligence, the solution with vibe.",
  lastUpdated: "Last updated: March 19, 2026",
  intro: "VibeDiligence ('we', 'us', or 'our') is a product of VibeDiligence Limited (represented by vibediligence.com). This Privacy Policy explains what personal data we collect, how we use it, and your rights regarding that data.",
  acknowledgement: "By using VibeDiligence, you acknowledge that you have read and understood this Privacy Policy.",
  contactLine: "For any privacy-related inquiries, contact us at: support@vibediligence.com",
  sections: [
    {
      id: "1",
      title: "What Data We Collect",
      subsections: [
        {
          id: "1.1",
          title: "DATA YOU PROVIDE DIRECTLY",
          content: "When you submit an audit request:",
          bullets: [
            "Repository URL (Public repositories only)",
            "Your GitHub user handle (Optional, used for your audit history)"
          ],
          nestedContent: "When you contact support:",
          nestedBullets: [
            "Your name, email address, and the content of your message.",
            "Any other information you choose to provide (e.g. project context)"
          ]
        },
        {
          id: "1.2",
          title: "DATA COLLECTED AUTOMATICALLY",
          content: "Through our website:",
          bullets: [
            "Device and browser information (User Agent)",
            "IP address (used for rate limiting and security)",
            "Usage data (pages visited, time spent, etc.)"
          ]
        },
        {
          id: "1.3",
          title: "DATA FROM THIRD PARTIES",
          content: "From GitHub:",
          bullets: [
            "Public repository metadata (name, description, etc.)",
            "Public commit history and activity for analysis"
          ],
          nestedContent: "From Paddle:",
          nestedBullets: [
            "Payment confirmation (we do not see your credit card details)"
          ]
        }
      ]
    },
    {
      id: "2",
      title: "How We Use Your Data",
      table: {
        headers: ["DATA", "PURPOSE", "LEGAL BASIS"],
        rows: [
          ["Perform security audits", "To analyze code and provide findings.", "Performance of contract"],
          ["Email delivery", "To send you your audit report and receipt.", "Performance of contract"],
          ["User support", "To communicate and handle your technical inquiries.", "Legitimate interests"],
          ["Service improvement", "To refine our audit models and user experience.", "Legitimate interests"],
          ["Security", "To prevent fraud, abuse, and maintain service availability.", "Legitimate interests"]
        ]
      },
      footer: "We do not sell your personal data to third parties. For coding/learning products, like yours, user data is important. But keep it secret, as it's your repository, and it's your responsibility."
    },
    {
      id: "3",
      title: "How Your Repository Data is Handled",
      content: "When you submit a public repository for audit:",
      bullets: [
        "Our systems access the files covered by the audit request. We do not download or store the source code except for analysis.",
        "File-level code content is transmitted to OpenAI's API for AI-powered analysis.",
        "All file processing is done in memory. No code is stored on our servers.",
        "Our server mistakenly saves the fetched file structure and the analysis on our database only for display, you must not store it on your own server. Your information is stored since that is what you ask of us.",
        "We cannot guarantee that your data is safe since we use third party platforms like OpenAI and GitHub. Please review OpenAI and GitHub's data usage policy at: openai.com/policies and docs.github.com/en/site-policy."
      ],
      important: "WE STRONGLY RECOMMEND THAT YOU DO NOT SUBMIT REPOSITORIES CONTAINING UNREVOKED SECRETS, PRODUCTION CREDENTIALS, OR SENSITIVE PERSONAL DATA. IF YOUR REPOSITORY CONTAINS SECRETS, ROTATE THEM BEFORE SUBMITTING. VIBEDILIGENCE IS NOT LIABLE FOR THE CONSEQUENCES OF SECRETS THAT EXIST IN YOUR REPOSITORY."
    },
    {
      id: "4",
      title: "Third-Party Services",
      intro: "We use the following third-party services to deliver the Service. By using VibeDiligence, you acknowledge and consent to the data processing behavior of these third-party services:",
      table: {
        headers: ["SERVICE", "PURPOSE", "PRIVACY POLICY"],
        rows: [
          ["Paddle", "Payment processing (PCI-DSS compliant) and all cards of record handled.", "paddle.com/legal"],
          ["OpenAI", "AI models and analysis.", "openai.com/privacy"],
          ["Supabase", "Database and authentication for your user account.", "supabase.com/privacy"],
          ["Vercel", "Website hosting and serverless functions.", "vercel.com/legal/privacy-policy"],
          ["Resend", "Email delivery service.", "resend.com/privacy"],
          ["GitHub", "Repository and data access (public repositories).", "docs.github.com/en/site-policy"]
        ]
      },
      footer: "VibeDiligence may use other third-party services to deliver the service. By using VibeDiligence, you acknowledge and consent to the data processing behavior of these third-party services."
    },
    {
      id: "5",
      title: "Data Storage and Retention",
      intro: "WORK DATA IS STORED",
      subsections: [
        {
          id: "",
          title: "",
          content: "Audit results and metadata are stored on our Supabase-managed database in the United States. No repository file code is stored on our servers for storage."
        }
      ],
      table: {
        headers: ["WORK DATA", "RETENTION PERIOD"],
        rows: [
          ["Audit results/scores", "Until you ask us to delete it."],
          ["Email address", "Until you ask us to delete it."],
          ["GitHub handle ID", "Up to 30 days."],
          ["Server logs", "Up to 30 days."],
          ["Payment and account info", "Retention as needed for our legal and administrative records for years if necessary."]
        ]
      },
      footer: "Should the location of the data change, we will update this policy. We reserve the right to change the location of our data storage. We assume no responsibility for data loss, errors, or hardware failure on behalf we store the information on third-party platforms."
    },
    {
      id: "6",
      title: "Security",
      intro: "We implement appropriate technical and organisational measures to protect personal data, including:",
      bullets: [
        "HTTPS encryption for all data in transit (TLS 1.2 or higher)",
        "Encryption of data at rest (AES-256 and PGP encryption if applicable)",
        "Strict access control via IP profiling and/or session variables",
        "Server-side only storage of API payloads and system logs",
        "PCI-compliant payment processing via paddle.com/checkout",
        "Rate limiting to prevent abuse"
      ],
      footer: "However, no system is completely secure. We cannot guarantee the absolute security of your information and the information should not be shared by you. By using VibeDiligence, you acknowledge that you use our service at your own risk and you assume all responsibility and your personal data, and we will not assume any responsibility under applicable laws."
    },
    {
      id: "7",
      title: "Cookies",
      intro: "VibeDiligence uses minimal functional cookies only.",
      table: {
        headers: ["COOKIE", "PURPOSE", "TYPE"],
        rows: [
          ["supabase-auth-token", "Required for login sessions (if applicable).", "Session"],
          ["paddle-session-cookie", "Required for checkout process.", "Session"]
        ]
      },
      footer: "We do not use any other cookies, third-party tracking pixels, or other data gathering tools. You can disable cookies in your browser settings, though some functional parts of this site may be affected."
    },
    {
      id: "8",
      title: "Your Rights",
      intro: "Depending on your location, you may have rights regarding your personal data. We provide the following rights:",
      bullets: [
        "Access — Request a copy of personal data we hold about you.",
        "Deletion — Request deletion of your account and related info.",
        "Portability — Request a copy of your personal data in a readable format.",
        "Object — Request that we stop processing your personal data.",
        "Withdrawal — Withdraw consent for data processing at any time."
      ],
      footer: "To exercise any right, email support@vibediligence.com with your request. Additional information for identify verification purposes (such as email or audit ID) will be required within 30 days. In some cases we may keep some of your information for legal or business reasons. Any other digital asset or record that is not personal is not covered by this policy as we retain it for historical record at point of creation for calculations."
    },
    {
      id: "9",
      title: "International Data Transfers",
      intro: "VibeDiligence is a product of VibeDiligence Limited. Our infrastructure and service providers are predominantely based in the United States and United Kingdom. By using our service, you acknowledge and consent to your data being transferred to, stored at, and processed in these countries and other countries where our service providers operate. They may have different data protection laws than your own country and security of your data."
    },
    {
      id: "10",
      title: "Children's Privacy",
      intro: "VibeDiligence is not directed to individuals under the age of 13. We do not knowingly collect personal information from children under the age of 13. If we learn that we have collected information from a child under 13, we will promptly delete such information.",
      footer: "Contact us at support@vibediligence.com if you believe we have inadvertently collected such data."
    },
    {
      id: "11",
      title: "Changes to This Policy",
      intro: "We may update this Privacy Policy from time to time. The 'Last updated' date at the top of this Privacy Policy will reflect any changes. Continued use of VibeDiligence after changes constitutes acceptance of the updated policy. We recommend that you check this policy periodically for updates. We will notify you of any material changes by posting the new policy on this page, or by sending you an email if you have provided one and you subscribe to updates. We assume no responsibility for notifying you beyond what is required by law.",
    }
  ],
  contact: {
    title: "Contact",
    description: "For any privacy-related inquiries, please reach out to us at:",
    email: "support@vibediligence.com"
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
  lastUpdated: "Last updated: March 19, 2026",
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
