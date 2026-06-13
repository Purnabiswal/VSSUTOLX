import { body, param } from 'express-validator';

export const userIdValidator = [
  param('id').isMongoId().withMessage('Valid user id is required'),
];

export const updateProfileValidator = [
  body('name').optional().trim().isLength({ min: 2, max: 80 }),
  body('branch').optional().trim().isLength({ max: 80 }),
  body('year').optional().isInt({ min: 1, max: 5 }).toInt(),
];

export const changePasswordValidator = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),
];
