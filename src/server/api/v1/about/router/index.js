import { Router } from 'express';
import { getAbout } from '../controller';

const router = Router();

router.get('/', getAbout);
// router.put('/', updateAbout);

export default router;
