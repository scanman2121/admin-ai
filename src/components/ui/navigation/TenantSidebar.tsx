"use client"

import { SidebarContext } from "@/contexts/SidebarContext"
import { siteConfig } from "@/app/siteConfig"
import { cn, focusRing } from "@/lib/utils"
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react"
import {
  Building,
  CreditCard,
  Home,
  Settings,
  Shield,
  UserCircle,
  Users,
  Calendar,
  ClipboardList
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext } from "react"
import { HqOLogo } from "./HqOLogo"

// Tenant navigation items - flat list
const tenantNavItems = [
  { name: "Home", href: siteConfig.baseLinks.tenant.home, icon: Home },
  { name: "Buildings", href: siteConfig.baseLinks.tenant.buildings, icon: Building },
  { name: "Employees", href: siteConfig.baseLinks.tenant.employees, icon: Users },
  { name: "Access Control", href: siteConfig.baseLinks.tenant.accessControl, icon: Shield },
  { name: "Vendors", href: siteConfig.baseLinks.tenant.vendors, icon: UserCircle },
  { name: "Visitors", href: siteConfig.baseLinks.tenant.visitors, icon: Users },
  { name: "Resource Booking", href: siteConfig.baseLinks.tenant.resourceBooking, icon: Calendar },
  { name: "Service Requests", href: siteConfig.baseLinks.tenant.serviceRequests, icon: ClipboardList },
  { name: "Credits", href: siteConfig.baseLinks.tenant.credits, icon: CreditCard },
  { name: "Settings", href: siteConfig.baseLinks.tenant.settings, icon: Settings },
] as const

export function TenantSidebar() {
  const pathname = usePathname()
  const { collapsed, toggleCollapsed } = useContext(SidebarContext)

  const isActive = (itemHref: string) => {
    return pathname === itemHref || pathname.startsWith(itemHref + "/")
  }

  return (
    <nav 
      className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:flex-col"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={cn(
        "flex h-full flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 transition-all duration-300",
        collapsed ? "w-16 px-2" : "w-64 px-3"
      )}>
        <div className="flex h-16 shrink-0 items-center gap-2">
          <Link href="/" className={cn(collapsed ? "pl-0" : "pl-1.5")}>
            <HqOLogo className="h-6 w-auto" />
            <span className="sr-only">HqO</span>
          </Link>
          <button
            onClick={toggleCollapsed}
            className={cn(
              "flex items-center justify-center w-6 h-6 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
              focusRing
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <RiArrowRightSLine className="size-4 text-gray-600 dark:text-gray-400" />
            ) : (
              <RiArrowLeftSLine className="size-4 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-1">
            {tenantNavItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-x-3 rounded-md py-2 text-[14px] font-medium transition-all duration-200 ease-out",
                      collapsed ? "px-2 justify-center" : "px-3",
                      isActive(item.href)
                        ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary shadow-sm"
                        : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8]",
                      focusRing,
                    )}
                  >
                    {/* Blue indicator line */}
                    <div className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 bg-primary rounded-r-sm transition-all duration-150 ease-out",
                      isActive(item.href)
                        ? "h-full opacity-100"
                        : "h-1/2 opacity-0 group-hover:opacity-100"
                    )} />
                    <Icon
                      className={cn(
                        "size-4 shrink-0",
                        isActive(item.href)
                          ? "text-primary dark:text-primary"
                          : "text-[#696E72] group-hover:text-gray-500 dark:group-hover:text-gray-400",
                      )}
                      aria-hidden="true"
                    />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </nav>
  )
}

