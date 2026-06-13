import { validationResult } from 'express-validator';
import AppError from '../utils/AppError.js';

export const validateRequest = (req, _res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  const error = new AppError('Validation failed', 422);
  error.errors = result.array();
  next(error);
};
