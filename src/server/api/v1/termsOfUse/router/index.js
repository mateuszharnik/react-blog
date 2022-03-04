import { Router } from 'express';
import manage from '@server/helpers/roles';
import { isLoggedIn, canManage } from '@server/middlewares/auth';
import {
  getTermsOfUse,
  getOneTermsOfUse,
  updateTermsOfUse,
} from '../controller';

const router = Router();

router.get('/', getTermsOfUse);
router.get('/:id', getOneTermsOfUse);
router.put(
  '/:id',
  isLoggedIn,
  canManage(manage.termsOfUse),
  updateTermsOfUse,
);

export default router;
