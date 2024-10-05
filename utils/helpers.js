import { auth } from "@config/firebase.config";
import axios from "axios";
import { signOut } from "firebase/auth";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// Initialize Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log(result);
    const Formdata={
        username:result.user.displayName,
        email:result.user.email,
        image:result.user.photoURL,
        uid:result.user.uid,
    }
    await axios.post("/api/auth/users",Formdata)
        .then(res=>console.log(res.data.data))
        .catch(err=>console.log(err))

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Sign-in error:", errorMessage, errorCode);
  }
};

export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    console.log(result);
    const Formdata={
        username:result.user.displayName,
        email:result.user.email,
        image:result.user.photoURL,
        uid:result.user.uid,
    }
    await axios.post("/api/auth/users",Formdata)
        .then(res=>console.log(res.data.data))
        .catch(err=>console.log(err))
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Sign-in error:", errorMessage, errorCode);
  }
};

export const signOutFunction = async () => {
  try {
    await signOut(auth);
    console.log("Successfully Signed Out");

  } catch (err) {
    console.error("Sign-out error:", err);
  }
};
