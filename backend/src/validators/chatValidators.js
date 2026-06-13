import { body, param } from 'express-validator';

export const createChatValidator = [
  body('participantId').isMongoId().withMessage('participantId is required'),
  body('productId').optional().isMongoId(),
];

export const chatIdValidator = [
  param('id').isMongoId().withMessage('Valid chat id is required'),
];

export const createMessageValidator = [
  body('chatId').isMongoId().withMessage('chatId is required'),
  body('message').trim().isLength({ min: 1, max: 2000 }).withMessage('Message is required'),
];

export const messagesByChatValidator = [
  param('chatId').isMongoId().withMessage('Valid chat id is required'),
];
