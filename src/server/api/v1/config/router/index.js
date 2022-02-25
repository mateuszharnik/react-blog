import { Router } from 'express';
import { getConfig } from '../controller';

const router = Router();

router.get('/', getConfig);
// router.put('/', updateConfig);

export default router;
