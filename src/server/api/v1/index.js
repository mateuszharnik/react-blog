import { Router } from 'express';
import messages from '@server/api/v1/messages/router';
import about from '@server/api/v1/about/router';
import config from '@server/api/v1/config/router';
import termsOfUse from '@server/api/v1/termsOfUse/router';
import contact from '@server/api/v1/contact/router';
import auth from '@server/api/v1/auth/router';
// import roles from '@server/api/v1/roles/router';

const router = Router();

router.get('/', (req, res) => res.json({ message: '🖤' }));
router.get('/csrf-token', (req, res) => res.json({ CSRFToken: req.csrfToken() }));

router.use('/config', config);
router.use('/messages', messages);
router.use('/about', about);
router.use('/auth', auth);
router.use('/contact', contact);
// router.use('/roles', roles);
router.use('/terms-of-use', termsOfUse);

export default router;
