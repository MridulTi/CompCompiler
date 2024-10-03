'use client'
import { CircularPagination } from "@components/Pagination"
import { useError } from "@context/ErrorContext"
import { Button } from "@material-tailwind/react"
import axios from "axios"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const HostComp = ({ params }) => {
  const {challenge,setCurrentChallenge}=useError();
  const url=usePathname();
  useEffect(() => {
    axios.get(`/api/compete?query=${params.slugs}`)
      .then(res => {
        console.log(res.data.data);
        setCurrentChallenge(res.data.data);
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div className="pt-16 grid grid-cols-[75%_25%] place-items-start">
      {challenge != undefined ? (
        <div className="w-full grid place-items-center">
          <div className="flex justify-between w-10/12 my-2 items-center">
            <h1 className="text-4xl font-extrabold">{challenge?.title?.toUpperCase()}</h1>
            <div className="flex gap-4">
              <Link href={`${url}/edit`}><Button className="rounded-full">Edit</Button></Link>
              <Link href={`${url}/edit?tab=challenge`}><Button className="">Add Challenge</Button></Link>
            </div>
          </div>
          <div className="w-10/12 border-2 min-h-[75vh] p-5">
            {challenge?.challenges?.length > 0 ? (challenge?.challenges.map((data) => {
                return(
                  <Link href={`${url}/edit/${data.slug}`}><li className='list-none p-5 bg-gray-100 rounded-xl'>
                    <h1 className='font-bold text-lg'>{data?.title}</h1>
                    <h1 className='font-bold text-md'>{data?.score}</h1>
                    <h1 className='font-bold text-green-600 text-md'>{data?.difficulty}</h1>
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

export default HostComp