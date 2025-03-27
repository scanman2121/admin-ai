"use client"

import { Button } from "@/components/Button"
import { cn } from "@/lib/utils"
import { RiCloseLine, RiSearchLine } from "@remixicon/react"
import { useEffect, useRef, useState } from "react"
import { KeyboardShortcut } from "./KeyboardShortcut"

interface FullScreenSearchProps {
    isOpen: boolean
    onClose: () => void
}

export function FullScreenSearch({ isOpen, onClose }: FullScreenSearchProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<any[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    // Focus the input when the search modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Close on Escape
            if (event.key === "Escape") {
                onClose()
            }

            // Focus search input on Cmd+K or Ctrl+K
            if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                event.preventDefault()
                if (inputRef.current) {
                    inputRef.current.focus()
                }
            }

            // Navigate results with arrow keys
            if (searchResults.length > 0) {
                if (event.key === "ArrowDown") {
                    // Handle down arrow
                    event.preventDefault()
                    // In a real app, this would select the next result
                } else if (event.key === "ArrowUp") {
                    // Handle up arrow
                    event.preventDefault()
                    // In a real app, this would select the previous result
                } else if (event.key === "Enter") {
                    // Handle enter
                    // In a real app, this would navigate to the selected result
                }
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown)
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isOpen, onClose, searchResults])

    // Mock search function - in a real app, this would query your data
    const handleSearch = (query: string) => {
        setSearchQuery(query)

        if (!query.trim()) {
            setSearchResults([])
            return
        }

        // Mock search results
        const mockResults = [
            { id: 1, type: "user", title: "Ellie Edwards", description: "Tenant admin" },
            { id: 2, type: "building", title: "125 Highland Ave", description: "Boston, MA" },
            { id: 3, type: "tenant", title: "Acme Corporation", description: "Technology" },
            { id: 4, type: "vendor", title: "Maintenance Pro", description: "Maintenance" },
        ].filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        )

        setSearchResults(mockResults)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                {/* Search header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-50">Search</h2>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                        <RiCloseLine className="size-6" aria-hidden="true" />
                        <span className="sr-only">Close search</span>
                    </Button>
                </div>

                {/* Search input */}
                <div className="relative mb-8">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <RiSearchLine className="size-5 text-gray-400 dark:text-gray-600" aria-hidden="true" />
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search for anything..."
                        className={cn(
                            "block w-full pl-12 pr-4 py-4 rounded-lg border-0 outline-none",
                            "text-gray-900 dark:text-gray-50 bg-gray-100 dark:bg-gray-900",
                            "placeholder:text-gray-400 dark:placeholder:text-gray-600",
                            "focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/30",
                            "text-lg"
                        )}
                    />
                </div>

                {/* Search results */}
                <div className="space-y-2">
                    {searchResults.length === 0 && searchQuery.trim() !== "" ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">No results found for "{searchQuery}"</p>
                        </div>
                    ) : (
                        searchResults.map((result) => (
                            <div
                                key={result.id}
                                className="p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
                                onClick={() => {
                                    // In a real app, this would navigate to the result
                                    console.log(`Navigating to ${result.type} ${result.id}`)
                                    onClose()
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "flex items-center justify-center size-10 rounded-full",
                                        result.type === "user" && "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                                        result.type === "building" && "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
                                        result.type === "tenant" && "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
                                        result.type === "vendor" && "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
                                    )}>
                                        {result.type === "user" && <span className="text-lg font-medium">{result.title.charAt(0)}</span>}
                                        {result.type === "building" && <span className="text-lg font-medium">B</span>}
                                        {result.type === "tenant" && <span className="text-lg font-medium">T</span>}
                                        {result.type === "vendor" && <span className="text-lg font-medium">V</span>}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-gray-50">{result.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            <span className="capitalize">{result.type}</span> • {result.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    {/* Search tips */}
                    {searchQuery.trim() === "" && (
                        <div className="mt-8 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                            <h3 className="font-medium text-gray-900 dark:text-gray-50 mb-2">Search tips</h3>
                            <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
                                <li className="flex items-center justify-between">
                                    <span>• Search for users, buildings, tenants, or vendors</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>• Use specific terms for better results</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>• Press ESC to close the search</span>
                                    <KeyboardShortcut keys={["Esc"]} />
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>• Use keyboard shortcuts to navigate</span>
                                    <div className="flex gap-2">
                                        <KeyboardShortcut keys={["↑"]} />
                                        <KeyboardShortcut keys={["↓"]} />
                                        <KeyboardShortcut keys={["Enter"]} />
                                    </div>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>• Open search from anywhere</span>
                                    <KeyboardShortcut keys={["⌘", "K"]} />
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 