import redisClient from '../config/redis.js';
import URL from '../models/urlModel.js';

const shortenUrl = async (req, res) => {
  const { longUrl, customAlias, topic } = req.body;

  let alias = customAlias || Math.random().toString(36).substr(2, 6);
  const shortUrl = `http://short.url/${alias}`;

  const newUrl = new URL({ longUrl, shortUrl, alias, topic });
  await newUrl.save();

  // Cache the short URL
  await redisClient.set(longUrl, shortUrl);
  res.json({ shortUrl });
};

const redirectUrl = async (req, res) => {
  const { alias } = req.params;

  // Check cache
  const cachedUrl = await redisClient.get(`shortened:${alias}`);
  if (cachedUrl) {
    return res.redirect(cachedUrl);
  }

  const urlData = await URL.findOne({ alias });
  if (!urlData) return res.status(404).json({ message: 'URL not found' });

  await redisClient.set(`shortened:${alias}`, urlData.longUrl);
  res.redirect(urlData.longUrl);
};

const getAnalytics = async (req, res) => {
  const { alias } = req.params;
  const cachedAnalytics = await redisClient.get(`analytics:${alias}`);
  if (cachedAnalytics) {
    return res.json(JSON.parse(cachedAnalytics));
  }

  const urlData = await URL.findOne({ alias });
  if (!urlData) return res.status(404).json({ message: 'URL not found' });

  const analytics = {
    totalClicks: urlData.totalClicks,
    uniqueClicks: urlData.uniqueClicks,
  };

  await redisClient.set(`analytics:${alias}`, JSON.stringify(analytics), {
    EX: 600,  // Cache expires after 10 minutes
  });

  res.json(analytics);
};

export { shortenUrl, redirectUrl, getAnalytics };
