"use client"
import { AuthNav } from '@components/Nav'
import React from 'react'

export default function layout({children}) {
  return (
    <>
      <AuthNav/>
      {children}
    </>
  )
}
