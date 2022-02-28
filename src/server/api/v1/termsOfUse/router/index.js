import { Router } from 'express';
import { getTermsOfUse, getOneTermsOfUse } from '../controller';

const router = Router();

router.get('/', getTermsOfUse);
router.get('/:id', getOneTermsOfUse);
// router.put('/:id', updateTermsOfUse);

export default router;
