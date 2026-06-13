import Chat from '../models/Chat.js';
import AppError from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createChat = asyncHandler(async (req, res) => {
  if (req.body.participantId === req.user._id.toString()) throw new AppError('Cannot create chat with yourself', 400);
  const participants = [req.user._id, req.body.participantId];
  const query = { participants: { $all: participants, $size: 2 } };
  if (req.body.productId) query.product = req.body.productId;
  else query.product = { $exists: false };
  let chat = await Chat.findOne(query);
  if (!chat) {
    chat = await Chat.create({ participants, product: req.body.productId });
  }
  await chat.populate('participants', 'name profileImage');
  res.status(201).json({ success: true, chat });
});

export const getChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({ participants: req.user._id })
    .populate('participants', 'name profileImage')
    .populate('product', 'title images price')
    .populate('lastMessage')
    .sort('-updatedAt');
  res.status(200).json({ success: true, chats });
});

export const getChatById = asyncHandler(async (req, res) => {
  const chat = await Chat.findOne({ _id: req.params.id, participants: req.user._id })
    .populate('participants', 'name profileImage')
    .populate('product', 'title images price')
    .populate('lastMessage');
  if (!chat) throw new AppError('Chat not found', 404);
  res.status(200).json({ success: true, chat });
});
