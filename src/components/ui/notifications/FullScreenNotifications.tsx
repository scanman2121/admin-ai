"use client"

import { Button } from "@/components/Button"
import { notifications as initialNotifications } from "@/data/notifications"
import { RiCheckLine, RiCloseLine, RiNotification3Line, RiSettings3Line } from "@remixicon/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { NotificationItem } from "./NotificationItem"

interface FullScreenNotificationsProps {
    isOpen: boolean
    onClose: () => void
}

export function FullScreenNotifications({ isOpen, onClose }: FullScreenNotificationsProps) {
    const [notifications, setNotifications] = useState(initialNotifications)
    const containerRef = useRef<HTMLDivElement>(null)

    const unreadCount = notifications.filter(n => !n.read).length

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Close on Escape
            if (event.key === "Escape") {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown)
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isOpen, onClose])

    const handleMarkAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        )
    }

    const handleMarkAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, read: true }))
        )
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-950 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">Notifications</h2>
                <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            onClick={handleMarkAllAsRead}
                            className="flex items-center gap-1 text-xs py-1 px-2 h-8"
                        >
                            <RiCheckLine className="size-4" />
                            <span>Mark all as read</span>
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="p-1.5 h-8 w-8"
                    >
                        <RiCloseLine className="size-5" />
                        <span className="sr-only">Close</span>
                    </Button>
                </div>
            </div>

            {/* Notifications content */}
            <div className="flex-1 overflow-y-auto" ref={containerRef}>
                {notifications.length > 0 ? (
                    <div className="divide-y divide-gray-200 dark:divide-gray-800">
                        {notifications.map(notification => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onRead={handleMarkAsRead}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center h-full">
                        <RiNotification3Line className="size-12 text-gray-400" />
                        <p className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-50">No notifications</p>
                        <p className="mt-1 text-gray-500">You're all caught up!</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-between">
                <Button
                    variant="ghost"
                    className="text-primary hover:text-primary-dark hover:bg-primary/5"
                    asChild
                >
                    <Link href="/notifications">
                        View all notifications
                    </Link>
                </Button>
                <Button
                    variant="ghost"
                    className="text-gray-500"
                    asChild
                >
                    <Link href="/settings/general#notification-settings">
                        <RiSettings3Line className="size-4 mr-1" />
                        Settings
                    </Link>
                </Button>
            </div>
        </div>
    )
} 