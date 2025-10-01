"use client"

import { Button } from "@/components/Button"
import { RiCloseLine } from "@remixicon/react"

interface FullPageModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  iframeUrl: string
}

export function FullPageModal({ isOpen, onClose, title, iframeUrl }: FullPageModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 dark:bg-black/70" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-7xl h-[90vh] bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <RiCloseLine className="size-4" />
          </Button>
        </div>

        {/* Modal Content - iframe */}
        <div className="flex-1 min-h-0">
          <iframe
            src={iframeUrl}
            className="w-full h-full border-0 rounded-b-lg"
            title={title}
            allow="fullscreen"
          />
        </div>
      </div>
    </div>
  )
}
