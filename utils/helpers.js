import { auth } from "@config/firebase.config.js"
import { GithubAuthProvider, GoogleAuthProvider,signInWithPopup} from "firebase/auth"

const googleProvider=new GoogleAuthProvider();
const githubProvider=new GithubAuthProvider();

export const signInWithGoogle=async()=>{
    await signInWithPopup(auth,googleProvider).then(async(result)=>{
        console.log(result)
    })
}

export const signInWithGithub=async()=>{
    await signInWithPopup(auth,githubProvider).then(async(result)=>{
        console.log(result)
    })
}
