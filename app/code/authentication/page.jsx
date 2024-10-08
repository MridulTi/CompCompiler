"use client";
import React, { useEffect, useState } from "react";
import { MdOutlinePentagon } from "react-icons/md";
import { LuDivide, LuActivity } from "react-icons/lu";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { AiFillGoogleCircle, AiOutlineGoogle, AiOutlineLike } from "react-icons/ai";
import { Card, Checkbox, Input, Typography } from "@material-tailwind/react";
import { useApp } from "@context/AppProviders";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useError } from "@context/ErrorContext";
import { auth } from "@config/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithGithub, signInWithGoogle } from "@utils/helpers";
import { Button } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Auth() {
  const {triggerError}=useError();
  const { AuthPage, toggleAuthPage ,setupUserCred,userCred} = useApp();
  const [Form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });


  function handleForm(e) {
    setForm({ ...Form, [e.target.name]: e.target.value });
  }

  const createNewUser=async()=>{
    await createUserWithEmailAndPassword(auth,Form.email,Form.password)
      .then(userCred=>{
        console.log(userCred);
        const Formdata={
          username:userCred.user.displayName,
          email:userCred.user.email,
          image:userCred.user.photoURL,
          uid:userCred.user.uid,
        }
        axios.post("/api/auth/users",Formdata)
            .then(res=>console.log(res.data.data))
            .catch(err=>console.log(err))
        toggleAuthPage("login");
      })
      .catch(err=>triggerError(err.message))
  }

  const loginWithEmailPassword=async()=>{
    await signInWithEmailAndPassword(auth,Form.email,Form.password)
      .then(userCred=>console.log(userCred))
      .catch(err=>triggerError(err.message))
  }

  return (
    <>
      <section className="w-full h-auto min-h-screen grid place-items-center p-4 md:p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 place-items-center w-full max-w-7xl">
          <div className="w-full h-full lg:w-4/6 text-center lg:text-left">
          <Button className="flex gap-2 mb-12" color="green.400"><ArrowLeft/>Back to Compile-CLASH</Button>
            <h1 className="font-extrabold text-4xl lg:text-6xl"> 
              {AuthPage === "register" ? "Create an account" : "Welcome Back!"}
            </h1>
            <ul className="text-lg lg:text-2xl grid gap-4 pt-4">
              <li className="flex items-center justify-center lg:justify-start gap-2">
                <MdOutlinePentagon className="text-blue-600" /> Host and Participate in coding competitions.
              </li>
              <li className="flex items-center justify-center lg:justify-start gap-2">
                <HiOutlineLightningBolt className="text-blue-600" /> Fast transfers.
              </li>
              <li className="flex items-center justify-center lg:justify-start gap-2">
                <LuDivide className="text-blue-600" /> Fast networks.
              </li>
              <li className="flex items-center justify-center lg:justify-start gap-2">
                <LuActivity className="text-blue-600" /> Best available questions.
              </li>
              <li className="flex items-center justify-center lg:justify-start gap-2">
                <AiOutlineLike className="text-blue-600" /> Convenience.
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-4/6">
            <Card color="transparent" shadow={false} className="p-4">
              <Typography variant="h4" color="blue-gray" className="text-center lg:text-left">
                {AuthPage === "register" ? "Sign Up" : "Log In"}
              </Typography>
              <Typography color="gray" className="mt-1 font-normal text-center lg:text-left">
                {AuthPage === "register"
                  ? "Nice to meet you! Enter your details to register."
                  : "Welcome back! Enter your details to login."}
              </Typography>
              <form
                onSubmit={AuthPage === "register" ? createNewUser : loginWithEmailPassword}
                className="mt-4 mb-2 w-full sm:w-80 lg:w-full max-w-screen-lg"
              >
                <div className="mb-1 flex flex-col gap-4">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Your Email
                  </Typography>
                  <Input
                    onChange={handleForm}
                    name="email"
                    variant="outline"
                    size="lg"
                    label="Email"
                    placeholder="name@mail.com"
                    className="outline-0"
                  />
                  {AuthPage === "register" && (
                    <>
                      <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Your Username
                      </Typography>
                      <Typography variant="small" color="blue-gray" className="-mb-3  text-gray-500">
                        Username Only in Uppercase, lowercase and numbers are allowed, max. length of 16 characters
                      </Typography>
                      <Input
                        onChange={handleForm}
                        name="username"
                        variant="outline"
                        size="lg"
                        label="Username"
                        placeholder="Username"
                        className="outline-0"
                      />
                    </>
                  )}
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Password
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="-mb-3 text-gray-500">
                  Password must contain one number,atleast one uppercase and one lowercase letters and one special character, with length of between 8 to 32 long
                    </Typography>
                  <Input
                    onChange={handleForm}
                    name="password"
                    type="password"
                    label="Password"
                    size="lg"
                    placeholder="********"
                    className="outline-0"
                  />
                </div>
                {AuthPage === "register" && (
                  <Checkbox
                    label={
                      <Typography variant="small" color="gray" className="flex items-center font-normal">
                        I agree to the
                        <a href="#" className="font-medium transition-colors hover:text-gray-900">
                          &nbsp;Terms and Conditions
                        </a>
                      </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                  />
                )}
                <Button type="submit" className="mt-6 w-full" fullWidth>
                  {AuthPage === "register" ? "Sign Up" : "Log In"}
                </Button>
               
                {AuthPage==="register"?(
                <p className="text-md text-black font-thin text-center py-2">Already have an Account? <b className="font-semibold cursor-pointer" onClick={()=>toggleAuthPage("login")}>Login!</b> </p>
                ):(<p className="text-md text-black font-thin text-center py-2">Don't have an Account yet? <b onClick={()=>toggleAuthPage("register")} className="font-semibold cursor-pointer">Sign Up!</b> </p>)}
              </form>
              <Button onClick={signInWithGoogle}className="mt-6 flex gap-2 w-full bg-gray-700" fullWidth>
                <AiOutlineGoogle className="text-green-500 text-xl"/>  Sign In with Google
            </Button>
            <Button onClick={signInWithGithub}className="mt-6 flex gap-2 w-full bg-gray-700" fullWidth>
            <GitHubLogoIcon className="text-green-500 text-xl"/>  Sign In with Github
            </Button>
            </Card>
            
          </div>
        </div>
      </section>
    </>
  );
}
