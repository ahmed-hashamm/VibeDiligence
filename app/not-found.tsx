/**
 * @file not-found.tsx
 * @description Custom 404 error page for the VibeDiligence platform.
 */

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import GridBackground from "@/animations/svgs/GridBackground";

/**
 * NotFound component.
 * Rule: Handles the 404 state with a themed design.
 */
export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-bg relative overflow-hidden text-center">
      <GridBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <h1 className="text-[12rem] font-bold text-pink-500/20 leading-none select-none">404</h1>
        <div className="-mt-12 mb-12">
          <h2 className="text-4xl font-bold mb-4">Repo not found.</h2>
          <p className="text-secondary text-lg">
            Wait, did you move it? We can't find the page you're looking for.
          </p>
        </div>
        
        <Link href="/">
          <Button className="px-10 py-4 text-lg h-auto">Return to Home</Button>
        </Link>
      </div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/5 blur-[120px] rounded-full pointer-events-none" />
    </main>
  );
}
