import rateLimit from 'express-rate-limit';
import { Router } from 'express';
import {
  getMessages, getMessage, createMessage, deleteMessages, deleteMessage,
} from '../controller';

const router = Router();

const messageLimiter = rateLimit({
  windowMs: 1000 * 60 * 30,
  max: 5,
  message: 'Przekroczono limit, Spróbuj ponownie później.',
});

router.get('/', getMessages);
router.get('/:id', getMessage);
router.post('/', messageLimiter, createMessage);
router.delete('/', deleteMessages);
router.delete('/:id', deleteMessage);

export default router;
