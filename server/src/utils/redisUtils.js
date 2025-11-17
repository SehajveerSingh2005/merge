const { getRedisClient } = require('../config/redis');

/**
 * Invalidate cache entries that match a pattern
 * @param {string} pattern - Redis key pattern to match (e.g., 'cache:projects:*')
 */
const invalidateCacheByPattern = async (pattern) => {
  try {
    const redisClient = getRedisClient();
    if (!redisClient) {
      console.warn('Redis client not available, skipping cache invalidation');
      return;
    }

    // Get all keys matching the pattern
    const keys = await redisClient.keys(pattern);
    
    if (keys.length > 0) {
      // Delete all matching keys
      await Promise.all(keys.map(key => redisClient.del(key)));
      console.log(`Invalidated ${keys.length} cache entries matching pattern: ${pattern}`);
    }
  } catch (error) {
    console.error('Error invalidating cache by pattern:', error);
    throw error;
  }
};

/**
 * Invalidate specific cache entries by key
 * @param {string|string[]} keys - Single key or array of keys to delete
 */
const invalidateCache = async (keys) => {
  try {
    const redisClient = getRedisClient();
    if (!redisClient) {
      console.warn('Redis client not available, skipping cache invalidation');
      return;
    }

    const keysArray = Array.isArray(keys) ? keys : [keys];
    
    if (keysArray.length > 0) {
      await Promise.all(keysArray.map(key => redisClient.del(key)));
      console.log(`Invalidated ${keysArray.length} cache entries:`, keysArray);
    }
  } catch (error) {
    console.error('Error invalidating cache:', error);
    throw error;
  }
};

/**
 * Get cached value by key
 * @param {string} key - Cache key
 * @returns {any|null} - Cached value or null if not found
 */
const getCache = async (key) => {
  try {
    const redisClient = getRedisClient();
    if (!redisClient) {
      return null;
    }

    const cached = await redisClient.get(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error('Error getting cache:', error);
    return null;
  }
};

/**
 * Set cache value with expiration
 * @param {string} key - Cache key
 * @param {any} value - Value to cache
 * @param {number} expiration - Expiration time in seconds (default: 300 seconds/5 minutes)
 */
const setCache = async (key, value, expiration = 300) => {
  try {
    const redisClient = getRedisClient();
    if (!redisClient) {
      console.warn('Redis client not available, skipping cache set');
      return;
    }

    await redisClient.setEx(key, expiration, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting cache:', error);
    throw error;
  }
};

module.exports = {
  invalidateCacheByPattern,
  invalidateCache,
  getCache,
  setCache,
};