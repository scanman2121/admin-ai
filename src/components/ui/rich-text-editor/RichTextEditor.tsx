"use client"

import { Bold, Italic, Underline, List, ListOrdered } from "lucide-react"
import { useRef, useEffect } from "react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  minHeight?: string
}

export function RichTextEditor({ value, onChange, placeholder, className, minHeight = "120px" }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  const isCommandActive = (command: string): boolean => {
    return document.queryCommandState(command)
  }

  return (
    <div className={`border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={() => execCommand("bold")}
          className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isCommandActive("bold") ? "bg-gray-100 dark:bg-gray-700" : ""
          }`}
          title="Bold"
        >
          <Bold className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        </button>
        <button
          type="button"
          onClick={() => execCommand("italic")}
          className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isCommandActive("italic") ? "bg-gray-100 dark:bg-gray-700" : ""
          }`}
          title="Italic"
        >
          <Italic className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        </button>
        <button
          type="button"
          onClick={() => execCommand("underline")}
          className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isCommandActive("underline") ? "bg-gray-100 dark:bg-gray-700" : ""
          }`}
          title="Underline"
        >
          <Underline className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        </button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
        <button
          type="button"
          onClick={() => execCommand("insertUnorderedList")}
          className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isCommandActive("insertUnorderedList") ? "bg-gray-100 dark:bg-gray-700" : ""
          }`}
          title="Bullet List"
        >
          <List className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        </button>
        <button
          type="button"
          onClick={() => execCommand("insertOrderedList")}
          className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isCommandActive("insertOrderedList") ? "bg-gray-100 dark:bg-gray-700" : ""
          }`}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={(e) => {
          e.preventDefault()
          const text = e.clipboardData.getData("text/plain")
          document.execCommand("insertText", false, text)
          handleInput()
        }}
        className={`p-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none overflow-y-auto [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-gray-400 [&:empty]:before:pointer-events-none [&_ul]:ml-6 [&_ol]:ml-6 [&_ul]:my-2 [&_ol]:my-2 [&_li]:mb-1`}
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          minHeight: minHeight
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />
    </div>
  )
}

