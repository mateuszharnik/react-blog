import { Router } from 'express';
import messages from '@server/api/v1/messages/router';

const router = Router();

router.use('/messages', messages);

export default router;
