import { Server } from 'socket.io';
import User from '../models/User.js';
import Message from '../models/Message.js';
import { verifyAccessToken } from '../utils/jwt.js';

let io;
const onlineUsers = new Map();

export const getIO = () => io;

export const getOnlineUsers = () => onlineUsers;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.replace('Bearer ', '');
      if (!token) return next(new Error('Socket authentication required'));
      const decoded = verifyAccessToken(token);
      const user = await User.findById(decoded.id).select('name role');
      if (!user || user.isBanned) return next(new Error('Unauthorized socket user'));
      socket.user = user;
      next();
    } catch {
      next(new Error('Invalid socket token'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.user._id.toString();
    onlineUsers.set(userId, socket.id);
    socket.join(`user:${userId}`);
    io.emit('user:online', { userId });

    socket.on('chat:join', ({ chatId }) => {
      if (chatId) socket.join(`chat:${chatId}`);
    });

    socket.on('chat:leave', ({ chatId }) => {
      if (chatId) socket.leave(`chat:${chatId}`);
    });

    socket.on('typing:start', ({ chatId }) => {
      socket.to(`chat:${chatId}`).emit('typing:start', { chatId, userId });
    });

    socket.on('typing:stop', ({ chatId }) => {
      socket.to(`chat:${chatId}`).emit('typing:stop', { chatId, userId });
    });

    socket.on('message:delivered', async ({ messageId }) => {
      if (!messageId) return;
      const message = await Message.findByIdAndUpdate(messageId, { deliveredAt: new Date() }, { new: true });
      if (message) io.to(`chat:${message.chatId}`).emit('message:delivered', { messageId, deliveredAt: message.deliveredAt });
    });

    socket.on('message:read', async ({ chatId }) => {
      if (!chatId) return;
      await Message.updateMany({ chatId, sender: { $ne: socket.user._id }, read: false }, { read: true, readAt: new Date() });
      io.to(`chat:${chatId}`).emit('message:read', { chatId, readerId: userId });
    });

    socket.on('disconnect', () => {
      onlineUsers.delete(userId);
      io.emit('user:offline', { userId });
    });
  });

  return io;
};
