import Notification from '../models/Notification.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ receiver: req.user._id }).sort('-createdAt').limit(50);
  res.status(200).json({ success: true, notifications });
});

export const markNotificationsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ receiver: req.user._id, read: false }, { read: true });
  const notifications = await Notification.find({ receiver: req.user._id }).sort('-createdAt').limit(50);
  res.status(200).json({ success: true, notifications });
});
