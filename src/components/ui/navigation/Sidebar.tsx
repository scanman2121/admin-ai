"use client"
import { SidebarContext } from "@/app/(main)/layout"
import { siteConfig } from "@/app/siteConfig"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer"
import { cn, focusRing } from "@/lib/utils"
import {
    Building,
    ChevronDown,
    Folder,
    HandCoins,
    Home,
    LayoutDashboard,
    LineChart,
    Megaphone,
    MonitorSmartphone,
    Settings
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { HqOLogo } from "./HqOLogo"
import { SidebarPopover } from "./SidebarPopover"

// Portfolio sub-navigation items
const portfolioItems = [
  { name: "Buildings", href: siteConfig.baseLinks.buildings },
  { name: "Tenants", href: siteConfig.baseLinks.tenants },
  { name: "Users", href: siteConfig.baseLinks.users },
  { name: "Vendors", href: siteConfig.baseLinks.vendors },
  { name: "Audiences", href: siteConfig.baseLinks.audiences },
] as const

// Payments sub-navigation items
const paymentsItems = [
  { name: "Transactions", href: siteConfig.baseLinks.transactions },
  { name: "Credits", href: siteConfig.baseLinks.credits },
  { name: "Discounts", href: siteConfig.baseLinks.discounts },
] as const

// Experience Manager sub-navigation items
const experienceManagerItems = [
  { name: "Content", href: siteConfig.baseLinks.experienceManager.content },
  { name: "Amenity posts", href: siteConfig.baseLinks.experienceManager.amenityPosts },
  { name: "Events", href: siteConfig.baseLinks.experienceManager.events },
  { name: "Surveys", href: siteConfig.baseLinks.experienceManager.surveys },
  { name: "Community forum", href: siteConfig.baseLinks.experienceManager.communityForum },
  { name: "Communications", href: siteConfig.baseLinks.experienceManager.communications },
] as const

// Operations sub-navigation items
const operationsItems = [
  { name: "Access control", href: siteConfig.baseLinks.operations.accessControl },
  { name: "Mobile access", href: siteConfig.baseLinks.operations.mobileAccess },
  { name: "Visitor management", href: siteConfig.baseLinks.operations.visitorManagement },
  { name: "Capacity manager", href: siteConfig.baseLinks.operations.capacityManager },
  { name: "Resource booking", href: siteConfig.baseLinks.operations.resourceBooking },
  { name: "Work orders", href: siteConfig.baseLinks.operations.workOrders },
  { name: "Energy consumption", href: siteConfig.baseLinks.operations.energyConsumption },
] as const

// Settings and setup sub-navigation items
const settingsAndSetupItems = [
  { name: "Features", href: siteConfig.baseLinks.settingsAndSetup.features },
  { name: "SSO apps", href: siteConfig.baseLinks.settingsAndSetup.ssoApps },
  { name: "Theme", href: siteConfig.baseLinks.settingsAndSetup.theme },
] as const

// Files sub-navigation items
const filesItems = [
  { name: "Repository", href: siteConfig.baseLinks.fileRepository },
] as const

// Intelligence sub-navigation items
const intelligenceItems = [
  { name: "Dashboard", href: siteConfig.baseLinks.intelligence.dashboard },
  { name: "Portfolio Benchmarks", href: siteConfig.baseLinks.intelligence.portfolioBenchmarks },
  { name: "Assessments", href: siteConfig.baseLinks.intelligence.assessments },
  { name: "About intelligence", href: siteConfig.baseLinks.intelligence.aboutIntelligence },
] as const

// Type for section IDs to ensure type safety
type SectionId = 'portfolio' | 'payments' | 'experienceManager' | 'operations' | 'files' | 'settingsAndSetup' | 'intelligence';

export function Sidebar() {
  const pathname = usePathname()
  const [openSection, setOpenSection] = useState<SectionId | null>(null)
  const [portfolioSettingsOpen, setPortfolioSettingsOpen] = useState(false)
  const { collapsed } = useContext(SidebarContext)

  // Check if current path is in each section
  const isInPortfolio = portfolioItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  const isInPayments = paymentsItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  const isInExperienceManager = experienceManagerItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  const isInOperations = operationsItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  const isInSettingsAndSetup = settingsAndSetupItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  const isInFiles = filesItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  const isInIntelligence = intelligenceItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  // Check if we're on the My HqO page
  const isInMyHqO = pathname === siteConfig.baseLinks.overview || pathname.startsWith(siteConfig.baseLinks.overview + "/")

  // Auto-expand the section that contains the current path
  useEffect(() => {
    if (isInMyHqO) {
      // Collapse all sections when My HqO is active
      setOpenSection(null)
    } else if (isInPortfolio) {
      setOpenSection('portfolio')
    } else if (isInPayments) {
      setOpenSection('payments')
    } else if (isInExperienceManager) {
      setOpenSection('experienceManager')
    } else if (isInOperations) {
      setOpenSection('operations')
    } else if (isInFiles) {
      setOpenSection('files')
    } else if (isInSettingsAndSetup) {
      setOpenSection('settingsAndSetup')
    } else if (isInIntelligence) {
      setOpenSection('intelligence')
    }
  }, [isInMyHqO, isInPortfolio, isInPayments, isInExperienceManager, isInOperations, isInFiles, isInSettingsAndSetup, isInIntelligence])

  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.settings.general) {
      return pathname.startsWith("/settings")
    }
    return pathname === itemHref || pathname.startsWith(itemHref)
  }

  // Toggle section open/closed with smooth transitions
  const toggleSection = (section: SectionId) => {
    // Don't toggle sections when sidebar is collapsed
    if (collapsed) return
    
    // If clicking the same section, just close it
    if (openSection === section) {
      setOpenSection(null)
      return
    }
    
    // If switching to a different section, close current first, then open new one
    if (openSection && openSection !== section) {
      setOpenSection(null)
      // Small delay to allow close animation to start before opening new section
      setTimeout(() => {
        setOpenSection(section)
      }, 150) // Half the animation duration for smooth transition
    } else {
      // No section currently open, just open the new one
      setOpenSection(section)
    }
  }

  return (
    <nav className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:flex-col">
      <div className={cn(
        "flex h-full flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 transition-all duration-300",
        collapsed ? "w-16 px-2" : "w-64 px-3"
      )}>
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/" className={cn(collapsed ? "pl-0" : "pl-1.5")}>
            <HqOLogo className="h-6 w-auto" />
            <span className="sr-only">HqO</span>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="space-y-1">
                {/* My HqO */}
                <li>
                  <Link
                    href={siteConfig.baseLinks.overview}
                    className={cn(
                      "group relative flex items-center gap-x-3 rounded-md py-2 text-[14px] font-medium transition-all duration-200 ease-out",
                      collapsed ? "px-2 justify-center" : "px-3",
                      isActive(siteConfig.baseLinks.overview)
                        ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary shadow-sm"
                        : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8]",
                      focusRing,
                    )}
                  >
                    {/* Blue indicator line */}
                    <div className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 bg-primary rounded-r-sm transition-all duration-150 ease-out",
                      isActive(siteConfig.baseLinks.overview)
                        ? "h-full opacity-100"
                        : "h-1/2 opacity-0 group-hover:opacity-100"
                    )} />
                    <Home
                      className={cn(
                        "size-4 shrink-0",
                        isActive(siteConfig.baseLinks.overview)
                          ? "text-primary dark:text-primary"
                          : "text-[#696E72] group-hover:text-gray-500 dark:group-hover:text-gray-400",
                      )}
                      aria-hidden="true"
                    />
                    {!collapsed && <span>My HqO</span>}
                  </Link>
                </li>

                {/* Portfolio accordion */}
                <li className={cn(
                  (openSection === 'portfolio' || isInPortfolio) && !collapsed
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden"
                    : "",
                  openSection === 'portfolio' && !collapsed
                    ? "pb-3"
                    : ""
                )}>
                  {collapsed ? (
                    <SidebarPopover
                      icon={<Building className="size-4 shrink-0" aria-hidden="true" />}
                      title="Portfolio"
                      items={portfolioItems}
                      isActive={isActive}
                      isInSection={isInPortfolio}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('portfolio')}
                      className={cn(
                        "flex w-full items-center gap-x-2.5 py-2 text-[14px] font-medium transition",
                        collapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'portfolio' || isInPortfolio)
                          ? "text-[#2D3338]"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'portfolio'}
                    >
                      <span className={cn("flex items-center", collapsed ? "" : "gap-x-2.5")}>
                        <Building className="size-4 shrink-0" aria-hidden="true" />
                        {!collapsed && "Portfolio"}
                      </span>
                      {!collapsed && (
                        <ChevronDown
                          className={cn(
                            "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                            openSection === 'portfolio' ? "rotate-0" : "-rotate-90"
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )}

                  {/* Sub-navigation items with animation */}
                  <div className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    !collapsed && openSection === 'portfolio' 
                      ? "max-h-96 opacity-100" 
                      : "max-h-0 opacity-0"
                  )}>
                    <ul className="mt-1 space-y-1 transform transition-transform duration-300 ease-in-out">
                      {portfolioItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-10 pr-2 text-[14px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm mx-2 pl-8 pr-2"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] pl-10 pr-2 hover:mx-2 hover:pl-8 hover:pr-2",
                              focusRing,
                            )}
                          >
                            {/* Blue indicator line */}
                            <div className={cn(
                              "absolute -left-2 top-1/2 -translate-y-1/2 w-0.5 bg-primary rounded-r-sm transition-all duration-150 ease-out",
                              isActive(item.href)
                                ? "h-full opacity-100"
                                : "h-1/2 opacity-0 group-hover:opacity-100"
                            )} />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                {/* Experience Manager accordion */}
                <li className={cn(
                  (openSection === 'experienceManager' || isInExperienceManager) && !collapsed
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden"
                    : "",
                  openSection === 'experienceManager' && !collapsed
                    ? "pb-3"
                    : ""
                )}>
                  {collapsed ? (
                    <SidebarPopover
                      icon={<Megaphone className="size-4 shrink-0" aria-hidden="true" />}
                      title="Experience manager"
                      items={experienceManagerItems}
                      isActive={isActive}
                      isInSection={isInExperienceManager}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('experienceManager')}
                      className={cn(
                        "flex w-full items-center gap-x-2.5 py-2 text-[14px] font-medium transition",
                        collapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'experienceManager' || isInExperienceManager)
                          ? "text-[#2D3338]"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'experienceManager'}
                    >
                      <span className={cn("flex items-center", collapsed ? "" : "gap-x-2.5")}>
                        <Megaphone className="size-4 shrink-0" aria-hidden="true" />
                        {!collapsed && "Experience"}
                      </span>
                      {!collapsed && (
                        <ChevronDown
                          className={cn(
                            "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                            openSection === 'experienceManager' ? "rotate-0" : "-rotate-90"
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )}

                  {/* Sub-navigation items with animation */}
                  <div className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    !collapsed && openSection === 'experienceManager' 
                      ? "max-h-96 opacity-100" 
                      : "max-h-0 opacity-0"
                  )}>
                    <ul className="mt-1 space-y-1 transform transition-transform duration-300 ease-in-out">
                      {experienceManagerItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-10 pr-2 text-[14px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm mx-2 pl-8 pr-2"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] pl-10 pr-2 hover:mx-2 hover:pl-8 hover:pr-2",
                              focusRing,
                            )}
                          >
                            {/* Blue indicator line */}
                            <div className={cn(
                              "absolute -left-2 top-1/2 -translate-y-1/2 w-0.5 bg-primary rounded-r-sm transition-all duration-150 ease-out",
                              isActive(item.href)
                                ? "h-full opacity-100"
                                : "h-1/2 opacity-0 group-hover:opacity-100"
                            )} />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                {/* Operations accordion */}
                <li className={cn(
                  (openSection === 'operations' || isInOperations) && !collapsed
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden"
                    : "",
                  openSection === 'operations' && !collapsed
                    ? "pb-3"
                    : ""
                )}>
                  {collapsed ? (
                    <SidebarPopover
                      icon={<LayoutDashboard className="size-4 shrink-0" aria-hidden="true" />}
                      title="Operations"
                      items={operationsItems}
                      isActive={isActive}
                      isInSection={isInOperations}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('operations')}
                      className={cn(
                        "flex w-full items-center gap-x-2.5 py-2 text-[14px] font-medium transition",
                        collapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'operations' || isInOperations)
                          ? "text-[#2D3338]"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'operations'}
                    >
                      <span className={cn("flex items-center", collapsed ? "" : "gap-x-2.5")}>
                        <LayoutDashboard className="size-4 shrink-0" aria-hidden="true" />
                        {!collapsed && "Operations"}
                      </span>
                      {!collapsed && (
                        <ChevronDown
                          className={cn(
                            "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                            openSection === 'operations' ? "rotate-0" : "-rotate-90"
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )}

                  {/* Sub-navigation items with animation */}
                  <div className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    !collapsed && openSection === 'operations' 
                      ? "max-h-96 opacity-100" 
                      : "max-h-0 opacity-0"
                  )}>
                    <ul className="mt-1 space-y-1 transform transition-transform duration-300 ease-in-out">
                      {operationsItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-10 pr-2 text-[14px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm mx-2 pl-8 pr-2"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] pl-10 pr-2 hover:mx-2 hover:pl-8 hover:pr-2",
                              focusRing,
                            )}
                          >
                            {/* Blue indicator line */}
                            <div className={cn(
                              "absolute -left-2 top-1/2 -translate-y-1/2 w-0.5 bg-primary rounded-r-sm transition-all duration-150 ease-out",
                              isActive(item.href)
                                ? "h-full opacity-100"
                                : "h-1/2 opacity-0 group-hover:opacity-100"
                            )} />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                {/* Payments accordion */}
                <li className={cn(
                  (openSection === 'payments' || isInPayments) && !collapsed
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden"
                    : "",
                  openSection === 'payments' && !collapsed
                    ? "pb-3"
                    : ""
                )}>
                  {collapsed ? (
                    <SidebarPopover
                      icon={<HandCoins className="size-4 shrink-0" aria-hidden="true" />}
                      title="Payments"
                      items={paymentsItems}
                      isActive={isActive}
                      isInSection={isInPayments}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('payments')}
                      className={cn(
                        "flex w-full items-center gap-x-2.5 py-2 text-[14px] font-medium transition",
                        collapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'payments' || isInPayments)
                          ? "text-[#2D3338]"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'payments'}
                    >
                      <span className={cn("flex items-center", collapsed ? "" : "gap-x-2.5")}>
                        <HandCoins className="size-4 shrink-0" aria-hidden="true" />
                        {!collapsed && "Payments"}
                      </span>
                      {!collapsed && (
                        <ChevronDown
                          className={cn(
                            "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                            openSection === 'payments' ? "rotate-0" : "-rotate-90"
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )}

                  {/* Sub-navigation items with animation */}
                  <div className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    !collapsed && openSection === 'payments' 
                      ? "max-h-96 opacity-100" 
                      : "max-h-0 opacity-0"
                  )}>
                    <ul className="mt-1 space-y-1 transform transition-transform duration-300 ease-in-out">
                      {paymentsItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-10 pr-2 text-[14px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm mx-2 pl-8 pr-2"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] pl-10 pr-2 hover:mx-2 hover:pl-8 hover:pr-2",
                              focusRing,
                            )}
                          >
                            {/* Blue indicator line */}
                            <div className={cn(
                              "absolute -left-2 top-1/2 -translate-y-1/2 w-0.5 bg-primary rounded-r-sm transition-all duration-150 ease-out",
                              isActive(item.href)
                                ? "h-full opacity-100"
                                : "h-1/2 opacity-0 group-hover:opacity-100"
                            )} />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                {/* Files accordion */}
                <li className={cn(
                  (openSection === 'files' || isInFiles) && !collapsed
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden"
                    : "",
                  openSection === 'files' && !collapsed
                    ? "pb-3"
                    : ""
                )}>
                  {collapsed ? (
                    <SidebarPopover
                      icon={<Folder className="size-4 shrink-0" aria-hidden="true" />}
                      title="Files"
                      items={filesItems}
                      isActive={isActive}
                      isInSection={isInFiles}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('files')}
                      className={cn(
                        "flex w-full items-center gap-x-2.5 py-2 text-[14px] font-medium transition",
                        collapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'files' || isInFiles)
                          ? "text-[#2D3338]"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'files'}
                    >
                      <span className={cn("flex items-center", collapsed ? "" : "gap-x-2.5")}>
                        <Folder className="size-4 shrink-0" aria-hidden="true" />
                        {!collapsed && "Files"}
                      </span>
                      {!collapsed && (
                        <ChevronDown
                          className={cn(
                            "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                            openSection === 'files' ? "rotate-0" : "-rotate-90"
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )}

                  {/* Sub-navigation items with animation */}
                  <div className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    !collapsed && openSection === 'files' 
                      ? "max-h-96 opacity-100" 
                      : "max-h-0 opacity-0"
                  )}>
                    <ul className="mt-1 space-y-1 transform transition-transform duration-300 ease-in-out">
                      {filesItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-10 pr-2 text-[14px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm mx-2 pl-8 pr-2"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] pl-10 pr-2 hover:mx-2 hover:pl-8 hover:pr-2",
                              focusRing,
                            )}
                          >
                            {/* Blue indicator line */}
                            <div className={cn(
                              "absolute -left-2 top-1/2 -translate-y-1/2 w-0.5 bg-primary rounded-r-sm transition-all duration-150 ease-out",
                              isActive(item.href)
                                ? "h-full opacity-100"
                                : "h-1/2 opacity-0 group-hover:opacity-100"
                            )} />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                {/* Intelligence accordion */}
                <li className={cn(
                  (openSection === 'intelligence' || isInIntelligence) && !collapsed
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden"
                    : "",
                  openSection === 'intelligence' && !collapsed
                    ? "pb-3"
                    : ""
                )}>
                  {collapsed ? (
                    <SidebarPopover
                      icon={<LineChart className="size-4 shrink-0" aria-hidden="true" />}
                      title="Intelligence"
                      items={intelligenceItems}
                      isActive={isActive}
                      isInSection={isInIntelligence}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('intelligence')}
                      className={cn(
                        "flex w-full items-center gap-x-2.5 py-2 text-[14px] font-medium transition",
                        collapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'intelligence' || isInIntelligence)
                          ? "text-[#2D3338]"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'intelligence'}
                    >
                      <span className={cn("flex items-center", collapsed ? "" : "gap-x-2.5")}>
                        <LineChart className="size-4 shrink-0" aria-hidden="true" />
                        {!collapsed && "Intelligence"}
                      </span>
                      {!collapsed && (
                        <ChevronDown
                          className={cn(
                            "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                            openSection === 'intelligence' ? "rotate-0" : "-rotate-90"
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )}

                  {/* Sub-navigation items with animation */}
                  <div className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    !collapsed && openSection === 'intelligence' 
                      ? "max-h-96 opacity-100" 
                      : "max-h-0 opacity-0"
                  )}>
                    <ul className="mt-1 space-y-1 transform transition-transform duration-300 ease-in-out">
                      {intelligenceItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-10 pr-2 text-[14px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm mx-2 pl-8 pr-2"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] pl-10 pr-2 hover:mx-2 hover:pl-8 hover:pr-2",
                              focusRing,
                            )}
                          >
                            {/* Blue indicator line */}
                            <div className={cn(
                              "absolute -left-2 top-1/2 -translate-y-1/2 w-0.5 bg-primary rounded-r-sm transition-all duration-150 ease-out",
                              isActive(item.href)
                                ? "h-full opacity-100"
                                : "h-1/2 opacity-0 group-hover:opacity-100"
                            )} />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                {/* Settings and setup accordion */}
                <li className={cn(
                  (openSection === 'settingsAndSetup' || isInSettingsAndSetup) && !collapsed
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden"
                    : "",
                  openSection === 'settingsAndSetup' && !collapsed
                    ? "pb-3"
                    : ""
                )}>
                  {collapsed ? (
                    <SidebarPopover
                      icon={<MonitorSmartphone className="size-4 shrink-0" aria-hidden="true" />}
                      title="Settings and setup"
                      items={settingsAndSetupItems}
                      isActive={isActive}
                      isInSection={isInSettingsAndSetup}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('settingsAndSetup')}
                      className={cn(
                        "flex w-full items-center gap-x-2.5 py-2 text-[14px] font-medium transition",
                        collapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'settingsAndSetup' || isInSettingsAndSetup)
                          ? "text-[#2D3338]"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'settingsAndSetup'}
                    >
                      <span className={cn("flex items-center", collapsed ? "" : "gap-x-2.5")}>
                        <MonitorSmartphone className="size-4 shrink-0" aria-hidden="true" />
                        {!collapsed && "App configuration"}
                      </span>
                      {!collapsed && (
                        <ChevronDown
                          className={cn(
                            "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                            openSection === 'settingsAndSetup' ? "rotate-0" : "-rotate-90"
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )}

                  {/* Sub-navigation items with animation */}
                  <div className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    !collapsed && openSection === 'settingsAndSetup' 
                      ? "max-h-96 opacity-100" 
                      : "max-h-0 opacity-0"
                  )}>
                    <ul className="mt-1 space-y-1 transform transition-transform duration-300 ease-in-out">
                      {settingsAndSetupItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-10 pr-2 text-[14px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm mx-2 pl-8 pr-2"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] pl-10 pr-2 hover:mx-2 hover:pl-8 hover:pr-2",
                              focusRing,
                            )}
                          >
                            {/* Blue indicator line */}
                            <div className={cn(
                              "absolute -left-2 top-1/2 -translate-y-1/2 w-0.5 bg-primary rounded-r-sm transition-all duration-150 ease-out",
                              isActive(item.href)
                                ? "h-full opacity-100"
                                : "h-1/2 opacity-0 group-hover:opacity-100"
                            )} />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </li>

            {/* Connected Apps Section */}
            {!collapsed && (
              <li className="mt-6">
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">
                    CONNECTED APPS
                  </p>
                  <div className="space-y-2">
                 <a
                   href="https://essensys.com"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center gap-x-3 rounded-md py-2 px-3 text-[13px] font-normal text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-50 transition-colors"
                 >
                   <div className="w-4 h-4 bg-indigo-600 rounded flex items-center justify-center shrink-0">
                     <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z"/>
                     </svg>
                   </div>
                   <span>Essensys</span>
                 </a>
                 <a
                   href="https://prism.com"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center gap-x-3 rounded-md py-2 px-3 text-[13px] font-normal text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-50 transition-colors"
                 >
                   <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center shrink-0">
                     <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                     </svg>
                   </div>
                   <span>Prism</span>
                 </a>
                  </div>
                </div>
              </li>
            )}

            {/* Portfolio Settings - Sticky to bottom */}
            <li className="mt-auto pt-3 pb-2 border-t border-gray-200 dark:border-gray-700">
              <Drawer open={portfolioSettingsOpen} onOpenChange={setPortfolioSettingsOpen}>
                <DrawerTrigger asChild>
                  <button
                    className={cn(
                      "group relative flex w-full items-center gap-x-3 rounded-md py-2.5 text-[14px] font-medium transition-colors duration-200 ease-out",
                      collapsed ? "px-2 justify-center" : "px-3",
                      "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8]",
                      focusRing,
                    )}
                  >
                    <Settings
                      className={cn(
                        "size-4 shrink-0",
                        "text-[#696E72] group-hover:text-gray-500 dark:group-hover:text-gray-400"
                      )}
                      aria-hidden="true"
                    />
                    {!collapsed && <span>Settings</span>}
                  </button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[95vh]">
                  <div className="flex h-full">
                    {/* Header */}
                    <div className="absolute top-4 left-6 right-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                      <div>
                        <DrawerTitle className="text-lg font-semibold text-gray-900 dark:text-gray-50">Settings</DrawerTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Edit settings</p>
                      </div>
                      <DrawerClose asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <span className="sr-only">Close</span>
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </Button>
                      </DrawerClose>
                    </div>

                    {/* Sidebar */}
                    <div className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 pt-20 pb-6">
                      <div className="px-6">
                        <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Settings</h3>
                        <div className="space-y-1">
                          <button className="w-full text-left px-3 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md">
                            General
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                            Apps
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                            Email
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 pt-20 pb-6 overflow-y-auto">
                      <div className="px-6 space-y-8">
                        {/* Company Info Section */}
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">Company info</h2>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">General information about the tenant company</p>
                          
                          <div className="space-y-6">
                            {/* Industry */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Industry</label>
                              <div className="relative">
                                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary">
                                  <option>Computer Software</option>
                                </select>
                              </div>
                            </div>

                            {/* Number of employees */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of employees</label>
                              <input 
                                type="text" 
                                placeholder="Enter number of employees"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary"
                              />
                            </div>

                            {/* Website */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Website <span className="text-red-500">*</span>
                              </label>
                              <input 
                                type="url" 
                                defaultValue="http://www.hqo.co"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary"
                              />
                            </div>

                            {/* Billing address */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Billing address <span className="text-red-500">*</span>
                              </label>
                              <textarea 
                                rows={3}
                                defaultValue="38 Chauncy St, Boston, MA 02111, USA"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary"
                              />
                            </div>

                            {/* Logo */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Logo</label>
                              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center relative">
                                <div className="flex flex-col items-center">
                                  <div className="w-16 h-16 bg-[#1a365d] rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-white font-bold text-xl">HqO</span>
                                  </div>
                                  <button className="absolute top-2 right-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                  <Button variant="outline" size="sm" className="mt-2">Upload file</Button>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Accepted file types: PNG, JPEG</p>
                            </div>
                          </div>
                        </div>

                        {/* Domains Section */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">Domains</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                            User domains that grant non-guest users access to the app. Generic domains cannot be added. View the list of generic domains in the Help Hub.
                          </p>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL domain</label>
                            <div className="flex flex-wrap gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
                              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                hqo.co
                                <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                              </span>
                              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                testlio.com
                                <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                              </span>
                              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                hqo.com
                                <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                              </span>
                              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                srv1.mail-tester.com
                                <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  )
}
