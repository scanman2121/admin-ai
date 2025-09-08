"use client"

import { Button } from "@/components/Button"
import { cn, focusRing } from "@/lib/utils"
import { RiNotification3Line, /* RiQrCodeLine, RiSearchLine, */ RiSparkling2Line } from "@remixicon/react"
import { useEffect, useState } from "react"
import { AIAssistantDrawer } from "../ai/AIAssistantDrawer"
import { FullScreenAIAssistant } from "../ai/FullScreenAIAssistant"
import { CreatePopover } from "../create/CreatePopover"
import { FullScreenNotifications } from "../notifications/FullScreenNotifications"
import { NotificationsPopover } from "../notifications/NotificationsPopover"
import { QRScannerModal } from "../qr/QRScannerModal"
import { UserProfileMobile as UserProfileHeader } from "./UserProfile"

export function HeaderActions() {
    // const [isSearchOpen, setIsSearchOpen] = useState(false) // Hidden for now
    const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false)
    const [isFullScreenAIOpen, setIsFullScreenAIOpen] = useState(false)
    const [isFullScreenNotificationsOpen, setIsFullScreenNotificationsOpen] = useState(false)
    // const [isQRScannerOpen, setIsQRScannerOpen] = useState(false) // Hidden for now
    const [isMobile, setIsMobile] = useState(false)

    // Check if we're on mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 1024) // lg breakpoint
        }

        // Initial check
        checkIfMobile()

        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile)

        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile)
    }, [])

    // Set up global keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Open search on Cmd+K or Ctrl+K
            if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                event.preventDefault()
                setIsSearchOpen(true)
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    // Dynamically import the FullScreenSearch component to avoid server/client mismatch
    const [FullScreenSearch, setFullScreenSearch] = useState<any>(null)

    useEffect(() => {
        import("../search/FullScreenSearch").then((module) => {
            setFullScreenSearch(() => module.FullScreenSearch)
        })
    }, [])

    // Handle QR scanner button click - Hidden for now
    // const handleQRScannerClick = () => {
    //     setIsQRScannerOpen(true)
    // }

    // Handle AI assistant button click
    const handleAIAssistantClick = () => {
        if (isMobile) {
            setIsFullScreenAIOpen(true)
        } else {
            setIsAIDrawerOpen(true)
        }
    }

    // Handle switching from drawer to full screen
    const handleAIFullScreen = () => {
        setIsAIDrawerOpen(false)
        setIsFullScreenAIOpen(true)
    }

    // Handle notifications button click
    const handleNotificationsClick = () => {
        if (isMobile) {
            setIsFullScreenNotificationsOpen(true)
        }
        // Desktop uses the popover which is handled by the NotificationsPopover component
    }

    // If on mobile, show notifications and user profile
    if (isMobile) {
        return (
            <div className="flex items-center gap-x-1">
                <Button
                    variant="ghost"
                    onClick={handleNotificationsClick}
                    className={cn(
                        "group relative flex items-center rounded-md p-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 hover:dark:text-gray-50 hover:dark:bg-gray-900",
                        focusRing
                    )}
                >
                    <RiNotification3Line className="size-5" aria-hidden="true" />
                    <span className="sr-only">Notifications</span>
                </Button>
                
                <UserProfileHeader />
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center gap-x-1">
                {/* QR Scanner Button - Hidden for now */}
                {/* <Button
                    variant="ghost"
                    onClick={handleQRScannerClick}
                    className={cn(
                        "group flex items-center rounded-md p-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 hover:dark:text-gray-50 hover:dark:bg-gray-900",
                        focusRing
                    )}
                >
                    <RiQrCodeLine className="size-5" aria-hidden="true" />
                    <span className="sr-only">Scan QR Code</span>
                </Button> */}

                {/* Search Button - Hidden for now */}
                {/* <Button
                    variant="ghost"
                    onClick={() => setIsSearchOpen(true)}
                    className={cn(
                        "group flex items-center rounded-md p-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 hover:dark:text-gray-50 hover:dark:bg-gray-900",
                        focusRing
                    )}
                >
                    <RiSearchLine className="size-5" aria-hidden="true" />
                    <span className="sr-only">Search</span>
                </Button> */}

                <Button
                    variant="ghost"
                    onClick={handleAIAssistantClick}
                    className={cn(
                        "group flex items-center rounded-md p-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 hover:dark:text-gray-50 hover:dark:bg-gray-900",
                        focusRing,
                        (isAIDrawerOpen || isFullScreenAIOpen) && "text-primary dark:text-primary-400"
                    )}
                >
                    <RiSparkling2Line className="size-5" aria-hidden="true" />
                    <span className="sr-only">AI Assistant</span>
                </Button>

                <CreatePopover />

                <NotificationsPopover />
                
                <UserProfileHeader />
            </div>

            {/* QR Scanner Modal */}
            <QRScannerModal
                isOpen={isQRScannerOpen}
                onClose={() => setIsQRScannerOpen(false)}
                onScan={(url) => {
                    console.log('QR Code scanned:', url);
                    setIsQRScannerOpen(false);
                }}
            />

            {FullScreenSearch && (
                <FullScreenSearch
                    isOpen={isSearchOpen}
                    onClose={() => setIsSearchOpen(false)}
                />
            )}

            {/* Desktop AI Drawer */}
            <AIAssistantDrawer
                isOpen={isAIDrawerOpen}
                onClose={() => setIsAIDrawerOpen(false)}
                onFullScreen={handleAIFullScreen}
            />

            {/* Mobile Full Screen Components */}
            <FullScreenAIAssistant
                isOpen={isFullScreenAIOpen}
                onClose={() => setIsFullScreenAIOpen(false)}
            />

            <FullScreenNotifications
                isOpen={isFullScreenNotificationsOpen}
                onClose={() => setIsFullScreenNotificationsOpen(false)}
            />
        </>
    )
} 