/**
 * @file form-options.ts
 * @description Standardized options for the audit intake form.
 */

export const FRAMEWORK_OPTIONS = [
  "Next.js / React",
  "Vue / Nuxt",
  "Node.js / Express",
  "Python / Django",
  "Rust / Actix",
  "Go / Fiber",
];

export const DATABASE_OPTIONS = [
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "MySQL",
  "DynamoDB",
  "Supabase (Postgres)",
  "PlanetScale (MySQL)",
];

export const AUTH_OPTIONS = [
  "Clerk",
  "Supabase Auth",
  "Auth.js / NextAuth",
  "Firebase Auth",
  "Kinde",
  "Custom / None",
];

export const DEPLOYMENT_OPTIONS = [
  "Vercel",
  "Railway",
  "AWS / GCP",
  "DigitalOcean",
  "Netlify",
  "Docker / Kubernetes",
];
