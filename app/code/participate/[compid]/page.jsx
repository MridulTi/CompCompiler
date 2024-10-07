"use client"
import { Button } from '@chakra-ui/react';
import { useError } from '@context/ErrorContext';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

function CompPage({ params }) {
  const { challenge, setCurrentChallenge } = useError();
  const url = usePathname();
  useEffect(() => {
    axios.get(`/api/compete?query=${params.compid}`)
      .then(res => {
        console.log(res.data.data);
        setCurrentChallenge(res.data.data);
      })
      .catch(err => console.log(err))
  }, [])
  const isRegistered = false;
  return (
    <div className="pt-20 min-h-screen grid w-full place-items-center items-start">

      {challenge != undefined ? (
        <div className="w-8/12 grid gap-6 place-items-center">
          <Link className="h-fit w-full" href={`/code/participate`}>
            <Button color='green.500' className="flex gap-2 w-fit">
              <ArrowLeft />Back to Home Page
            </Button>
          </Link>
          <div className="w-full text-center bg-gray-100 dark:bg-gray-900 py-16">
            <h1 className="text-8xl font-extrabold">{params.compid.toUpperCase()}</h1>
            <p className="text-gray-700 text-xl px-32 w-full pb-6">
              {challenge?.tagline}Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia mollitia deserunt modi. Harum amet ea tempora repellendus veritatis, illo assumenda accusamus ullam totam perferendis ipsam laborum beatae error labore repudiandae.
            </p>
            {isRegistered ? (
              <Button size='lg' colorScheme="green">Register Here!</Button>
            ) : (
              <Link href={`/code/participate/${params.compid}/challenges`}><Button size='lg' colorScheme="green">Open Challenge</Button></Link>
            )}
          </div>
          <div className="pt-6">
            <h1 className="text-center text-4xl font-bold">About</h1>
            <p className="text-gray-600 text-lg px-32 text-center w-full">
              {challenge?.about}Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia mollitia deserunt modi. Harum amet ea tempora repellendus veritatis, illo assumenda accusamus ullam totam perferendis ipsam laborum beatae error labore repudiandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptates id nesciunt sit dignissimos amet impedit sint consectetur eligendi quasi? Eaque asperiores quae corrupti fuga neque sed, iusto recusandae nulla.
            </p>
          </div>
          <div className="pt-6">
            <h1 className="text-center text-4xl font-bold">Prizes</h1>
            <p className="text-gray-600 text-lg px-32 text-center w-full">
              {challenge?.about} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus reprehenderit, asperiores repellat cum porro, numquam voluptatibus impedit cumque ad aut neque ab qui suscipit hic placeat sunt culpa? Ad, vel!
            </p>
            <ol className="text-gray-600 px-48 text-lg pt-6">
              <li>First Prize: </li>
              <li>Second Prize: </li>
              <li>Third Prize: </li>
            </ol>
          </div>
          <div className="pt-6">
            <h1 className="text-center text-4xl font-bold">Keywords</h1>
            {challenge?.keyword.length>0&&<ul className="dark:text-gray-400 px-48 text-xl flex gap-4 py-6">
              {challenge?.keyword?.map(data=>(
                <li className="bg-gray-400 dark:bg-gray-700 rounded-lg p-2 px-6">First Prize: </li>
              ))}
            </ul>}
            <ul className="dark:text-gray-400 px-48 text-lg flex gap-4 py-6">
              <li className="bg-gray-200 dark:bg-gray-700 rounded-lg p-2 px-6">First Prize: </li>
              <li className="bg-gray-200 dark:bg-gray-700 rounded-lg p-2 px-6">Second Prize: </li>
              <li className="bg-gray-200 dark:bg-gray-700 rounded-lg p-2 px-6">Third Prize: </li>
            </ul>
          </div>
        </div>
      ) : (
        <p className="font-bold text-2xl">Loading...</p>
      )}
    </div>
  )
}

export default CompPage