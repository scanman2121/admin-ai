import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"

export interface User {
    id: string
    name: string
    role: string
    email: string
}

// Mock users data - in production this would come from your API
const mockUsers: User[] = [
    {
        id: "1",
        name: "John Smith",
        role: "CTO",
        email: "john@acme.com"
    },
    {
        id: "2",
        name: "Emily Chen",
        role: "Facilities Manager",
        email: "emily@globex.com"
    },
    {
        id: "3",
        name: "Michael Brown",
        role: "Principal Broker",
        email: "michael@brokerage.com"
    },
    {
        id: "4",
        name: "Sarah Johnson",
        role: "Senior Broker",
        email: "sarah@brokerage.com"
    },
    {
        id: "5",
        name: "Lisa Wilson",
        role: "Associate Broker",
        email: "lisa@brokerage.com"
    }
]

interface UserSelectProps {
    label: string
    selectedUser?: User
    onSelect: (user: User | undefined) => void
    userType: "contact" | "broker"
}

export function UserSelect({ label, selectedUser, onSelect, userType }: UserSelectProps) {
    const [open, setOpen] = useState(false)

    const users = mockUsers.filter(user => {
        if (userType === "broker") {
            return user.role.toLowerCase().includes("broker")
        }
        return !user.role.toLowerCase().includes("broker")
    })

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-sm font-normal"
                >
                    {selectedUser ? (
                        <div className="flex flex-col items-start">
                            <span className="text-sm">{label}: {selectedUser.name}</span>
                            <span className="text-xs text-gray-500">{selectedUser.role}</span>
                        </div>
                    ) : (
                        <span>Select {label.toLowerCase()}</span>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
                    <CommandEmpty>No user found.</CommandEmpty>
                    <CommandGroup>
                        {users.map((user) => (
                            <CommandItem
                                key={user.id}
                                value={user.name}
                                onSelect={() => {
                                    onSelect(user)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        selectedUser?.id === user.id ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                <div className="flex flex-col">
                                    <span>{user.name}</span>
                                    <span className="text-xs text-gray-500">{user.role} • {user.email}</span>
                                </div>
                            </CommandItem>
                        ))}
                        <CommandItem
                            onSelect={() => {
                                onSelect(undefined)
                                setOpen(false)
                            }}
                            className="text-red-500"
                        >
                            <Check className="mr-2 h-4 w-4 opacity-0" />
                            Clear selection
                        </CommandItem>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
} 