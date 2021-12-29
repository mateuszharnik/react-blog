import { Router } from 'express';
import mongoose from 'mongoose';

const Message = mongoose.model('Message', { message: String });

const router = Router();

router.get('/', async (req, res) => {
  try {
    const message = await Message.findOne();

    if (!message) {
      return res.status(400).json({ message: 'Błąd' });
    }

    return res.status(200).json(message);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
});

export default router;
