import CodeEditor from '@components/CodeEditor'
import React from 'react'

const PartipatePage = () => {
  return (
    <div className='pt-20 grid grid-cols-[60%_40%]'>
      <div className='w-full min-h-screen'></div>
      <CodeEditor/>
    </div>
  )
}

export default PartipatePage