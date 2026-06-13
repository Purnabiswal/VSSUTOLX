import { Router } from 'express';
import { createReport, getReports } from '../controllers/reportController.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { createReportValidator } from '../validators/reportValidators.js';

const router = Router();

router.post('/', protect, createReportValidator, validateRequest, createReport);
router.get('/', protect, adminOnly, getReports);

export default router;
