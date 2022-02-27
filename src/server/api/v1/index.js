import { Router } from 'express';
import messages from '@server/api/v1/messages/router';
import about from '@server/api/v1/about/router';
import config from '@server/api/v1/config/router';
import contact from '@server/api/v1/contact/router';
// import roles from '@server/api/v1/roles/router';

const router = Router();

router.get('/', (req, res) => res.json({ message: '🖤' }));
router.get('/getCSRFToken', (req, res) => res.json({ CSRFToken: req.csrfToken() }));

router.use('/config', config);
router.use('/messages', messages);
router.use('/about', about);
router.use('/contact', contact);
// router.use('/roles', roles);

export default router;
