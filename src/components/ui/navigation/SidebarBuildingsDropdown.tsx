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
import { Input } from "@/components/Input"
import { CustomSwitch } from "@/components/ui/CustomSwitch"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn, focusInput } from "@/lib/utils"
import { Building, ChevronsUpDown, Info, Star } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import React, { useEffect, useMemo, useState } from "react"
import { ModalAddBuilding } from "./ModalAddBuilding"

const buildings = [
  // Boston Class A Buildings
  {
    value: "200-clarendon",
    name: "200 Clarendon",
    initials: "2C",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1562516155-e0c1ee44059b?q=80&w=2574&auto=format&fit=crop",
  },
  {
    value: "prudential-tower",
    name: "Prudential Tower",
    initials: "PT",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=2550&auto=format&fit=crop",
  },
  {
    value: "one-congress",
    name: "One Congress",
    initials: "OC",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
  },
  {
    value: "100-federal",
    name: "100 Federal Street",
    initials: "FS",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1478860409698-8707f313ee8b?q=80&w=2670&auto=format&fit=crop",
  },
  {
    value: "one-financial",
    name: "One Financial Center",
    initials: "FC",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1554435493-93422e8220c8?q=80&w=2636&auto=format&fit=crop",
  },
  {
    value: "125-high",
    name: "125 High Street",
    initials: "HS",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=2674&auto=format&fit=crop",
  },
  {
    value: "one-beacon",
    name: "One Beacon Street",
    initials: "BS",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?q=80&w=2670&auto=format&fit=crop",
  },
  {
    value: "100-summer",
    name: "100 Summer Street",
    initials: "SS",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2667&auto=format&fit=crop",
  },
  {
    value: "exchange-place",
    name: "Exchange Place",
    initials: "EP",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?q=80&w=2574&auto=format&fit=crop",
  },
  {
    value: "state-street-financial",
    name: "State Street Financial Center",
    initials: "SF",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2644&auto=format&fit=crop",
  },
  // Seattle Class A Buildings
  {
    value: "columbia-center",
    name: "Columbia Center",
    initials: "CC",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?q=80&w=2626&auto=format&fit=crop",
  },
  {
    value: "1201-third",
    name: "1201 Third Avenue",
    initials: "TA",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=2670&auto=format&fit=crop",
  },
  {
    value: "rainier-square",
    name: "Rainier Square Tower",
    initials: "RS",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1605637636266-bd7a392f94df?q=80&w=2574&auto=format&fit=crop",
  },
  {
    value: "two-union",
    name: "Two Union Square",
    initials: "US",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2670&auto=format&fit=crop",
  },
  {
    value: "seattle-municipal",
    name: "Seattle Municipal Tower",
    initials: "MT",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671&auto=format&fit=crop",
  },
  {
    value: "madison-centre",
    name: "Madison Centre",
    initials: "MC",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1577017040065-650ee4d43339?q=80&w=2670&auto=format&fit=crop",
  },
  {
    value: "russell-investments",
    name: "Russell Investments Center",
    initials: "RI",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop",
  },
  {
    value: "wells-fargo",
    name: "Wells Fargo Center",
    initials: "WF",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2574&auto=format&fit=crop",
  },
  {
    value: "us-bank",
    name: "US Bank Centre",
    initials: "UB",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
  },
  {
    value: "safeco-plaza",
    name: "Safeco Plaza",
    initials: "SP",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?q=80&w=2670&auto=format&fit=crop",
  },
  // San Francisco Class A Buildings
  {
    value: "salesforce-tower",
    name: "Salesforce Tower",
    initials: "ST",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?q=80&w=2574&auto=format&fit=crop",
  },
  {
    value: "555-california",
    name: "555 California Street",
    initials: "CS",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
  },
  {
    value: "transamerica",
    name: "Transamerica Pyramid",
    initials: "TP",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2589&auto=format&fit=crop",
  },
  {
    value: "181-fremont",
    name: "181 Fremont",
    initials: "FR",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2670&auto=format&fit=crop",
  },
  {
    value: "one-front",
    name: "One Front Street",
    initials: "OF",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1496950866446-3253e1470e8e?q=80&w=2670&auto=format&fit=crop",
  },
  {
    value: "345-california",
    name: "345 California Center",
    initials: "CC",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
  },
  {
    value: "one-california",
    name: "One California",
    initials: "OC",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1554435493-93422e8220c8?q=80&w=2636&auto=format&fit=crop",
  },
  {
    value: "101-california",
    name: "101 California Street",
    initials: "CA",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=2670&auto=format&fit=crop",
  },
  {
    value: "50-fremont",
    name: "50 Fremont Center",
    initials: "FC",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
  },
  {
    value: "one-market",
    name: "One Market Plaza",
    initials: "MP",
    color: "bg-primary dark:bg-primary",
    imageUrl: "https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?q=80&w=2532&auto=format&fit=crop",
  },
]

// Function to check if portfolio view is allowed for the current page
const isPortfolioViewAllowed = (pathname: string): boolean => {
  // Portfolio view is allowed for My HqO
  if (pathname === '/my-hqo') return true;

  // Portfolio view is allowed for all pages under Portfolio
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
  const [isPortfolioView, setIsPortfolioView] = React.useState(true) // Default to portfolio view ON
  const [selectedBuilding, setSelectedBuilding] = React.useState(buildings[0]) // Willis Tower is first
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [starredBuildingId, setStarredBuildingId] = useState<string | null>(null)
  const dropdownTriggerRef = React.useRef<null | HTMLButtonElement>(null)
  const focusRef = React.useRef<null | HTMLButtonElement>(null)
  const pathname = usePathname()

  const portfolioAllowed = isPortfolioViewAllowed(pathname)
  const pageName = getPageName(pathname)

  // Filter and sort buildings based on search query and starred status
  const filteredBuildings = useMemo(() => {
    let filtered = buildings;
    
    // Apply search filter if there's a query
    if (searchQuery.trim()) {
      filtered = buildings.filter(building =>
        building.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Sort to show starred building first
    return filtered.sort((a, b) => {
      if (a.value === starredBuildingId) return -1; // Starred building goes first
      if (b.value === starredBuildingId) return 1;  // Other building goes after starred
      return 0; // Keep original order for non-starred buildings
    })
  }, [searchQuery, starredBuildingId])


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

  // Clear search when dropdown closes
  useEffect(() => {
    if (!dropdownOpen) {
      setSearchQuery("");
    }
  }, [dropdownOpen]);

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
    setSearchQuery("") // Clear search when selecting
  }

  const handlePortfolioToggle = (checked: boolean) => {
    if (portfolioAllowed) {
      setIsPortfolioView(checked);
      // When leaving portfolio view, set to Willis Tower (first building)
      if (!checked) {
        setSelectedBuilding(buildings[0]); // Willis Tower
      }
    }
  };

  const handleToggleStar = (building: typeof buildings[0], e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent building selection
    // If clicking on the currently starred building, unstar it
    if (starredBuildingId === building.value) {
      setStarredBuildingId(null);
    } else {
      // Otherwise, star this building (only one can be starred at a time)
      setStarredBuildingId(building.value);
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
                      className="flex aspect-square size-6 items-center justify-center rounded bg-gray-500 p-1 text-xs font-medium text-white dark:bg-gray-600"
                      aria-hidden="true"
                    >
                      <Building className="size-4" />
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
                <ChevronsUpDown
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
                      className="flex aspect-square size-6 items-center justify-center rounded bg-gray-500 p-1 text-xs font-medium text-white dark:bg-gray-600"
                      aria-hidden="true"
                    >
                      <Building className="size-4" />
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
                  <ChevronsUpDown
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
              
              {/* Search input */}
              <div className="px-2 pb-2">
                <Input
                  type="search"
                  placeholder="Search by building name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8"
                  inputClassName="text-sm"
                />
              </div>

              {/* Buildings list */}
              {filteredBuildings.length > 0 ? (
                filteredBuildings.map((building) => (
                  <DropdownMenuItem
                    key={building.value}
                    onSelect={() => handleBuildingSelect(building)}
                    className="group"
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-x-2.5">
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
                      <button
                        onClick={(e) => handleToggleStar(building, e)}
                        className={cn(
                          "p-1 rounded-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                          "opacity-0 group-hover:opacity-100",
                          starredBuildingId === building.value && "opacity-100"
                        )}
                      >
                        <Star
                          className={cn(
                            "size-4",
                            starredBuildingId === building.value
                              ? "fill-blue-500 text-blue-500"
                              : "text-gray-400 hover:text-blue-500"
                          )}
                        />
                      </button>
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="px-2 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                  No buildings found
                </div>
              )}
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
                "flex items-center gap-x-2 transition-opacity duration-300",
                !portfolioAllowed && !isAnimating ? "opacity-50 cursor-not-allowed" : "opacity-100"
              )}>
                <CustomSwitch
                  checked={isPortfolioView}
                  onCheckedChange={handlePortfolioToggle}
                  size="small"
                  disabled={!portfolioAllowed || isAnimating}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Portfolio view
                </span>
                <Info className="size-4 text-gray-400" />
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
  )
}
