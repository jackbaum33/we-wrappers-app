// we-wrappers-app/firebase/firestore.ts
import { db } from './config';
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from '@firebase/firestore';

/**
 * Submits a wrap to Firestore with a timestamp and image URL.
 * 
 * @param userId - Firebase user ID
 * @param imageUrl - Public URL of the uploaded wrap photo
 */
export const submitWrap = async (userId: string, imageUrl: string) => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  await setDoc(doc(db, 'wraps', `${userId}_${today}`), {
    userId,
    date: today,
    imageUrl,
    timestamp: serverTimestamp(),
  });

  // You could later expand this to update chains, brackets, and streaks here too
};
