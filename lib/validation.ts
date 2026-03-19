/**
 * @file validation.ts
 * @description Input validation schemas and helpers.
 * Uses Zod for strict schema validation of intake forms and UUID format checking.
 */

import { z } from 'zod';

/**
 * Zod schema for the audit intake form.
 * All dropdown values are validated against strict enum allowlists.
 * GitHub URL is validated with a strict regex — no path traversal, no other domains.
 */
export const IntakeFormSchema = z.object({
  repo_url: z.string().min(1).max(500).trim()
    .refine(
      url => /^https:\/\/github\.com\/[a-zA-Z0-9_.-]{1,100}\/[a-zA-Z0-9_.-]{1,100}\/?$/.test(url),
      'Must be a valid public GitHub URL'
    ),
  framework: z.enum(['Next.js', 'Remix', 'SvelteKit', 'React + Vite', 'Vue', 'Other']),
  auth: z.enum(['Supabase Auth', 'Firebase Auth', 'NextAuth', 'Clerk', 'Auth.js', 'None', 'Other']),
  database: z.enum(['Supabase', 'Firebase', 'PlanetScale', 'MongoDB', 'PostgreSQL', 'None', 'Other']),
  deployment: z.enum(['Vercel', 'Netlify', 'Railway', 'Render', 'AWS', 'Not deployed yet']),
});

/**
 * Validates whether a string is a valid UUID v4.
 * Must be checked before every Supabase query that uses an ID parameter.
 */
export function isValidUUID(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}
