import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import config from '@server/config';
import { permissions } from '@server/helpers/roles';
import { isLoggedIn, canManage } from '@server/middlewares/auth';
import {
  countMessages,
  getMessages,
  getMessage,
  createMessage,
  deleteMessages,
  deleteMessage,
} from '../controller';

const router = Router();

const messageLimiter = config.RATE_LIMIT_ENABLED ? rateLimit({
  windowMs: 1000 * 60 * 30,
  max: config.RATE_LIMIT,
  message: 'Przekroczono limit, Spróbuj ponownie później.',
}) : (req, res, next) => next();

router.get(
  '/',
  isLoggedIn,
  canManage(permissions.messages),
  getMessages,
);
router.get(
  '/count',
  isLoggedIn,
  canManage(permissions.messages),
  countMessages(),
);
router.get(
  '/count/read',
  isLoggedIn,
  canManage(permissions.messages),
  countMessages(true),
);
router.get(
  '/count/new',
  isLoggedIn,
  canManage(permissions.messages),
  countMessages(false),
);
router.get(
  '/:id',
  isLoggedIn,
  canManage(permissions.messages),
  getMessage,
);
router.post(
  '/',
  messageLimiter,
  createMessage,
);
router.delete(
  '/',
  isLoggedIn,
  canManage(permissions.messages),
  deleteMessages,
);
router.delete(
  '/:id',
  isLoggedIn,
  canManage(permissions.messages),
  deleteMessage,
);

export default router;
