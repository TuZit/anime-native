// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'chatapp-e7017.firebaseapp.com',
  projectId: 'chatapp-e7017',
  storageBucket: 'chatapp-e7017.appspot.com',
  messagingSenderId: '1088900477241',
  appId: process.env.FIREBASE_APP_ID,
  measurementId: 'G-B7PP2H5J7G',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const FIREBASE_AUTH = getAuth();
// export const FIREBASE_AUTH = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });
export const FIREBASE_AUTH = initializeAuth(app);
export const FIREBASE_DB = getFirestore();
