import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { verifyAccessToken } from '../utils/jwt.js';

export const protect = asyncHandler(async (req, _res, next) => {
  const bearer = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null;
  const token = bearer || req.signedCookies?.accessToken;

  if (!token) throw new AppError('Authentication required', 401);

  const decoded = verifyAccessToken(token);
  const user = await User.findById(decoded.id).select('+passwordChangedAt');
  if (!user || user.isBanned) throw new AppError('User is not authorized', 401);

  req.user = user;
  next();
});
