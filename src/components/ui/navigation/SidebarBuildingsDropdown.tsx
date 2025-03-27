"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/Dropdown"
import { CustomSwitch } from "@/components/ui/CustomSwitch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn, focusInput } from "@/lib/utils"
import { RiBuildingLine, RiExpandUpDownLine, RiInformationLine } from "@remixicon/react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import React, { useEffect } from "react"
import { ModalAddBuilding } from "./ModalAddBuilding"

const buildings = [
  {
    value: "highland-ave",
    name: "125 Highland Ave",
    initials: "HA",
    color: "bg-primary dark:bg-primary-400",
    imageUrl: "https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    value: "market-street",
    name: "400 Market Street",
    initials: "MS",
    color: "bg-primary dark:bg-primary-400",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    value: "state-street",
    name: "75 State Street",
    initials: "SS",
    color: "bg-primary dark:bg-primary-400",
    imageUrl: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=2674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    value: "congress-ave",
    name: "200 Congress Ave",
    initials: "CA",
    color: "bg-primary dark:bg-primary-400",
    imageUrl: "https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    value: "boylston-street",
    name: "500 Boylston Street",
    initials: "BS",
    color: "bg-primary dark:bg-primary-400",
    imageUrl: "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

// Function to check if portfolio view is allowed for the current page
const isPortfolioViewAllowed = (pathname: string): boolean => {
  // Portfolio view is allowed for My HqO
  if (pathname === '/my-hqo') return true;

  // Portfolio view is allowed for all pages under Asset Manager
  if (
    pathname === '/buildings' ||
    pathname === '/buildings/active' ||
    pathname === '/buildings/inactive' ||
    pathname === '/tenants' ||
    pathname === '/users' ||
    pathname === '/users/active' ||
    pathname === '/users/inactive' ||
    pathname === '/users/invited' ||
    pathname === '/vendors' ||
    pathname === '/audiences'
  ) return true;

  // Portfolio view is allowed for Surveys
  if (pathname === '/experience-manager/surveys') return true;

  // Portfolio view is not allowed for other pages
  return false;
}

// Function to get the current page name for the tooltip
const getPageName = (pathname: string): string => {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return 'this page';

  // Handle special cases
  if (parts[0] === 'my-hqo') return 'My HqO';

  // For paths with subpaths, use the last part
  const lastPart = parts[parts.length - 1];

  // Convert kebab-case to Title Case and handle special cases
  return lastPart
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const BuildingsDropdownDesktop = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false)
  const [isPortfolioView, setIsPortfolioView] = React.useState(false)
  const [selectedBuilding, setSelectedBuilding] = React.useState(buildings[0])
  const [isAnimating, setIsAnimating] = React.useState(false)
  const dropdownTriggerRef = React.useRef<null | HTMLButtonElement>(null)
  const focusRef = React.useRef<null | HTMLButtonElement>(null)
  const pathname = usePathname()

  const portfolioAllowed = isPortfolioViewAllowed(pathname)
  const pageName = getPageName(pathname)

  // Effect to handle portfolio view toggle when navigating between pages
  useEffect(() => {
    if (isPortfolioView && !portfolioAllowed) {
      setIsAnimating(true);
      // Animate the toggle off
      setTimeout(() => {
        setIsPortfolioView(false);
        setIsAnimating(false);
      }, 300);
    }
  }, [pathname, isPortfolioView, portfolioAllowed]);

  const handleDialogItemSelect = () => {
    focusRef.current = dropdownTriggerRef.current
  }

  const handleDialogItemOpenChange = (open: boolean) => {
    setHasOpenDialog(open)
    if (open === false) {
      setDropdownOpen(false)
    }
  }

  const handleBuildingSelect = (building: typeof buildings[0]) => {
    setSelectedBuilding(building)
    setIsPortfolioView(false)
    setDropdownOpen(false)
  }

  const handlePortfolioToggle = (checked: boolean) => {
    if (portfolioAllowed) {
      setIsPortfolioView(checked);
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      {/* Responsive dropdown that changes appearance based on screen size */}
      <div className="w-auto lg:w-[280px]">
        <DropdownMenu
          open={dropdownOpen}
          onOpenChange={setDropdownOpen}
          modal={false}
        >
          {/* Mobile trigger (compact) */}
          <div className="lg:hidden">
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "inline-flex items-center gap-x-1 rounded-md border border-gray-300 bg-white p-1.5 text-sm shadow-sm transition-all hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 hover:dark:bg-gray-900",
                  focusInput,
                )}
                ref={dropdownTriggerRef}
              >
                <div className="flex shrink-0 items-center">
                  {isPortfolioView ? (
                    <span
                      className="flex aspect-square size-6 items-center justify-center rounded bg-primary p-1 text-xs font-medium text-white dark:bg-primary-400"
                      aria-hidden="true"
                    >
                      <RiBuildingLine className="size-4" />
                    </span>
                  ) : (
                    <div className="relative size-6 overflow-hidden rounded">
                      <Image
                        src={selectedBuilding.imageUrl}
                        alt={selectedBuilding.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                <RiExpandUpDownLine
                  className="size-4 shrink-0 text-gray-500"
                  aria-hidden="true"
                />
                <span className="sr-only">
                  {isPortfolioView ? "All buildings" : selectedBuilding.name}
                </span>
              </button>
            </DropdownMenuTrigger>
          </div>

          {/* Desktop trigger (full) */}
          <div className="hidden lg:block">
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex w-full items-center gap-x-2.5 rounded-md border border-gray-300 bg-white p-1.5 text-sm shadow-sm transition-all hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 hover:dark:bg-gray-900",
                  focusInput,
                )}
                ref={dropdownTriggerRef}
              >
                <div className="flex shrink-0 items-center gap-x-2.5">
                  {isPortfolioView ? (
                    <span
                      className="flex aspect-square size-6 items-center justify-center rounded bg-primary p-1 text-xs font-medium text-white dark:bg-primary-400"
                      aria-hidden="true"
                    >
                      <RiBuildingLine className="size-4" />
                    </span>
                  ) : (
                    <div className="relative size-6 overflow-hidden rounded">
                      <Image
                        src={selectedBuilding.imageUrl}
                        alt={selectedBuilding.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between gap-x-2">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-50">
                    {isPortfolioView ? "All buildings" : selectedBuilding.name}
                  </p>
                  <RiExpandUpDownLine
                    className="size-4 shrink-0 text-gray-500"
                    aria-hidden="true"
                  />
                </div>
              </button>
            </DropdownMenuTrigger>
          </div>

          {/* Dropdown content (shared between mobile and desktop) */}
          <DropdownMenuContent
            className="w-[280px]"
            hidden={hasOpenDialog}
            onCloseAutoFocus={(event) => {
              if (focusRef.current) {
                focusRef.current.focus()
                focusRef.current = null
                event.preventDefault()
              }
            }}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                Buildings ({buildings.length})
              </DropdownMenuLabel>
              {buildings.map((building) => (
                <DropdownMenuItem
                  key={building.value}
                  onSelect={() => handleBuildingSelect(building)}
                >
                  <div className="flex w-full items-center gap-x-2.5">
                    <div className="relative size-6 overflow-hidden rounded">
                      <Image
                        src={building.imageUrl}
                        alt={building.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {building.name}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <ModalAddBuilding
              onSelect={handleDialogItemSelect}
              onOpenChange={handleDialogItemOpenChange}
              itemName="Add building"
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Portfolio view toggle (desktop only) */}
      <div className="hidden items-center whitespace-nowrap lg:flex">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={cn(
                "flex items-center transition-opacity duration-300",
                !portfolioAllowed && !isAnimating ? "opacity-50 cursor-not-allowed" : "opacity-100"
              )}>
                <CustomSwitch
                  checked={isPortfolioView}
                  onCheckedChange={handlePortfolioToggle}
                  size="small"
                  disabled={!portfolioAllowed || isAnimating}
                />
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Portfolio view
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="center">
              {portfolioAllowed
                ? `View data across all buildings in ${pageName}`
                : `Portfolio view is not available for ${pageName}`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="ml-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center">
                  <RiInformationLine className="size-4 text-gray-400" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="center">
                {portfolioAllowed
                  ? `Portfolio view allows you to see data across all buildings in ${pageName}`
                  : `Portfolio view is not available for ${pageName}`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
