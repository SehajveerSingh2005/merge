const { getRedisClient } = require('../config/redis');

const cacheMiddleware = (duration = 300) => { // 5 minutes default
  return async (req, res, next) => {
    try {
      const redisClient = getRedisClient();
      if (!redisClient) {
        // Redis client not available, skip cache but continue
        return next();
      }

      const key = `cache:${req.originalUrl || req.url}`;

      const cached = await redisClient.get(key);
      if (cached) {
        // Return cached response
        return res.json(JSON.parse(cached));
      }

      // Override res.json to cache the response
      const originalJson = res.json;
      res.json = function (body) {
        // Set cache with duration in seconds only if body is valid
        if (body && typeof body === 'object') {
          redisClient.setEx(key, duration, JSON.stringify(body));
        }
        originalJson.call(this, body);
      };

      next();
    } catch (error) {
      // Continue without caching if there's an error
      next();
    }
  };
};

module.exports = {
  cacheMiddleware,
};