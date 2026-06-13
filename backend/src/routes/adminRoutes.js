import { Router } from 'express';
import { banUser, deleteAdminProduct, getAdminProducts, getAdminReports, getAdminUsers, getAnalytics } from '../controllers/adminController.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { adminProductIdValidator, adminUserIdValidator } from '../validators/adminValidators.js';

const router = Router();

router.use(protect, adminOnly);
router.get('/users', getAdminUsers);
router.get('/products', getAdminProducts);
router.delete('/products/:id', adminProductIdValidator, validateRequest, deleteAdminProduct);
router.patch('/users/:id/ban', adminUserIdValidator, validateRequest, banUser);
router.get('/reports', getAdminReports);
router.get('/analytics', getAnalytics);

export default router;
