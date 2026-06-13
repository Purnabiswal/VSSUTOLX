import Product from '../models/Product.js';
import AppError from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getWishlist = asyncHandler(async (req, res) => {
  const user = await req.user.populate({ path: 'wishlist', populate: { path: 'seller', select: 'name profileImage' } });
  res.status(200).json({ success: true, wishlist: user.wishlist });
});

export const addToWishlist = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) throw new AppError('Product not found', 404);
  if (!req.user.wishlist.some((id) => id.toString() === product._id.toString())) {
    req.user.wishlist.push(product._id);
    await req.user.save({ validateBeforeSave: false });
  }
  res.status(200).json({ success: true, wishlist: req.user.wishlist });
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  req.user.wishlist = req.user.wishlist.filter((id) => id.toString() !== req.params.productId);
  await req.user.save({ validateBeforeSave: false });
  res.status(200).json({ success: true, wishlist: req.user.wishlist });
});
