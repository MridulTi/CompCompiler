"use client"
import { DashNav } from '@components/Nav'
import React from 'react'

export default function layout({children}) {
  return (
    <div className="dark:text-white">
      <DashNav/>
      {children}
    </div>
  )
}
