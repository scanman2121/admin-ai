"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { FullScreenSearch } from "./FullScreenSearch"

interface KeyboardShortcutsContextType {
    openSearch: () => void
}

const KeyboardShortcutsContext = createContext<KeyboardShortcutsContextType | undefined>(undefined)

export function useKeyboardShortcuts() {
    const context = useContext(KeyboardShortcutsContext)
    if (!context) {
        throw new Error("useKeyboardShortcuts must be used within a KeyboardShortcutsProvider")
    }
    return context
}

export function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const openSearch = () => setIsSearchOpen(true)

    // Set up global keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Open search on Cmd+K or Ctrl+K
            if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                event.preventDefault()
                setIsSearchOpen(true)
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    return (
        <KeyboardShortcutsContext.Provider value={{ openSearch }}>
            {children}
            <FullScreenSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </KeyboardShortcutsContext.Provider>
    )
} 