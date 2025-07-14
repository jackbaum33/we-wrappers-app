// we-wrappers-app/firebase/admin.ts
import { db } from './config';
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc
} from 'firebase/firestore';

/**
 * Creates a new bracket with a given name.
 */
export const createBracket = async (name: string) => {
  const bracketsRef = collection(db, 'brackets');
  await addDoc(bracketsRef, {
    name,
    createdAt: serverTimestamp(),
  });
};

/**
 * Posts a daily message or quote to a global or group feed.
 * You can change this to be per group later if needed.
 */
export const postDailyMessage = async (message: string) => {
  const today = new Date().toISOString().split('T')[0];
  await setDoc(doc(db, 'dailyMessages', today), {
    message,
    postedAt: serverTimestamp(),
  });
};
