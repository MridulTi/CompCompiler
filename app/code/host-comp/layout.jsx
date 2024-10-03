"use client"
import { AddChallengeModal } from '@components/Modals';
import { DashNav } from '@components/Nav'
import { useError } from '@context/ErrorContext'
import React from 'react'

export default function layout({children}) {
  const {addChallenge,setNewAddChallenge}=useError();
  return (
    <>
      {/* <DashNav/> */}
      {children}
      {addChallenge&&<AddChallengeModal open={addChallenge} handleOpen={setNewAddChallenge}/>}
    </>
  )
}
