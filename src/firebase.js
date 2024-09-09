// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLp9MDRo9pP_zpSVFUhrbTjHBB74sIiug",
  authDomain: "todo-5fbbc.firebaseapp.com",
  projectId: "todo-5fbbc",
  storageBucket: "todo-5fbbc.appspot.com",
  messagingSenderId: "198367107920",
  appId: "1:198367107920:web:7730dcb1e3c529cb2eaa55",
  measurementId: "G-14CWWCFN63",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const db= getFirestore(app);
export {db};