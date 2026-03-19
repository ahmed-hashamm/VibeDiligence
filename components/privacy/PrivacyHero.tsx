/**
 * @file PrivacyHero.tsx
 * @description Hero introduction section for the Privacy page.
 */

interface PrivacyHeroProps {
  intro: string;
  acknowledgement: string;
  contactLine: string;
}

/**
 * PrivacyHero component.
 * Displays the privacy policy's introduction and primary meta information.
 */
export default function PrivacyHero({ intro, acknowledgement, contactLine }: PrivacyHeroProps) {
  return (
    <div className="max-w-4xl mb-32">
      <div className="border-l-2 border-pink-500 pl-8 py-2 space-y-4">
        <p className="text-secondary text-base md:text-lg leading-relaxed font-medium">
          {intro}
        </p>
        <p className="text-secondary/70 text-sm md:text-base font-medium italic">
          {acknowledgement}
        </p>
        <p className="text-xs text-secondary/40 font-mono uppercase tracking-[0.1em]">
          {contactLine}
        </p>
      </div>
    </div>
  );
}
