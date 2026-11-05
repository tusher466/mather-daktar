const test = require('node:test');
const assert = require('node:assert/strict');

function createRateLimiter(maxRequests = 5, windowMs = 1000) {
  const ipMap = new Map();

  return function check(ip) {
    const now = Date.now();
    const record = ipMap.get(ip);

    if (!record || now > record.resetAt) {
      const newRec = { count: 1, resetAt: now + windowMs };
      ipMap.set(ip, newRec);
      return { success: true, remaining: maxRequests - 1 };
    }

    if (record.count >= maxRequests) {
      return { success: false, remaining: 0 };
    }

    record.count += 1;
    return { success: true, remaining: maxRequests - record.count };
  };
}

test('Rate limiter permits requests within quota and blocks when limit reached', () => {
  const limit = createRateLimiter(3, 10000);
  const ip = '192.168.1.10';

  assert.equal(limit(ip).success, true);
  assert.equal(limit(ip).success, true);
  assert.equal(limit(ip).success, true);

  // 4th request must be blocked
  const blocked = limit(ip);
  assert.equal(blocked.success, false);
  assert.equal(blocked.remaining, 0);

  // Different IP should still be allowed
  assert.equal(limit('192.168.1.11').success, true);
});
