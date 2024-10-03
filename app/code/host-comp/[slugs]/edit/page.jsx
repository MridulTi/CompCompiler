"use client"
import { useError } from '@context/ErrorContext';
import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button } from '@chakra-ui/react'
import { Input, Textarea, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const EditComp = () => {
  const { challenge, setCurrentChallenge , setNewAddChallenge } = useError();
  const url=usePathname();
  return (
    <div className='pt-16 grid place-items-center'>
      <div className='w-4/6'>
        <Link href={`/code/host-comp/${challenge?.slug}/`}><Button color="green.400"><ArrowLeft/> Back to {challenge.title.toUpperCase()} Main Menu</Button></Link>
        <h1 className='font-extrabold text-3xl my-4'>Edit Challenge</h1>
        </div>
      {/* TABS */}
      <Tabs isFitted variant='line' colorScheme="teal" className='mt-4 w-4/6'>
        <TabList mb='0em'>
          <Tab>Competition</Tab>
          <Tab>Challenges</Tab>
          <Tab>Moderators</Tab>
          <Tab>Leaderboard</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className='grid place-items-center'>
           {challenge!=undefined?(
            <div className='w-4/6  flex flex-col gap-4 pb-6'>
              <Typography as="label" className='text-xl flex flex-col gap-1 font-semibold'>Title
                <Input className='text-xl' size="lg"  label="Title" value={challenge.title}/>
              </Typography>
              <Typography as="label" className='text-xl flex flex-col gap-1 font-semibold'>Slug
                <Input disabled={true} className='text-md' size="lg"  label="slug" value={challenge.slug}/>
              </Typography>
              <Typography as="label" className='text-xl flex flex-col gap-1 font-semibold'>Description/About
                <Textarea  className='text-xl' size="lg" label="Description/About" value={challenge.description}/>
              </Typography>
              <Typography as="label" className='text-xl flex flex-col gap-1 font-semibold'>Tagline
                <Input className='text-xl' size="lg"  label="Tagline" value={challenge.tagline}/>
              </Typography>
              <Typography as="label" className='text-xl flex flex-col gap-1 font-semibold'>Start Date
                <Input className='text-xl' size="lg"  type="datetime-local" label="Start Date" value={challenge.startDate}/>
              </Typography>
              <Typography as="label" className='text-xl flex flex-col gap-1 font-semibold'>End Date
                <Input className='text-xl' size="lg"  type="datetime-local" label="End Date" value={challenge.endDate}/>
              </Typography>
              <Typography as="label" className='text-xl flex flex-col gap-1 font-semibold'>Tags/Keywords
                <Input className='text-xl' size="lg"  label="Keyword/Tags" value={challenge.keyword}/>
              </Typography>
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
              {challenge?.challenges?.length > 0 ? (challenge?.challenges.map((data) => {
                return(
                  <Link href={`${url}/${data.slug}`}><li className='list-none p-5 bg-gray-100 rounded-xl'>
                    <h1 className='font-bold text-lg'>{data?.title}</h1>
                    <h1 className='font-bold text-md'>{data?.score}</h1>
                    <h1 className='font-bold text-green-600 text-md'>{data?.difficulty}</h1>
                  </li></Link>
                )
              })) : (
                <p className='text-gray-500'>No Challenges Found.</p>
              )}
            </div>
          </TabPanel>
          <TabPanel className='grid place-items-center'>
            <div className='w-full flex justify-end border-b-2 border-gray-100 pb-2'>
              <Button color="green.400">Add Moderator</Button>
            </div>
            <div className='py-2'>
              {challenge?.moderators?.length > 0 ? (challenge?.moderators.map((index, data) => {
                <li key={index}>{data?.email}</li>
              })) : (
                <p className='text-gray-500'>No Moderators Found.</p>
              )}
            </div>
          </TabPanel>
          <TabPanel className='grid place-items-center'>
            <p className='text-gray-500'>Leaderboard not generated.</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default EditComp