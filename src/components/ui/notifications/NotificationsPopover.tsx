"use client"

import { Button } from "@/components/Button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/Popover"
import { notifications as initialNotifications } from "@/data/notifications"
import { cn, focusRing } from "@/lib/utils"
import { RiCheckLine, RiNotification3Line, RiSettings3Line } from "@remixicon/react"
import Link from "next/link"
import { useState } from "react"
import { NotificationItem } from "./NotificationItem"

export function NotificationsPopover() {
    const [notifications, setNotifications] = useState(initialNotifications)
    const [isOpen, setIsOpen] = useState(false)

    const unreadCount = notifications.filter(n => !n.read).length

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

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        "group relative flex items-center rounded-md p-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 hover:dark:text-gray-50 hover:dark:bg-gray-900",
                        focusRing
                    )}
                >
                    <RiNotification3Line className="size-5" aria-hidden="true" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                    <span className="sr-only">Notifications</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                sideOffset={16}
                className="w-[380px] p-0 max-h-[calc(100vh-100px)] overflow-hidden"
            >
                <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
                    <h2 className="text-sm font-medium text-gray-900 dark:text-gray-50">Notifications</h2>
                    <div className="flex items-center gap-x-2">
                        <Button
                            variant="ghost"
                            onClick={handleMarkAllAsRead}
                            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 p-1"
                        >
                            <RiCheckLine className="size-4" />
                            <span className="sr-only">Mark all as read</span>
                        </Button>
                        <Link href="/settings/notifications">
                            <Button
                                variant="ghost"
                                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 p-1"
                            >
                                <RiSettings3Line className="size-4" />
                                <span className="sr-only">Notification settings</span>
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="overflow-y-auto max-h-[400px]">
                    {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-gray-500">
                            No notifications
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                            {notifications.map((notification) => (
                                <li key={notification.id} onClick={() => setIsOpen(false)}>
                                    <NotificationItem
                                        notification={notification}
                                        onRead={handleMarkAsRead}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="border-t border-gray-200 p-4 dark:border-gray-800">
                    <Link
                        href="/notifications"
                        className={cn(
                            "block w-full rounded-md py-2 px-3 text-center text-sm font-medium",
                            "bg-gray-50 text-gray-900 hover:bg-gray-100",
                            "dark:bg-gray-900 dark:text-gray-50 dark:hover:bg-gray-800",
                            focusRing
                        )}
                        onClick={() => setIsOpen(false)}
                    >
                        View all notifications
                    </Link>
                </div>
            </PopoverContent>
        </Popover>
    )
} 