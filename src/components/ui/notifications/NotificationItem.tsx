"use client"

import { Notification } from "@/data/notifications"
import { cn } from "@/lib/utils"
import {
    RiAlertFill,
    RiCheckboxCircleFill,
    RiErrorWarningFill,
    RiInformationFill
} from "@remixicon/react"
import Link from "next/link"

interface NotificationItemProps {
    notification: Notification
    onRead: (id: string) => void
}

export function NotificationItem({ notification, onRead }: NotificationItemProps) {
    const { id, title, description, time, read, type, actionUrl } = notification

    const getIcon = () => {
        switch (type) {
            case "success":
                return <RiCheckboxCircleFill className="size-5 text-emerald-500" />
            case "warning":
                return <RiAlertFill className="size-5 text-amber-500" />
            case "error":
                return <RiErrorWarningFill className="size-5 text-red-500" />
            case "info":
            default:
                return <RiInformationFill className="size-5 text-primary" />
        }
    }

    const handleClick = () => {
        if (!read) {
            onRead(id)
        }
    }

    const Content = () => (
        <div className="flex gap-3 p-3 transition-colors">
            <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
            <div className="flex-1 min-w-0">
                <div className={cn(
                    "text-sm font-medium",
                    read ? "text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-gray-50"
                )}>
                    {title}
                </div>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>
                <p className="mt-1 text-xs text-gray-400">{time}</p>
            </div>
            {!read && (
                <div className="flex-shrink-0">
                    <div className="size-2 rounded-full bg-primary"></div>
                </div>
            )}
        </div>
    )

    return actionUrl ? (
        <Link
            href={actionUrl}
            className={cn(
                "block",
                !read && "bg-gray-50 dark:bg-gray-900/50",
                "hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-md"
            )}
            onClick={handleClick}
        >
            <Content />
        </Link>
    ) : (
        <div
            className={cn(
                "cursor-default",
                !read && "bg-gray-50 dark:bg-gray-900/50",
                "hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-md"
            )}
            onClick={handleClick}
        >
            <Content />
        </div>
    )
} 