"use client"

import { Button } from "@chakra-ui/react";
import { CardWithLink } from "@components/Card";
import { useError } from "@context/ErrorContext";
import axios from "axios"
import Link from "next/link";
import { useEffect, useState } from "react"

const PartipatePage = () => {
  const [comp,setComp]=useState([]);
  const {setHostModal}=useError();
  useEffect(()=>{
      axios.get("/api/compete?query=all")
      .then(res=>{
        setComp(res.data.data)
      })
      .catch(err=>console.log(err))
  },[])
  return (
    <div className="pt-16 min-h-screen grid place-items-center">
      {comp.length>0?(
        <div className="w-1/3 h-full grid grid-cols-4 gap-4">
          {comp.map(data=>(
              <CardWithLink
              slug={data.slug}
              {...data}
              />
          ))}
        </div>
      ):(
        <p>Loading...</p>
      )}
    </div>
  )
}

export default PartipatePage