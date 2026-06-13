import { body } from 'express-validator';

export const createReportValidator = [
  body('product').isMongoId().withMessage('Product id is required'),
  body('reason').trim().isLength({ min: 5, max: 500 }).withMessage('Reason must be 5-500 characters'),
];
