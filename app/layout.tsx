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
  title: "VibeDiligence — Premium GitHub Repo Audits",
  description: "Advanced repo auditing for technical due diligence. Get instant security, scalability, and quality scores for any repository.",
  icons: {
    icon: "/icon.png",
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
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Support for Spline custom element */}
        <script
          type="module"
          src="https://unpkg.com/@splinetool/viewer@1.12.69/build/spline-viewer.js"
        />
      </head>
      <body className={cn(inter.variable, jetbrains.variable, "bg-bg text-primary antialiased")}>
        <Navbar />
        {children}
        <Footer />

        {/* Paddle.js SDK — loaded before checkout can be triggered */}
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
                if (typeof Paddle !== 'undefined' && Paddle.Initialize) {
                  Paddle.Initialize({
                    token: "${process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || ''}",
                    ${process.env.NEXT_PUBLIC_PADDLE_ENV === 'sandbox' ? 'environment: "sandbox",' : ''}
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