import { Router } from 'express';
import manage from '@server/helpers/roles';
import { isLoggedIn, canManage } from '@server/middlewares/auth';
import {
  getFAQ,
  getFAQs,
  createFAQ,
  updateFAQ,
  toggleIsPublishedFAQ,
  deleteFAQ,
  deleteFAQs,
} from '../controller';

const router = Router();

router.get(
  '/',
  getFAQs,
);

router.get(
  '/:id',
  getFAQ,
);

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

router.delete(
  '/',
  isLoggedIn,
  canManage(manage.faqs),
  deleteFAQs,
);

router.delete(
  '/:id',
  isLoggedIn,
  canManage(manage.faqs),
  deleteFAQ,
);

export default router;
