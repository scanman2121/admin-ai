"use client"

import { siteConfig } from "@/app/siteConfig"
import { Button } from "@/components/Button"
import {
    Drawer,
    DrawerBody,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger
} from "@/components/Drawer"
import { cn, focusRing } from "@/lib/utils"
import {
    Building,
    ChevronDown,
    ChevronRight,
    Folder,
    HandCoins,
    Home,
    LayoutDashboard,
    LineChart,
    Megaphone,
    Menu,
    MonitorSmartphone,
    Settings
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { HqOLogo } from "./HqOLogo"

// Main navigation items excluding the ones that will go into the Portfolio section
const navigation = [
  { name: "My HqO", href: siteConfig.baseLinks.overview, icon: Home },
] as const

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

export default function MobileSidebar() {
  const pathname = usePathname()
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false)
  const [isExperienceManagerOpen, setIsExperienceManagerOpen] = useState(false)
  const [isOperationsOpen, setIsOperationsOpen] = useState(false)
  const [isIntelligenceOpen, setIsIntelligenceOpen] = useState(false)
  const [isFilesOpen, setIsFilesOpen] = useState(false)
  const [isSettingsAndSetupOpen, setIsSettingsAndSetupOpen] = useState(false)
  const [showPortfolioSettings, setShowPortfolioSettings] = useState(false)

  // Check if current path is in Portfolio section
  const isInPortfolio = portfolioItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  // Check if current path is in Payments section
  const isInPayments = paymentsItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  // Check if current path is in Experience Manager section
  const isInExperienceManager = experienceManagerItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  // Check if current path is in Operations section
  const isInOperations = operationsItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  // Check if current path is in Files section
  const isInFiles = filesItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  // Check if current path is in Intelligence section
  const isInIntelligence = intelligenceItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  // Check if current path is in Settings and Setup section
  const isInSettingsAndSetup = settingsAndSetupItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  // Check if we're on the My HqO page
  const isInMyHqO = pathname === siteConfig.baseLinks.overview || pathname.startsWith(siteConfig.baseLinks.overview + "/")

  // Auto-expand the section that contains the current path
  useEffect(() => {
    if (isInMyHqO) {
      // Collapse all sections when My HqO is active
      setIsPortfolioOpen(false)
      setIsPaymentsOpen(false)
      setIsExperienceManagerOpen(false)
      setIsOperationsOpen(false)
      setIsFilesOpen(false)
      setIsIntelligenceOpen(false)
      setIsSettingsAndSetupOpen(false)
    } else {
      if (isInPortfolio) {
        setIsPortfolioOpen(true)
      }
      if (isInPayments) {
        setIsPaymentsOpen(true)
      }
      if (isInExperienceManager) {
        setIsExperienceManagerOpen(true)
      }
      if (isInOperations) {
        setIsOperationsOpen(true)
      }
      if (isInFiles) {
        setIsFilesOpen(true)
      }
      if (isInIntelligence) {
        setIsIntelligenceOpen(true)
      }
      if (isInSettingsAndSetup) {
        setIsSettingsAndSetupOpen(true)
      }
    }
  }, [isInMyHqO, isInPortfolio, isInPayments, isInExperienceManager, isInOperations, isInFiles, isInIntelligence, isInSettingsAndSetup])

  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.settings.general) {
      return pathname.startsWith("/settings")
    }
    return pathname === itemHref || pathname.startsWith(itemHref)
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          aria-label="open sidebar"
          className="group flex items-center rounded-md p-2 text-sm font-medium hover:bg-gray-100 data-[state=open]:bg-gray-100 data-[state=open]:bg-gray-400/10 hover:dark:bg-gray-400/10"
        >
          <Menu
            className="size-6 shrink-0 sm:size-5"
            aria-hidden="true"
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="sm:max-w-lg">
        <DrawerHeader>
          <div className="flex items-center px-2">
            <HqOLogo className="h-6 w-auto" />
          </div>
        </DrawerHeader>
        <DrawerBody>
          <nav
            aria-label="core mobile navigation links"
            className="flex flex-1 flex-col space-y-10"
          >
            <ul role="list" className="space-y-1.5">
              {/* Regular navigation items */}
              {navigation.map((item) => (
                <li key={item.name}>
                  <DrawerClose asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        isActive(item.href)
                          ? "text-primary dark:text-primary"
                          : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                        "group relative flex items-center gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition-all duration-200 ease-out hover:bg-gray-100 hover:dark:bg-gray-900",
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
                      <item.icon
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </DrawerClose>
                </li>
              ))}

              {/* Portfolio accordion */}
              <li className={cn(
                (isPortfolioOpen || isInPortfolio) ? "bg-[#F6F7F8] rounded-md overflow-hidden" : "",
                isPortfolioOpen ? "pb-3" : ""
              )}>
                <button
                  onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
                  className={cn(
                    "flex w-full items-center justify-between gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                    isInPortfolio
                      ? "text-[#2D3338]"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                    focusRing,
                  )}
                  aria-expanded={isPortfolioOpen}
                >
                  <span className="flex items-center gap-x-2.5">
                    <Building className="size-4 shrink-0" aria-hidden="true" />
                    Portfolio
                  </span>
                  {isPortfolioOpen ? (
                    <ChevronDown className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  )}
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isPortfolioOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="mt-1 space-y-0.5 px-1">
                    {portfolioItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm mx-2 pl-8 pr-2"
                                : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              "group relative flex items-center rounded-md px-1.5 py-1.5 text-sm font-medium transition-all duration-200 ease-out w-full",
                              focusRing,
                            )}
                          >
                            {/* Blue indicator line */}
                            <div className={cn(
                              "absolute -left-1 top-1/2 -translate-y-1/2 w-0.5 bg-primary rounded-r-sm transition-all duration-150 ease-out",
                              isActive(item.href)
                                ? "h-full opacity-100"
                                : "h-1/2 opacity-0 group-hover:opacity-100"
                            )} />
                            {item.name}
                          </Link>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Payments accordion */}
              <li className={cn(
                (isPaymentsOpen || isInPayments) ? "bg-[#F6F7F8] rounded-md overflow-hidden" : "",
                isPaymentsOpen ? "pb-3" : ""
              )}>
                <button
                  onClick={() => setIsPaymentsOpen(!isPaymentsOpen)}
                  className={cn(
                    "flex w-full items-center justify-between gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                    isInPayments
                      ? "text-[#2D3338]"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                    focusRing,
                  )}
                  aria-expanded={isPaymentsOpen}
                >
                  <span className="flex items-center gap-x-2.5">
                    <HandCoins className="size-4 shrink-0" aria-hidden="true" />
                    Payments
                  </span>
                  {isPaymentsOpen ? (
                    <ChevronDown className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  )}
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isPaymentsOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="mt-1 space-y-0.5 px-1">
                    {paymentsItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm mx-2 pl-8 pr-2"
                                : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              "group relative flex items-center rounded-md px-1.5 py-1.5 text-sm font-medium transition-all duration-200 ease-out w-full",
                              focusRing,
                            )}
                          >
                            {/* Blue indicator line */}
                            <div className={cn(
                              "absolute -left-1 top-1/2 -translate-y-1/2 w-0.5 bg-primary rounded-r-sm transition-all duration-150 ease-out",
                              isActive(item.href)
                                ? "h-full opacity-100"
                                : "h-1/2 opacity-0 group-hover:opacity-100"
                            )} />
                            {item.name}
                          </Link>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Files accordion */}
              <li className={cn(
                (isFilesOpen || isInFiles) ? "bg-[#F6F7F8] rounded-md overflow-hidden" : "",
                isFilesOpen ? "pb-3" : ""
              )}>
                <button
                  onClick={() => setIsFilesOpen(!isFilesOpen)}
                  className={cn(
                    "flex w-full items-center justify-between gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                    isInFiles
                      ? "text-[#2D3338]"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                    focusRing,
                  )}
                  aria-expanded={isFilesOpen}
                >
                  <span className="flex items-center gap-x-2.5">
                    <Folder className="size-4 shrink-0" aria-hidden="true" />
                    Files
                  </span>
                  {isFilesOpen ? (
                    <ChevronDown className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  )}
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isFilesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="mt-1 space-y-1">
                    {filesItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex w-full items-center gap-x-2.5 rounded-md py-1.5 pl-8 pr-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm"
                                : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                              focusRing,
                            )}
                          >
                            <ChevronRight className="size-4" />
                            <span>{item.name}</span>
                          </Link>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Experience Manager accordion */}
              <li className={cn(
                (isExperienceManagerOpen || isInExperienceManager) ? "bg-[#F6F7F8] rounded-md overflow-hidden" : "",
                isExperienceManagerOpen ? "pb-3" : ""
              )}>
                <button
                  onClick={() => setIsExperienceManagerOpen(!isExperienceManagerOpen)}
                  className={cn(
                    "flex w-full items-center justify-between gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                    isInExperienceManager
                      ? "text-[#2D3338]"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                    focusRing,
                  )}
                  aria-expanded={isExperienceManagerOpen}
                >
                  <span className="flex items-center gap-x-2.5">
                    <Megaphone className="size-4 shrink-0" aria-hidden="true" />
                    Experience
                  </span>
                  {isExperienceManagerOpen ? (
                    <ChevronDown className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  )}
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isExperienceManagerOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="mt-1 space-y-0.5 px-1">
                    {experienceManagerItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm mx-2 pl-8 pr-2"
                                : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              "group relative flex items-center rounded-md px-1.5 py-1.5 text-sm font-medium transition-all duration-200 ease-out w-full",
                              focusRing,
                            )}
                          >
                            {/* Blue indicator line */}
                            <div className={cn(
                              "absolute -left-1 top-1/2 -translate-y-1/2 w-0.5 bg-primary rounded-r-sm transition-all duration-150 ease-out",
                              isActive(item.href)
                                ? "h-full opacity-100"
                                : "h-1/2 opacity-0 group-hover:opacity-100"
                            )} />
                            {item.name}
                          </Link>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Operations accordion */}
              <li className={cn(
                (isOperationsOpen || isInOperations) ? "bg-[#F6F7F8] rounded-md overflow-hidden" : "",
                isOperationsOpen ? "pb-3" : ""
              )}>
                <button
                  onClick={() => setIsOperationsOpen(!isOperationsOpen)}
                  className={cn(
                    "flex w-full items-center justify-between gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                    isInOperations
                      ? "text-[#2D3338]"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                    focusRing,
                  )}
                  aria-expanded={isOperationsOpen}
                >
                  <span className="flex items-center gap-x-2.5">
                    <LayoutDashboard className="size-4 shrink-0" aria-hidden="true" />
                    Operations
                  </span>
                  {isOperationsOpen ? (
                    <ChevronDown className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  )}
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOperationsOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="mt-1 space-y-0.5 px-1">
                    {operationsItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm mx-2 pl-8 pr-2"
                                : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              "group relative flex items-center rounded-md px-1.5 py-1.5 text-sm font-medium transition-all duration-200 ease-out w-full",
                              focusRing,
                            )}
                          >
                            {/* Blue indicator line */}
                            <div className={cn(
                              "absolute -left-1 top-1/2 -translate-y-1/2 w-0.5 bg-primary rounded-r-sm transition-all duration-150 ease-out",
                              isActive(item.href)
                                ? "h-full opacity-100"
                                : "h-1/2 opacity-0 group-hover:opacity-100"
                            )} />
                            {item.name}
                          </Link>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Intelligence accordion */}
              <li className={cn(
                (isIntelligenceOpen || isInIntelligence) ? "bg-[#F6F7F8] rounded-md overflow-hidden" : "",
                isIntelligenceOpen ? "pb-3" : ""
              )}>
                <button
                  onClick={() => setIsIntelligenceOpen(!isIntelligenceOpen)}
                  className={cn(
                    "flex w-full items-center justify-between gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                    isInIntelligence
                      ? "text-[#2D3338]"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                    focusRing,
                  )}
                  aria-expanded={isIntelligenceOpen}
                >
                  <span className="flex items-center gap-x-2.5">
                    <LineChart className="size-4 shrink-0" aria-hidden="true" />
                    Intelligence
                  </span>
                  {isIntelligenceOpen ? (
                    <ChevronDown className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  )}
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isIntelligenceOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="mt-1 space-y-0.5 px-1">
                    {intelligenceItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm mx-2 pl-8 pr-2"
                                : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              "group relative flex items-center rounded-md px-1.5 py-1.5 text-sm font-medium transition-all duration-200 ease-out w-full",
                              focusRing,
                            )}
                          >
                            {/* Blue indicator line */}
                            <div className={cn(
                              "absolute -left-1 top-1/2 -translate-y-1/2 w-0.5 bg-primary rounded-r-sm transition-all duration-150 ease-out",
                              isActive(item.href)
                                ? "h-full opacity-100"
                                : "h-1/2 opacity-0 group-hover:opacity-100"
                            )} />
                            {item.name}
                          </Link>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Settings & Setup accordion */}
              <li className={cn(
                (isSettingsAndSetupOpen || isInSettingsAndSetup) ? "bg-[#F6F7F8] rounded-md overflow-hidden" : "",
                isSettingsAndSetupOpen ? "pb-3" : ""
              )}>
                <button
                  onClick={() => setIsSettingsAndSetupOpen(!isSettingsAndSetupOpen)}
                  className={cn(
                    "flex w-full items-center justify-between gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                    isInSettingsAndSetup
                      ? "text-[#2D3338]"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                    focusRing,
                  )}
                  aria-expanded={isSettingsAndSetupOpen}
                >
                  <span className="flex items-center gap-x-2.5">
                    <MonitorSmartphone className="size-4 shrink-0" aria-hidden="true" />
                    App configuration
                  </span>
                  {isSettingsAndSetupOpen ? (
                    <ChevronDown className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  )}
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isSettingsAndSetupOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="mt-1 space-y-0.5 px-1">
                    {settingsAndSetupItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm mx-2 pl-8 pr-2"
                                : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              "group relative flex items-center rounded-md px-1.5 py-1.5 text-sm font-medium transition-all duration-200 ease-out w-full",
                              focusRing,
                            )}
                          >
                            {/* Blue indicator line */}
                            <div className={cn(
                              "absolute -left-1 top-1/2 -translate-y-1/2 w-0.5 bg-primary rounded-r-sm transition-all duration-150 ease-out",
                              isActive(item.href)
                                ? "h-full opacity-100"
                                : "h-1/2 opacity-0 group-hover:opacity-100"
                            )} />
                            {item.name}
                          </Link>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Portfolio Settings */}
              <li className="mt-auto pt-3 pb-2 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowPortfolioSettings(!showPortfolioSettings)}
                  className={cn(
                    "group relative flex w-full items-center gap-x-2.5 rounded-md px-1.5 py-2.5 text-sm font-medium transition-colors duration-200 ease-out hover:bg-gray-100 hover:dark:bg-gray-900",
                    "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                    focusRing,
                  )}
                >
                  <Settings
                    className="size-4 shrink-0"
                    aria-hidden="true"
                  />
                  Settings
                </button>

                {/* Portfolio Settings Content */}
                {showPortfolioSettings && (
                  <div className="mt-2 space-y-3 px-2">
                    <div className="space-y-3">
                      <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">General settings</h4>
                      <div className="space-y-2">
                        <button className="flex w-full items-center justify-between text-left text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50">
                          <span>Portfolio name</span>
                          <ChevronRight className="size-4" />
                        </button>
                        <button className="flex w-full items-center justify-between text-left text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50">
                          <span>Default currency</span>
                          <ChevronRight className="size-4" />
                        </button>
                        <button className="flex w-full items-center justify-between text-left text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50">
                          <span>Time zone</span>
                          <ChevronRight className="size-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Integrations</h4>
                      <div className="space-y-2">
                        <button className="flex w-full items-center justify-between text-left text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50">
                          <span>API access</span>
                          <ChevronRight className="size-4" />
                        </button>
                        <button className="flex w-full items-center justify-between text-left text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50">
                          <span>Webhooks</span>
                          <ChevronRight className="size-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Security</h4>
                      <div className="space-y-2">
                        <button className="flex w-full items-center justify-between text-left text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50">
                          <span>User permissions</span>
                          <ChevronRight className="size-4" />
                        </button>
                        <button className="flex w-full items-center justify-between text-left text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50">
                          <span>Audit logs</span>
                          <ChevronRight className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              {/* Connected Apps Section */}
              <li className="mt-6 px-4">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  CONNECTED APPS
                </p>
                <div className="space-y-2">
             <a
               href="https://essensys.com"
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center gap-x-3 rounded-md py-2 px-3 text-[13px] font-normal text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-50 transition-colors"
             >
               <div className="w-4 h-4 bg-indigo-600 rounded flex items-center justify-center flex-shrink-0">
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
               <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center flex-shrink-0">
                 <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                 </svg>
               </div>
               <span>Prism</span>
             </a>
                </div>
              </li>
            </ul>
          </nav>
          {/* User profile moved to header */}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
