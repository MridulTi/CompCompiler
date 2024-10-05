"use client"
import { Button } from '@chakra-ui/react'
import { Card, Typography } from '@material-tailwind/react'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from 'react'

function Profilepage() {
    const TABLE_HEAD = ['Name', 'startDate', 'endDate', '']
    const TABLE_ROWS = []
    const [hostedComp, setHostedComp] = useState(undefined)
    const [participatedComp, setParticipatedComp] = useState(undefined)

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get("/api/compete/hostedComp")
                .then(res=>{
                    console.log(res.data.data)
                    setHostedComp(res.data.data);
                })
                axios.get("/api/compete/participatedComp")
                .then(res=>{
                    setParticipatedComp(res.data.data);
                })

            } catch (error) {
                console.error("Error fetching competition data:", error);
            }
        };

        fetchData();
    }, [])

    return (
        <div className="pt-16 grid place-items-center">
            <h1 className="font-extrabold text-3xl">PROFILE.</h1>
            <h1 className="font-extrabold text-xl">Hosted Competitions.</h1>
            {hostedComp != undefined ?
                (<Card className="h-full w-full overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                        
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {hostedComp.map(({title, startDate,slug, endDate }, index) => (
                                <tr key={index} className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {title}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {startDate}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {endDate||""}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Link href={`/code/host-comp/${slug}/edit`}>
                                            <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                                Edit
                                            </Typography>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>) : (
                    <p className="text-lg text-gray-400">No Competitions Found</p>
                )}

            <h1 className="font-extrabold text-xl">Participated Competitions.</h1>
            {participatedComp != undefined ? (<Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TABLE_ROWS.map(({ name, job, date }, index) => (
                            <tr key={name} className="even:bg-blue-gray-50/50">
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {name}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {job}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {date}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                        Edit
                                    </Typography>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>) : (
                <p className="text-lg text-gray-400">No Competitions Found</p>
            )}
        </div>
    )
}

export default Profilepage