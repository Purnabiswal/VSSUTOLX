import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('name email branch year whatsappNumber profileImage createdAt');
  if (!user) throw new AppError('User not found', 404);
  res.status(200).json({ success: true, user });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const fields = ['name', 'branch', 'year', 'whatsappNumber'];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) req.user[field] = req.body[field];
  });
  await req.user.save({ validateBeforeSave: false });
  res.status(200).json({ success: true, user: req.user });
});

export const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('+password');
  if (!(await user.comparePassword(req.body.currentPassword))) {
    throw new AppError('Current password is incorrect', 400);
  }
  user.password = req.body.newPassword;
  await user.save();
  res.status(200).json({ success: true, message: 'Password updated successfully' });
});
