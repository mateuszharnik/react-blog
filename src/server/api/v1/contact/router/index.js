import { Router } from 'express';
import { getContact } from '../controller';

const router = Router();

router.get('/', getContact);
// router.put('/', updateContact);

export default router;
