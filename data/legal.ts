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

export const TERMS_CONTENT: LegalContent = {
  eyebrow: "LEGAL INFRASTRUCTURE V1.0",
  heading: "Terms <span class='text-pink-500'>—</span> VibeDiligence",
  lastUpdated: "Last updated: March 2026",
  intro: "VibeDiligence ('Service', 'we', 'us', 'our') is an AI-powered technical audit service accessible at vibediligence.com.",
  acknowledgement: "PLEASE READ THESE TERMS CAREFULLY. BY ACCESSING OR USING VIBEDILIGENCE, OR BY CLICKING 'I AGREE', YOU AGREE TO BE LEGALLY BOUND BY THESE TERMS. IF YOU DO NOT AGREE, DO NOT USE THIS SERVICE.",
  contactLine: "For questions about these Terms, contact us at: support@vibediligence.com",
  sections: [
    {
      id: "1",
      title: "What VibeDiligence Is",
      content: "VibeDiligence provides automated, AI-generated technical review reports on public GitHub repositories. Customers submit a repository URL and receive a scored PDF report covering security patterns, production readiness indicators, code quality signals, and scalability considerations.",
      subsections: [
        {
          title: "1.1 Nature of the Service",
          content: "VibeDiligence is an automated AI-generated review tool. It is expressly NOT:",
          bullets: [
            "A professional security audit, penetration test, or vulnerability assessment",
            "A certification that your application is secure, production-ready, or fit for any purpose",
            "Legal, financial, investment, or professional advice of any kind",
            "A guarantee of accuracy, completeness, or correctness of any finding",
            "A substitute for a qualified security engineer, software architect, or legal professional",
            "An exhaustive analysis of every file, dependency, or configuration in your codebase",
            "A statement that your application complies with any regulatory, legal, or industry standard"
          ],
          nestedContent: "AI-generated reports may contain errors, false positives, false negatives, outdated recommendations, or inapplicable findings. The accuracy of findings depends on the code submitted, the quality of AI analysis at the time, and many factors outside our control. You acknowledge this limitation before purchasing.",
          nestedBullets: [
            "Reports reflect a snapshot of the submitted repository at the time of analysis.",
            "They do not account for changes made after submission, dependencies updated after analysis, or threats that emerge after the report is generated."
          ]
        },
        {
          title: "1.2 No Reliance",
          content: "You acknowledge that you will not rely solely on a VibeDiligence report to make security, deployment, investment, or business decisions without independent verification. VibeDiligence reports are a tool to assist — not replace — your own judgement and qualified professional advice."
        },
        {
          title: "1.3 Service Availability",
          content: "We do not guarantee that the Service will be available at any specific time, uninterrupted, error-free, or free from technical issues. We may suspend, modify, restrict, or discontinue the Service or any part of it at any time, with or without notice, for maintenance, updates, legal reasons, or any other reason. We are not liable for any loss or damage arising from service unavailability or changes to the Service."
        }
      ]
    },
    {
      id: "2",
      title: "Eligibility",
      content: "By using VibeDiligence, you represent and warrant that:",
      bullets: [
        "You are at least 18 years of age",
        "You have full legal capacity to enter into a binding contract",
        "You are not prohibited from receiving or using services under applicable law",
        "You are not located in, or acting on behalf of an entity in, a country subject to international sanctions or embargoes",
        "If using VibeDiligence on behalf of an organisation, you have full authority to bind that organisation to these Terms"
      ]
    },
    {
      id: "3",
      title: "Your Responsibilities",
      subsections: [
        {
          title: "3.1 Repository Submission",
          content: "By submitting a GitHub repository, you represent and warrant that:",
          bullets: [
            "You are the legal owner of the repository, or you have obtained explicit written authorisation from the owner to submit it for analysis",
            "The repository does not contain code, data, or intellectual property that you are prohibited from sharing with third-party AI services (including OpenAI)",
            "You understand that submitting a repository transmits a portion of its contents to OpenAI's API for analysis, and you consent to this transmission",
            "You have reviewed the repository for sensitive data (credentials, API keys, personal data, confidential business information) and accept full responsibility for any such content that may be transmitted as part of the audit process"
          ]
        },
        {
          title: "3.2 Acceptable Use",
          content: "You agree not to:",
          bullets: [
            "Submit repositories you do not own or have authorisation to submit",
            "Attempt to circumvent rate limits, payment requirements, or any access controls",
            "Submit repositories for the purpose of competitive analysis of VibeDiligence's methodology",
            "Use the Service to analyse code containing content that is illegal, harmful, or in violation of third-party rights",
            "Attempt to manipulate, inject, or override AI instructions through code comments or repository content",
            "Reverse-engineer, decompile, or extract proprietary methodology from the Service",
            "Use the Service in any manner that violates applicable laws or regulations",
            "Resell, sublicense, or offer the Service to third parties as your own product"
          ]
        },
        {
          title: "3.3 Accuracy of Information",
          content: "You agree to provide accurate information in the audit submission form. VibeDiligence is not responsible for reduced report accuracy resulting from inaccurate stack information you provide."
        },
        {
          title: "3.4 Security of Your Systems",
          content: "Acting on, or failing to act on, findings in a VibeDiligence audit report is entirely at your own risk. You are solely responsible for the security, stability, and integrity of your own systems and applications."
        }
      ]
    },
    {
      id: "4",
      title: "Payments",
      subsections: [
        {
          title: "4.1 Pricing and Changes",
          content: "The current price for a Basic Audit report is $49 USD as a one-time payment. Prices are subject to change at any time without prior notice. The price displayed on the website at the time of purchase is the price you will be charged. No price changes will affect purchases already completed."
        },
        {
          title: "4.2 Payment Processing — Paddle as Merchant of Record",
          content: "All payments are processed by Paddle.com, which acts as the merchant of record for all transactions. This means Paddle — not VibeDiligence — is the seller of record on your payment statement. By completing a purchase, you also agree to Paddle's Terms of Service and their Privacy Policy.",
          nestedContent: "VibeDiligence does not receive, store, or have access to your payment card details, bank information, or full payment credentials. We receive only a confirmation of successful payment and your email address from Paddle."
        },
        {
          title: "4.3 Taxes",
          content: "As merchant of record, Paddle is responsible for calculating, collecting, and remitting applicable sales taxes, VAT, GST, and similar charges in all applicable jurisdictions. Tax amounts, if any, will be displayed at checkout before you confirm payment."
        },
        {
          title: "4.4 Currency and Exchange",
          content: "All prices are quoted in US Dollars (USD). If your payment method is in a different currency, your bank or payment provider may apply a conversion rate and charge a conversion fee. VibeDiligence has no control over and is not responsible for exchange rates or fees applied by your financial institution."
        },
        {
          title: "4.5 Failed Payments",
          content: "If a payment fails after you have submitted a repository for audit, no report will be generated or delivered. VibeDiligence is not responsible for failed payments caused by your payment provider, insufficient funds, or technical issues outside our control."
        }
      ]
    },
    {
      id: "5",
      title: "Refund Policy",
      subsections: [
        {
          title: "5.1 Circumstances Where a Refund Will Be Issued",
          bullets: [
            "The audit failed entirely to generate a report due to a confirmed technical error on our side, and we are unable to deliver the report within 72 hours of the original submission",
            "You were charged more than once for the same audit due to a billing error",
            "You completed payment but never received your report and our support team is unable to deliver it within 5 business days"
          ]
        },
        {
          title: "5.2 Circumstances Where No Refund Will Be Issued",
          content: "Refunds will not be provided in the following circumstances, and by purchasing you acknowledge and accept this:",
          bullets: [
            "You disagree with, dislike, or wish to dispute the findings, scores, or recommendations in your report — AI-generated reports are not a guarantee of any specific finding",
            "You submitted the incorrect repository URL",
            "You provided inaccurate stack information that affected the report's relevance",
            "You changed your mind after the report was generated, whether or not you have downloaded it",
            "Your repository was private or inaccessible at the time of submission (the Service only supports public repositories, as clearly stated before purchase)",
            "The report did not identify an issue that was subsequently discovered — our reports are not exhaustive",
            "More than 30 days have passed since the date of purchase",
            "You found a cheaper or alternative service after purchasing",
            "Your use of the report did not produce the business outcome you expected"
          ]
        },
        {
          title: "5.3 Refund Process",
          content: "To request a refund under Section 5.1, email support@vibediligence.com with your purchase email address and audit ID (available in your Paddle receipt). We will respond within 5 business days. Approved refunds are issued back to the original payment method via Paddle, subject to Paddle's processing timelines (typically 5–10 business days)."
        }
      ]
    },
    {
      id: "6",
      title: "Intellectual Property",
      subsections: [
        {
          title: "6.1 Our Intellectual Property",
          content: "All elements of VibeDiligence — including but not limited to the website, software, audit methodology, scoring system, report format, branding, copy, design, and all content we create — are the exclusive intellectual property of VibeDiligence and protected by applicable copyright, trademark, and other intellectual property laws. You may not reproduce, copy, distribute, reverse-engineer, or create derivative works from our content without our express prior written consent."
        },
        {
          title: "6.2 Your Audit Report",
          content: "Upon full payment, you are granted a non-exclusive, non-transferable licence to use your purchased audit report for your own internal business purposes. You may share it with your team, investors, or developers in the context of your own project. You may not:",
          bullets: [
            "Resell, sublicense, or distribute audit reports as a commercial product or service",
            "Represent an audit report as having been independently produced by a human security professional",
            "Use audit report content to train, fine-tune, or develop competing AI systems"
          ]
        },
        {
          title: "6.3 Your Repository",
          content: "We make no claim of ownership over any code, content, or intellectual property contained in your repository. Submitting a repository for analysis does not grant VibeDiligence any licence, ownership, or rights over your code beyond what is necessary to deliver the Service."
        }
      ]
    },
    {
      id: "7",
      title: "AI Disclaimer",
      content: "VibeDiligence uses large language models (LLMs), specifically OpenAI's API, to generate audit findings. You acknowledge and accept the following:",
      bullets: [
        "AI-generated content can be incorrect, misleading, incomplete, or hallucinated",
        "The same repository analysed twice may produce different results due to the probabilistic nature of AI",
        "AI models have knowledge cutoff dates and may not be aware of newly discovered vulnerabilities or best practices",
        "Findings described in specific technical language may not accurately reflect the actual issue in your codebase",
        "VibeDiligence does not manually review, verify, or validate AI-generated findings before delivery",
        "Acting on AI-generated recommendations without independent expert review is done entirely at your own risk"
      ],
      footer: "The AI disclaimer in this section applies to all report content and is incorporated by reference into the Disclaimer of Warranties (Section 8) and Limitation of Liability (Section 9)."
    },
    {
      id: "8",
      title: "Disclaimer of Warranties",
      important: "TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, VIBEDILIGENCE AND ALL CONTENT, REPORTS, AND SERVICES PROVIDED THROUGH IT ARE OFFERED ON AN 'AS IS' AND 'AS AVAILABLE' BASIS, WITHOUT ANY WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.",
      content: "Without limiting the foregoing, VibeDiligence expressly disclaims:",
      bullets: [
        "Any implied warranty of merchantability, fitness for a particular purpose, or non-infringement",
        "Any warranty that the Service will be uninterrupted, timely, error-free, or secure",
        "Any warranty that audit reports are accurate, complete, current, or suitable for any specific purpose",
        "Any warranty that implementing audit recommendations will improve the security, performance, or quality of your application",
        "Any warranty that the Service will identify all vulnerabilities, issues, or risks present in your codebase",
        "Any warranty regarding the suitability of the Service for regulated industries, compliance requirements, or legal obligations"
      ],
      footer: "Some jurisdictions do not permit the exclusion of certain implied warranties. In such jurisdictions, the above exclusions apply to the maximum extent permitted by law."
    },
    {
      id: "9",
      title: "Limitation of Liability",
      important: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL VIBEDILIGENCE BE LIABLE FOR:",
      bullets: [
        "Any indirect, incidental, special, consequential, exemplary, or punitive damages of any kind",
        "Loss of profits, revenue, business, contracts, data, goodwill, or anticipated savings",
        "Security breaches, data loss, system failures, downtime, or damages to your application or infrastructure — whether or not a VibeDiligence report identified, failed to identify, or made recommendations related to the issue",
        "Any loss or damage arising from your reliance on or use of AI-generated report content",
        "Any decision, action, or omission made on the basis of a VibeDiligence report",
        "Any third-party claims arising from the content of your repository or your use of the Service",
        "Any loss arising from your failure to independently verify audit findings with qualified professionals"
      ],
      footer: "IN ALL CASES, VIBEDILIGENCE'S TOTAL CUMULATIVE LIABILITY TO YOU ARISING OUT OF OR RELATED TO THESE TERMS OR YOUR USE OF THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU ACTUALLY PAID FOR THE SPECIFIC AUDIT REPORT GIVING RISE TO THE CLAIM."
    },
    {
      id: "10",
      title: "Indemnification",
      content: "You agree to defend, indemnify, and hold harmless VibeDiligence from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or relating to:",
      bullets: [
        "Your use or misuse of the Service",
        "Your breach of any provision of these Terms",
        "Your violation of any applicable law or regulation",
        "Your violation of any third-party rights, including intellectual property rights or privacy rights",
        "Any content, code, or data contained in repositories you submit for analysis",
        "Any claim by a third party arising from actions you took or failed to take based on a VibeDiligence audit report"
      ]
    }
  ],
  faqs: [
    {
      question: "11. Third-Party Services",
      answer: "VibeDiligence integrates with third-party services including Paddle, OpenAI, Supabase, Vercel, GitHub, and Resend. These services are independent of VibeDiligence and are governed by their own terms and policies. We are not responsible for the availability, accuracy, or reliability of any third-party service; any changes, outages, or data handling practices of third-party providers; any terms, pricing, or policies imposed by third-party services; or losses arising from third-party service failures that affect our ability to deliver the Service."
    },
    {
      question: "12. Force Majeure",
      answer: "VibeDiligence shall not be liable for any failure or delay in performing our obligations under these Terms caused by circumstances beyond our reasonable control, including but not limited to: natural disasters, acts of government, war, terrorism, civil unrest, power failures, internet outages, cyberattacks, third-party service outages (including OpenAI, GitHub, Supabase, Vercel, or Paddle), pandemics, or any other event of force majeure."
    },
    {
      question: "13. Termination and Suspension",
      answer: "We reserve the right to suspend or permanently terminate your access to VibeDiligence at any time, immediately and without notice, at our sole discretion, if we reasonably believe: You have breached any provision of these Terms; You are engaging in fraudulent, abusive, or harmful behaviour; Your use of the Service poses a risk to other users or our systems; or We are required to do so by applicable law or legal process."
    },
    {
      question: "14. Changes to These Terms",
      answer: "We reserve the right to modify these Terms at any time. The updated Terms will be posted on this page with a revised 'Last updated' date. Your continued use of VibeDiligence after any modification constitutes your acceptance of the revised Terms. For material changes, we will make reasonable efforts to provide advance notice by posting a notice on our website."
    },
    {
      question: "15. Governing Law and Disputes",
      answer: "These Terms are governed by and construed in accordance with internationally recognised principles of contract law. Before initiating formal legal proceedings, you agree to contact us and attempt to resolve any dispute through good-faith negotiation. We commit to making reasonable efforts to address your concern within 14 business days."
    },
    {
      question: "16. Severability",
      answer: "If any provision of these Terms is found to be invalid, unenforceable, or contrary to applicable law, that provision shall be modified to the minimum extent necessary to make it enforceable. If modification is not possible, the provision shall be severed. The remaining provisions of these Terms shall remain in full force and effect."
    },
    {
      question: "17. No Waiver",
      answer: "Our failure to enforce any right or provision of these Terms shall not constitute a waiver of that right or provision. Any waiver of a specific breach shall not constitute a waiver of any subsequent breach of the same or any other provision."
    },
    {
      question: "18. Entire Agreement",
      answer: "These Terms, together with our Privacy Policy, constitute the entire and exclusive agreement between you and VibeDiligence with respect to your use of the Service. They supersede all prior agreements, communications, and understandings — whether written or oral — relating to the subject matter herein."
    },
    {
      question: "19. Contact",
      answer: "For questions about these Terms: Email support@vibediligence.com. Response time: We aim to respond within 10 business days. Language of communication: English."
    }
  ],
  contact: {
    title: "Legal Contact",
    description: "Questions regarding these terms? contact:",
    email: "support@vibediligence.com"
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
  },
  contact: {
    title: "Security Contact",
    description: "Questions regarding our security infrastructure? contact:",
    email: "support@vibediligence.com"
  }
};
