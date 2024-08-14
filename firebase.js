// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, deleteDoc, doc, getDocs, getDoc, setDoc, query } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // Remove if not used

const firebaseConfig = {
  apiKey: "AIzaSyBRy1iog66Ijr-NbuVMOiWLdN58PQPrgtA",
  authDomain: "project2-f9c87.firebaseapp.com",
  projectId: "project2-f9c87",
  storageBucket: "project2-f9c87.appspot.com",
  messagingSenderId: "327730681693",
  appId: "1:327730681693:web:305c7a0b223592815d3ab4",
  measurementId: "G-10W3WENPG8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Remove if not used
const firestore = getFirestore(app);

export { firestore, collection, deleteDoc, doc, getDocs, getDoc, setDoc, query };
