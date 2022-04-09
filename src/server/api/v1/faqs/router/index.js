import { Router } from 'express';
import manage from '@server/helpers/roles';
import { isLoggedIn, canManage } from '@server/middlewares/auth';
import {
  createFAQ,
} from '../controller';

const router = Router();

router.post(
  '/',
  isLoggedIn,
  canManage(manage.faqs),
  createFAQ,
);

export default router;
