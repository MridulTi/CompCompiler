// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA2QjzQ0G0aQoWfhoNY4FMNVs6yyy10iOA",
    authDomain: "code-compiler-9f51b.firebaseapp.com",
    projectId: "code-compiler-9f51b",
    storageBucket: "code-compiler-9f51b.appspot.com",
    messagingSenderId: "106720276900",
    appId: "1:106720276900:web:3c3ebb1d70dcc8e09c9131"
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