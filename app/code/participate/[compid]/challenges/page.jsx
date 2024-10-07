'use client'
import { Button } from "@chakra-ui/react"
import { CircularPagination } from "@components/Pagination"
import { useApp } from "@context/AppProviders"
import { useError } from "@context/ErrorContext"
import axios from "axios"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const ChallengePage = () => {
  const { challenge, setCurrentChallenge } = useError();
  const url = usePathname();
  const {dark}=useApp();
  return (
    <div className="pt-20 dark:text-white min-h-screen grid grid-cols-[75%_25%] place-items-start">

      {challenge != undefined ? (
        <div className="w-full pb-6 grid place-items-center">
          <div className="flex flex-col justify-between gap-2 w-10/12 my-2 items-start">
            <Link className="h-fit w-fit" href={`${url.replace("/challenges",'/')}`}>
              <Button color='green.500' className="flex gap-2 w-fit">
                <ArrowLeft />Back to Competition Page
              </Button>
            </Link>
            <h1 className="text-4xl font-extrabold">{challenge?.title?.toUpperCase()}</h1>
          </div>
          <div className="w-10/12 border-2 rounded-xl min-h-[75vh] p-5">
            {challenge?.challenges?.length > 0 ? (challenge?.challenges.map((data) => {
              return (
                <Link href={`${url}/${data.slug}`}><li className='list-none p-5 bg-gray-100 dark:bg-gray-800 rounded-xl'>
                  <h1 className='font-bold text-lg'>{data?.title}</h1>
                  <h1 className='font-bold text-md'>{data?.score}</h1>
                  <h1 className='font-bold text-green-600 dark:text-green-300 text-md'>{data?.difficulty}</h1>
                </li></Link>
              )
            })) : (<p className="text-gray-500">No Challeges Found</p>)}
          </div>
          <CircularPagination />
        </div>
      ) : (
        <p className="font-bold text-2xl">Loading...</p>
      )}
      <div className="w-full">
        <div className="w-10/12 border-2 h-96 rounded-xl">
        </div>
      </div>

    </div>
  )
}

export default ChallengePage