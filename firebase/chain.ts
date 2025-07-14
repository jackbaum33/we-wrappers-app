// we-wrappers-app/firebase/chain.ts
import { db } from './config';
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

/**
 * Gets the chain document for a given user based on Firestore structure:
 * /chains/{chainId} with a field `members: [userId, ...]`
 */
export const getUserChain = async (userId: string) => {
  const chainQuery = query(
    collection(db, 'chains'),
    where('members', 'array-contains', userId)
  );

  const snapshot = await getDocs(chainQuery);
  if (snapshot.empty) return null;

  const chainDoc = snapshot.docs[0];
  const data = chainDoc.data();
  const today = new Date().toISOString().split('T')[0];

  const members = await Promise.all(
    data.members.map(async (uid: string) => {
      const userSnap = await getDoc(doc(db, 'users', uid));
      const userData = userSnap.exists() ? userSnap.data() : {};
      const wrapSnap = await getDoc(doc(db, 'wraps', `${uid}_${today}`));
      return {
        uid,
        name: userData.name || 'Anonymous',
        wrappedToday: wrapSnap.exists(),
      };
    })
  );

  const allWrapped = members.every((m) => m.wrappedToday);

  return {
    id: chainDoc.id,
    members,
    complete: allWrapped,
  };
};
