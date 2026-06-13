import Notification from '../models/Notification.js';
import { getIO } from '../socket/index.js';

export const createNotification = async ({ receiver, type, message }) => {
  const notification = await Notification.create({ receiver, type, message });
  const io = getIO();
  if (io) io.to(`user:${receiver}`).emit('notification:new', notification);
  return notification;
};
