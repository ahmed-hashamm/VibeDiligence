/**
 * @file TermsHero.tsx
 * @description Hero introduction section for the Terms of Service.
 */

interface TermsHeroProps {
  intro: string;
  acknowledgement: string;
}

/**
 * TermsHero component.
 * Displays the legal introduction and global acceptance statement with a signature style.
 */
export default function TermsHero({ intro, acknowledgement }: TermsHeroProps) {
  return (
    <div className="max-w-4xl mb-32 border-l-2 border-pink-500 pl-8 py-2">
      <p className="text-lg text-secondary leading-relaxed mb-6 italic">
        {intro}
      </p>
      <p className="text-sm font-bold text-white uppercase tracking-widest bg-white/5 py-4 px-6 rounded-lg border border-white/5">
        {acknowledgement}
      </p>
    </div>
  );
}
