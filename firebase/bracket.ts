// we-wrappers-app/firebase/bracket.ts
import { db } from './config';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

/**
 * Get all bracket matchups where the user is either player 1 or player 2.
 */
export const getUserMatchups = async (userId: string) => {
  const matchQuery = query(
    collection(db, 'matchups'),
    where('participants', 'array-contains', userId)
  );
  const snapshot = await getDocs(matchQuery);

  const today = new Date().toISOString().split('T')[0];

  const matches = await Promise.all(
    snapshot.docs.map(async (docSnap) => {
      const data = docSnap.data();
      const user1Snap = await getDoc(doc(db, 'users', data.user1));
      const user2Snap = await getDoc(doc(db, 'users', data.user2));
      const result = {
        id: docSnap.id,
        user1: {
          uid: data.user1,
          name: user1Snap.exists() ? user1Snap.data().name : 'User 1',
        },
        user2: {
          uid: data.user2,
          name: user2Snap.exists() ? user2Snap.data().name : 'User 2',
        },
        user1Time: data.user1Time,
        user2Time: data.user2Time,
        winner: data.winner,
      };

      return result;
    })
  );

  return matches;
};

/**
 * Call this after a user submits their wrap to log their time in the matchup.
 * This logic could live inside a Cloud Function too.
 */
export const updateMatchupWrapTime = async (
  matchId: string,
  userId: string,
  timeString: string
) => {
  const ref = doc(db, 'matchups', matchId);
  const matchSnap = await getDoc(ref);
  if (!matchSnap.exists()) return;

  const data = matchSnap.data();
  const isUser1 = data.user1 === userId;

  const updates: any = {
    ...(isUser1 ? { user1Time: timeString } : { user2Time: timeString }),
  };

  // If both times are submitted, determine winner
  if (
    (isUser1 && data.user2Time) ||
    (!isUser1 && data.user1Time)
  ) {
    const time1 = isUser1 ? timeString : data.user1Time;
    const time2 = isUser1 ? data.user2Time : timeString;

    if (time1 < time2) updates.winner = data.user1;
    else if (time2 < time1) updates.winner = data.user2;
    else updates.winner = 'draw';
  }

  updates.updatedAt = serverTimestamp();
  await updateDoc(ref, updates);
};
