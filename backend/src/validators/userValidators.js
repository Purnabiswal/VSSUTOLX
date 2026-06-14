import { body, param } from 'express-validator';

export const userIdValidator = [
  param('id').isMongoId().withMessage('Valid user id is required'),
];

export const updateProfileValidator = [
  body('name').optional().trim().isLength({ min: 2, max: 80 }).withMessage('Name must be between 2 and 80 characters'),
  body('branch').optional().trim().isLength({ max: 80 }).withMessage('Branch must be at most 80 characters'),
  body('year').optional().isInt({ min: 1, max: 5 }).toInt(),
  body('whatsappNumber')
    .optional({ values: 'falsy' })
    .trim()
    .matches(/^[6-9]\d{9}$/)
    .withMessage('WhatsApp number must be a valid Indian mobile number'),
];

export const changePasswordValidator = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),
];
