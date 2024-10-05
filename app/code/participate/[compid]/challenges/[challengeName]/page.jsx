"use client"
import { Button } from '@chakra-ui/react'
import CodeEditor from '@components/CodeEditor'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React,{useState,useEffect} from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

const ChallengePage = ({params}) => {
  const [thisChallenge,setThisChallenge]=useState(undefined)
  const url=usePathname();
  useEffect(() => {
    axios.get(`/api/compete/challenge?slug=${params.challengeName}`)
      .then(res => {
        console.log(res.data.data);
        setThisChallenge(res.data.data);
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <PanelGroup direction="horizontal" className='pt-16'>
      <Panel defaultSize={60} minSize={20} className="p-5 px-24 grid place-items-start gap-4">
        <Link href={`/code/participate/${thisChallenge?.compSlug}/challenges`}><Button color='green.500' className="flex gap-2"><ArrowLeft/> Back to Challenges</Button></Link>
        <div className='w-full min-h-screen'>
          {thisChallenge!=undefined?(
            <div className="w-full">
              <h1 className='text-5xl font-extrabold'>{thisChallenge?.title.toUpperCase()}</h1>
              <div className="flex justify-between w-1/3">
              <h1 className='text-md font-semibold text-gray-400'>Difficulty: {thisChallenge?.difficulty}</h1>
              <h1 className='text-sm'>Score: {thisChallenge?.score}</h1>
              </div>
              <h1 className='text-md'>{thisChallenge?.keyword}</h1>
              <h1 className='text-lg'>{thisChallenge?.problemStatement}</h1>
              <h1 className='text-xl font-bold'>EXAMPLES:</h1>
              <h1 className='text-lg'>{thisChallenge?.examples}</h1>
              <h1 className='text-xl font-bold'>INPUTS:</h1>
              <h1 className='text-lg'>{thisChallenge?.input}</h1>
              <h1 className='text-xl font-bold'>OUTPUTS:</h1>
              <h1 className='text-lg'>{thisChallenge?.output}</h1>
            </div>
          ):(
            <p className="font-bold text-2xl">Loading...</p>
          )}
        </div>
      </Panel>
      <PanelResizeHandle className='bg-gray-200 w-2 mx-2 rounded-xl'/>
      <Panel defaultSize={40} minSize={20}>
        <CodeEditor />
        right
      </Panel>
    </PanelGroup>
  )
}

export default ChallengePage