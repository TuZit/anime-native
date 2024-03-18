// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA9chvi_jPOfidE_wwSo3OGigMtHo_Pld8',
  authDomain: 'chatapp-e7017.firebaseapp.com',
  projectId: 'chatapp-e7017',
  storageBucket: 'chatapp-e7017.appspot.com',
  messagingSenderId: '1088900477241',
  appId: '1:1088900477241:web:ec56460d45982b6d7038e8',
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
