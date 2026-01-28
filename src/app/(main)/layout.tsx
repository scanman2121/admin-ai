"use client"

import { CommunicationsTab } from "@/components/ui/communications/CommunicationsTab"
import { FloatingActionBar } from "@/components/ui/navigation/FloatingActionBar"
import { Header } from "@/components/ui/navigation/Header"
import { Sidebar } from "@/components/ui/navigation/Sidebar"
import { SidebarToggle } from "@/components/ui/navigation/SidebarToggle"
import { TenantSidebar } from "@/components/ui/navigation/TenantSidebar"
import { DemoProvider } from "@/contexts/DemoContext"
import { SidebarContext } from "@/contexts/SidebarContext"
import { ViewProvider, useView } from "@/contexts/ViewContext"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

function MainLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const { view } = useView()
  const [collapsed, setCollapsed] = useState(false)

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const savedCollapsed = localStorage.getItem("sidebarCollapsed")
    if (savedCollapsed) {
      setCollapsed(savedCollapsed === "true")
    }
  }, [])

  // Save collapsed state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed.toString())
  }, [collapsed])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed }}>
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
      >
        Skip to main content
      </a>
      <div className="flex min-h-screen bg-gray-50">
        {view === "tenant" ? <TenantSidebar /> : <Sidebar />}
        {collapsed && <SidebarToggle />}
        <div className={cn(
          "flex flex-col flex-1 transition-all duration-300",
          collapsed ? "lg:ml-16" : "lg:ml-64"
        )}>
          <Header />
          <main id="main-content" className="relative flex-1 overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="px-4 sm:px-6 md:px-8">{children}</div>
            </div>
          </main>
          <CommunicationsTab />
          <FloatingActionBar />
        </div>
      </div>
    </SidebarContext.Provider>
  )
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DemoProvider>
      <ViewProvider>
        <MainLayoutContent>{children}</MainLayoutContent>
      </ViewProvider>
    </DemoProvider>
  )
}
