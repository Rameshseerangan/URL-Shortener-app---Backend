import redisClient from '../config/redis.js';

const rateLimiter = (limit, duration) => {
  return async (req, res, next) => {
    const userId = req.user.id;

    const redisKey = `rateLimit:${userId}:${req.originalUrl}`;
    const requestCount = await redisClient.get(redisKey);

    if (requestCount && requestCount >= limit) {
      return res.status(429).json({ message: 'Rate limit exceeded. Try again later.' });
    }

    await redisClient.multi()
      .incr(redisKey)
      .expire(redisKey, duration)
      .exec();

    next();
  };
};

export default rateLimiter;
