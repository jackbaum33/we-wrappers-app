// we-wrappers-app/firebase/streak.ts
import { db } from './config';
import { collection, query, where, getDocs } from 'firebase/firestore';

/**
 * Retrieves all wrap submission dates for the given user.
 * Wraps are stored as documents with IDs: `${uid}_${YYYY-MM-DD}`
 */
export const getUserStreakDates = async (userId: string): Promise<string[]> => {
  const wrapsRef = collection(db, 'wraps');
  const q = query(wrapsRef, where('userId', '==', userId));
  const snapshot = await getDocs(q);

  const dates: string[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.date) {
      dates.push(data.date);
    }
  });

  return dates;
};
