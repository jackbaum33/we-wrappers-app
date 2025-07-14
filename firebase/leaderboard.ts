// we-wrappers-app/firebase/leaderboard.ts
import { db } from './config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getDoc, doc } from 'firebase/firestore';

/**
 * Gets wrap counts per user for the past 7 days.
 */
export const getWeeklyLeaderboard = async (): Promise<{ name: string; count: number }[]> => {
  const wrapsRef = collection(db, 'wraps');

  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);

  const allWrapsSnap = await getDocs(wrapsRef);

  const userCounts: Record<string, number> = {};

  allWrapsSnap.forEach((docSnap) => {
    const data = docSnap.data();
    const wrapDate = new Date(data.date);

    if (wrapDate >= oneWeekAgo && wrapDate <= today) {
      const userId = data.userId;
      if (!userCounts[userId]) {
        userCounts[userId] = 0;
      }
      userCounts[userId]++;
    }
  });

  // Get user names
  const results: { name: string; count: number }[] = [];
  for (const uid of Object.keys(userCounts)) {
    const userSnap = await getDoc(doc(db, 'users', uid));
    const name = userSnap.exists() ? userSnap.data().name : 'Anonymous';
    results.push({ name, count: userCounts[uid] });
  }

  // Sort by count descending
  results.sort((a, b) => b.count - a.count);
  return results;
};
