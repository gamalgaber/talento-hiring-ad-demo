/**
 * Best-effort in-memory sliding-window rate limiter.
 * Note: resets on cold start / doesn't share state across serverless
 * instances — fine as a baseline spam brake, not a substitute for an
 * edge WAF. Swap for Upstash Ratelimit if you need cross-instance limits.
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > MAX_REQUESTS;
}
