// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore};