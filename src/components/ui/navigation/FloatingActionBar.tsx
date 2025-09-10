"use client"

import { Button } from "@/components/Button"
import {
    Plus,
    Bot,
    X,
    MessageSquare,
    // QrCode, // Hidden for now
    // Search, // Hidden for now
    // QrCode, // Hidden for now
    MapPin,
    Building2,
    User,
    Settings
} from "lucide-react"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { CommunicationsPanel } from "../communications/CommunicationsPanel"

// Dynamically import components to avoid server/client mismatch
const QRScannerModal = dynamic(() => import("../qr/QRScannerModal").then(mod => mod.QRScannerModal), { ssr: false })
const FullScreenSearch = dynamic(() => import("../search/FullScreenSearch").then(mod => mod.FullScreenSearch), { ssr: false })
const CreatePopover = dynamic(() => import("../create/CreatePopover").then(mod => mod.CreatePopover), { ssr: false })
const FullScreenAIAssistant = dynamic(() => import("../ai/FullScreenAIAssistant").then(mod => mod.FullScreenAIAssistant), { ssr: false })

export function FloatingActionBar() {
    // State for each action
    const [isQRScannerOpen, setIsQRScannerOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [isAIOpen, setIsAIOpen] = useState(false)
    const [isCommunicationsOpen, setIsCommunicationsOpen] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only handle if not in an input field
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return
            }

            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setIsSearchOpen(true)
            } else if (e.key === "Escape") {
                if (isQRScannerOpen) setIsQRScannerOpen(false)
                if (isSearchOpen) setIsSearchOpen(false)
                if (isCreateOpen) setIsCreateOpen(false)
                if (isAIOpen) setIsAIOpen(false)
                if (isCommunicationsOpen) {
                    if (isExpanded) {
                        setIsExpanded(false)
                    } else {
                        setIsCommunicationsOpen(false)
                    }
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isQRScannerOpen, isSearchOpen, isCreateOpen, isAIOpen, isCommunicationsOpen, isExpanded])

    // Only show on mobile screens
    const [isMobile, setIsMobile] = useState(false)
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

    if (!isMobile) {
        return null
    }

    return (
        <>
            {/* Floating Action Bar */}
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
                <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-900 rounded-full shadow-lg border border-gray-200 dark:border-gray-800">
                    {/* QR Scanner Button - Hidden for now */}
                    {/* <Button
                        variant="ghost"
                        className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900"
                        onClick={() => setIsQRScannerOpen(true)}
                    >
                        <QrCode className="h-6 w-6" />
                        <span className="text-xs">Scan QR</span>
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900"
                        onClick={() => setIsQRScannerOpen(true)}
                    >
                        <QrCode className="h-6 w-6" />
                        <span className="text-xs">Generate QR</span>
                    </Button> */}
                    <Button
                        variant="ghost"
                        className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900"
                        onClick={() => setIsQRScannerOpen(true)}
                    >
                        <MapPin className="h-6 w-6" />
                        <span className="text-xs">Spaces</span>
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900"
                        onClick={() => setIsQRScannerOpen(true)}
                    >
                        <Building2 className="h-6 w-6" />
                        <span className="text-xs">Buildings</span>
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900"
                        onClick={() => setIsQRScannerOpen(true)}
                    >
                        <User className="h-6 w-6" />
                        <span className="text-xs">Users</span>
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900"
                        onClick={() => setIsQRScannerOpen(true)}
                    >
                        <Settings className="h-6 w-6" />
                        <span className="text-xs">Settings</span>
                    </Button>

                    {/* Search Button - Hidden for now */}
                    {/* <Button
                        variant="ghost"
                        className="rounded-full p-2"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <Search className="size-6" />
                        <span className="sr-only">Search</span>
                    </Button> */}

                    {/* Create Button */}
                    <Button
                        variant="ghost"
                        className="rounded-full p-2"
                        onClick={() => setIsCreateOpen(true)}
                    >
                        <Plus className="size-6" />
                        <span className="sr-only">Create</span>
                    </Button>

                    {/* AI Assistant Button */}
                    <Button
                        variant="ghost"
                        className="rounded-full p-2"
                        onClick={() => setIsAIOpen(true)}
                    >
                        <Bot className="size-6" />
                        <span className="sr-only">AI Assistant</span>
                    </Button>

                    {/* Tenant Contacts Button */}
                    <Button
                        variant={isCommunicationsOpen ? "primary" : "ghost"}
                        className="rounded-full p-2"
                        onClick={() => setIsCommunicationsOpen(!isCommunicationsOpen)}
                    >
                        <MessageSquare className="size-6" />
                        <span className="sr-only">Tenant Contacts</span>
                    </Button>
                </div>
            </div>

            {/* QR Scanner Modal */}
            {isQRScannerOpen && (
                <QRScannerModal
                    isOpen={isQRScannerOpen}
                    onClose={() => setIsQRScannerOpen(false)}
                    onScan={(url) => {
                        console.log('QR Code scanned:', url);
                        setIsQRScannerOpen(false);
                    }}
                />
            )}

            {/* Search Modal */}
            {isSearchOpen && (
                <FullScreenSearch
                    isOpen={isSearchOpen}
                    onClose={() => setIsSearchOpen(false)}
                />
            )}

            {/* Create Popover */}
            {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-sm p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium">Create</h2>
                            <Button
                                variant="ghost"
                                className="p-1"
                                onClick={() => setIsCreateOpen(false)}
                            >
                                <X className="size-5" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </div>
                        <CreatePopover />
                    </div>
                </div>
            )}

            {/* AI Assistant Panel */}
            {isAIOpen && (
                <FullScreenAIAssistant
                    isOpen={isAIOpen}
                    onClose={() => setIsAIOpen(false)}
                />
            )}

            {/* Communications Panel */}
            {isCommunicationsOpen && (
                <>
                    {/* Expanded Modal Overlay */}
                    {isExpanded ? (
                        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
                            <div className="w-full max-w-6xl h-[80vh] bg-white dark:bg-gray-950 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                                <CommunicationsPanel
                                    onMinimize={() => setIsExpanded(false)}
                                    onClose={() => {
                                        setIsCommunicationsOpen(false)
                                        setIsExpanded(false)
                                    }}
                                    isExpanded={true}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="fixed bottom-20 left-0 right-0 mx-auto z-40 max-w-md">
                            <div className="mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                                <CommunicationsPanel
                                    onMinimize={() => setIsCommunicationsOpen(false)}
                                    onClose={() => setIsCommunicationsOpen(false)}
                                    onExpand={() => setIsExpanded(true)}
                                    isExpanded={false}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
} 