"use client"
import { ErrorModal } from '@components/Modals'
import { useError } from '@context/ErrorContext.jsx'
import { ThemeProvider } from '@material-tailwind/react'
import React from 'react'

export default function layout({children}) {
  const{error,closeError}=useError()
  return (
    <ThemeProvider>
      {children}
      {error&&<ErrorModal message={error} onClose={closeError}/>}
    </ThemeProvider>
  )
}
