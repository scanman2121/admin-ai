"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/Checkbox"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/Input"
import { cn } from "@/lib/utils"
import { Check, Send, Settings2 } from "lucide-react"
import { useState } from "react"

interface User {
    id: string
    name: string
    email: string
    avatarUrl?: string
    initials: string
}

// Mock users - in production this would come from API
const mockUsers: User[] = [
    { id: "1", name: "Chris Scanlon", email: "chris.scanlon@hqo.co", initials: "CS" },
    { id: "2", name: "Abigael Canova", email: "abigael.canova@hqo.co", initials: "AC" },
    { id: "3", name: "Ashley Colella", email: "ashley.colella@hqo.co", initials: "AC" },
    { id: "4", name: "Cg", email: "cg@hqo.co", initials: "CG" },
    { id: "5", name: "Erika DeBonte", email: "erika.debonte@hqo.co", initials: "ED" },
    { id: "6", name: "Kevin McCarthy", email: "kevin.mccarthy@hqo.co", initials: "KM" },
    { id: "7", name: "Steve Dietz", email: "steve.dietz@hqo.co", initials: "SD" },
]

interface AssigneeOwnerPopoverProps {
    assignees: string[]
    owner: string | null
    onAssigneesChange: (assignees: string[]) => void
    onOwnerChange: (owner: string | null) => void
    children: React.ReactNode
}

export function AssigneeOwnerPopover({
    assignees,
    owner,
    onAssigneesChange,
    onOwnerChange,
    children,
}: AssigneeOwnerPopoverProps) {
    const [open, setOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    // Reset search when popover opens
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
        if (newOpen) {
            setSearchQuery("")
        }
    }

    const assigneeSet = new Set(assignees)
    const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleToggleAssignee = (userName: string) => {
        const newAssignees = assigneeSet.has(userName)
            ? assignees.filter(a => a !== userName)
            : [...assignees, userName]
        
        onAssigneesChange(newAssignees)
        
        // If removing the owner, clear owner
        if (owner === userName) {
            onOwnerChange(null)
        }
    }

    const handleToggleOwner = (userName: string) => {
        onOwnerChange(owner === userName ? null : userName)
        
        // If setting owner and they're not in assignees, add them
        if (owner !== userName && !assigneeSet.has(userName)) {
            onAssigneesChange([...assignees, userName])
        }
    }

    const handleUnassign = () => {
        onAssigneesChange([])
        onOwnerChange(null)
    }

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent 
                className="w-80 p-0" 
                align="start"
            >
                <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                    <Input
                        placeholder="Set lead..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-8"
                        autoFocus
                    />
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                    {/* No lead / Unassign option */}
                    <div
                        className={cn(
                            "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer",
                            assignees.length === 0 && "bg-gray-50 dark:bg-gray-800"
                        )}
                        onClick={handleUnassign}
                    >
                        <div className="flex items-center justify-center w-5 h-5">
                            <Settings2 className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="flex-1 text-sm text-gray-900 dark:text-gray-50">No lead</span>
                        {assignees.length === 0 && (
                            <>
                                <Check className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                <span className="text-xs text-gray-500">0</span>
                            </>
                        )}
                    </div>

                    {/* Users from project team */}
                    {filteredUsers.length > 0 && (
                        <>
                            <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                Users from the project team
                            </div>
                            {filteredUsers.map((user) => {
                                const isAssignee = assigneeSet.has(user.name)
                                const isOwner = owner === user.name
                                
                                return (
                                    <div
                                        key={user.id}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer",
                                            isAssignee && "bg-gray-50 dark:bg-gray-800"
                                        )}
                                    >
                                        <Avatar className="h-6 w-6">
                                            {user.avatarUrl ? (
                                                <AvatarImage src={user.avatarUrl} alt={user.name} />
                                            ) : (
                                                <AvatarFallback className="text-xs">
                                                    {user.initials}
                                                </AvatarFallback>
                                            )}
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm text-gray-900 dark:text-gray-50 truncate">
                                                {user.name}
                                            </div>
                                            <div className="text-xs text-gray-500 truncate">
                                                {user.email}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                checked={isAssignee}
                                                onCheckedChange={() => handleToggleAssignee(user.name)}
                                                onClick={(e) => e.stopPropagation()}
                                                className="translate-y-[2px]"
                                            />
                                            {isAssignee && (
                                                <>
                                                    <Check className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleToggleOwner(user.name)
                                                        }}
                                                        className={cn(
                                                            "flex items-center justify-center w-4 h-4 rounded border transition-colors",
                                                            isOwner
                                                                ? "bg-primary border-primary"
                                                                : "border-gray-300 dark:border-gray-600 hover:border-primary"
                                                        )}
                                                        aria-label="Set as owner"
                                                        title="Set as owner"
                                                    >
                                                        {isOwner && (
                                                            <Check className="w-3 h-3 text-white" />
                                                        )}
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    )}

                    {/* Invite new user */}
                    <div className="border-t border-gray-200 dark:border-gray-700">
                        <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            New user
                        </div>
                        <div
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                            onClick={() => {
                                // TODO: Implement invite functionality
                                console.log("Invite new user")
                            }}
                        >
                            <Send className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900 dark:text-gray-50">Invite and add...</span>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

