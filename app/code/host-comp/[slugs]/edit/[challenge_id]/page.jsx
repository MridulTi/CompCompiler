"use client"
import { useError } from '@context/ErrorContext';
import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button } from '@chakra-ui/react'
import { Input, Textarea, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const IndChallengePage = ({params}) => {
  const { challenge, setCurrentChallenge , setNewAddChallenge } = useError();
  const url=usePathname();
  return (
    <div className='pt-16 grid place-items-center'>
        <div className='w-4/6'>
        <Link href={`/code/host-comp/${challenge.slug}/edit`}><Button color="green.400"><ArrowLeft/> Back to {challenge.title}</Button></Link>
        <h1 className='font-extrabold text-3xl my-4'>Edit {params.challenge_id}</h1>
        </div>
    
      {/* TABS */}
      <Tabs isFitted variant='line' colorScheme="teal" className='mt-4 w-4/6'>
        <TabList mb='0em'>
          <Tab>Basic Details</Tab>
          <Tab>Testcases</Tab>
          <Tab>Languages</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className='grid place-items-center'>
           {challenge!=undefined?(
            <div className='w-4/6  flex flex-col gap-4 pb-6'>
            </div>
           ):(
                <p className='text-gray-500'>No Information Found.</p>
           )}
          </TabPanel>
          <TabPanel className='grid place-items-center'>
            <div className='w-full flex justify-end border-b-2 border-gray-100 pb-2'>
              <Button onClick={setNewAddChallenge} color="green.400">Add Challenge</Button>
            </div>
            <div className='py-2 w-full'>
              {challenge?.challenges?.length > 0 ? (
                <>
                </>
              ) : (
                <p className='text-gray-500'>No Challenges Found.</p>
              )}
            </div>
          </TabPanel>
          <TabPanel className='grid place-items-center'>
            <div className='w-full flex justify-end border-b-2 border-gray-100 pb-2'>
              <Button color="green.400">Add Moderator</Button>
            </div>
            <div className='py-2'>
              {challenge?.moderators?.length > 0 ? (<></>) : (
                <p className='text-gray-500'>No Moderators Found.</p>
              )}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default IndChallengePage