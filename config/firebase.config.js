// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey:process.env.NEXT_PUBLIC_FIREBASE_APP_API_KEY,
    authDomain:process.env.NEXT_PUBLIC_FIREBASE_APP_AUTHDOMAIN,
    projectId:process.env.NEXT_PUBLIC_FIREBASE_APP_PROJECTID,
    storageBucket:process.env.NEXT_PUBLIC_FIREBASE_APP_STORAGE_BUCKET,
    messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_APP_MESSAGE_SENDING_ID,
    appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};
// Initialize Firebase
const app = getApps.length>0? getApp() : initializeApp(firebaseConfig);
const auth=getAuth(app)

const db=getFirestore(app)

export {
    app,
    auth,
    db
}