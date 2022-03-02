import { Router } from 'express';
import {
  signIn,
  signUp,
} from '../controller';

const router = Router();

router.post('/admin/sign-in', signIn(true));
router.post('/sign-in', signIn(false));
router.post('/sign-up', signUp);
router.get('/refresh-token', (req, res) => {
  console.log(req.cookies);
  res.status(200).json({});
});

export default router;
