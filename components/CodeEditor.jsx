"use client"
import { Button } from '@chakra-ui/react'
import { useApp } from '@context/AppProviders'
import { Option, Select } from '@material-tailwind/react'
import { Editor } from '@monaco-editor/react'
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from '@public/constants'
import { executeCode } from '@utils/api'
import React, { useRef, useState } from 'react'

const languages=Object.entries(LANGUAGE_VERSIONS)

function CodeEditor() {
    const [lang,setLang]=useState("javascript")
    const [value,setValue]=useState(CODE_SNIPPETS["javascript"])
    const editorRef=useRef();
    const {output,setRecentOutput,dark}=useApp();

    const onMount=(editor)=>{
        editorRef.current=editor
        editor.focus()
    }

    const runCode=async()=>{
        setRecentOutput(null)
        const sourceCode=editorRef.current.getValue();
        if(!sourceCode) return;

        try {
            const {run:result}=await executeCode(lang,sourceCode)
            setRecentOutput(result)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-full aspect-square p-5'>
            <div className='flex items-center py-2 justify-between'>
            <div className="flex gap-4 w-full">
                <Button onClick={runCode} colorScheme="green">Run Code</Button>
                <Button variant="solid" color='green.600'>Submit</Button>
            </div>
            <Select defaultValue={"javascript"} label="Select Language" onChange={(e)=>{
                setLang(e);
                setValue(CODE_SNIPPETS[e])
            }}>
                {languages.map(([key,value])=>(
                    <Option key={key} className='font-semibold' value={key}>{key} <i className="text-gray-400">version:{value}</i></Option>
                ))}
            </Select>
            </div>
            
            <div className='w-full h-full'>
                <Editor
                    className='w-full rounded-xl'
                    theme={dark?"vs-dark":"vs-light"}
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