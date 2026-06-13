import { Router } from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, markProductSold, updateProduct } from '../controllers/productController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { uploadProductImages } from '../middlewares/uploadMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { productCreateValidator, productIdValidator, productListValidator, productUpdateValidator } from '../validators/productValidators.js';

const router = Router();

router.get('/', productListValidator, validateRequest, getProducts);
router.get('/:id', productIdValidator, validateRequest, getProductById);
router.post('/', protect, uploadProductImages, productCreateValidator, validateRequest, createProduct);
router.put('/:id', protect, uploadProductImages, productUpdateValidator, validateRequest, updateProduct);
router.delete('/:id', protect, productIdValidator, validateRequest, deleteProduct);
router.patch('/:id/sold', protect, productIdValidator, validateRequest, markProductSold);

export default router;
