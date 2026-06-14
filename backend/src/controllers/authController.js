import crypto from 'node:crypto';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { clearAuthCookies, setAuthCookies, signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js';

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  branch: user.branch,
  year: user.year,
  whatsappNumber: user.whatsappNumber,
  profileImage: user.profileImage,
  wishlist: user.wishlist,
  createdAt: user.createdAt,
});

const issueTokens = async (res, user) => {
  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);
  await user.setRefreshToken(refreshToken);
  await user.save({ validateBeforeSave: false });
  setAuthCookies(res, { accessToken, refreshToken });
  return { accessToken, refreshToken };
};

export const register = asyncHandler(async (req, res) => {
  const existing = await User.findOne({ email: req.body.email });
  if (existing) throw new AppError('Email already registered', 409);

  const user = await User.create(req.body);
  const tokens = await issueTokens(res, user);
  res.status(201).json({ success: true, user: publicUser(user), ...tokens });
});

export const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select('+password +refreshTokenHash');
  if (!user || !(await user.comparePassword(req.body.password))) {
    throw new AppError('Invalid email or password', 401);
  }
  if (user.isBanned) throw new AppError('Account is banned', 403);

  const tokens = await issueTokens(res, user);
  res.status(200).json({ success: true, user: publicUser(user), ...tokens });
});

export const logout = asyncHandler(async (req, res) => {
  if (req.user) {
    req.user.refreshTokenHash = undefined;
    await req.user.save({ validateBeforeSave: false });
  }
  clearAuthCookies(res);
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.signedCookies?.refreshToken || req.body.refreshToken;
  if (!token) throw new AppError('Refresh token is required', 401);

  const decoded = verifyRefreshToken(token);
  const user = await User.findById(decoded.id).select('+refreshTokenHash');
  if (!user || !(await user.compareRefreshToken(token))) throw new AppError('Invalid refresh token', 401);

  const tokens = await issueTokens(res, user);
  res.status(200).json({ success: true, ...tokens });
});

export const me = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, user: publicUser(req.user) });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const token = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    console.log(`Password reset token for ${user.email}: ${token}`);
  }
  res.status(200).json({ success: true, message: 'If the email exists, a reset link has been generated.' });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const hashedToken = crypto.createHash('sha256').update(req.body.token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select('+password');

  if (!user) throw new AppError('Invalid or expired reset token', 400);
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const tokens = await issueTokens(res, user);
  res.status(200).json({ success: true, user: publicUser(user), ...tokens });
});
