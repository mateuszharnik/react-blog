import { Router } from 'express';
import manage from '@server/helpers/roles';
import { isLoggedIn, canManage } from '@server/middlewares/auth';
import {
  createFAQ,
  updateFAQ,
  toggleIsPublishedFAQ,
} from '../controller';

const router = Router();

router.post(
  '/',
  isLoggedIn,
  canManage(manage.faqs),
  createFAQ,
);

router.patch(
  '/:id/publish',
  isLoggedIn,
  canManage(manage.faqs),
  toggleIsPublishedFAQ,
);

router.patch(
  '/:id',
  isLoggedIn,
  canManage(manage.faqs),
  updateFAQ,
);

export default router;
