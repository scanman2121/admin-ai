"use client"

import { Button } from "@/components/Button"
import { RiCloseLine } from "@remixicon/react"
import { useEffect, useRef } from "react"

interface FullPageModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  iframeUrl?: string
  children?: React.ReactNode
}

export function FullPageModal({ isOpen, onClose, title, iframeUrl, children }: FullPageModalProps) {
  const iframeContainerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Scroll to top when modal opens or step changes
  const scrollToTop = () => {
    // Scroll the container
    if (iframeContainerRef.current) {
      iframeContainerRef.current.scrollTop = 0
    }
    // Try to scroll the iframe content (may fail due to CORS)
    if (iframeRef.current?.contentWindow) {
      try {
        iframeRef.current.contentWindow.scrollTo({ top: 0, behavior: 'instant' })
      } catch (e) {
        // Cross-origin restrictions may prevent this, which is fine
      }
    }
  }

  // Listen for postMessage events from the iframe
  useEffect(() => {
    if (!isOpen || !iframeUrl) return

    const handleMessage = (event: MessageEvent) => {
      try {
        // Only accept messages from the iframe origin for security
        const iframeOrigin = new URL(iframeUrl).origin
        if (event.origin !== iframeOrigin) return
        
        // If the iframe sends any navigation/step change message, scroll to top
        const data = event.data
        if (
          data?.type === 'stepChange' || 
          data?.stepChange || 
          data?.navigate ||
          data?.routeChange ||
          data?.pageChange ||
          data?.action === 'next' ||
          data?.action === 'previous' ||
          (typeof data === 'string' && (data.includes('step') || data.includes('navigate')))
        ) {
          // Small delay to ensure DOM is updated
          setTimeout(scrollToTop, 50)
        }
      } catch (e) {
        // Ignore errors
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [isOpen, iframeUrl])

  // Scroll to top when modal opens
  useEffect(() => {
    if (isOpen) {
      // Multiple attempts to ensure scroll happens after DOM is ready
      scrollToTop()
      const timeouts = [
        setTimeout(scrollToTop, 100),
        setTimeout(scrollToTop, 300),
        setTimeout(scrollToTop, 500)
      ]
      
      return () => {
        timeouts.forEach(clearTimeout)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 dark:bg-black/70" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full h-full bg-white dark:bg-gray-900 flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
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

        {/* Modal Content - iframe or children */}
        <div ref={iframeContainerRef} className="flex-1 min-h-0">
          {children ? (
            children
          ) : iframeUrl ? (
            <iframe
              ref={iframeRef}
              src={iframeUrl}
              className="w-full h-full border-0"
              title={title}
              allow="fullscreen"
              onLoad={scrollToTop}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
