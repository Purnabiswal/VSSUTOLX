import { Readable } from 'node:stream';
import cloudinary from '../config/cloudinary.js';

export const uploadBufferToCloudinary = (file, folder = 'vssut-olx/products') =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image', transformation: [{ quality: 'auto', fetch_format: 'auto' }] },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );

    Readable.from(file.buffer).pipe(uploadStream);
  });

export const deleteCloudinaryAsset = async (publicId) => {
  if (!publicId) return null;
  return cloudinary.uploader.destroy(publicId);
};
