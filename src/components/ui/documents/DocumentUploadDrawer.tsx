"use client"

import { formatFileSize } from '@/lib/utils'
import { DocumentType } from '@/types/documents'
import { RiCloseLine, RiUploadCloud2Line } from '@remixicon/react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '../button'
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '../drawer'
import DocumentFields from './DocumentFields'

interface DocumentUploadDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onUpload: (files: File[], fields: Record<string, string>) => Promise<void>
}

export function DocumentUploadDrawer({
  isOpen,
  onOpenChange,
  onUpload,
}: DocumentUploadDrawerProps) {
  const [files, setFiles] = useState<File[]>([])
  const [documentType, setDocumentType] = useState<DocumentType>(DocumentType.Other)
  const [fields, setFields] = useState<Record<string, string>>({})
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    multiple: true,
  })

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleFieldChange = (field: string, value: string) => {
    if (field === 'documentType') {
      setDocumentType(value as DocumentType)
    }
    setFields((prev) => ({ ...prev, [field]: value }))
  }

  const handleUpload = async () => {
    try {
      setIsUploading(true)
      await onUpload(files, fields)
      setFiles([])
      setFields({})
      onOpenChange(false)
    } catch (error) {
      console.error('Error uploading documents:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-3xl">
        <DrawerHeader>
          <DrawerTitle>Upload documents</DrawerTitle>
          <DrawerDescription>
            Drag and drop your documents or click to browse. Supported formats: PDF, DOC, DOCX, TXT.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-6 space-y-6">
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-primary bg-primary/5' : 'border-border'}
              hover:border-primary hover:bg-primary/5
            `}
          >
            <input {...getInputProps()} />
            <RiUploadCloud2Line className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              {isDragActive ? 'Drop your files here' : 'Drag & drop files here or click to browse'}
            </p>
          </div>

          {files.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Selected files</h4>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-md"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <RiCloseLine className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {files.length > 0 && (
            <DocumentFields
              documentType={documentType}
              onFieldChange={handleFieldChange}
              values={fields}
            />
          )}
        </div>
        <DrawerFooter>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={files.length === 0 || isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
} 