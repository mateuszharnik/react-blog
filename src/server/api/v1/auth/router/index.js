import { Router } from 'express';
import { isNotLoggedIn, isLoggedIn } from '@server/middlewares/auth';
import {
  signIn,
  signUp,
  signOut,
  getRefreshToken,
  revokeRefreshToken,
} from '../controller';

const router = Router();

router.post(
  '/admin/sign-in',
  isNotLoggedIn,
  signIn(true),
);
router.post(
  '/sign-in',
  isNotLoggedIn,
  signIn(false),
);
router.post(
  '/sign-up',
  isNotLoggedIn,
  signUp,
);
router.post(
  '/refresh-token',
  getRefreshToken,
);
router.post(
  '/revoke-refresh-token',
  isLoggedIn,
  revokeRefreshToken,
);
router.post(
  '/sign-out',
  isLoggedIn,
  signOut,
);

export default router;
