const { getRedisClient } = require('../config/redis');

const createRateLimiter = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    max = 100, // limit each IP to 100 requests per windowMs
    message = 'Too many requests from this IP, please try again later.',
    keyGenerator = (req) => req.ip, // generate custom key (default to IP)
  } = options;

  return async (req, res, next) => {
    try {
      const redisClient = getRedisClient();
      if (!redisClient) {
        console.warn('Redis client not available, using basic rate limiting fallback');
        return next();
      }

      const key = `rate_limit:${keyGenerator(req)}`;
      const current = await redisClient.incr(key);

      if (current === 1) {
        // Set expiration only on first request to avoid multiple calls
        await redisClient.expire(key, Math.floor(windowMs / 1000));
      }

      if (current > max) {
        return res.status(429).json({
          error: 'Rate Limit Exceeded',
          message: message,
          retryAfter: Math.floor(windowMs / 1000),
        });
      }

      // Add rate limit headers
      res.set('X-RateLimit-Remaining', max - current);
      res.set('X-RateLimit-Limit', max);
      res.set('X-RateLimit-Reset', Date.now() + windowMs);

      next();
    } catch (error) {
      console.error('Rate limiter error:', error);
      // Continue without rate limiting if Redis is down
      next();
    }
  };
};

module.exports = {
  createRateLimiter,
};