import { Router } from 'express';
import manage from '@server/helpers/roles';
import { isLoggedIn, canManage } from '@server/middlewares/auth';
import { getAbout, updateAbout } from '../controller';

const router = Router();

router.get('/', getAbout);
router.put(
  '/',
  isLoggedIn,
  canManage(manage.aboutUs),
  updateAbout,
);

export default router;
