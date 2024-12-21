import express from 'express';
import { shortenUrl, redirectUrl, getAnalytics } from '../controllers/urlController.js';
import rateLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/shorten', rateLimiter(5, 60), shortenUrl);
router.get('/:alias', redirectUrl);
router.get('/analytics/:alias', getAnalytics);

export default router;
