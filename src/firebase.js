
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyAfyjwt5ohdYmoN6Rs1XFiIlQXJGcko5YU",
    authDomain: "mernbook-9490c.firebaseapp.com",
    projectId: "mernbook-9490c",
    storageBucket: "mernbook-9490c.appspot.com",
    messagingSenderId: "988412624137",
    appId: "1:988412624137:web:c4bfe900b35bffa43d27d8",
    measurementId: "G-37EKC5Y1DX"
};




const app = initializeApp(firebaseConfig);
 const db= getFirestore(app);
export {db};