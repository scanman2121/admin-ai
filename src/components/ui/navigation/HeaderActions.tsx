"use client"

import { Button } from "@/components/Button"
import { Tooltip } from "@/components/Tooltip"
import { cn, focusRing } from "@/lib/utils"
import { HelpCircle, Search, Sparkles } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { AIAssistantDrawer } from "../ai/AIAssistantDrawer"
import { FullScreenAIAssistant } from "../ai/FullScreenAIAssistant"
import { CreatePopover } from "../create/CreatePopover"
import { FullScreenNotifications } from "../notifications/FullScreenNotifications"
import { CommandCenter } from "../search/CommandCenter"
import { SupportDropdown } from "./SupportDropdown"
import { UserProfileMobile as UserProfileHeader } from "./UserProfile"

export function HeaderActions() {
    const [isCommandCenterOpen, setIsCommandCenterOpen] = useState(false)
    const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false)
    const pathname = usePathname()
    const [isFullScreenAIOpen, setIsFullScreenAIOpen] = useState(false)
    const [isFullScreenNotificationsOpen, setIsFullScreenNotificationsOpen] = useState(false)
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

    // Set up global keyboard shortcuts for command center
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Open command center on Cmd+K or Ctrl+K
            if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                event.preventDefault()
                setIsCommandCenterOpen(true)
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
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

    // Handle switching from full screen back to drawer
    const handleAIMinimize = () => {
        setIsFullScreenAIOpen(false)
        setIsAIDrawerOpen(true)
    }

    // Handle notifications button click - Hidden for now
    // const handleNotificationsClick = () => {
    //     if (isMobile) {
    //         setIsFullScreenNotificationsOpen(true)
    //     }
    //     // Desktop uses the popover which is handled by the NotificationsPopover component
    // }

    // If on mobile, show user profile only (notifications hidden for now)
    if (isMobile) {
        return (
            <div className="flex items-center gap-x-1">
                {/* Notifications Button - Hidden for now */}
                {/* <Tooltip content="Notifications" side="bottom">
                    <Button
                        variant="ghost"
                        onClick={handleNotificationsClick}
                        className={cn(
                            "group relative flex items-center rounded-md p-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 hover:dark:text-gray-50 hover:dark:bg-gray-900",
                            focusRing
                        )}
                    >
                        <Bell className="size-5" aria-hidden="true" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                </Tooltip> */}
                
                <Tooltip content="User profile" side="bottom" triggerAsChild>
                    <UserProfileHeader />
                </Tooltip>
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center gap-x-1">
                {/* Command Center Search Button */}
                <Tooltip content="Command Center (⌘K)" side="bottom" triggerAsChild>
                    <Button
                        variant="ghost"
                        onClick={() => setIsCommandCenterOpen(true)}
                        className={cn(
                            "group flex items-center rounded-md p-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 hover:dark:text-gray-50 hover:dark:bg-gray-900",
                            focusRing,
                            isCommandCenterOpen && "text-primary dark:text-primary"
                        )}
                    >
                        <Search className="size-5" aria-hidden="true" />
                        <span className="sr-only">Command Center</span>
                    </Button>
                </Tooltip>

                <Tooltip content="Support" side="bottom" triggerAsChild>
                    <SupportDropdown align="end">
                        <Button
                            variant="ghost"
                            className={cn(
                                "group flex items-center rounded-md p-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 hover:dark:text-gray-50 hover:dark:bg-gray-900",
                                focusRing
                            )}
                        >
                            <HelpCircle className="size-5" aria-hidden="true" />
                            <span className="sr-only">Support</span>
                        </Button>
                    </SupportDropdown>
                </Tooltip>

                <Tooltip content="AI Assistant" side="bottom" triggerAsChild>
                    <Button
                        variant="ghost"
                        onClick={handleAIAssistantClick}
                        className={cn(
                            "group flex items-center rounded-md p-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 hover:dark:text-gray-50 hover:dark:bg-gray-900",
                            focusRing,
                            (isAIDrawerOpen || isFullScreenAIOpen) && "text-primary dark:text-primary"
                        )}
                    >
                        <Sparkles className="size-5" aria-hidden="true" />
                        <span className="sr-only">AI Assistant</span>
                    </Button>
                </Tooltip>

                <Tooltip content="Create" side="bottom" triggerAsChild>
                    <CreatePopover />
                </Tooltip>

                {/* Notifications - Hidden for now */}
                {/* <Tooltip content="Notifications" side="bottom">
                    <NotificationsPopover />
                </Tooltip> */}
                
                <Tooltip content="User profile" side="bottom" triggerAsChild>
                    <UserProfileHeader />
                </Tooltip>
            </div>


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
                onMinimize={handleAIMinimize}
            />

            <FullScreenNotifications
                isOpen={isFullScreenNotificationsOpen}
                onClose={() => setIsFullScreenNotificationsOpen(false)}
            />

            {/* Command Center */}
            <CommandCenter
                isOpen={isCommandCenterOpen}
                onClose={() => setIsCommandCenterOpen(false)}
                currentPath={pathname}
            />
        </>
    )
} 