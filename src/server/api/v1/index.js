import { Router } from 'express';
import messages from '@server/api/v1/messages/router';
import about from '@server/api/v1/about/router';
import config from '@server/api/v1/config/router';

const router = Router();

router.get('/', (req, res) => res.json({ message: '🖤' }));
router.get('/getCSRFToken', (req, res) => res.json({ CSRFToken: req.csrfToken() }));

router.use('/config', config);
router.use('/messages', messages);
router.use('/about', about);

export default router;
