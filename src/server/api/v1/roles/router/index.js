import { Router } from 'express';
import { permissions } from '@server/helpers/roles';
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
  canManage(permissions.roles),
  getRoles,
);
router.get(
  '/count',
  isLoggedIn,
  canManage(permissions.roles),
  countRoles,
);
router.get(
  '/:id',
  isLoggedIn,
  canManage(permissions.roles),
  getRole,
);
router.post(
  '/',
  isLoggedIn,
  canManage(permissions.roles),
  createRole,
);
router.put(
  '/:id',
  isLoggedIn,
  canManage(permissions.roles),
  updateRole,
);
router.delete(
  '/',
  isLoggedIn,
  canManage(permissions.roles),
  deleteRoles,
);
router.delete(
  '/:id',
  isLoggedIn,
  canManage(permissions.roles),
  deleteRole,
);

export default router;
