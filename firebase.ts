import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAhqTN003ZOMAfD9upWLAuxNfsntkSQynI",
    authDomain: "premium-neon-art.firebaseapp.com",
    projectId: "premium-neon-art",
    storageBucket: "premium-neon-art.firebasestorage.app",
    messagingSenderId: "101815943788",
    appId: "1:101815943788:web:3fa548063b019c6a840e49"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
