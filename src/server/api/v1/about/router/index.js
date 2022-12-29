import { Router } from 'express';
import { permissions } from '@server/helpers/roles';
import { isLoggedIn, canManage } from '@server/middlewares/auth';
import { getAbout, updateAbout } from '../controller';

const router = Router();

router.get(
  '/',
  getAbout,
);
router.put(
  '/',
  isLoggedIn,
  canManage(permissions.aboutUs),
  updateAbout,
);

export default router;
