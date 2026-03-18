/**
 * Moving scan line animation to simulate auditing.
 */
export default function ScanLine() {
  return (
    <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50 blur-[1px] animate-scan pointer-events-none z-10" />
  );
}
