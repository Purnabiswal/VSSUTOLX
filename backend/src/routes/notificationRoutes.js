import { Router } from 'express';
import { getNotifications, markNotificationsRead } from '../controllers/notificationController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(protect);
router.get('/', getNotifications);
router.patch('/read', markNotificationsRead);

export default router;
