import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerDocument from '@server/docs/API.json';
import { isLoggedIn, isNotLoggedIn, isNotUseDocsPassword } from '@server/middlewares/docs';
import { signIn, getRefreshToken } from '../controller';

const router = Router();

router.post(
  '/sign-in',
  isNotLoggedIn,
  signIn,
);

router.post(
  '/refresh-token',
  isNotUseDocsPassword,
  getRefreshToken,
);

router.use(
  '/',
  isLoggedIn,
  serve,
  setup(swaggerDocument, { explorer: true }),
);

export default router;
