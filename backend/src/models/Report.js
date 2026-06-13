import mongoose from 'mongoose';
import { REPORT_STATUS } from '../constants/categories.js';

const reportSchema = new mongoose.Schema(
  {
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: REPORT_STATUS,
      default: 'open',
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Report', reportSchema);
