"use client"
import { Button } from '@chakra-ui/react';
import { useError } from '@context/ErrorContext';
import axios from 'axios';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React ,{useEffect}from 'react'

function CompPage({params}) {
  const {challenge,setCurrentChallenge}=useError();
  const url=usePathname();
  useEffect(() => {
    axios.get(`/api/compete?query=${params.compid}`)
      .then(res => {
        console.log(res.data.data);
        setCurrentChallenge(res.data.data);
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div className="pt-16 grid place-items-center">
      {challenge!=undefined?(
        <div>
          <h1>{params.compid.toUpperCase()}</h1>
          <Link href={`/code/participate/${params.compid}/challenges`}><Button color="green.400">Open Challenge</Button></Link>
        </div>
      ):(
         <p className="font-bold text-2xl">Loading...</p>
      )}
    </div>
  )
}

export default CompPage