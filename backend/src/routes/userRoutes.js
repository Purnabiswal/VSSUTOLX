import { Router } from 'express';
import { changePassword, getUserById, updateProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { changePasswordValidator, updateProfileValidator, userIdValidator } from '../validators/userValidators.js';

const router = Router();

router.get('/:id', userIdValidator, validateRequest, getUserById);
router.put('/profile', protect, updateProfileValidator, validateRequest, updateProfile);
router.put('/change-password', protect, changePasswordValidator, validateRequest, changePassword);

export default router;
