"use client"
import { SidebarContext } from "@/app/(main)/layout"
import { siteConfig } from "@/app/siteConfig"
import { Badge } from "@/components/Badge"
import { Button as ButtonComponent } from "@/components/Button"
import { Card } from "@/components/Card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/Dialog"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { Switch } from "@/components/Switch"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/Table"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { QuickReplyTemplatesSettings } from "@/components/ui/settings/CannedResponsesSettings"
import { TagsSettings } from "@/components/ui/settings/TagsSettings"
import { buildings } from "@/data/data"
import { cn, focusRing } from "@/lib/utils"
import { RiCloseLine, RiMore2Line } from "@remixicon/react"
import {
    Building,
    Check,
    ChevronDown,
    ChevronsUpDown,
    ExternalLink,
    FolderOpen,
    HandCoins,
    Home,
    LayoutDashboard,
    LineChart,
    Megaphone,
    MonitorSmartphone,
    Settings
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { Mention, MentionsInput } from "react-mentions"
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

// Commerce sub-navigation items
const commerceItems = [
  { name: "Transactions", href: siteConfig.baseLinks.transactions },
  { name: "Credits", href: siteConfig.baseLinks.credits },
  { name: "Discounts", href: siteConfig.baseLinks.discounts },
] as const

// Experience Manager sub-navigation items
const experienceManagerItems = [
  { name: "Content", href: siteConfig.baseLinks.experienceManager.content },
  { name: "Events", href: siteConfig.baseLinks.experienceManager.events },
  { name: "Surveys", href: siteConfig.baseLinks.experienceManager.surveys },
  { name: "Communications", href: siteConfig.baseLinks.experienceManager.communications },
] as const

// Operations sub-navigation items
const operationsItems = [
  { name: "Access control", href: siteConfig.baseLinks.operations.accessControl },
  { name: "Visitor management", href: siteConfig.baseLinks.operations.visitorManagement },
  { name: "Resource booking", href: siteConfig.baseLinks.operations.resourceBooking },
  { name: "Service requests", href: siteConfig.baseLinks.operations.serviceRequests },
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
type SectionId = 'portfolio' | 'commerce' | 'experienceManager' | 'operations' | 'files' | 'settingsAndSetup' | 'intelligence';

export function Sidebar() {
  const pathname = usePathname()
  const [openSection, setOpenSection] = useState<SectionId | null>(null)
  const [portfolioSettingsOpen, setPortfolioSettingsOpen] = useState(false)
  const { collapsed } = useContext(SidebarContext)
  const sidebarRef = useRef<HTMLElement>(null)
  const [announcement, setAnnouncement] = useState<string>("")
  const [settingsTab, setSettingsTab] = useState<'general' | 'apps' | 'email' | 'feedback' | 'tags' | 'quick-reply-templates' | 'connected-accounts'>('general')

  // Check if current path is in each section
  const isInPortfolio = portfolioItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  const isInPayments = commerceItems.some(item =>
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
      setOpenSection('commerce')
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

  // Keyboard navigation handler
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (collapsed) return // Skip keyboard navigation when sidebar is collapsed

    const allFocusableElements = sidebarRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>

    if (!allFocusableElements || allFocusableElements.length === 0) return

    // Filter out elements that are in collapsed sections (not visible)
    const focusableElements = Array.from(allFocusableElements).filter(element => {
      // Check if element is in a collapsed submenu
      const submenuContainer = element.closest('[aria-hidden="true"]')
      if (submenuContainer) return false

      // Check if element is actually visible (not in a collapsed section)
      const rect = element.getBoundingClientRect()
      return rect.height > 0 && rect.width > 0
    })

    if (focusableElements.length === 0) return

    const currentIndex = focusableElements.findIndex(
      (element) => element === document.activeElement
    )

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        const nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0
        focusableElements[nextIndex]?.focus()
        break

      case 'ArrowUp':
        event.preventDefault()
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1
        focusableElements[prevIndex]?.focus()
        break

      case 'Home':
        event.preventDefault()
        focusableElements[0]?.focus()
        break

      case 'End':
        event.preventDefault()
        const lastIndex = focusableElements.length - 1
        focusableElements[lastIndex]?.focus()
        break

      case 'Enter':
      case ' ':
        if (document.activeElement?.tagName === 'BUTTON') {
          event.preventDefault()
          ;(document.activeElement as HTMLButtonElement)?.click()
        }
        break
    }
  }, [collapsed])

  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.settings.general) {
      return pathname.startsWith("/settings")
    }
    return pathname === itemHref || pathname.startsWith(itemHref)
  }

  // Toggle section open/closed with smooth transitions and focus management
  const toggleSection = useCallback((section: SectionId) => {
    // Don't toggle sections when sidebar is collapsed
    if (collapsed) return
    
    // Announce section state changes to screen readers
    const announceChange = (sectionName: string, isExpanding: boolean) => {
      const action = isExpanding ? "expanded" : "collapsed"
      setAnnouncement(`${sectionName} section ${action}`)
      // Clear announcement after a short delay
      setTimeout(() => setAnnouncement(""), 1000)
    }

    // Get section display name
    const getSectionName = (sectionId: SectionId): string => {
      const names = {
        portfolio: "Portfolio",
        commerce: "Commerce", 
        experienceManager: "Experience Manager",
        operations: "Operations",
        files: "Files",
        settingsAndSetup: "App Configuration",
        intelligence: "Intelligence"
      }
      return names[sectionId]
    }
    
    // If clicking the same section, just close it
    if (openSection === section) {
      setOpenSection(null)
      announceChange(getSectionName(section), false)
      return
    }
    
    // If switching to a different section, close current first, then open new one
    if (openSection && openSection !== section) {
      setOpenSection(null)
      announceChange(getSectionName(openSection), false)
      // Small delay to allow close animation to start before opening new section
      setTimeout(() => {
        setOpenSection(section)
        announceChange(getSectionName(section), true)
        // Focus management: when a section opens, focus stays on the button
        // The user can then use arrow keys to navigate to the sub-items
      }, 150) // Half the animation duration for smooth transition
    } else {
      // No section currently open, just open the new one
      setOpenSection(section)
      announceChange(getSectionName(section), true)
    }
  }, [collapsed, openSection])

  return (
    <nav 
      ref={sidebarRef}
      className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:flex-col"
      onKeyDown={handleKeyDown}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Screen reader announcements for section state changes */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        role="status"
      >
        {announcement}
      </div>
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
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden pt-0.5"
                    : "",
                  openSection === 'portfolio' && !collapsed
                    ? "pb-1"
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
                      aria-controls="portfolio-submenu"
                      id="portfolio-button"
                      role="button"
                      tabIndex={0}
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
                  <div 
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      !collapsed && openSection === 'portfolio' 
                        ? "max-h-96 opacity-100" 
                        : "max-h-0 opacity-0"
                    )}
                    id="portfolio-submenu"
                    role="region"
                    aria-labelledby="portfolio-button"
                    aria-hidden={!(openSection === 'portfolio' && !collapsed)}
                  >
                    <ul 
                      className="mt-1 space-y-1 px-2 pb-2 transform transition-transform duration-300 ease-in-out"
                      role="group"
                      aria-label="Portfolio navigation"
                    >
                      {portfolioItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-8 pr-2 text-[14px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8]",
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
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden pt-0.5"
                    : "",
                  openSection === 'experienceManager' && !collapsed
                    ? "pb-1"
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
                    <ul className="mt-1 space-y-1 px-2 pb-2 transform transition-transform duration-300 ease-in-out">
                      {experienceManagerItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-8 pr-2 text-[14px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8]",
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
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden pt-0.5"
                    : "",
                  openSection === 'operations' && !collapsed
                    ? "pb-1"
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
                    <ul className="mt-1 space-y-1 px-2 pb-2 transform transition-transform duration-300 ease-in-out">
                      {operationsItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-8 pr-2 text-[14px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8]",
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

                {/* Commerce accordion */}
                <li className={cn(
                  (openSection === 'commerce' || isInPayments) && !collapsed
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden pt-0.5"
                    : "",
                  openSection === 'commerce' && !collapsed
                    ? "pb-1"
                    : ""
                )}>
                  {collapsed ? (
                    <SidebarPopover
                      icon={<HandCoins className="size-4 shrink-0" aria-hidden="true" />}
                      title="Commerce"
                      items={commerceItems}
                      isActive={isActive}
                      isInSection={isInPayments}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('commerce')}
                      className={cn(
                        "flex w-full items-center gap-x-2.5 py-2 text-[14px] font-medium transition",
                        collapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'commerce' || isInPayments)
                          ? "text-[#2D3338]"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8] rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'commerce'}
                    >
                      <span className={cn("flex items-center", collapsed ? "" : "gap-x-2.5")}>
                        <HandCoins className="size-4 shrink-0" aria-hidden="true" />
                        {!collapsed && "Commerce"}
                      </span>
                      {!collapsed && (
                        <ChevronDown
                          className={cn(
                            "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                            openSection === 'commerce' ? "rotate-0" : "-rotate-90"
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )}

                  {/* Sub-navigation items with animation */}
                  <div className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    !collapsed && openSection === 'commerce' 
                      ? "max-h-96 opacity-100" 
                      : "max-h-0 opacity-0"
                  )}>
                    <ul className="mt-1 space-y-1 px-2 pb-2 transform transition-transform duration-300 ease-in-out">
                      {commerceItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-8 pr-2 text-[14px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8]",
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
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden pt-0.5"
                    : "",
                  openSection === 'files' && !collapsed
                    ? "pb-1"
                    : ""
                )}>
                  {collapsed ? (
                    <SidebarPopover
                      icon={<FolderOpen className="size-4 shrink-0" aria-hidden="true" />}
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
                        <FolderOpen className="size-4 shrink-0" aria-hidden="true" />
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
                    <ul className="mt-1 space-y-1 px-2 pb-2 transform transition-transform duration-300 ease-in-out">
                      {filesItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-8 pr-2 text-[14px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8]",
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
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden pt-0.5"
                    : "",
                  openSection === 'intelligence' && !collapsed
                    ? "pb-1"
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
                    <ul className="mt-1 space-y-1 px-2 pb-2 transform transition-transform duration-300 ease-in-out">
                      {intelligenceItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-8 pr-2 text-[14px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8]",
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
                    ? "bg-[#F6F7F8] rounded-md overflow-hidden pt-0.5"
                    : "",
                  openSection === 'settingsAndSetup' && !collapsed
                    ? "pb-1"
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
                    <ul className="mt-1 space-y-1 px-2 pb-2 transform transition-transform duration-300 ease-in-out">
                      {settingsAndSetupItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group relative block rounded-md py-2 pl-8 pr-2 text-[14px] font-medium transition-all duration-200 ease-out",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary shadow-sm"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-[#F6F7F8]",
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
                          <button 
                            onClick={() => setSettingsTab('general')}
                            className={cn(
                              "w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors",
                              settingsTab === 'general'
                                ? "text-primary bg-primary/10"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            )}
                          >
                            General
                          </button>
                          <button 
                            onClick={() => setSettingsTab('apps')}
                            className={cn(
                              "w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors",
                              settingsTab === 'apps'
                                ? "text-primary bg-primary/10"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            )}
                          >
                            Apps
                          </button>
                          <button 
                            onClick={() => setSettingsTab('email')}
                            className={cn(
                              "w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors",
                              settingsTab === 'email'
                                ? "text-primary bg-primary/10"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            )}
                          >
                            Email
                          </button>
                          <button 
                            onClick={() => setSettingsTab('feedback')}
                            className={cn(
                              "w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors",
                              settingsTab === 'feedback'
                                ? "text-primary bg-primary/10"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            )}
                          >
                            Feedback
                          </button>
                          <button 
                            onClick={() => setSettingsTab('tags')}
                            className={cn(
                              "w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors",
                              settingsTab === 'tags'
                                ? "text-primary bg-primary/10"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            )}
                          >
                            Tags
                          </button>
                          <button 
                            onClick={() => setSettingsTab('quick-reply-templates')}
                            className={cn(
                              "w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors",
                              settingsTab === 'quick-reply-templates'
                                ? "text-primary bg-primary/10"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            )}
                          >
                            Quick reply templates
                          </button>
                          <button 
                            onClick={() => setSettingsTab('connected-accounts')}
                            className={cn(
                              "w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors",
                              settingsTab === 'connected-accounts'
                                ? "text-primary bg-primary/10"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            )}
                          >
                            Connected accounts
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 pt-20 pb-6 overflow-y-auto">
                      <div className="px-6 space-y-8">
                        {/* General Tab Content */}
                        {settingsTab === 'general' && (
                          <>
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
                          </>
                        )}

                        {/* Apps Tab Content */}
                        {settingsTab === 'apps' && (
                          <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">Connected Apps</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Manage your external application integrations</p>
                            
                            <div className="space-y-4">
                              {/* Essensys App */}
                              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z"/>
                                    </svg>
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Essensys</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Building management platform</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded-full">
                                    Connected
                                  </span>
                                  <a
                                    href="https://essensys.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>

                              {/* Prism App */}
                              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                                    </svg>
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Prism</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Analytics and insights platform</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded-full">
                                    Connected
                                  </span>
                                  <a
                                    href="https://prism.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>

                              {/* Add New App Button */}
                              <button className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span className="text-sm font-medium">Connect new app</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Email Tab Content */}
                        {settingsTab === 'email' && (
                          <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">Email Settings</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Configure email notifications and preferences</p>
                            
                            <div className="space-y-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notification Email</label>
                                <input 
                                  type="email" 
                                  placeholder="notifications@company.com"
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Frequency</label>
                                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary">
                                  <option>Daily</option>
                                  <option>Weekly</option>
                                  <option>Monthly</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Feedback Tab Content */}
                        {settingsTab === 'feedback' && (
                          <FeedbackSettings />
                        )}

                        {/* Tags Tab Content */}
                        {settingsTab === 'tags' && (
                          <TagsSettings />
                        )}

                        {/* Quick Reply Templates Tab Content */}
                        {settingsTab === 'quick-reply-templates' && (
                          <QuickReplyTemplatesSettings />
                        )}

                        {/* Connected Accounts Tab Content */}
                        {settingsTab === 'connected-accounts' && (
                          <ConnectedAccountsSettings />
                        )}
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

// Connected Accounts Settings Component
function ConnectedAccountsSettings() {
  const [isConnected, setIsConnected] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isKebabOpen, setIsKebabOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'service-request' | 'crm'>('service-request')
  const [salesforceConfig, setSalesforceConfig] = useState({
    instanceUrl: "",
    username: "",
    password: "",
    securityToken: "",
    consumerKey: "",
    consumerSecret: ""
  })
  // Default field mappings - array structure to allow adding/removing rows
  const defaultFieldMappings: Array<{ id: string; requestInfo: string; required: boolean; salesforceField: string; information: string }> = [
    { id: "subject", requestInfo: "Subject", required: false, salesforceField: "Subject", information: "@issueTypeName" },
    { id: "description", requestInfo: "Description", required: false, salesforceField: "Description", information: "@description. sent by @adminEmail" },
    { id: "location", requestInfo: "Location", required: false, salesforceField: "Your_Location__c", information: "@location_name....@building" },
    { id: "owner", requestInfo: "Owner", required: false, salesforceField: "OwnerId", information: "@userId" },
    { id: "creator", requestInfo: "Creator", required: false, salesforceField: "CreatedById", information: "@requestor" }
  ]

  const [fieldMappings, setFieldMappings] = useState<Array<{ id: string; requestInfo: string; required: boolean; salesforceField: string; information: string }>>(defaultFieldMappings)
  const [crmMappings, setCrmMappings] = useState<Array<{ id: string; salesforceField: string; hqoField: string }>>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [serviceTypeSearch, setServiceTypeSearch] = useState("")
  const [showServiceTypeResults, setShowServiceTypeResults] = useState(false)
  const [imageError, setImageError] = useState(false)
  const serviceTypeSearchRef = useRef<HTMLDivElement>(null)

  // Service type categories
  const serviceTypeCategories = [
    { id: "cleaning-waste", name: "Cleaning & Waste", description: "Cleaning services and waste removal" },
    { id: "temperature-air", name: "Temperature & Air", description: "HVAC and climate control issues" },
    { id: "maintenance-repair", name: "Maintenance & Repair", description: "General maintenance and repair requests" },
    { id: "security-safety", name: "Security & Safety", description: "Security and safety related issues" },
    { id: "other", name: "Other", description: "Miscellaneous service requests" }
  ]

  // Sample service types (request types) - in real app, this would come from the service types data
  const serviceTypes = [
    { id: "more-cleaning", name: "More Cleaning", category: "Cleaning & Waste", categoryId: "cleaning-waste" },
    { id: "bin-service", name: "Bin Service", category: "Cleaning & Waste", categoryId: "cleaning-waste" },
    { id: "waste-removal", name: "Waste Removal", category: "Cleaning & Waste", categoryId: "cleaning-waste" },
    { id: "ac-repair", name: "AC Repair", category: "Temperature & Air", categoryId: "temperature-air" },
    { id: "heating-issue", name: "Heating Issue", category: "Temperature & Air", categoryId: "temperature-air" },
    { id: "plumbing", name: "Plumbing", category: "Maintenance & Repair", categoryId: "maintenance-repair" },
    { id: "electrical", name: "Electrical", category: "Maintenance & Repair", categoryId: "maintenance-repair" },
    { id: "locksmith", name: "Locksmith", category: "Security & Safety", categoryId: "security-safety" },
    { id: "porter-service", name: "Porter Service", category: "Hospitality & Concierge", categoryId: "hospitality-concierge" },
    { id: "signage", name: "Signage", category: "Signage & Facilities", categoryId: "signage-facilities" },
  ]

  // Available Salesforce fields for dropdown selection
  const salesforceFields = [
    { id: "Subject", name: "Subject" },
    { id: "Description", name: "Description" },
    { id: "Building_Name__c", name: "Building Name" },
    { id: "Your_Location__c", name: "Your Location" },
    { id: "OwnerId", name: "Owner" },
    { id: "CreatedById", name: "Created By" },
    { id: "Origin", name: "Origin" },
    { id: "Status", name: "Status" },
    { id: "Priority", name: "Priority" }
  ]

  // HQO fields for CRM mapping
  const hqoFields = [
    { id: "accounts", name: "Accounts" },
    { id: "contacts", name: "Contacts" },
    { id: "opportunities", name: "Opportunities" },
    { id: "buildings", name: "Buildings" },
    { id: "properties", name: "Properties" },
    { id: "leases", name: "Leases" },
    { id: "spaces", name: "Spaces" },
    { id: "tenants", name: "Tenants" },
    { id: "users", name: "Users" }
  ]

  // Available fields for mentions
  const mentionFields = [
    { id: "issueTypeName", display: "Issue Type Name" },
    { id: "description", display: "Description" },
    { id: "building", display: "Building" },
    { id: "location_name", display: "Location Name" },
    { id: "userId", display: "User ID" },
    { id: "adminEmail", display: "Admin Email" },
    { id: "requestor", display: "Requestor" },
    { id: "created_date", display: "Created Date" },
    { id: "status", display: "Status" },
    { id: "priority", display: "Priority" },
    { id: "assignedTo", display: "Assigned To" },
    { id: "accountName", display: "Account Name" },
    { id: "contactName", display: "Contact Name" },
    { id: "opportunityName", display: "Opportunity Name" },
    { id: "propertyName", display: "Property Name" },
    { id: "leaseName", display: "Lease Name" },
    { id: "spaceName", display: "Space Name" }
  ]

  const handleConfigChange = (field: string, value: string) => {
    setSalesforceConfig(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleConnect = () => {
    setIsConnected(true)
    setFieldMappings(defaultFieldMappings)
    setIsModalOpen(false)
  }

  // Close service type dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (serviceTypeSearchRef.current && !serviceTypeSearchRef.current.contains(event.target as Node)) {
        setShowServiceTypeResults(false)
      }
    }

    if (showServiceTypeResults) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showServiceTypeResults])

  const handleDisable = () => {
    setIsConnected(false)
    setFieldMappings(defaultFieldMappings)
    setCrmMappings([])
    setSelectedCategories([])
    setSelectedTypes([])
    setIsKebabOpen(false)
  }

  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(prev => prev.filter(id => id !== categoryId))
      // Also remove all types from this category
      const categoryTypes = serviceTypes.filter(t => t.categoryId === categoryId).map(t => t.id)
      setSelectedTypes(prev => prev.filter(id => !categoryTypes.includes(id)))
    } else {
      setSelectedCategories(prev => [...prev, categoryId])
      // Automatically add all types from this category
      const categoryTypes = serviceTypes.filter(t => t.categoryId === categoryId).map(t => t.id)
      setSelectedTypes(prev => {
        const newTypes = [...prev]
        categoryTypes.forEach(typeId => {
          if (!newTypes.includes(typeId)) {
            newTypes.push(typeId)
          }
        })
        return newTypes
      })
      setServiceTypeSearch("")
      setShowServiceTypeResults(false)
    }
  }

  const handleTypeToggle = (typeId: string) => {
    if (selectedTypes.includes(typeId)) {
      setSelectedTypes(prev => prev.filter(id => id !== typeId))
    } else {
      setSelectedTypes(prev => [...prev, typeId])
      setServiceTypeSearch("")
      setShowServiceTypeResults(false)
    }
  }

  const handleRemoveCategory = (categoryId: string) => {
    setSelectedCategories(prev => prev.filter(id => id !== categoryId))
    const categoryTypes = serviceTypes.filter(t => t.categoryId === categoryId).map(t => t.id)
    setSelectedTypes(prev => prev.filter(id => !categoryTypes.includes(id)))
  }

  const handleRemoveType = (typeId: string) => {
    setSelectedTypes(prev => prev.filter(id => id !== typeId))
  }

  // Combine categories and types for search
  const allSearchableItems = [
    ...serviceTypeCategories.map(cat => ({ ...cat, type: 'category' as const })),
    ...serviceTypes.map(type => ({ ...type, type: 'type' as const }))
  ]

  const filteredItems = allSearchableItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(serviceTypeSearch.toLowerCase()) ||
      ('description' in item && item.description?.toLowerCase().includes(serviceTypeSearch.toLowerCase()))
    
    if (item.type === 'category') {
      return matchesSearch && !selectedCategories.includes(item.id)
    } else {
      return matchesSearch && !selectedTypes.includes(item.id)
    }
  })

  // Calculate counts - include types from selected categories
  const categoryCount = selectedCategories.length
  const typesFromCategories = selectedCategories.flatMap(catId => 
    serviceTypes.filter(t => t.categoryId === catId).map(t => t.id)
  )
  const individualTypes = selectedTypes.filter(typeId => {
    const type = serviceTypes.find(t => t.id === typeId)
    return type && !selectedCategories.includes(type.categoryId)
  })
  const typeCount = typesFromCategories.length + individualTypes.length

  const handleSalesforceFieldChange = (mappingId: string, salesforceField: string) => {
    setFieldMappings(prev => prev.map(mapping => 
      mapping.id === mappingId 
        ? { ...mapping, salesforceField }
        : mapping
    ))
  }

  const handleInformationChange = (mappingId: string, information: string) => {
    setFieldMappings(prev => prev.map(mapping => 
      mapping.id === mappingId 
        ? { ...mapping, information }
        : mapping
    ))
  }

  const handleAddServiceRequestRow = () => {
    setFieldMappings(prev => [...prev, { 
      id: `sr-${Date.now()}`, 
      requestInfo: "", 
      required: false,
      salesforceField: "", 
      information: "" 
    }])
  }

  const handleRemoveServiceRequestRow = (mappingId: string) => {
    setFieldMappings(prev => prev.filter(mapping => mapping.id !== mappingId))
  }

  const handleCrmSalesforceFieldChange = (mappingId: string, salesforceField: string) => {
    setCrmMappings(prev => prev.map(mapping => 
      mapping.id === mappingId 
        ? { ...mapping, salesforceField }
        : mapping
    ))
  }

  const handleCrmHqoFieldChange = (mappingId: string, hqoField: string) => {
    setCrmMappings(prev => prev.map(mapping => 
      mapping.id === mappingId 
        ? { ...mapping, hqoField }
        : mapping
    ))
  }

  const handleAddCrmRow = () => {
    setCrmMappings(prev => [...prev, { 
      id: `crm-${Date.now()}`, 
      salesforceField: "", 
      hqoField: "" 
    }])
  }

  const handleRemoveCrmRow = (mappingId: string) => {
    setCrmMappings(prev => prev.filter(mapping => mapping.id !== mappingId))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">Connected accounts</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Manage external account integrations across all buildings
        </p>
      </div>

      {/* Salesforce Connection Card */}
      <Card>
        <div className="space-y-6">
          {/* Salesforce Header */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-shrink-0 bg-white border border-gray-300 dark:border-gray-600 rounded p-2 flex items-center justify-center w-16 h-16">
                {imageError ? (
                  <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">SF</div>
                ) : (
                  <Image
                    src="/images/sf.png"
                    alt="Salesforce"
                    width={60}
                    height={20}
                    className="object-contain"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Salesforce</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Connect your Salesforce account to sync service requests and manage cases
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {isConnected ? (
                <>
                  <Badge variant="success">Connected</Badge>
                  <div className="relative">
                    <button
                      onClick={() => setIsKebabOpen(!isKebabOpen)}
                      className="p-2 h-8 w-8 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <RiMore2Line className="size-4" />
                    </button>
                    {isKebabOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsKebabOpen(false)} />
                        <div className="absolute right-0 top-full mt-1 z-20 min-w-[140px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                          <button
                            onClick={() => {
                              setIsModalOpen(true)
                              setIsKebabOpen(false)
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            View settings
                          </button>
                          <button
                            onClick={handleDisable}
                            className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            Disconnect
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <ButtonComponent variant="primary" onClick={() => setIsModalOpen(true)}>
                  Connect
                </ButtonComponent>
              )}
            </div>
          </div>

          {/* Tabs and Content - Shown when connected */}
          {isConnected && (
            <>
              <TabNavigation>
                <TabNavigationLink
                  active={activeTab === 'service-request'}
                  onClick={() => setActiveTab('service-request')}
                >
                  Service request
                </TabNavigationLink>
                <TabNavigationLink
                  active={activeTab === 'crm'}
                  onClick={() => setActiveTab('crm')}
                >
                  CRM
                </TabNavigationLink>
              </TabNavigation>

              {/* Service Request Configuration Tab */}
              {activeTab === 'service-request' && (
                <div className="pt-4 space-y-4">
                  {/* Service Types Selection */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-1">
                          Service types
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Select which service types this Salesforce connection should apply to
                        </p>
                      </div>
                      {/* Summary Box */}
                      {(categoryCount > 0 || typeCount > 0) && (
                        <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-md text-xs text-gray-600 dark:text-gray-400">
                          {categoryCount > 0 && (
                            <span>{categoryCount} {categoryCount === 1 ? 'Category' : 'Categories'}</span>
                          )}
                          {categoryCount > 0 && typeCount > 0 && <span className="mx-1">•</span>}
                          {typeCount > 0 && (
                            <span>{typeCount} {typeCount === 1 ? 'Type' : 'Types'}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Selected Chips */}
                    {(selectedCategories.length > 0 || selectedTypes.length > 0) && (
                      <div className="flex flex-wrap gap-2">
                        {/* Category Chips */}
                        {selectedCategories.map((categoryId) => {
                          const category = serviceTypeCategories.find(c => c.id === categoryId)
                          if (!category) return null
                          return (
                            <div
                              key={`category-${categoryId}`}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                            >
                              <span className="text-xs font-medium">Category:</span>
                              <span>{category.name}</span>
                              <button
                                onClick={() => handleRemoveCategory(categoryId)}
                                className="hover:bg-purple-200 dark:hover:bg-purple-800 rounded p-0.5 transition-colors"
                                type="button"
                              >
                                <RiCloseLine className="size-3.5" />
                              </button>
                            </div>
                          )
                        })}
                        {/* Type Chips - Only show types not included via categories */}
                        {selectedTypes.map((typeId) => {
                          const type = serviceTypes.find(t => t.id === typeId)
                          if (!type) return null
                          // Don't show type if its category is already selected
                          if (selectedCategories.includes(type.categoryId)) return null
                          return (
                            <div
                              key={`type-${typeId}`}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                            >
                              <span className="text-xs font-medium">Type:</span>
                              <span>{type.name}</span>
                              <button
                                onClick={() => handleRemoveType(typeId)}
                                className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded p-0.5 transition-colors"
                                type="button"
                              >
                                <RiCloseLine className="size-3.5" />
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Service Type Search */}
                    <div className="relative" ref={serviceTypeSearchRef}>
                      <Input
                        placeholder="Search by service type or category..."
                        value={serviceTypeSearch}
                        onChange={(e) => {
                          setServiceTypeSearch(e.target.value)
                          setShowServiceTypeResults(true)
                        }}
                        onFocus={() => setShowServiceTypeResults(true)}
                        className="w-full"
                      />
                      
                      {/* Search Results Dropdown */}
                      {showServiceTypeResults && serviceTypeSearch && filteredItems.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
                          {filteredItems.map((item) => (
                            <button
                              key={`${item.type}-${item.id}`}
                              onClick={() => {
                                if (item.type === 'category') {
                                  handleCategoryToggle(item.id)
                                } else {
                                  handleTypeToggle(item.id)
                                }
                              }}
                              className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-start gap-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  {item.type === 'category' ? (
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                                      Category
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                      Type
                                    </span>
                                  )}
                                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {item.name}
                                  </span>
                                </div>
                                {'description' in item && item.description && (
                                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                    {item.description}
                                  </div>
                                )}
                                {item.type === 'type' && 'category' in item && (
                                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                    {item.category}
                                  </div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-1">Information sent to Salesforce</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Configure which request information maps to which Salesforce fields and how the data is formatted.
                      </p>
                    </div>
                    <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-50">
                            Salesforce field
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-50">
                            Information that will be sent to Salesforce. Type @ to select values.
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {fieldMappings.map((mapping) => (
                          <tr key={mapping.id}>
                            <td className="py-3 px-4">
                              <Select
                                value={mapping.salesforceField}
                                onValueChange={(value) => handleSalesforceFieldChange(mapping.id, value)}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select field" />
                                </SelectTrigger>
                                <SelectContent>
                                  {salesforceFields.map((sfField) => (
                                    <SelectItem key={sfField.id} value={sfField.id}>
                                      {sfField.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="flex-1">
                                  <MentionsInput
                                    value={mapping.information}
                                    onChange={(e) => handleInformationChange(mapping.id, e.target.value)}
                                    placeholder="Type @ to mention a field..."
                                    singleLine
                                    style={{
                                      control: { backgroundColor: 'transparent', fontSize: 14, fontWeight: 'normal' },
                                      '&singleLine': {
                                        control: { fontFamily: 'inherit', display: 'inline-block' },
                                        highlighter: { padding: '8px 10px', border: '1px solid transparent', minHeight: '38px' },
                                        input: {
                                          padding: '8px 10px',
                                          border: '1px solid rgb(209, 213, 219)',
                                          borderRadius: '0.375rem',
                                          backgroundColor: 'white',
                                          color: 'rgb(17, 24, 39)',
                                          fontSize: '14px',
                                          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                          width: '100%',
                                        },
                                      },
                                      suggestions: {
                                        list: {
                                          backgroundColor: 'white',
                                          border: '1px solid rgba(0,0,0,0.15)',
                                          fontSize: 14,
                                          borderRadius: '0.375rem',
                                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        },
                                        item: { padding: '8px 12px', '&focused': { backgroundColor: '#f3f4f6' } },
                                      },
                                    }}
                                  >
                                    <Mention
                                      trigger="@"
                                      data={mentionFields}
                                      displayTransform={(id) => `@${id}`}
                                      markup="@__id__"
                                      style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '2px 4px', borderRadius: '4px' }}
                                    />
                                  </MentionsInput>
                                </div>
                                {!mapping.required && (
                                  <ButtonComponent
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveServiceRequestRow(mapping.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    Remove
                                  </ButtonComponent>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                    <div className="flex justify-start">
                      <button
                        onClick={handleAddServiceRequestRow}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium cursor-pointer"
                      >
                        Add row
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* CRM Tab */}
              {activeTab === 'crm' && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-1">CRM mapping</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Map Salesforce fields to HQO fields.
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-50">
                            Salesforce field
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-50">
                            Map to HQO field
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {crmMappings.map((mapping) => (
                          <tr key={mapping.id}>
                            <td className="py-3 px-4">
                              <Select
                                value={mapping.salesforceField}
                                onValueChange={(value) => handleCrmSalesforceFieldChange(mapping.id, value)}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select Salesforce field" />
                                </SelectTrigger>
                                <SelectContent>
                                  {salesforceFields.map((sfField) => (
                                    <SelectItem key={sfField.id} value={sfField.id}>
                                      {sfField.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Select
                                  value={mapping.hqoField}
                                  onValueChange={(value) => handleCrmHqoFieldChange(mapping.id, value)}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select HQO field" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {hqoFields.map((hqoField) => (
                                      <SelectItem key={hqoField.id} value={hqoField.id}>
                                        {hqoField.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <ButtonComponent
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveCrmRow(mapping.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  Remove
                                </ButtonComponent>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-start">
                    <button
                      onClick={handleAddCrmRow}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium cursor-pointer"
                    >
                      Add row
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Card>

      {/* Connect Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Connect Salesforce</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 px-6 py-4">
            <div>
              <Label htmlFor="modal-instance-url">Instance URL <span className="text-red-500">*</span></Label>
              <Input
                id="modal-instance-url"
                type="url"
                placeholder="https://yourinstance.salesforce.com"
                value={salesforceConfig.instanceUrl}
                onChange={(e) => handleConfigChange("instanceUrl", e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Your Salesforce instance URL (e.g., https://yourinstance.salesforce.com)
              </p>
            </div>
            <div>
              <Label htmlFor="modal-username">Username <span className="text-red-500">*</span></Label>
              <Input
                id="modal-username"
                type="text"
                placeholder="user@example.com"
                value={salesforceConfig.username}
                onChange={(e) => handleConfigChange("username", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="modal-password">Password <span className="text-red-500">*</span></Label>
              <Input
                id="modal-password"
                type="password"
                placeholder="Enter your password"
                value={salesforceConfig.password}
                onChange={(e) => handleConfigChange("password", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="modal-security-token">Security token <span className="text-red-500">*</span></Label>
              <Input
                id="modal-security-token"
                type="password"
                placeholder="Enter your security token"
                value={salesforceConfig.securityToken}
                onChange={(e) => handleConfigChange("securityToken", e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Your Salesforce security token. Reset it in your Salesforce account settings if needed.
              </p>
            </div>
            <div>
              <Label htmlFor="modal-consumer-key">Consumer key <span className="text-red-500">*</span></Label>
              <Input
                id="modal-consumer-key"
                type="text"
                placeholder="Enter consumer key"
                value={salesforceConfig.consumerKey}
                onChange={(e) => handleConfigChange("consumerKey", e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Consumer key from your Salesforce Connected App
              </p>
            </div>
            <div>
              <Label htmlFor="modal-consumer-secret">Consumer secret <span className="text-red-500">*</span></Label>
              <Input
                id="modal-consumer-secret"
                type="password"
                placeholder="Enter consumer secret"
                value={salesforceConfig.consumerSecret}
                onChange={(e) => handleConfigChange("consumerSecret", e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Consumer secret from your Salesforce Connected App
              </p>
            </div>
          </div>
          <DialogFooter>
            <ButtonComponent variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</ButtonComponent>
            <ButtonComponent
              variant="primary"
              onClick={handleConnect}
              disabled={
                !salesforceConfig.instanceUrl ||
                !salesforceConfig.username ||
                !salesforceConfig.password ||
                !salesforceConfig.securityToken ||
                !salesforceConfig.consumerKey ||
                !salesforceConfig.consumerSecret
              }
            >
              Connect
            </ButtonComponent>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Building Multi-Select with Typeahead Component
function BuildingMultiSelect({
  value,
  onValueChange,
  options,
  placeholder = "Select buildings",
  disabled = false
}: {
  value: string[]
  onValueChange: (value: string[]) => void
  options: string[]
  placeholder?: string
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const ALL_BUILDINGS = "All buildings"
  
  // Check if "All buildings" is selected
  const isAllBuildingsSelected = value.includes(ALL_BUILDINGS)
  
  // Add "All buildings" as the first option
  const allOptions = [ALL_BUILDINGS, ...options]
  
  const filteredOptions = allOptions.filter(option =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelect = (option: string) => {
    if (option === ALL_BUILDINGS) {
      // If selecting "All buildings", replace all selections with just "All buildings"
      onValueChange([ALL_BUILDINGS])
    } else {
      // If selecting a specific building
      if (value.includes(option)) {
        // Deselecting a building
        const newValue = value.filter(v => v !== option)
        // If we removed the last building and had "All buildings", keep "All buildings"
        // Otherwise, if we removed all buildings, select "All buildings"
        if (newValue.length === 0 || (newValue.length === 1 && newValue[0] === ALL_BUILDINGS)) {
          onValueChange([ALL_BUILDINGS])
        } else {
          // Remove "All buildings" if it exists when selecting specific buildings
          onValueChange(newValue.filter(v => v !== ALL_BUILDINGS))
        }
      } else {
        // Selecting a new building - remove "All buildings" if present
        const newValue = value.filter(v => v !== ALL_BUILDINGS)
        onValueChange([...newValue, option])
      }
    }
  }

  const handleRemove = (option: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (option === ALL_BUILDINGS) {
      // If removing "All buildings", select all individual buildings
      onValueChange(options)
    } else {
      const newValue = value.filter(v => v !== option)
      // If no buildings left, select "All buildings"
      if (newValue.length === 0 || (newValue.length === 1 && newValue[0] === ALL_BUILDINGS)) {
        onValueChange([ALL_BUILDINGS])
      } else {
        onValueChange(newValue)
      }
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            value.length === 0 && "text-muted-foreground"
          )}
        >
          <div className="flex flex-1 flex-wrap gap-1 overflow-hidden">
            {value.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : isAllBuildingsSelected ? (
              <div className="flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs">
                <span>All buildings</span>
                <button
                  type="button"
                  onClick={(e) => handleRemove(ALL_BUILDINGS, e)}
                  className="text-primary hover:text-primary/80 focus:outline-none"
                >
                  ×
                </button>
              </div>
            ) : (
              value.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs"
                >
                  <span className="max-w-[150px] truncate">{item}</span>
                  <button
                    type="button"
                    onClick={(e) => handleRemove(item, e)}
                    className="text-primary hover:text-primary/80 focus:outline-none"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Search buildings..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          {value.length > 0 && !isAllBuildingsSelected && (
            <div className="border-b p-2">
              <div className="flex flex-wrap gap-1">
                {value.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs"
                  >
                    <span className="max-w-[150px] truncate">{item}</span>
                    <button
                      type="button"
                      onClick={(e) => handleRemove(item, e)}
                      className="text-primary hover:text-primary/80 focus:outline-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <CommandList>
            <CommandEmpty>No building found.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => {
                const isSelected = option === ALL_BUILDINGS 
                  ? isAllBuildingsSelected 
                  : value.includes(option)
                return (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => handleSelect(option)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    {option}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// Feedback Settings Component
function FeedbackSettings() {
  // Get all building labels for default selection
  const allBuildingLabels = buildings.map(b => b.label)
  
  // Initialize state with "All buildings" selected for each feedback type
  const [feedbackSettings, setFeedbackSettings] = useState({
    serviceRequests: ["All buildings"],
    events: ["All buildings"],
    resourceBooking: ["All buildings"],
  })

  // State for enabled/disabled toggles for each feature
  const [featureEnabled, setFeatureEnabled] = useState({
    serviceRequests: true,
    events: true,
    resourceBooking: true,
  })

  // State for comments on feedback
  const [commentsEnabled, setCommentsEnabled] = useState(true)

  // State for push notifications on feedback reminders
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(true)

  const handleBuildingChange = (type: 'serviceRequests' | 'events' | 'resourceBooking', buildings: string[]) => {
    setFeedbackSettings(prev => ({
      ...prev,
      [type]: buildings
    }))
  }

  const handleFeatureToggle = (type: 'serviceRequests' | 'events' | 'resourceBooking') => {
    setFeatureEnabled(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">Feedback settings</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          When a user completes a booking, attends an event, or has a service request closed, they'll see a short in-app prompt asking them to rate their experience. Ratings take one tap to submit, with an optional comment for additional feedback, and are only requested once per completed item.
        </p>
        
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Feature</TableHeaderCell>
                <TableHeaderCell>Enabled</TableHeaderCell>
                <TableHeaderCell>Buildings</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                  Service Requests
                </TableCell>
                <TableCell>
                  <Switch
                    checked={featureEnabled.serviceRequests}
                    onCheckedChange={() => handleFeatureToggle('serviceRequests')}
                  />
                </TableCell>
                <TableCell>
                  <BuildingMultiSelect
                    value={feedbackSettings.serviceRequests}
                    onValueChange={(buildings) => handleBuildingChange('serviceRequests', buildings)}
                    options={allBuildingLabels}
                    placeholder="Select buildings"
                    disabled={!featureEnabled.serviceRequests}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                  Events
                </TableCell>
                <TableCell>
                  <Switch
                    checked={featureEnabled.events}
                    onCheckedChange={() => handleFeatureToggle('events')}
                  />
                </TableCell>
                <TableCell>
                  <BuildingMultiSelect
                    value={feedbackSettings.events}
                    onValueChange={(buildings) => handleBuildingChange('events', buildings)}
                    options={allBuildingLabels}
                    placeholder="Select buildings"
                    disabled={!featureEnabled.events}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                  Resource booking
                </TableCell>
                <TableCell>
                  <Switch
                    checked={featureEnabled.resourceBooking}
                    onCheckedChange={() => handleFeatureToggle('resourceBooking')}
                  />
                </TableCell>
                <TableCell>
                  <BuildingMultiSelect
                    value={feedbackSettings.resourceBooking}
                    onValueChange={(buildings) => handleBuildingChange('resourceBooking', buildings)}
                    options={allBuildingLabels}
                    placeholder="Select buildings"
                    disabled={!featureEnabled.resourceBooking}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Comments on Feedback Card */}
      <Card>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-4">
            Comments on feedback
          </h3>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable comments
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Allow users to add optional comments alongside their 5-star rating
              </p>
            </div>
            <Switch
              checked={commentsEnabled}
              onCheckedChange={setCommentsEnabled}
            />
          </div>
        </div>
      </Card>

      {/* Push Notifications Card */}
      <Card>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-4">
            Push notifications
          </h3>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable push notifications
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Send a one-time push notification if the user doesn't respond to the in-app feedback prompt.
              </p>
            </div>
            <Switch
              checked={pushNotificationsEnabled}
              onCheckedChange={setPushNotificationsEnabled}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
