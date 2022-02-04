import { Router } from 'express';
import messages from '@server/api/v1/messages/router';
import about from '@server/api/v1/about/router';

const router = Router();

router.use('/messages', messages);
router.use('/about', about);

export default router;
