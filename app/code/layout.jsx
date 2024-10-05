"use client"
import { ErrorModal, HostingModal } from '@components/Modals'
import { AuthNav } from '@components/Nav'
import { auth } from '@config/firebase.config'
import { useApp } from '@context/AppProviders'
import { useError } from '@context/ErrorContext.jsx'
import { ThemeProvider } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function layout({children}) {
  const{error,closeError,
    hostModal,setHostModal  
  }=useError()

  const {setupUserCred,userCred}=useApp();

  const router=useRouter();

  useEffect(()=>{
    console.log("Checking Token")
    const unsubscribe=auth.onAuthStateChanged(userCred=>{
      if(userCred){
        console.log(userCred)
        setupUserCred(userCred)
        router.push("/code/participate/")
      }else if(userCred===null){
        router.push("/code/authentication/")
      }
    })
    return ()=>unsubscribe()
  },[])
  return (
    <ThemeProvider>
      {children}
      {error&&<ErrorModal message={error} onClose={closeError}/>}
      {hostModal&&<HostingModal open={hostModal} handleOpen={setHostModal}/>}
    </ThemeProvider>
  )
}
