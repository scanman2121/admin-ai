"use client"

import { Button } from "@/components/Button"
import { cn, focusRing } from "@/lib/utils"
import { MoreHorizontal } from "lucide-react"
import Image from "next/image"

import { DropdownUserProfile } from "./DropdownUserProfile"

interface UserProfileDesktopProps {
  isCollapsed?: boolean
}

export const UserProfileDesktop = ({ isCollapsed = false }: UserProfileDesktopProps) => {
  return (
    <DropdownUserProfile>
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cn(
          focusRing,
          "group flex w-full items-center rounded-md p-2 text-sm font-medium text-gray-900 hover:bg-gray-100 data-[state=open]:bg-gray-100 data-[state=open]:bg-gray-400/10 hover:dark:bg-gray-400/10",
          isCollapsed && "justify-center"
        )}
      >
        <span className={cn("flex items-center", isCollapsed ? "" : "gap-3")}>
          <span
            className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white overflow-hidden dark:border-gray-800 dark:bg-gray-950"
            aria-hidden="true"
          >
            <Image
              src="/drake.png"
              alt="Drake Maye"
              fill
              className="object-cover"
            />
          </span>
          {!isCollapsed && <span>Drake Maye</span>}
        </span>
        {!isCollapsed && (
          <MoreHorizontal
            className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 group-hover:dark:text-gray-400"
            aria-hidden="true"
          />
        )}
      </Button>
    </DropdownUserProfile>
  )
}

export const UserProfileMobile = () => {
  return (
    <DropdownUserProfile align="end">
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cn(
          "group flex items-center rounded-md p-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 hover:dark:text-gray-50 hover:dark:bg-gray-900 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-900",
          focusRing
        )}
      >
        <span
          className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white overflow-hidden dark:border-gray-700 dark:bg-gray-900"
          aria-hidden="true"
        >
          <Image
            src="/drake.png"
            alt="Drake Maye"
            fill
            className="object-cover"
          />
        </span>
        <span className="sr-only">User menu</span>
      </Button>
    </DropdownUserProfile>
  )
}
