import { Router } from 'express';
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

router.get('/', getRoles);
router.get('/count', countRoles);
router.get('/:id', getRole);
router.post('/', createRole);
router.put('/:id', updateRole);
router.delete('/', deleteRoles);
router.delete('/:id', deleteRole);

export default router;
