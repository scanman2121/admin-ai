"use client"

import { cn } from "@/lib/utils"
import { RiCloseLine, RiMessage2Line } from "@remixicon/react"
import { useEffect, useState } from "react"
import { CommunicationsPanel } from "./CommunicationsPanel"

export function CommunicationsTab() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // Check if screen is mobile (under 1024px)
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024)
        }

        // Initial check
        checkScreenSize()

        // Add event listener for window resize
        window.addEventListener('resize', checkScreenSize)

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkScreenSize)
        }
    }, [])

    // Close the panel when Escape key is pressed
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                if (isExpanded) {
                    setIsExpanded(false)
                } else {
                    setIsOpen(false)
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, isExpanded])

    const toggleOpen = () => {
        if (isMinimized) {
            setIsMinimized(false)
        } else {
            setIsOpen(!isOpen)
            if (isOpen) {
                setIsExpanded(false)
            }
        }
    }

    const minimize = () => {
        setIsMinimized(true)
        setIsExpanded(false)
    }

    const expand = () => {
        setIsExpanded(true)
        setIsMinimized(false)
    }

    const close = () => {
        setIsOpen(false)
        setIsMinimized(false)
        setIsExpanded(false)
    }

    // Don't render anything on mobile as it will be handled by FloatingActionBar
    if (isMobile) {
        return null
    }

    return (
        <>
            {/* Expanded Modal Overlay */}
            {isOpen && isExpanded && (
                <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
                    <div className="w-full max-w-6xl h-[80vh] bg-white dark:bg-gray-950 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                        <CommunicationsPanel
                            onMinimize={() => setIsExpanded(false)}
                            onClose={close}
                            isExpanded={true}
                        />
                    </div>
                </div>
            )}

            <div className="fixed bottom-0 right-6 z-30 flex flex-col items-end">
                {/* Main Communications Panel */}
                {isOpen && !isMinimized && !isExpanded && (
                    <CommunicationsPanel
                        onMinimize={minimize}
                        onClose={close}
                        onExpand={expand}
                        isExpanded={false}
                    />
                )}

                {/* Minimized Panel */}
                {isOpen && isMinimized && (
                    <div className="mb-2 w-80 bg-white dark:bg-gray-900 rounded-t-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                        <div
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 cursor-pointer"
                            onClick={() => setIsMinimized(false)}
                        >
                            <div className="flex items-center gap-2">
                                <RiMessage2Line className="size-4 text-primary" />
                                <span className="font-medium text-sm text-gray-900 dark:text-gray-50">Tenant contacts</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        close()
                                    }}
                                >
                                    <RiCloseLine className="size-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab Button */}
                <button
                    onClick={toggleOpen}
                    className={cn(
                        "flex items-center gap-2 px-5 py-3 rounded-t-lg shadow-lg transition-colors",
                        "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 border-b-0",
                        "hover:bg-gray-50 dark:hover:bg-gray-800",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-950",
                        isOpen && "bg-primary hover:bg-primary text-white dark:bg-primary dark:hover:bg-primary-dark"
                    )}
                >
                    <RiMessage2Line className="size-5" />
                    <span className="font-medium">Tenant contacts</span>
                    {isOpen && isMinimized && (
                        <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">3</span>
                    )}
                </button>
            </div>
        </>
    )
} 