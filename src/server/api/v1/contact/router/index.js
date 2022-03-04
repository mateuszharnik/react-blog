import { Router } from 'express';
import manage from '@server/helpers/roles';
import { isLoggedIn, canManage } from '@server/middlewares/auth';
import { getContact, updateContact } from '../controller';

const router = Router();

router.get('/', getContact);
router.put(
  '/',
  isLoggedIn,
  canManage(manage.contact),
  updateContact,
);

export default router;
