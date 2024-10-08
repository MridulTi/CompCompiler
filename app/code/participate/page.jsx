"use client"

import { Button } from "@chakra-ui/react";
import { CardWithLink } from "@components/Card";
import { useError } from "@context/ErrorContext";
import axios from "axios"
import Link from "next/link";
import { useEffect, useState } from "react"

const PartipatePage = () => {
  const [comp, setComp] = useState([]);
  const { setHostModal } = useError();
  useEffect(() => {
    axios.get("/api/compete?query=all")
      .then(res => {
        setComp(res.data.data)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div className="py-20 px-48 grid min-h-screen gap-16">
      <div>
        <div className="flex justify-between items-center w-full">
          <h1 className="text-black dark:text-white text-2xl font-extrabold">LIVE COMPETITIONS.</h1>
          {comp.length>0 &&comp.filter(data => !data.endDate || new Date(data.endDate) >= new Date()).length > 0 && (
            <Button color="blue.400">View all</Button>
          )}
        </div>

        <div className="min-h-fit grid grid-cols-4 auto-rows-[minmax(0,_2fr)] place-items-start">
          {comp.length > 0 ? (
            <div className="w-full h-fit ">
              {comp.filter(data => !data.endDate || new Date(data.endDate) >= new Date()).length > 0 ? (
                comp
                  .filter(data => !data.endDate || new Date(data.endDate) >= new Date())
                  .map(filteredData => (
                    <CardWithLink
                      key={filteredData.slug}
                      slug={filteredData.slug}
                      {...filteredData}
                    />
                  ))
              ) : (
                <p className="w-full">No live competitions found.</p>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center w-full">
          <h1 className="text-black dark:text-white text-2xl font-extrabold">PAST COMPETITIONS.</h1>
          {comp.length > 0 && comp.filter(data => new Date(data.endDate) < new Date()).length > 0 && (
            <Button color="blue.400">View all</Button>
          )}
        </div>

        <div className="min-h-fit grid grid-cols-4 auto-rows-[minmax(0,_2fr)] place-items-start">
          {comp.length > 0 ? (
            <div className="w-full h-fit">
              {comp.filter(data => new Date(data.endDate) < new Date()).length > 0 ? (
                comp
                  .filter(data => new Date(data.endDate) < new Date())
                  .map(filteredData => (
                    <CardWithLink
                      key={filteredData.slug}
                      slug={filteredData.slug}
                      {...filteredData}
                    />
                  ))
              ) : (
                <p className="w-full text-gray-500">No past competitions found.</p>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

    </div>

  )
}

export default PartipatePage