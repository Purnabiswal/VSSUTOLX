import { Router } from 'express';
import { createChat, getChatById, getChats } from '../controllers/chatController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { chatIdValidator, createChatValidator } from '../validators/chatValidators.js';

const router = Router();

router.use(protect);
router.post('/', createChatValidator, validateRequest, createChat);
router.get('/', getChats);
router.get('/:id', chatIdValidator, validateRequest, getChatById);

export default router;
