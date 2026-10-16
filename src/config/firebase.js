
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"



const firebaseConfig = {
  apiKey: "AIzaSyChjwMw5E5XUKvvw02JhDtouSoE8VwK57w",
  authDomain: "react-firebase-projects-94e8c.firebaseapp.com",
  projectId: "react-firebase-projects-94e8c",
  storageBucket: "react-firebase-projects-94e8c.firebasestorage.app",
  messagingSenderId: "275239453627",
  appId: "1:275239453627:web:25e82dd6234e7327defa9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleprovider=new GoogleAuthProvider()
export const db=getFirestore(app)



//npm install -g firebase-tools

/* FOR DEPLOYING

firebase login
firebase init
firebase deploy
*/




