import { Router } from 'express';
import { permissions } from '@server/helpers/roles';
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
  canManage(permissions.faqs),
  createFAQ,
);

router.patch(
  '/:id/publish',
  isLoggedIn,
  canManage(permissions.faqs),
  toggleIsPublishedFAQ,
);

router.patch(
  '/:id',
  isLoggedIn,
  canManage(permissions.faqs),
  updateFAQ,
);

router.delete(
  '/',
  isLoggedIn,
  canManage(permissions.faqs),
  deleteFAQs,
);

router.delete(
  '/:id',
  isLoggedIn,
  canManage(permissions.faqs),
  deleteFAQ,
);

export default router;
