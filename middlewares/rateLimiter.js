import rateLimit from 'express-rate-limit';
import { errorMessagesRoutes } from '../errors/ErrorMessages.js';

const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 минут
  max: 100, // ограничим число запросов количеством 100
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: errorMessagesRoutes.tooMany,
});

export default rateLimiter;
