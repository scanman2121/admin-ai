"use client"
import { SidebarContext } from "@/app/(main)/layout"
import { siteConfig } from "@/app/siteConfig"
import { cn, focusRing } from "@/lib/utils"
import {
    RiArrowDownSLine,
    RiBuildingLine,
    RiDashboardLine,
    RiFolderLine,
    RiHomeLine,
    RiLineChartLine,
    RiMegaphoneLine,
    RiReceiptLine,
    RiSettings5Line
} from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { HqOLogo } from "./HqOLogo"
import { SidebarPopover } from "./SidebarPopover"

// Portfolio sub-navigation items
const portfolioItems = [
  { name: "Overview", href: siteConfig.baseLinks.portfolio.overview },
  { name: "Buildings", href: siteConfig.baseLinks.buildings },
  { name: "Spaces", href: siteConfig.baseLinks.spaces },
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
  { name: "Overview", href: siteConfig.baseLinks.experienceManager.overview },
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
  { name: "Parking", href: siteConfig.baseLinks.operations.parking },
  { name: "Energy consumption", href: siteConfig.baseLinks.operations.energyConsumption },
] as const

// Settings and setup sub-navigation items
const settingsAndSetupItems = [
  { name: "Features", href: siteConfig.baseLinks.settingsAndSetup.features },
  { name: "SSO apps", href: siteConfig.baseLinks.settingsAndSetup.ssoApps },
  { name: "Connected apps", href: siteConfig.baseLinks.settingsAndSetup.connectedApps },
  { name: "Settings", href: siteConfig.baseLinks.settingsAndSetup.settings },
  { name: "Theme", href: siteConfig.baseLinks.settingsAndSetup.theme },
] as const

// Intelligence sub-navigation items
const intelligenceItems = [
  { name: "Dashboard", href: siteConfig.baseLinks.intelligence.dashboard },
  { name: "Portfolio Benchmarks", href: siteConfig.baseLinks.intelligence.portfolioBenchmarks },
  { name: "Assessments", href: siteConfig.baseLinks.intelligence.assessments },
  { name: "About intelligence", href: siteConfig.baseLinks.intelligence.aboutIntelligence },
] as const

// Type for section IDs to ensure type safety
type SectionId = 'portfolio' | 'payments' | 'experienceManager' | 'operations' | 'settingsAndSetup' | 'intelligence';

export function Sidebar() {
  const pathname = usePathname()
  const [openSection, setOpenSection] = useState<SectionId | null>(null)
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

  const isInIntelligence = intelligenceItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  // Check if we're on the My HqO page
  const isInMyHqO = pathname === siteConfig.baseLinks.overview || pathname.startsWith(siteConfig.baseLinks.overview + "/")

  // Check if we're on the File Repository page
  const isInFileRepository = pathname === siteConfig.baseLinks.fileRepository || pathname.startsWith(siteConfig.baseLinks.fileRepository + "/")

  // Auto-expand the section that contains the current path
  useEffect(() => {
    if (isInMyHqO || isInFileRepository) {
      // Collapse all sections when My HqO or File Repository is active
      setOpenSection(null)
    } else if (isInPortfolio) {
      setOpenSection('portfolio')
    } else if (isInPayments) {
      setOpenSection('payments')
    } else if (isInExperienceManager) {
      setOpenSection('experienceManager')
    } else if (isInOperations) {
      setOpenSection('operations')
    } else if (isInSettingsAndSetup) {
      setOpenSection('settingsAndSetup')
    } else if (isInIntelligence) {
      setOpenSection('intelligence')
    }
  }, [isInMyHqO, isInFileRepository, isInPortfolio, isInPayments, isInExperienceManager, isInOperations, isInSettingsAndSetup, isInIntelligence])

  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.settings.general) {
      return pathname.startsWith("/settings")
    }
    return pathname === itemHref || pathname.startsWith(itemHref)
  }

  // Toggle section open/closed
  const toggleSection = (section: SectionId) => {
    // Don't toggle sections when sidebar is collapsed
    if (collapsed) return
    setOpenSection(openSection === section ? null : section)
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
                      "group relative flex items-center gap-x-3 rounded-md py-2 text-[13px] font-medium transition-all duration-200 ease-out",
                      collapsed ? "px-2 justify-center" : "px-3",
                      isActive(siteConfig.baseLinks.overview)
                        ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary shadow-sm"
                        : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8]",
                      focusRing,
                    )}
                  >
                    {/* Blue indicator line */}
                    <div className={cn(
                      "absolute right-0 top-1/2 -translate-y-1/2 w-1 bg-primary rounded-l-sm transition-all duration-300 ease-out",
                      isActive(siteConfig.baseLinks.overview)
                        ? "h-full opacity-100"
                        : "h-1/2 opacity-0 group-hover:opacity-100"
                    )} />
                    <RiHomeLine
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
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden pb-1"
                    : ""
                )}>
                  {collapsed ? (
                    <SidebarPopover
                      icon={<RiBuildingLine className="size-4 shrink-0" aria-hidden="true" />}
                      title="Portfolio"
                      items={portfolioItems}
                      isActive={isActive}
                      isInSection={isInPortfolio}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('portfolio')}
                      className={cn(
                        "flex w-full items-center gap-x-2.5 py-2 text-[13px] font-medium transition",
                        collapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'portfolio' || isInPortfolio)
                          ? "text-[#2D3338]"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'portfolio'}
                    >
                      <span className={cn("flex items-center", collapsed ? "" : "gap-x-2.5")}>
                        <RiBuildingLine className="size-4 shrink-0" aria-hidden="true" />
                        {!collapsed && "Portfolio"}
                      </span>
                      {!collapsed && (
                        <RiArrowDownSLine
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
                  {!collapsed && openSection === 'portfolio' && (
                    <ul className="mt-1 space-y-1">
                      {portfolioItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-10 pr-2 text-[13px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm mx-2 pl-8 pr-2"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] pl-10 pr-2 hover:mx-2 hover:pl-8 hover:pr-2",
                              focusRing,
                            )}
                          >
                            {/* Blue indicator line */}
                            <div className={cn(
                              "absolute right-0 top-1/2 -translate-y-1/2 w-1 bg-primary rounded-l-sm transition-all duration-300 ease-out",
                              isActive(item.href)
                                ? "h-full opacity-100"
                                : "h-1/2 opacity-0 group-hover:opacity-100"
                            )} />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* Experience Manager accordion */}
                <li className={cn(
                  (openSection === 'experienceManager' || isInExperienceManager) && !collapsed
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden pb-1"
                    : ""
                )}>
                  {collapsed ? (
                    <SidebarPopover
                      icon={<RiMegaphoneLine className="size-4 shrink-0" aria-hidden="true" />}
                      title="Experience manager"
                      items={experienceManagerItems}
                      isActive={isActive}
                      isInSection={isInExperienceManager}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('experienceManager')}
                      className={cn(
                        "flex w-full items-center gap-x-2.5 py-2 text-[13px] font-medium transition",
                        collapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'experienceManager' || isInExperienceManager)
                          ? "text-[#2D3338]"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'experienceManager'}
                    >
                      <span className={cn("flex items-center", collapsed ? "" : "gap-x-2.5")}>
                        <RiMegaphoneLine className="size-4 shrink-0" aria-hidden="true" />
                        {!collapsed && "Experience manager"}
                      </span>
                      {!collapsed && (
                        <RiArrowDownSLine
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
                  {!collapsed && openSection === 'experienceManager' && (
                    <ul className="mt-1 space-y-1">
                      {experienceManagerItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-10 pr-2 text-[13px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm mx-2 pl-8 pr-2"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] pl-10 pr-2 hover:mx-2 hover:pl-8 hover:pr-2",
                              focusRing,
                            )}
                          >
                            {/* Blue indicator line */}
                            <div className={cn(
                              "absolute right-0 top-1/2 -translate-y-1/2 w-1 bg-primary rounded-l-sm transition-all duration-300 ease-out",
                              isActive(item.href)
                                ? "h-full opacity-100"
                                : "h-1/2 opacity-0 group-hover:opacity-100"
                            )} />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* Operations accordion */}
                <li className={cn(
                  (openSection === 'operations' || isInOperations) && !collapsed
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden pb-1"
                    : ""
                )}>
                  {collapsed ? (
                    <SidebarPopover
                      icon={<RiDashboardLine className="size-4 shrink-0" aria-hidden="true" />}
                      title="Operations"
                      items={operationsItems}
                      isActive={isActive}
                      isInSection={isInOperations}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('operations')}
                      className={cn(
                        "flex w-full items-center gap-x-2.5 py-2 text-[13px] font-medium transition",
                        collapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'operations' || isInOperations)
                          ? "text-[#2D3338]"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'operations'}
                    >
                      <span className={cn("flex items-center", collapsed ? "" : "gap-x-2.5")}>
                        <RiDashboardLine className="size-4 shrink-0" aria-hidden="true" />
                        {!collapsed && "Operations"}
                      </span>
                      {!collapsed && (
                        <RiArrowDownSLine
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
                  {!collapsed && openSection === 'operations' && (
                    <ul className="mt-1 space-y-1">
                      {operationsItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-10 pr-2 text-[13px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm mx-2 pl-8 pr-2"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] pl-10 pr-2 hover:mx-2 hover:pl-8 hover:pr-2",
                              focusRing,
                            )}
                          >
                            {/* Blue indicator line */}
                            <div className={cn(
                              "absolute right-0 top-1/2 -translate-y-1/2 w-1 bg-primary rounded-l-sm transition-all duration-300 ease-out",
                              isActive(item.href)
                                ? "h-full opacity-100"
                                : "h-1/2 opacity-0 group-hover:opacity-100"
                            )} />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* Payments accordion */}
                <li className={cn(
                  (openSection === 'payments' || isInPayments) && !collapsed
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden pb-1"
                    : ""
                )}>
                  {collapsed ? (
                    <SidebarPopover
                      icon={<RiReceiptLine className="size-4 shrink-0" aria-hidden="true" />}
                      title="Payments"
                      items={paymentsItems}
                      isActive={isActive}
                      isInSection={isInPayments}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('payments')}
                      className={cn(
                        "flex w-full items-center gap-x-2.5 py-2 text-[13px] font-medium transition",
                        collapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'payments' || isInPayments)
                          ? "text-[#2D3338]"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'payments'}
                    >
                      <span className={cn("flex items-center", collapsed ? "" : "gap-x-2.5")}>
                        <RiReceiptLine className="size-4 shrink-0" aria-hidden="true" />
                        {!collapsed && "Payments"}
                      </span>
                      {!collapsed && (
                        <RiArrowDownSLine
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
                  {!collapsed && openSection === 'payments' && (
                    <ul className="mt-1 space-y-1">
                      {paymentsItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-10 pr-2 text-[13px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm mx-2 pl-8 pr-2"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] pl-10 pr-2 hover:mx-2 hover:pl-8 hover:pr-2",
                              focusRing,
                            )}
                          >
                            {/* Blue indicator line */}
                            <div className={cn(
                              "absolute right-0 top-1/2 -translate-y-1/2 w-1 bg-primary rounded-l-sm transition-all duration-300 ease-out",
                              isActive(item.href)
                                ? "h-full opacity-100"
                                : "h-1/2 opacity-0 group-hover:opacity-100"
                            )} />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* File Repository */}
                <li>
                  <Link
                    href={siteConfig.baseLinks.fileRepository}
                    className={cn(
                      "group relative flex items-center gap-x-3 rounded-md py-2 text-[13px] font-medium transition-all duration-200 ease-out",
                      collapsed ? "px-2 justify-center" : "px-3",
                      isActive(siteConfig.baseLinks.fileRepository)
                        ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary shadow-sm"
                        : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8]",
                      focusRing,
                    )}
                  >
                    {/* Blue indicator line */}
                    <div className={cn(
                      "absolute right-0 top-1/2 -translate-y-1/2 w-1 bg-primary rounded-l-sm transition-all duration-300 ease-out",
                      isActive(siteConfig.baseLinks.fileRepository)
                        ? "h-full opacity-100"
                        : "h-1/2 opacity-0 group-hover:opacity-100"
                    )} />
                    <RiFolderLine
                      className={cn(
                        "size-4 shrink-0",
                        isActive(siteConfig.baseLinks.fileRepository)
                          ? "text-primary dark:text-primary"
                          : "text-[#696E72] group-hover:text-gray-500 dark:group-hover:text-gray-400",
                      )}
                      aria-hidden="true"
                    />
                    {!collapsed && <span>File repository</span>}
                  </Link>
                </li>

                {/* Intelligence accordion */}
                <li className={cn(
                  (openSection === 'intelligence' || isInIntelligence) && !collapsed
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden pb-1"
                    : ""
                )}>
                  {collapsed ? (
                    <SidebarPopover
                      icon={<RiLineChartLine className="size-4 shrink-0" aria-hidden="true" />}
                      title="Intelligence"
                      items={intelligenceItems}
                      isActive={isActive}
                      isInSection={isInIntelligence}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('intelligence')}
                      className={cn(
                        "flex w-full items-center gap-x-2.5 py-2 text-[13px] font-medium transition",
                        collapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'intelligence' || isInIntelligence)
                          ? "text-[#2D3338]"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'intelligence'}
                    >
                      <span className={cn("flex items-center", collapsed ? "" : "gap-x-2.5")}>
                        <RiLineChartLine className="size-4 shrink-0" aria-hidden="true" />
                        {!collapsed && "Intelligence"}
                      </span>
                      {!collapsed && (
                        <RiArrowDownSLine
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
                  {!collapsed && openSection === 'intelligence' && (
                    <ul className="mt-1 space-y-1">
                      {intelligenceItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-10 pr-2 text-[13px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm mx-2 pl-8 pr-2"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] pl-10 pr-2 hover:mx-2 hover:pl-8 hover:pr-2",
                              focusRing,
                            )}
                          >
                            {/* Blue indicator line */}
                            <div className={cn(
                              "absolute right-0 top-1/2 -translate-y-1/2 w-1 bg-primary rounded-l-sm transition-all duration-300 ease-out",
                              isActive(item.href)
                                ? "h-full opacity-100"
                                : "h-1/2 opacity-0 group-hover:opacity-100"
                            )} />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* Settings and setup accordion */}
                <li className={cn(
                  (openSection === 'settingsAndSetup' || isInSettingsAndSetup) && !collapsed
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden pb-1"
                    : ""
                )}>
                  {collapsed ? (
                    <SidebarPopover
                      icon={<RiSettings5Line className="size-4 shrink-0" aria-hidden="true" />}
                      title="Settings and setup"
                      items={settingsAndSetupItems}
                      isActive={isActive}
                      isInSection={isInSettingsAndSetup}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('settingsAndSetup')}
                      className={cn(
                        "flex w-full items-center gap-x-2.5 py-2 text-[13px] font-medium transition",
                        collapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'settingsAndSetup' || isInSettingsAndSetup)
                          ? "text-[#2D3338]"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'settingsAndSetup'}
                    >
                      <span className={cn("flex items-center", collapsed ? "" : "gap-x-2.5")}>
                        <RiSettings5Line className="size-4 shrink-0" aria-hidden="true" />
                        {!collapsed && "Settings and setup"}
                      </span>
                      {!collapsed && (
                        <RiArrowDownSLine
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
                  {!collapsed && openSection === 'settingsAndSetup' && (
                    <ul className="mt-1 space-y-1">
                      {settingsAndSetupItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-10 pr-2 text-[13px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm mx-2 pl-8 pr-2"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] pl-10 pr-2 hover:mx-2 hover:pl-8 hover:pr-2",
                              focusRing,
                            )}
                          >
                            {/* Blue indicator line */}
                            <div className={cn(
                              "absolute right-0 top-1/2 -translate-y-1/2 w-1 bg-primary rounded-l-sm transition-all duration-300 ease-out",
                              isActive(item.href)
                                ? "h-full opacity-100"
                                : "h-1/2 opacity-0 group-hover:opacity-100"
                            )} />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </li>

            {/* Space for future bottom content */}
            <li className="mt-auto">
              {/* User profile moved to header */}
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  )
}
