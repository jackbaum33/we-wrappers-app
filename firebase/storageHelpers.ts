// we-wrappers-app/firebase/storage.ts
import { storage } from './config';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';

/**
 * Uploads a wrap photo to Firebase Storage and returns its public URL.
 * 
 * @param uri - Local file URI of the image
 * @param userId - Firebase user ID
 * @returns URL of uploaded image
 */
export const uploadWrapPhoto = async (uri: string, userId: string): Promise<string> => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const today = new Date().toISOString().split('T')[0]; // e.g., 2025-07-13
  const storageRef = ref(storage, `wraps/${userId}_${today}.jpg`);

  await uploadBytes(storageRef, blob);
  return await getDownloadURL(storageRef);
};
