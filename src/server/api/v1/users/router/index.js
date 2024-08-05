import { Router } from 'express';
import { isLoggedIn } from '@server/middlewares/auth';
import { getMe } from '../controller';

const router = Router();

router.get(
  '/me',
  isLoggedIn,
  getMe,
);

export default router;
