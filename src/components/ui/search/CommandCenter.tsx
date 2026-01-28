"use client"

import { Button } from "@/components/Button"
import { cn } from "@/lib/utils"
import {
    RiBarChartBoxLine,
    RiBuildingLine,
    RiCalendarCheckLine,
    RiCalendarEventLine,
    RiCloseLine,
    RiCoinLine,
    RiContactsLine,
    RiFileTextLine,
    RiGroupLine,
    RiHeartPulseLine,
    RiMailLine,
    RiMailSendLine,
    RiSearchLine,
    RiShieldUserLine,
    RiSparklingLine,
    RiSurveyLine,
    RiToolsLine,
    RiUserAddLine,
} from "@remixicon/react"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { KeyboardShortcut } from "./KeyboardShortcut"

interface CommandCenterProps {
    isOpen: boolean
    onClose: () => void
    currentPath: string
}

interface QuickAction {
    id: string
    label: string
    icon: React.ReactNode
    isAI?: boolean
    action?: () => void
}

interface SearchResult {
    id: string
    type: "tenant" | "building" | "user"
    title: string
    subtitle: string
}

interface RecentItem {
    id: string
    title: string
    type: string
}

// Mock search results
const mockEntities: SearchResult[] = [
    { id: "t1", type: "tenant", title: "Acme Corporation", subtitle: "Technology" },
    { id: "t2", type: "tenant", title: "Globex Industries", subtitle: "Manufacturing" },
    { id: "t3", type: "tenant", title: "Stark Enterprises", subtitle: "Technology" },
    { id: "b1", type: "building", title: "125 Highland Ave", subtitle: "Boston, MA" },
    { id: "b2", type: "building", title: "200 State Street", subtitle: "Chicago, IL" },
    { id: "b3", type: "building", title: "One Market Plaza", subtitle: "San Francisco, CA" },
    { id: "u1", type: "user", title: "Sarah Johnson", subtitle: "Property Manager" },
    { id: "u2", type: "user", title: "Michael Chen", subtitle: "Tenant Admin" },
    { id: "u3", type: "user", title: "Emily Rodriguez", subtitle: "Building Engineer" },
]

// Recent items
const recentItems: RecentItem[] = [
    { id: "r1", title: "Acme Corporation", type: "Tenant" },
    { id: "r2", title: "125 Highland Ave", type: "Building" },
    { id: "r3", title: "Sarah Johnson", type: "User" },
]

// Context-aware quick actions based on current path
const getQuickActions = (path: string): QuickAction[] => {
    if (path.startsWith("/tenants")) {
        return [
            {
                id: "add-tenant",
                label: "Add tenant",
                icon: <RiUserAddLine className="size-5" />,
            },
            {
                id: "create-communication",
                label: "Create communication",
                icon: <RiMailLine className="size-5" />,
            },
            {
                id: "view-ths-report",
                label: "View THS report",
                icon: <RiHeartPulseLine className="size-5" />,
                isAI: true,
            },
            {
                id: "touch-base",
                label: "Touch base with contacts",
                icon: <RiContactsLine className="size-5" />,
                isAI: true,
            },
            {
                id: "deploy-credits",
                label: "Deploy credits",
                icon: <RiCoinLine className="size-5" />,
            },
            {
                id: "create-survey",
                label: "Create survey",
                icon: <RiSurveyLine className="size-5" />,
            },
        ]
    }

    if (path.startsWith("/buildings")) {
        return [
            {
                id: "add-building",
                label: "Add building",
                icon: <RiBuildingLine className="size-5" />,
            },
            {
                id: "create-event",
                label: "Create event",
                icon: <RiCalendarEventLine className="size-5" />,
            },
            {
                id: "schedule-maintenance",
                label: "Schedule maintenance",
                icon: <RiToolsLine className="size-5" />,
            },
            {
                id: "create-booking",
                label: "Create booking",
                icon: <RiCalendarCheckLine className="size-5" />,
            },
            {
                id: "view-occupancy",
                label: "View occupancy trends",
                icon: <RiBarChartBoxLine className="size-5" />,
                isAI: true,
            },
            {
                id: "create-content",
                label: "Create content",
                icon: <RiFileTextLine className="size-5" />,
            },
        ]
    }

    if (path.startsWith("/users")) {
        return [
            {
                id: "add-user",
                label: "Add user",
                icon: <RiUserAddLine className="size-5" />,
            },
            {
                id: "invite-users",
                label: "Invite users",
                icon: <RiMailSendLine className="size-5" />,
            },
            {
                id: "assign-roles",
                label: "Assign roles",
                icon: <RiShieldUserLine className="size-5" />,
            },
            {
                id: "create-audience",
                label: "Create audience",
                icon: <RiGroupLine className="size-5" />,
            },
        ]
    }

    // Default actions for other pages
    return [
        {
            id: "add-tenant",
            label: "Add tenant",
            icon: <RiUserAddLine className="size-5" />,
        },
        {
            id: "add-building",
            label: "Add building",
            icon: <RiBuildingLine className="size-5" />,
        },
        {
            id: "add-user",
            label: "Add user",
            icon: <RiUserAddLine className="size-5" />,
        },
        {
            id: "create-event",
            label: "Create event",
            icon: <RiCalendarEventLine className="size-5" />,
        },
        {
            id: "create-service-request",
            label: "Create service request",
            icon: <RiToolsLine className="size-5" />,
        },
        {
            id: "create-communication",
            label: "Create communication",
            icon: <RiMailLine className="size-5" />,
        },
    ]
}

export function CommandCenter({ isOpen, onClose, currentPath }: CommandCenterProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [focusedIndex, setFocusedIndex] = useState(0)
    const [mounted, setMounted] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLDivElement>(null)

    // Get context-aware quick actions
    const quickActions = useMemo(() => getQuickActions(currentPath), [currentPath])

    // Filter quick actions based on search query
    const filteredActions = useMemo(() => {
        if (!searchQuery.trim()) return quickActions
        const query = searchQuery.toLowerCase()
        return quickActions.filter((action) =>
            action.label.toLowerCase().includes(query)
        )
    }, [quickActions, searchQuery])

    // Filter entity results based on search query
    const filteredEntities = useMemo(() => {
        if (!searchQuery.trim()) return []
        const query = searchQuery.toLowerCase()
        return mockEntities.filter(
            (entity) =>
                entity.title.toLowerCase().includes(query) ||
                entity.subtitle.toLowerCase().includes(query)
        )
    }, [searchQuery])

    // Combined list for keyboard navigation
    const allItems = useMemo(() => {
        const items: { type: "action" | "entity" | "recent"; data: QuickAction | SearchResult | RecentItem }[] = []

        // Add filtered actions
        filteredActions.forEach((action) => {
            items.push({ type: "action", data: action })
        })

        // Add filtered entities if searching
        if (searchQuery.trim()) {
            filteredEntities.forEach((entity) => {
                items.push({ type: "entity", data: entity })
            })
        } else {
            // Add recent items when not searching
            recentItems.forEach((recent) => {
                items.push({ type: "recent", data: recent })
            })
        }

        return items
    }, [filteredActions, filteredEntities, searchQuery])

    // Mount effect for portal (SSR safety)
    useEffect(() => {
        setMounted(true)
    }, [])

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
            setSearchQuery("")
            setFocusedIndex(0)
        }
    }, [isOpen])

    const handleItemSelect = useCallback(
        (item: { type: "action" | "entity" | "recent"; data: QuickAction | SearchResult | RecentItem }) => {
            console.log("Selected:", item)
            // In a real app, this would trigger the appropriate action or navigation
            onClose()
        },
        [onClose]
    )

    // Handle escape key and arrow navigation
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose()
                return
            }

            if (event.key === "ArrowDown") {
                event.preventDefault()
                setFocusedIndex((prev) => Math.min(prev + 1, allItems.length - 1))
            } else if (event.key === "ArrowUp") {
                event.preventDefault()
                setFocusedIndex((prev) => Math.max(prev - 1, 0))
            } else if (event.key === "Enter") {
                event.preventDefault()
                if (allItems[focusedIndex]) {
                    handleItemSelect(allItems[focusedIndex])
                }
            }
        },
        [onClose, allItems, focusedIndex, handleItemSelect]
    )

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown)
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isOpen, handleKeyDown])

    // Scroll focused item into view
    useEffect(() => {
        if (listRef.current) {
            const focusedElement = listRef.current.querySelector(`[data-index="${focusedIndex}"]`)
            if (focusedElement) {
                focusedElement.scrollIntoView({ block: "nearest" })
            }
        }
    }, [focusedIndex])

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!isOpen || !mounted) return null

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div
                className={cn(
                    "w-[550px] max-h-[70vh] bg-white dark:bg-gray-950 rounded-xl shadow-2xl",
                    "border border-gray-200 dark:border-gray-800",
                    "flex flex-col overflow-hidden"
                )}
            >
                {/* Search Input */}
                <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
                    <RiSearchLine className="size-5 text-gray-400 dark:text-gray-500 shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setFocusedIndex(0)
                        }}
                        placeholder="Type a command or search..."
                        className={cn(
                            "flex-1 bg-transparent text-sm outline-none",
                            "text-gray-900 dark:text-gray-50",
                            "placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        )}
                    />
                    <KeyboardShortcut keys={["⌘", "K"]} className="shrink-0" />
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="p-1 -mr-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    >
                        <RiCloseLine className="size-5" />
                        <span className="sr-only">Close</span>
                    </Button>
                </div>

                {/* Content */}
                <div ref={listRef} className="flex-1 overflow-y-auto p-3">
                    {/* Quick Actions */}
                    {filteredActions.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 mb-2">
                                Quick Actions
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                                {filteredActions.map((action, index) => (
                                    <button
                                        key={action.id}
                                        data-index={index}
                                        onClick={() => handleItemSelect({ type: "action", data: action })}
                                        className={cn(
                                            "flex flex-col items-center gap-2 p-3 rounded-lg",
                                            "border border-gray-200 dark:border-gray-800",
                                            "transition-colors",
                                            focusedIndex === index
                                                ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                                                : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                        )}
                                    >
                                        <div className="relative">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                {action.icon}
                                            </span>
                                            {action.isAI && (
                                                <RiSparklingLine className="absolute -top-1 -right-1 size-3 text-primary" />
                                            )}
                                        </div>
                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                                            {action.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Search Results (Entities) */}
                    {searchQuery.trim() && filteredEntities.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 mb-2">
                                Results
                            </h3>
                            <div className="space-y-1">
                                {filteredEntities.map((entity, index) => {
                                    const itemIndex = filteredActions.length + index
                                    return (
                                        <button
                                            key={entity.id}
                                            data-index={itemIndex}
                                            onClick={() => handleItemSelect({ type: "entity", data: entity })}
                                            className={cn(
                                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg",
                                                "transition-colors text-left",
                                                focusedIndex === itemIndex
                                                    ? "bg-gray-100 dark:bg-gray-800"
                                                    : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "flex items-center justify-center size-8 rounded-full text-sm font-medium",
                                                    entity.type === "tenant" &&
                                                        "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
                                                    entity.type === "building" &&
                                                        "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
                                                    entity.type === "user" &&
                                                        "bg-primary/10 text-primary dark:bg-primary/20"
                                                )}
                                            >
                                                {entity.title.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-50 truncate">
                                                    {entity.title}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                    <span className="capitalize">{entity.type}</span> · {entity.subtitle}
                                                </p>
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* No Results */}
                    {searchQuery.trim() && filteredActions.length === 0 && filteredEntities.length === 0 && (
                        <div className="py-8 text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                No results found for "{searchQuery}"
                            </p>
                        </div>
                    )}

                    {/* Recent Items (when not searching) */}
                    {!searchQuery.trim() && (
                        <div>
                            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 mb-2">
                                Recent
                            </h3>
                            <div className="space-y-1">
                                {recentItems.map((item, index) => {
                                    const itemIndex = filteredActions.length + index
                                    return (
                                        <button
                                            key={item.id}
                                            data-index={itemIndex}
                                            onClick={() => handleItemSelect({ type: "recent", data: item })}
                                            className={cn(
                                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg",
                                                "transition-colors text-left",
                                                focusedIndex === itemIndex
                                                    ? "bg-gray-100 dark:bg-gray-800"
                                                    : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                            )}
                                        >
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                                    {item.title}{" "}
                                                    <span className="text-gray-400 dark:text-gray-500">
                                                        · {item.type}
                                                    </span>
                                                </p>
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 px-4 py-2">
                    <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono">
                                ↑
                            </kbd>
                            <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono">
                                ↓
                            </kbd>
                            <span className="ml-1">Navigate</span>
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono">
                                ↵
                            </kbd>
                            <span className="ml-1">Select</span>
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono">
                                Esc
                            </kbd>
                            <span className="ml-1">Close</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}
