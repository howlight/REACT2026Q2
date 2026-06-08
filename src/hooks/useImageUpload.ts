import { type ChangeEvent, useState } from 'react';

import { imageToBase64, validateImage } from '~/utils/imageConverter';

type UseImageUploadReturn = {
  imageBase64: string;
  imageError: string;
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
};

export const useImageUpload = (): UseImageUploadReturn => {
  const [imageBase64, setImageBase64] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImage(file);
    if (!validation.isValid) {
      setImageError(validation.error || 'Invalid image');
      setImageBase64('');
      return;
    }

    setImageError('');
    try {
      const base64 = await imageToBase64(file);
      setImageBase64(base64);
    } catch {
      setImageError('Failed to upload image');
    }
  };

  return {
    imageBase64,
    imageError,
    handleImageUpload,
  };
};
