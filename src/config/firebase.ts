import { Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
// @ts-ignore
import { getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCAv9DI-Y-CHu_ESuUc6MdXbo2IvaSfuqg",
  authDomain: "duodecide-2922f.firebaseapp.com",
  projectId: "duodecide-2922f",
  storageBucket: "duodecide-2922f.firebasestorage.app",
  messagingSenderId: "183374888741",
  appId: "1:183374888741:web:42dfeaa581a2e17bfea4cc",
  databaseURL: "https://duodecide-2922f-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);

export const auth = Platform.OS === 'web' ? getAuth(app) : initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });

export const db = getFirestore(app);
export const rtdb = getDatabase(app);



