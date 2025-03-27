import { Badge } from "@/components/Badge"
import { notifications } from "@/data/notifications"
import {
    RiAlertFill,
    RiCheckboxCircleFill,
    RiErrorWarningFill,
    RiInformationFill
} from "@remixicon/react"
import Link from "next/link"

export default function NotificationsPage() {
    const getIcon = (type: string) => {
        switch (type) {
            case "success":
                return <RiCheckboxCircleFill className="size-5 text-emerald-500" />
            case "warning":
                return <RiAlertFill className="size-5 text-amber-500" />
            case "error":
                return <RiErrorWarningFill className="size-5 text-red-500" />
            case "info":
            default:
                return <RiInformationFill className="size-5 text-blue-500" />
        }
    }

    const getBadgeVariant = (type: string) => {
        switch (type) {
            case "success":
                return "success"
            case "warning":
                return "warning"
            case "error":
                return "error"
            case "info":
            default:
                return "default"
        }
    }

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Notifications</h1>
                <p className="mt-1 text-gray-500">View and manage your notifications</p>
            </div>

            <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="font-medium text-gray-900 dark:text-gray-50">All notifications</h2>
                    <Badge variant="neutral">{notifications.length}</Badge>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                        >
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 mt-0.5">
                                    {getIcon(notification.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-medium text-gray-900 dark:text-gray-50">
                                            {notification.title}
                                        </h3>
                                        <Badge variant={getBadgeVariant(notification.type)}>
                                            {notification.type}
                                        </Badge>
                                        {!notification.read && (
                                            <span className="size-2 rounded-full bg-primary"></span>
                                        )}
                                    </div>
                                    <p className="text-gray-500 mb-2">{notification.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-400">{notification.time}</span>
                                        {notification.actionUrl && (
                                            <Link
                                                href={notification.actionUrl}
                                                className="text-sm font-medium text-primary hover:text-primary-dark"
                                            >
                                                View details
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
} 