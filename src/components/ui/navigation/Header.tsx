"use client"

import { useEffect, useState, useContext } from "react"
import { FloatingActionBar } from "./FloatingActionBar"
import { HeaderActions } from "./HeaderActions"
import { BuildingsDropdownDesktop } from "./SidebarBuildingsDropdown"
import { SidebarContext } from "@/app/(main)/layout"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { cn, focusRing } from "@/lib/utils"

export function Header() {
    const [isMobile, setIsMobile] = useState(false)
    const { collapsed, toggleCollapsed } = useContext(SidebarContext)

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
                {/* Desktop Header (1024px and above) */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleCollapsed}
                        className={cn(
                            "hidden lg:flex items-center justify-center rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                            focusRing
                        )}
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed ? (
                            <PanelLeftOpen className="size-4 text-gray-500 dark:text-gray-400" />
                        ) : (
                            <PanelLeftClose className="size-4 text-gray-500 dark:text-gray-400" />
                        )}
                    </button>
                    <BuildingsDropdownDesktop />
                </div>
            </div>
            <HeaderActions />

            {/* Floating Action Bar for Mobile */}
            {isMobile && <FloatingActionBar />}
        </header>
    )
} 