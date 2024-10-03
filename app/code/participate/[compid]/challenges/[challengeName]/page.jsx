"use client"
import CodeEditor from '@components/CodeEditor'
import React from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

const ChallengePage = ({params}) => {
  return (
    <PanelGroup direction="horizontal" className='pt-16'>
      <Panel defaultSize={60} minSize={20}>
        <div className='w-full min-h-screen'>
          {params?.challengeName}
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