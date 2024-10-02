"use client"
import { Option, Select } from '@material-tailwind/react'
import { Editor } from '@monaco-editor/react'
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from '@public/constants'
import React, { useRef, useState } from 'react'

const languages=Object.entries(LANGUAGE_VERSIONS)

function CodeEditor() {
    const [lang,setLang]=useState("javascript")
    const [value,setValue]=useState("")
    const editorRef=useRef();

    const onMount=(editor)=>{
        editorRef.current=editor
        editor.focus()
    }
    return (
        <div className='w-full aspect-square p-5'>
            <div className='flex items-center py-2 justify-between'>
            <h1 className='w-full font-bold text-xl'>Code Editor</h1>
            <Select label="Select Language" onChange={(e)=>{
                setLang(e);
                setValue(CODE_SNIPPETS[e])
            }}>
                {languages.map(([key,value])=>(
                    <Option key={key} value={key}>{key}</Option>
                ))}
            </Select>
            </div>
            <div className='w-full h-full'>
                <Editor
                    className='w-full'
                    theme="vs-dark"
                    language={lang}
                    options={{
                        scrollbar:true
                    }}
                    defaultValue='//some comment'
                    onMount={onMount}
                    value={value}
                    onChange={(value)=>setValue(value)}
                />
            </div>
        </div>

    )
}

export default CodeEditor