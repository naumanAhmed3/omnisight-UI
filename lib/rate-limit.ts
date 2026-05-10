// Daily budget rate limiter backed by Upstash Redis.
// Each call costs `costSeconds`; per-IP and global budgets reset at UTC midnight.
//
// - Per-IP daily budget: 600 seconds (10 minutes of equivalent use per IP per day)
// - Global daily budget: 7200 seconds (2 hours of equivalent use across all users per day)

import { Redis } from "@upstash/redis";

const PER_IP_DAILY_MAX_SECONDS = 600;
const GLOBAL_DAILY_MAX_SECONDS = 7200;
const KEY_TTL_SECONDS = 90_000;

let _redis: Redis | null = null;
function getRedis(): Redis | null {
  if (_redis) return _redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  _redis = new Redis({ url, token });
  return _redis;
}

export interface RateLimitResult {
  allowed: boolean;
  remainingPerIpSeconds: number;
  remainingGlobalSeconds: number;
  resetAtUnix: number;
  reason?: "per_ip_exhausted" | "global_exhausted" | "redis_unavailable";
}

function midnightUtcTomorrowUnix(): number {
  const now = new Date();
  const tomorrow = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
  return Math.floor(tomorrow / 1000);
}

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]!.trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

export async function consumeRateLimit(site: string, req: Request, costSeconds: number): Promise<RateLimitResult> {
  const redis = getRedis();
  const resetAtUnix = midnightUtcTomorrowUnix();

  if (!redis) {
    return {
      allowed: true,
      remainingPerIpSeconds: PER_IP_DAILY_MAX_SECONDS,
      remainingGlobalSeconds: GLOBAL_DAILY_MAX_SECONDS,
      resetAtUnix,
      reason: "redis_unavailable",
    };
  }

  const ip = getClientIp(req);
  const today = todayUtc();
  const ipKey = `${site}:ip:${ip}:${today}`;
  const globalKey = `${site}:global:${today}`;

  const pipeline = redis.pipeline();
  pipeline.incrby(ipKey, costSeconds);
  pipeline.incrby(globalKey, costSeconds);
  pipeline.expire(ipKey, KEY_TTL_SECONDS);
  pipeline.expire(globalKey, KEY_TTL_SECONDS);
  const results = (await pipeline.exec()) as [number, number, number | boolean, number | boolean];
  const newIp = results[0];
  const newGlobal = results[1];

  if (newIp > PER_IP_DAILY_MAX_SECONDS || newGlobal > GLOBAL_DAILY_MAX_SECONDS) {
    const rollback = redis.pipeline();
    rollback.decrby(ipKey, costSeconds);
    rollback.decrby(globalKey, costSeconds);
    await rollback.exec();
    return {
      allowed: false,
      remainingPerIpSeconds: Math.max(0, PER_IP_DAILY_MAX_SECONDS - (newIp - costSeconds)),
      remainingGlobalSeconds: Math.max(0, GLOBAL_DAILY_MAX_SECONDS - (newGlobal - costSeconds)),
      resetAtUnix,
      reason: newGlobal > GLOBAL_DAILY_MAX_SECONDS ? "global_exhausted" : "per_ip_exhausted",
    };
  }

  return {
    allowed: true,
    remainingPerIpSeconds: PER_IP_DAILY_MAX_SECONDS - newIp,
    remainingGlobalSeconds: GLOBAL_DAILY_MAX_SECONDS - newGlobal,
    resetAtUnix,
  };
}

export function rateLimitedResponse(result: RateLimitResult, friendlyMessage: string): Response {
  const retryAfter = Math.max(60, result.resetAtUnix - Math.floor(Date.now() / 1000));
  return new Response(
    JSON.stringify({
      error: "rate_limited",
      message: friendlyMessage,
      reason: result.reason,
      resetAtUnix: result.resetAtUnix,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfter),
        "X-RateLimit-Reset": String(result.resetAtUnix),
        "X-Demo-Budget-Remaining-Seconds": String(result.remainingPerIpSeconds),
        "X-Demo-Global-Remaining-Seconds": String(result.remainingGlobalSeconds),
      },
    },
  );
}
