/**
 * @file SecurityHero.tsx
 * @description Hero text block for the Security page.
 */

interface SecurityHeroProps {
  body: string;
}

/**
 * SecurityHero component.
 * Displays the mission-critical security commitment message.
 */
export default function SecurityHero({ body }: SecurityHeroProps) {
  return (
    <div className="max-w-4xl mb-24">
      <p className="text-secondary text-lg leading-relaxed border-l-2 border-pink-500 pl-8 py-2">
        {body}
      </p>
    </div>
  );
}
