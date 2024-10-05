"use client"
import { DashNav } from '@components/Nav'
import React from 'react'

export default function layout({children}) {
  return (
    <>
      <DashNav/>
      {children}
    </>
  )
}
