import Report from '../models/Report.js';
import Product from '../models/Product.js';
import AppError from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createReport = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.body.product);
  if (!product) throw new AppError('Product not found', 404);
  const report = await Report.create({ reporter: req.user._id, product: product._id, reason: req.body.reason });
  res.status(201).json({ success: true, report });
});

export const getReports = asyncHandler(async (_req, res) => {
  const reports = await Report.find().populate('reporter', 'name email').populate('product', 'title seller status').sort('-createdAt');
  res.status(200).json({ success: true, reports });
});
