import User from '../models/User.js';
import Product from '../models/Product.js';
import Report from '../models/Report.js';
import AppError from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { deleteCloudinaryAsset } from '../services/cloudinaryService.js';

export const getAdminUsers = asyncHandler(async (_req, res) => {
  const users = await User.find().select('-password -refreshTokenHash').sort('-createdAt');
  res.status(200).json({ success: true, users });
});

export const getAdminProducts = asyncHandler(async (_req, res) => {
  const products = await Product.find().populate('seller', 'name email').sort('-createdAt');
  res.status(200).json({ success: true, products });
});

export const deleteAdminProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new AppError('Product not found', 404);
  await Promise.all(product.images.map((image) => deleteCloudinaryAsset(image.publicId)));
  await product.deleteOne();
  res.status(200).json({ success: true, message: 'Product removed by admin' });
});

export const banUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new AppError('User not found', 404);
  if (user.role === 'admin') throw new AppError('Admin users cannot be banned', 400);
  user.isBanned = true;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({ success: true, user });
});

export const getAdminReports = asyncHandler(async (_req, res) => {
  const reports = await Report.find().populate('reporter', 'name email').populate('product', 'title status').sort('-createdAt');
  res.status(200).json({ success: true, reports });
});

export const getAnalytics = asyncHandler(async (_req, res) => {
  const [totalUsers, totalProducts, soldProducts, reportsCount, monthlyRegistrations, monthlyListings] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Product.countDocuments({ status: 'sold' }),
    Report.countDocuments(),
    User.aggregate([
      { $group: { _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]),
    Product.aggregate([
      { $group: { _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]),
  ]);

  res.status(200).json({
    success: true,
    analytics: {
      totalUsers,
      totalProducts,
      soldProducts,
      activeProducts: totalProducts - soldProducts,
      reportsCount,
      monthlyRegistrations,
      monthlyListings,
    },
  });
});
