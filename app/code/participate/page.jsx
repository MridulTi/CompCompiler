"use client"

import { Button } from "@chakra-ui/react";
import axios from "axios"
import Link from "next/link";
import { useEffect, useState } from "react"

const PartipatePage = () => {
  const [comp,setComp]=useState([]);

  useEffect(()=>{
      axios.get("/api/compete?query=all")
      .then(res=>{
        setComp(res.data.data)
      })
      .catch(err=>console.log(err))
  },[])
  return (
    <div className="pt-16">
      {comp.length>0?(
        <div>
          {comp.map(data=>(
            <Link href={`/code/participate/${data.slug}`}><li key={data._id}>
              <h1>{data.title}</h1>
            </li></Link>
          ))}
          <Link href="/code/profile"><Button color="green.400">PROFILE PAGE</Button></Link>
        </div>
      ):(
        <p>Loading...</p>
      )}
    </div>
  )
}

export default PartipatePage