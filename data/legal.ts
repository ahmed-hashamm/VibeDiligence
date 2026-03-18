/**
 * @file legal.ts
 * @description Central data for legal and compliance pages.
 */

import { Shield, Lock, Zap, Server } from "lucide-react";

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
  eyebrow: "SECURITY",
  heading: "Security — VibeDiligence",
  subheading: "Last updated: June 2024",
  mainBody: "VibeDiligence products and services are built on a foundation of trust. We are dedicated to ensuring that your information and our infrastructure is secure, so you can focus on your core experience. This sheet summarizes the security features we've implemented — should you wish to dive deeper, our documentation will expand on these features.",
  pillars: [
    {
      title: "Responsible Disclosure",
      icon: "Shield",
      description: "If you discover a potential vulnerability in VibeDiligence, please report it to our security team before publishing it so that we can verify and fix it.",
      rules: [
        "Report it to security@vibediligence.com",
        "Allow us a reasonable time to respond before making the information public.",
        "Do not use the vulnerability to destroy or steal data, or to access any other VibeDiligence accounts."
      ],
      note: "We do not currently offer a bug bounty program but we do offer 'hall of fame' recognition for researchers who identify and report valid vulnerabilities."
    },
    {
      title: "Data Protection",
      icon: "Lock",
      features: [
        { label: "Encryption in Transit", desc: "All data sent to and from VibeDiligence is encrypted in transit using industry-standard TLS." },
        { label: "Encryption at Rest", desc: "All sensitive data is encrypted at rest using AES-256 encryption. This includes database backups, file uploads, and log data." },
        { label: "Data Minimization", desc: "We only collect and store the data necessary to provide our services. We do not store any sensitive user information that is not essential to the core functionality." },
        { label: "Regular Audits", desc: "We perform regular security audits and vulnerability scans to identify and address potential security risks." }
      ]
    },
    {
      title: "Payment Security",
      icon: "Zap",
      description: "VibeDiligence uses Paddle for payment processing. Paddle is a PCI DSS Level 1 compliant service provider. All payment information is stored and processed by Paddle — VibeDiligence does not store any payment information on our servers."
    },
    {
      title: "Infrastructure Security",
      icon: "Server",
      features: [
        { label: "Provider Security", desc: "We use Google Cloud Platform (GCP) for our infrastructure. GCP provides world-class security and compliance." },
        { label: "Container Security", desc: "All our applications run in secure containers, which are regularly updated and scanned for vulnerabilities." },
        { label: "Network Security", desc: "We use firewalls and VPCs to restrict access to our infrastructure and isolate our applications and data." },
        { label: "DDoS Protection", desc: "Our infrastructure is protected against DDoS attacks by GCP's built-in DDoS protection." }
      ]
    },
    {
      title: "Application Security",
      icon: "ShieldCheck",
      features: [
        { label: "Code Reviews", desc: "All code changes are reviewed by another engineer and scanned for vulnerabilities before being deployed to production." },
        { label: "Static Analysis", desc: "We use static analysis tools to automatically scan our codebase for common security issues." },
        { label: "Dependency Scanning", desc: "We use tools to monitor our dependencies for known vulnerabilities and keep them up to date." },
        { label: "Auth & Authorization", desc: "We use industry-standard authentication and authorization mechanisms to control access to our applications and data." }
      ]
    }
  ],
  headers: [
    { name: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    { name: "X-Frame-Options", value: "DENY" },
    { name: "X-Content-Type-Options", value: "nosniff" },
    { name: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.google-analytics.com; connect-src 'self' https://v4.p.pndsn.com https://www.google-analytics.com;" },
    { name: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { name: "X-XSS-Protection", value: "1; mode=block" },
  ],
  whatWeDoNotDo: [
    "We do not sell user data to third parties.",
    "We do not share user data with advertisers.",
    "We do not use user data for any purpose other than providing and improving our services.",
    "We do not store any sensitive user information that is not essential to the core functionality of VibeDiligence."
  ],
  reporting: {
    title: "Reporting Vulnerability",
    description: "If you have any questions or want to report a vulnerability, please reach out to us at",
    email: "security@vibediligence.com"
  }
};
