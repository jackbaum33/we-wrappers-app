// we-wrappers-app/firebase/notifications.ts
import { getDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './config';
import { sendPushNotification } from '../utils/sendExpoNotification';

/**
 * Notify everyone in a user's chain that they wrapped today.
 * Assumes `chains` collection has a `members: [uid, uid, ...]` array.
 */
export const notifyChainOnWrap = async (userId: string, userName: string) => {
  const chainQuery = query(collection(db, 'chains'), where('members', 'array-contains', userId));
  const chainSnap = await getDocs(chainQuery);

  if (chainSnap.empty) return;

  const chain = chainSnap.docs[0].data();
  const otherMembers = chain.members.filter((id: string) => id !== userId);

  for (const memberId of otherMembers) {
    const tokenSnap = await getDoc(doc(db, 'pushTokens', memberId));
    if (tokenSnap.exists()) {
      const { token } = tokenSnap.data();
      await sendPushNotification(token, {
        title: 'Chain Update',
        body: `${userName} wrapped tefillin just now.`,
      });
    }
  }
};
