import { Router } from 'express';
import { createContactMessage } from '../controllers/contactController.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { createContactMessageValidator } from '../validators/contactValidators.js';

const router = Router();

router.post('/', createContactMessageValidator, validateRequest, createContactMessage);

export default router;
