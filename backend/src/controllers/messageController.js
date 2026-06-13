import Chat from '../models/Chat.js';
import Message from '../models/Message.js';
import AppError from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getIO } from '../socket/index.js';
import { createNotification } from '../services/notificationService.js';

export const sendMessage = asyncHandler(async (req, res) => {
  const chat = await Chat.findOne({ _id: req.body.chatId, participants: req.user._id });
  if (!chat) throw new AppError('Chat not found', 404);

  const message = await Message.create({
    chatId: chat._id,
    sender: req.user._id,
    message: req.body.message,
    deliveredAt: new Date(),
  });

  chat.lastMessage = message._id;
  await chat.save();
  await message.populate('sender', 'name profileImage');

  const recipients = chat.participants.filter((id) => id.toString() !== req.user._id.toString());
  const io = getIO();
  if (io) io.to(`chat:${chat._id}`).emit('message:new', message);
  await Promise.all(recipients.map((receiver) => createNotification({ receiver, type: 'message', message: `${req.user.name} sent you a message` })));

  res.status(201).json({ success: true, message });
});

export const getMessages = asyncHandler(async (req, res) => {
  const chat = await Chat.findOne({ _id: req.params.chatId, participants: req.user._id });
  if (!chat) throw new AppError('Chat not found', 404);

  const messages = await Message.find({ chatId: chat._id }).populate('sender', 'name profileImage').sort('createdAt');
  await Message.updateMany({ chatId: chat._id, sender: { $ne: req.user._id }, read: false }, { read: true, readAt: new Date() });
  res.status(200).json({ success: true, messages });
});
