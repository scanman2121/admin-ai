"use client"

import * as React from "react"
import { RiUploadLine, RiCloseLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface DocumentUploadDrawerProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DocumentUploadDrawer({ isOpen, onOpenChange }: DocumentUploadDrawerProps) {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files))
    }
  }

  const handleUpload = async () => {
    // TODO: Implement file upload logic
    console.log("Uploading files:", selectedFiles)
    onOpenChange?.(false)
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle>Upload documents</DrawerTitle>
            <DrawerDescription>
              Add documents to your workspace. Supported formats: PDF, DOC, DOCX, TXT
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <div className="relative flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-800">
              <div className="flex flex-col items-center justify-center text-center">
                <RiUploadLine className="mb-4 h-12 w-12 text-gray-400" />
                <p className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Drag and drop your files here
                </p>
                <p className="text-xs text-gray-500">
                  or click to browse from your computer
                </p>
                <input
                  type="file"
                  multiple
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                />
              </div>
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-6 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Selected files</h3>
                  <span className="text-xs text-gray-500">
                    {selectedFiles.length} file{selectedFiles.length !== 1 && "s"}
                  </span>
                </div>
                <ul className="mt-2 divide-y divide-gray-200 dark:divide-gray-800">
                  {selectedFiles.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between py-2 text-sm"
                    >
                      <div className="flex items-center">
                        <span className="truncate max-w-[300px]">{file.name}</span>
                      </div>
                      <span className="text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <DrawerFooter>
            <Button onClick={handleUpload} disabled={selectedFiles.length === 0}>
              Upload files
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
} 