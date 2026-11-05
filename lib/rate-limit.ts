/**
 * In-memory token bucket / sliding window rate limiter per client IP
 * Default: 20 requests per 10 minutes
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipMap = new Map<string, RateLimitRecord>();

// Clean up stale IP records every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    ipMap.forEach((record, ip) => {
      if (now > record.resetAt) {
        ipMap.delete(ip);
      }
    });
  }, 5 * 60 * 1000);
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

export function checkRateLimit(
  clientIp: string,
  maxRequests: number = 20,
  windowMs: number = 10 * 60 * 1000
): RateLimitResult {
  const now = Date.now();
  const record = ipMap.get(clientIp);

  if (!record || now > record.resetAt) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetAt: now + windowMs,
    };
    ipMap.set(clientIp, newRecord);
    return {
      success: true,
      remaining: maxRequests - 1,
      resetAt: newRecord.resetAt,
    };
  }

  if (record.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetAt: record.resetAt,
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: maxRequests - record.count,
    resetAt: record.resetAt,
  };
}
