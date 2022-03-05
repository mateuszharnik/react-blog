import { Router } from 'express';
import manage from '@server/helpers/roles';
import { isLoggedIn, canManage } from '@server/middlewares/auth';
import { getConfig, updateConfig } from '../controller';

const router = Router();

router.get(
  '/',
  getConfig,
);
router.put(
  '/',
  isLoggedIn,
  canManage(manage.config),
  updateConfig,
);

export default router;
