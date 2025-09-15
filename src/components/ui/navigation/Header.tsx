"use client"

import { useEffect, useState } from "react"
import { FloatingActionBar } from "./FloatingActionBar"
import { HeaderActions } from "./HeaderActions"
import { BuildingsDropdownDesktop } from "./SidebarBuildingsDropdown"

export function Header() {
    const [isMobile, setIsMobile] = useState(false)

    // Check if screen is mobile (under 1024px)
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024)
        }

        // Initial check
        checkScreenSize()

        // Add event listener for window resize
        window.addEventListener('resize', checkScreenSize)

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkScreenSize)
        }
    }, [])

    return (
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 bg-gray-50 dark:bg-gray-950 px-4 sm:px-6">
            <div className="flex flex-1 items-center gap-4">
                {/* Building picker moved to the left */}
                <div className="ml-1">
                    <BuildingsDropdownDesktop />
                </div>
            </div>
            <HeaderActions />

            {/* Floating Action Bar for Mobile */}
            {isMobile && <FloatingActionBar />}
        </header>
    )
} 