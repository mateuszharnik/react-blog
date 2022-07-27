import rateLimit from 'express-rate-limit';
import { Router } from 'express';
import config from '@server/config';
import manage from '@server/helpers/roles';
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

const { NODE_ENV, APP_ENV } = config;

const messageLimiter = NODE_ENV !== 'test' && APP_ENV !== 'e2e' ? rateLimit({
  windowMs: 1000 * 60 * 30,
  max: 5,
  message: 'Przekroczono limit, Spróbuj ponownie później.',
}) : (req, res, next) => next();

router.get(
  '/',
  isLoggedIn,
  canManage(manage.roles),
  getMessages,
);
router.get(
  '/count',
  isLoggedIn,
  canManage(manage.roles),
  countMessages(),
);
router.get(
  '/count/read',
  isLoggedIn,
  canManage(manage.roles),
  countMessages(true),
);
router.get(
  '/count/new',
  isLoggedIn,
  canManage(manage.roles),
  countMessages(false),
);
router.get(
  '/:id',
  isLoggedIn,
  canManage(manage.roles),
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
  canManage(manage.roles),
  deleteMessages,
);
router.delete(
  '/:id',
  isLoggedIn,
  canManage(manage.roles),
  deleteMessage,
);

export default router;
