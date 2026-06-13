import mongoose from 'mongoose';
import { PRODUCT_CATEGORIES, PRODUCT_STATUS } from '../constants/categories.js';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: 3,
      maxlength: 120,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: 10,
      maxlength: 2500,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    category: {
      type: String,
      enum: PRODUCT_CATEGORIES,
      required: [true, 'Category is required'],
      index: true,
    },
    images: [{
      url: { type: String, required: true },
      publicId: String,
    }],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: PRODUCT_STATUS,
      default: 'available',
      index: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      maxlength: 120,
    },
  },
  { timestamps: true },
);

productSchema.index({ title: 'text', description: 'text', location: 'text' });
productSchema.index({ category: 1, price: 1, status: 1, createdAt: -1 });

export default mongoose.model('Product', productSchema);
