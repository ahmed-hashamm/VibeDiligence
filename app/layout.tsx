/**
 * @file layout.tsx
 * @description Root layout for the VibeDiligence application.
 * Defines fonts, metadata, and core structure (Navbar/Footer).
 */

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-var" });

/**
 * Metadata for the application.
 */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://vibediligence.tech"),
  title: {
    default: "VibeDiligence — Premium GitHub Repo Audits",
    template: "%s | VibeDiligence",
  },
  description: "Advanced repo auditing for technical due diligence. Get instant security, scalability, and quality scores for any repository.",
  keywords: ["GitHub Audit", "Technical Due Diligence", "Code Quality", "Security Scan", "SaaS Audit", "VibeDiligence"],
  authors: [{ name: "VibeDiligence Team" }],
  creator: "VibeDiligence",
  publisher: "VibeDiligence",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vibediligence.tech",
    siteName: "VibeDiligence",
    title: "VibeDiligence — Premium GitHub Repo Audits",
    description: "Advanced repo auditing for technical due diligence. Get instant security, scalability, and quality scores.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VibeDiligence — Premium GitHub Repo Audits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeDiligence — Premium GitHub Repo Audits",
    description: "Advanced repo auditing for technical due diligence.",
    images: ["/og-image.png"],
    creator: "@vibediligence",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

/**
 * RootLayout component.
 * Provides the global HTML/Body structure and common UI elements.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "VibeDiligence",
    "operatingSystem": "Web",
    "applicationCategory": "DeveloperApplication",
    "description": "Advanced GitHub repository auditing for technical due diligence. Get instant security, scalability, and quality scores.",
    "offers": {
      "@type": "Offer",
      "price": "49.00",
      "priceCurrency": "USD"
    }
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Support for Spline custom element */}
        <script
          type="module"
          src="https://unpkg.com/@splinetool/viewer@1.12.69/build/spline-viewer.js"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn(inter.variable, jetbrains.variable, "bg-bg text-primary antialiased")}>
        <Navbar />
        {children}
        <Footer />

        {/* Paddle.js SDK */}
        <Script
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          strategy="afterInteractive"
        />
        <Script
          id="paddle-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function initPaddle() {
                if (typeof Paddle !== 'undefined' && Paddle.Environment && Paddle.Initialize) {
                  Paddle.Environment.set("sandbox");
                  Paddle.Initialize({
                    token: "${process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || ''}",
                    eventCallback: function(event) {
                      if (event.name === "checkout.completed") {
                        const auditId = event.data?.custom_data?.audit_id || "";
                        window.dispatchEvent(
                          new CustomEvent("paddle:checkout-completed", { detail: auditId })
                        );
                      }
                    }
                  });
                } else {
                  setTimeout(initPaddle, 200);
                }
              })();
            `,
          }}
        />

        {/* Chatbase Widget */}
        <Script
          id="chatbase-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...args)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(args)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...a)=>target(prop,...a)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="ii6tX46W_K7OmykyHJpIW";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
            `,
          }}
        />
      </body>
    </html>
  );
}