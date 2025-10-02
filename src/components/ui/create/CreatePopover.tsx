"use client"

import { Button } from "@/components/Button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/Popover"
import { cn, focusRing } from "@/lib/utils"
import {
    RiAddBoxLine,
    RiAddLine,
    RiCalendarCheckLine,
    RiCalendarLine,
    RiCheckboxCircleLine,
    RiFileTextLine,
    RiMessage2Line,
    RiTeamLine,
    RiToolsLine,
    RiUser2Line,
    RiUserAddLine,
    RiUserLine
} from "@remixicon/react"
import Link from "next/link"
import { useState } from "react"

interface CreateOption {
    id: string
    label: string
    icon: React.ReactNode
    href: string
}

export function CreatePopover() {
    const [isOpen, setIsOpen] = useState(false)

    const createOptions: CreateOption[] = [
        {
            id: "add-audience",
            label: "Add audience",
            icon: <RiTeamLine className="size-5" />,
            href: "/audiences/new"
        },
        {
            id: "add-building",
            label: "Add building",
            icon: <RiAddBoxLine className="size-5" />,
            href: "/buildings/new"
        },
        {
            id: "add-tenant",
            label: "Add tenant",
            icon: <RiUserLine className="size-5" />,
            href: "/tenants/new"
        },
        {
            id: "add-user",
            label: "Add user",
            icon: <RiUser2Line className="size-5" />,
            href: "/users/new"
        },
        {
            id: "add-vendor",
            label: "Add vendor",
            icon: <RiUserAddLine className="size-5" />,
            href: "/vendors/new"
        },
        {
            id: "create-booking",
            label: "Create booking",
            icon: <RiCalendarLine className="size-5" />,
            href: "/bookings/new"
        },
        {
            id: "create-communication",
            label: "Create communication",
            icon: <RiMessage2Line className="size-5" />,
            href: "/communications/new"
        },
        {
            id: "create-content",
            label: "Create content",
            icon: <RiFileTextLine className="size-5" />,
            href: "/content/new"
        },
        {
            id: "create-event",
            label: "Create event",
            icon: <RiCalendarCheckLine className="size-5" />,
            href: "/events/new"
        },
        {
            id: "create-survey",
            label: "Create survey",
            icon: <RiCheckboxCircleLine className="size-5" />,
            href: "/surveys/new"
        },
        {
            id: "create-visitor",
            label: "Create visitor",
            icon: <RiUser2Line className="size-5" />,
            href: "/visitors/new"
        },
        {
            id: "create-service-request",
            label: "Create service request",
            icon: <RiToolsLine className="size-5" />,
            href: "/service-requests/new"
        }
    ]

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        "group flex items-center rounded-md p-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 hover:dark:text-gray-50 hover:dark:bg-gray-900",
                        focusRing
                    )}
                >
                    <RiAddLine className="size-5" aria-hidden="true" />
                    <span className="sr-only">Create</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                sideOffset={16}
                side="bottom"
                avoidCollisions={true}
                collisionPadding={8}
                className="w-[480px] p-4 max-h-[calc(100vh-100px)] z-50"
            >
                <div className="grid grid-cols-3 gap-2">
                    {createOptions.map((option) => (
                        <Link
                            key={option.id}
                            href={option.href}
                            className={cn(
                                "flex flex-col items-center justify-center p-3 rounded-md transition-colors",
                                "bg-white dark:bg-gray-950",
                                "border border-gray-200 dark:border-gray-800",
                                "hover:bg-gray-50 dark:hover:bg-gray-900",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950",
                                "group"
                            )}
                            onClick={() => setIsOpen(false)}
                        >
                            <div className={cn(
                                "flex items-center justify-center size-10 rounded-full mb-2",
                                "bg-gray-100 dark:bg-gray-900",
                                "text-gray-700 dark:text-gray-300",
                                "group-hover:bg-primary/10 group-hover:text-primary dark:group-hover:bg-primary/20"
                            )}>
                                {option.icon}
                            </div>
                            <span className="text-xs font-medium text-gray-900 dark:text-gray-50 text-center">
                                {option.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
} 