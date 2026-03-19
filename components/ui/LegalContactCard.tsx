import { Button } from "@/components/ui/Button";

/**
 * Props for the LegalContactCard component.
 */
interface LegalContactCardProps {
  title: string;
  description: string;
  email: string;
}

/**
 * LegalContactCard component.
 * A reusable, high-fidelity contact card used across legal pages.
 */
export function LegalContactCard({ title, description, email }: LegalContactCardProps) {
  return (
    <div className="mt-40 p-10 md:p-12 rounded-[2.5rem] bg-pink-500/[0.03] border border-pink-500/10 backdrop-blur-md relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 blur-[120px] -mr-48 -mt-48 rounded-full transition-transform duration-1000 group-hover:scale-110" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
        <div className="space-y-4">
          <h3 className="text-3xl font-bold text-white flex items-center gap-4">
            <span className="w-2.5 h-10 bg-pink-500 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)]" />
            {title}
          </h3>
          <p className="text-base text-secondary/70 max-w-lg leading-relaxed">
            {description}
          </p>
        </div>

        <a href={`mailto:${email}`} className="flex-shrink-0">
          <Button className="bg-pink-500 hover:bg-pink-600 text-white font-bold h-16 px-10 rounded-2xl shadow-xl shadow-pink-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-4 group/btn">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            <span className="text-lg">{email}</span>
          </Button>
        </a>
      </div>
    </div>
  );
}
