import rateLimit from 'express-rate-limit';
import { Router } from 'express';
import {
  countMessages,
  countReadMessages,
  countNewMessages,
  createMessage,
} from '../controller';

const router = Router();

const messageLimiter = rateLimit({
  windowMs: 1000 * 60 * 30,
  max: 5,
  message: 'Przekroczono limit, Spróbuj ponownie później.',
});

// router.get('/', getMessages);
router.get('/count', countMessages);
router.get('/count/read', countReadMessages);
router.get('/count/new', countNewMessages);
// router.get('/:id', getMessage);
router.post('/', messageLimiter, createMessage);
// router.delete('/', deleteMessages);
// router.delete('/:id', deleteMessage);

export default router;
