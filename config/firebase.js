// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA44g-1CJh1qkEGEIylPtMo-YAKQbcX1s",
  authDomain: "easybud-89aef.firebaseapp.com",
  projectId: "easybud-89aef",
  storageBucket: "easybud-89aef.appspot.com",
  messagingSenderId: "78140454630",
  appId: "1:78140454630:web:11ae52d37bddcbf386ad27",
  measurementId: "G-45QZ7BE73N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);

export const tripsRef = collection(db, 'trips')
export const expensesRef = collection(db, 'expenses')

export default app;