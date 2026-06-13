import { param } from 'express-validator';

export const adminProductIdValidator = [
  param('id').isMongoId().withMessage('Valid product id is required'),
];

export const adminUserIdValidator = [
  param('id').isMongoId().withMessage('Valid user id is required'),
];
