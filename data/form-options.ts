/**
 * @file form-options.ts
 * @description Standardized options for the audit intake form.
 * Values must match the Zod enum allowlists in lib/validation.ts exactly.
 */

export const FRAMEWORK_OPTIONS = [
  "Next.js",
  "Remix",
  "SvelteKit",
  "React + Vite",
  "Vue",
  "Other",
] as const;

export const AUTH_OPTIONS = [
  "Supabase Auth",
  "Firebase Auth",
  "NextAuth",
  "Clerk",
  "Auth.js",
  "None",
  "Other",
] as const;

export const DATABASE_OPTIONS = [
  "Supabase",
  "Firebase",
  "PlanetScale",
  "MongoDB",
  "PostgreSQL",
  "None",
  "Other",
] as const;

export const DEPLOYMENT_OPTIONS = [
  "Vercel",
  "Netlify",
  "Railway",
  "Render",
  "AWS",
  "Not deployed yet",
] as const;
