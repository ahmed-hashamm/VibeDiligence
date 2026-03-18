/**
 * @file PrivacyContent.tsx
 * @description Renders the privacy policy sections.
 */

import { PRIVACY_CONTENT } from "@/data/legal";

/**
 * PrivacyContent component.
 * Displays ordered legal sections and contact information.
 */
export default function PrivacyContent() {
  return (
    <div className="space-y-12 text-secondary leading-relaxed mt-20">
      {PRIVACY_CONTENT.sections.map((s) => (
        <section key={s.title}>
          <h3 className="text-xl font-bold text-primary mb-4 border-b border-white/5 pb-2 inline-block">
            {s.title}
          </h3>
          <p className="text-base">{s.content}</p>
        </section>
      ))}
      
      <div className="p-8 rounded-2xl bg-surface/30 border border-white/5 mt-16">
        <h4 className="text-lg font-bold text-primary mb-4 font-mono uppercase tracking-widest text-pink-500">
          {PRIVACY_CONTENT.contact.title}
        </h4>
        <p className="text-sm">
          {PRIVACY_CONTENT.contact.description}{" "}
          <span className="text-primary font-bold underline">
            {PRIVACY_CONTENT.contact.email}
          </span>
        </p>
      </div>
    </div>
  );
}
