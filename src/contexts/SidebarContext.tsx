"use client"

import { createContext, useContext } from "react"

// Create a context for the sidebar collapsed state
type SidebarContextType = {
  collapsed: boolean
  toggleCollapsed: () => void
}

export const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  toggleCollapsed: () => { },
})

// Custom hook to use the sidebar context
export const useSidebar = () => useContext(SidebarContext)
