/**
 * @file rate-limit.ts
 * @description In-memory IP-based rate limiter for API routes.
 * Uses a Map with time-windowed counters. Resets after the window expires.
 */

import type { NextRequest } from 'next/server';

/** Rate limit entry tracking request count and window reset time. */
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

/** In-memory store for rate limit counters, keyed by IP address. */
const counts = new Map<string, RateLimitEntry>();

/**
 * Checks whether the given IP is within the rate limit.
 * @param ip - Client IP address
 * @param limit - Maximum allowed requests within the window
 * @param windowMs - Time window in milliseconds
 * @returns Object indicating whether the request is allowed
 */
export function checkRateLimit(
  ip: string,
  limit: number,
  windowMs: number
): { allowed: boolean } {
  const now = Date.now();
  const existing = counts.get(ip);

  if (!existing || existing.resetAt < now) {
    counts.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (existing.count >= limit) {
    return { allowed: false };
  }

  existing.count++;
  return { allowed: true };
}

/**
 * Extracts the client IP address from the request headers.
 * Uses x-forwarded-for (set by Vercel/reverse proxies) with fallback.
 */
export function getClientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}
