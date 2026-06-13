import { body } from 'express-validator';

export const createContactMessageValidator = [
  body('name').trim().isLength({ min: 2, max: 120 }).withMessage('Name must be 2-120 characters'),
  body('email').trim().isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be 10-2000 characters'),
];
