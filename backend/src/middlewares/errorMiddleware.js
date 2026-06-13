import AppError from '../utils/AppError.js';

export const notFound = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

export const errorMiddleware = (err, _req, res, _next) => {
  const isMulterError = err.name === 'MulterError';
  const multerMessages = {
    LIMIT_FILE_SIZE: 'Each image must be 3MB or smaller',
    LIMIT_FILE_COUNT: 'You can upload up to 6 images',
    LIMIT_UNEXPECTED_FILE: 'Image field name must be images',
  };
  const statusCode = err.statusCode || (isMulterError ? 400 : 500);
  const payload = {
    success: false,
    message: err.isOperational || isMulterError ? (multerMessages[err.code] || err.message) : 'Internal server error',
  };

  if (err.errors) payload.details = err.errors;
  if (process.env.NODE_ENV !== 'production') payload.stack = err.stack;

  res.status(statusCode).json(payload);
};
