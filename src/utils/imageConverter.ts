export const imageToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);

    reader.onerror = () => reject(new Error('Failed to convert image to base64'));

    reader.readAsDataURL(file);
  });

export const validateImage = (file: File): { isValid: boolean; error?: string } => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  const maxSize = 2 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Only PNG and JPEG images are allowed (max 2MB)' };
  }

  if (file.size > maxSize) {
    return { isValid: false, error: 'Image size must be less than 2MB' };
  }

  return { isValid: true };
};
