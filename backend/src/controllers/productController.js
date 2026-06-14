import Product from '../models/Product.js';
import AppError from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { buildProductQuery, pagination, sortBy } from '../utils/queryFeatures.js';
import { deleteCloudinaryAsset, uploadBufferToCloudinary } from '../services/cloudinaryService.js';

const canModifyProduct = (user, product) => user.role === 'admin' || product.seller.toString() === user._id.toString();

export const getProducts = asyncHandler(async (req, res) => {
  const filter = buildProductQuery(req.query);
  const { page, limit, skip } = pagination(req.query);
  const [products, total] = await Promise.all([
    Product.find(filter).populate('seller', 'name branch year whatsappNumber profileImage').sort(sortBy(req.query)).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    products,
    meta: { total, page, pages: Math.ceil(total / limit), limit },
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true }).populate('seller', 'name branch year whatsappNumber profileImage');
  if (!product) throw new AppError('Product not found', 404);
  res.status(200).json({ success: true, product });
});

export const createProduct = asyncHandler(async (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);
  console.log("USER:", req.user);
  const images = req.files?.length
    ? await Promise.all(req.files.map((file) => uploadBufferToCloudinary(file)))
    : [];

  const product = await Product.create({
    ...req.body,
    seller: req.user._id,
    images,
  });

  res.status(201).json({ success: true, product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new AppError('Product not found', 404);
  if (!canModifyProduct(req.user, product)) throw new AppError('You cannot update this product', 403);

  const updates = ['title', 'description', 'price', 'category', 'location'];
  updates.forEach((field) => {
    if (req.body[field] !== undefined) product[field] = req.body[field];
  });

  if (req.files?.length) {
    await Promise.all(product.images.map((image) => deleteCloudinaryAsset(image.publicId)));
    product.images = await Promise.all(req.files.map((file) => uploadBufferToCloudinary(file)));
  }

  await product.save();
  res.status(200).json({ success: true, product });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new AppError('Product not found', 404);
  if (!canModifyProduct(req.user, product)) throw new AppError('You cannot delete this product', 403);

  await Promise.all(product.images.map((image) => deleteCloudinaryAsset(image.publicId)));
  await product.deleteOne();
  res.status(200).json({ success: true, message: 'Product deleted' });
});

export const markProductSold = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new AppError('Product not found', 404);
  if (!canModifyProduct(req.user, product)) throw new AppError('You cannot update this product', 403);
  product.status = 'sold';
  await product.save();
  res.status(200).json({ success: true, product });
});
