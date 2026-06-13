import { Router } from 'express';
import { param } from 'express-validator';
import { addToWishlist, getWishlist, removeFromWishlist } from '../controllers/wishlistController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = Router();
const productIdParam = [param('productId').isMongoId().withMessage('Valid product id is required')];

router.use(protect);
router.get('/', getWishlist);
router.post('/:productId', productIdParam, validateRequest, addToWishlist);
router.delete('/:productId', productIdParam, validateRequest, removeFromWishlist);

export default router;
