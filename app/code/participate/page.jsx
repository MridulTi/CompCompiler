"use client"

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
            <Link href={`/code/host-comp/${data.slug}`}><li key={data._id}>
              <h1>{data.title}</h1>
            </li></Link>
          ))}
        </div>
      ):(
        <p>Loading...</p>
      )}
    </div>
  )
}

export default PartipatePage