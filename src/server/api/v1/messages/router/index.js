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

const messageLimiter = config.NODE_ENV !== 'test' && config.APP_ENV !== 'e2e' ? rateLimit({
  windowMs: 1000 * 60 * 30,
  max: 5,
  message: 'Przekroczono limit, Spróbuj ponownie później.',
}) : (req, res, next) => next();

router.get(
  '/',
  isLoggedIn,
  canManage(permissions.roles),
  getMessages,
);
router.get(
  '/count',
  isLoggedIn,
  canManage(permissions.roles),
  countMessages(),
);
router.get(
  '/count/read',
  isLoggedIn,
  canManage(permissions.roles),
  countMessages(true),
);
router.get(
  '/count/new',
  isLoggedIn,
  canManage(permissions.roles),
  countMessages(false),
);
router.get(
  '/:id',
  isLoggedIn,
  canManage(permissions.roles),
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
  canManage(permissions.roles),
  deleteMessages,
);
router.delete(
  '/:id',
  isLoggedIn,
  canManage(permissions.roles),
  deleteMessage,
);

export default router;
