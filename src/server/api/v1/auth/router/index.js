import { Router } from 'express';
import { isNotLoggedIn } from '@server/middlewares/auth';
import {
  signIn,
  signUp,
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
router.get('/refresh-token', (req, res) => {
  console.log(req.cookies);
  res.status(200).json({});
});

export default router;
