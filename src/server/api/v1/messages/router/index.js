import { Router } from 'express';
import {
  getMessages, getMessage, createMessage, deleteMessages, deleteMessage,
} from '../controller';

const router = Router();

router.get('/', getMessages);
router.get('/:id', getMessage);
router.post('/', createMessage);
router.delete('/', deleteMessages);
router.delete('/:id', deleteMessage);

export default router;
