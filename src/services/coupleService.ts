import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, set, get, update, remove } from 'firebase/database';
import { db, rtdb } from '../config/firebase';

const generateCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

export const generateCoupleCode = async (userId: string): Promise<string> => {
  const code = generateCode();
  const codeRef = ref(rtdb, couple_codes/);
  await set(codeRef, { creatorId: userId, createdAt: Date.now(), expiresAt: Date.now() + 86400000, status: 'active' });
  return code;
};

export const joinCouple = async (code: string, userId: string): Promise<string> => {
  const codeRef = ref(rtdb, couple_codes/);
  const snapshot = await get(codeRef);
  if (!snapshot.exists()) throw new Error('Invalid code');
  const data = snapshot.val();
  const coupleId = couple_;
  await setDoc(doc(db, 'couples', coupleId), { coupleId, partner1Id: data.creatorId, partner2Id: userId, createdAt: serverTimestamp(), status: 'active' });
  await update(codeRef, { status: 'used', coupleId });
  return coupleId;
};
