import { Router } from 'express';
import { getMessages, sendMessage } from '../controllers/messageController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { createMessageValidator, messagesByChatValidator } from '../validators/chatValidators.js';

const router = Router();

router.use(protect);
router.post('/', createMessageValidator, validateRequest, sendMessage);
router.get('/:chatId', messagesByChatValidator, validateRequest, getMessages);

export default router;
