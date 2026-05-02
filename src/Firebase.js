// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 1. Import Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const FIREAPI = import.meta.env.FIRE_API
const firebaseConfig = {
  apiKey: FIREAPI,
  authDomain: "ecosort-1e92b.firebaseapp.com",
  projectId: "ecosort-1e92b",
  storageBucket: "ecosort-1e92b.firebasestorage.app",
  messagingSenderId: "819728623734",
  appId: "1:819728623734:web:314ff55a6893a6b50a9757",
  measurementId: "G-VLKHVT16K5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // 2. Export db