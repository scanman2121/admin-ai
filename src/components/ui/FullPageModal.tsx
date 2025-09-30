"use client"

import { RiCloseLine } from "@remixicon/react"
import { Button } from "@/components/Button"

interface FullPageModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  iframeUrl: string
}

export function FullPageModal({ isOpen, onClose, title, iframeUrl }: FullPageModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900">
      {/* Modal Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
          {title}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-2 h-8 w-8"
        >
          <RiCloseLine className="size-4" />
        </Button>
      </div>

      {/* Modal Content - Full iframe */}
      <div className="flex-1 h-[calc(100vh-73px)]">
        <iframe
          src={iframeUrl}
          className="w-full h-full border-0"
          title={title}
          allow="fullscreen"
        />
      </div>
    </div>
  )
}
