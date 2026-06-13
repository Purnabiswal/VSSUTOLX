import { body, param, query } from 'express-validator';
import { PRODUCT_CATEGORIES } from '../constants/categories.js';

export const productListValidator = [
  query('keyword').optional().trim().isLength({ max: 120 }),
  query('category').optional().isIn(PRODUCT_CATEGORIES),
  query('minPrice').optional().isFloat({ min: 0 }).toFloat(),
  query('maxPrice').optional().isFloat({ min: 0 }).toFloat(),
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
  query('sort').optional().isIn(['newest', 'oldest', 'price-low', 'price-high', 'popular']),
];

export const productIdValidator = [
  param('id').isMongoId().withMessage('Valid product id is required'),
];

export const productCreateValidator = [
  body('title').trim().isLength({ min: 3, max: 120 }).withMessage('Title must be 3-120 characters'),
  body('description').trim().isLength({ min: 10, max: 2500 }).withMessage('Description must be 10-2500 characters'),
  body('price').isFloat({ min: 0 }).toFloat().withMessage('Valid price is required'),
  body('category').isIn(PRODUCT_CATEGORIES).withMessage('Valid category is required'),
  body('location').trim().isLength({ min: 2, max: 120 }).withMessage('Location is required'),
];

export const productUpdateValidator = [
  ...productIdValidator,
  body('title').optional().trim().isLength({ min: 3, max: 120 }),
  body('description').optional().trim().isLength({ min: 10, max: 2500 }),
  body('price').optional().isFloat({ min: 0 }).toFloat(),
  body('category').optional().isIn(PRODUCT_CATEGORIES),
  body('location').optional().trim().isLength({ min: 2, max: 120 }),
];
