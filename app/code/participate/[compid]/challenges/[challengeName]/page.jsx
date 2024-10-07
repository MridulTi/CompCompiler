"use client"
import { Button, Text } from '@chakra-ui/react'
import CodeEditor from '@components/CodeEditor'
import { useApp } from '@context/AppProviders'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React,{useState,useEffect} from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

const ChallengePage = ({params}) => {
  const [thisChallenge,setThisChallenge]=useState(undefined)
  const {output:testCase}=useApp();
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
      <Panel defaultSize={20} minSize={20} className="p-5 px-24 flex flex-col justify-start gap-4">
        <Link className="h-fit w-fit" href={`/code/participate/${thisChallenge?.compSlug}/challenges`}><Button color='green.500' className="flex gap-2 w-fit"><ArrowLeft/> Back to Challenges</Button></Link>
        <div className='w-full min-h-screen'>
          {thisChallenge!=undefined?(
            <div className="w-full">
              <h1 className='text-5xl font-extrabold'>{thisChallenge?.title.toUpperCase()}</h1>
              <div className="flex justify-between w-full">
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
      <PanelResizeHandle className='bg-gray-200 dark:bg-gray-800 w-2 mx-2 rounded-xl'/>
      <Panel defaultSize={80} minSize={20}>
        <PanelGroup direction="vertical" >
          <Panel defaultSize={80} minSize={20}>
            <CodeEditor />
          </Panel>
        <PanelResizeHandle className='bg-gray-200 dark:bg-gray-800 h-2 mx-2 rounded-xl'/>
          {testCase!=null&&<Panel defaultSize={50} minSize={10}>
            <div className="px-5 py-2">
              <h1 className='text-2xl font-bold'>Test Cases</h1>
              {testCase?.stderr&&(
                <div className="p-2">
                  <h1 className="font-bold text-lg text-gray-500 dark:text-gray-300">Error:</h1>
                  <div className="bg-red-50 dark:bg-red-100 text-red-900 w-full p-2 rounded-lg">
                  {testCase.stderr.split("\n").map((line,i)=>(<Text key={i}>{line}</Text>))}
                  </div>
                </div>
                
              )}
              {testCase?.stdout&&(
                <div className="p-2">
                <h1 className="font-bold text-lg text-gray-500 dark:text-gray-300">StdOut:</h1>
                <div className="bg-green-50 dark:bg-green-100 text-green-900 w-full p-2 rounded-lg">
                  {testCase.stdout.split("\n").map((line,i)=>(<Text key={i}>{line}</Text>))}
                  
                </div>
                </div>
                
              )}
              {testCase?.output&&testCase?.stderr==""&&(
                <div className="p-2">
                <h1 className="font-bold text-lg text-gray-500 dark:text-gray-300">Output:</h1>
                <div className="bg-gray-50 dark:bg-gray-800 dark:text-white text-gray-900 w-full p-2 rounded-lg">
                {testCase.output.split("\n").map((line,i)=>(<Text key={i}>{line}</Text>))}
                </div>
                </div>
              )}
              <div className="p-2">
                <h1 className="font-bold text-lg text-gray-500 dark:text-gray-300">Expected:</h1>
                <div className="bg-gray-50 dark:bg-gray-800 dark:text-white text-gray-900 w-full p-2 rounded-lg">
                
                </div>
              </div>
            </div>
          </Panel>}
        </PanelGroup>
      </Panel>
    </PanelGroup>
  )
}

export default ChallengePage