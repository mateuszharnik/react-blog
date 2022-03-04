import { Router } from 'express';
import manage from '@server/helpers/roles';
import { isLoggedIn, canManage } from '@server/middlewares/auth';
import {
  countRoles,
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRoles,
  deleteRole,
} from '../controller';

const router = Router();

router.get(
  '/',
  isLoggedIn,
  canManage(manage.roles),
  getRoles,
);
router.get(
  '/count',
  isLoggedIn,
  canManage(manage.roles),
  countRoles,
);
router.get(
  '/:id',
  isLoggedIn,
  canManage(manage.roles),
  getRole,
);
router.post(
  '/',
  isLoggedIn,
  canManage(manage.roles),
  createRole,
);
router.put(
  '/:id',
  isLoggedIn,
  canManage(manage.roles),
  updateRole,
);
router.delete(
  '/',
  isLoggedIn,
  canManage(manage.roles),
  deleteRoles,
);
router.delete(
  '/:id',
  isLoggedIn,
  canManage(manage.roles),
  deleteRole,
);

export default router;
