"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/Dropdown"
import { siteConfig } from "@/app/siteConfig"
import { useView } from "@/contexts/ViewContext"
import {
    LogOut,
    Settings,
} from "lucide-react"
import { useRouter } from "next/navigation"
import * as React from "react"

export type DropdownUserProfileProps = {
  children: React.ReactNode
  align?: "center" | "start" | "end"
}

export function DropdownUserProfile({
  children,
  align = "start",
}: DropdownUserProfileProps) {
  const { view, setView } = useView()
  const router = useRouter()

  const handleViewChange = (newView: "landlord" | "tenant") => {
    setView(newView)
    // Navigate to the appropriate default page
    if (newView === "landlord") {
      router.push(siteConfig.baseLinks.overview)
    } else {
      router.push(siteConfig.baseLinks.tenant.home)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align={align} className="w-80 p-0">
          {/* User Profile Section */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
              EE
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Ellie Edwards
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                eedwards@acme.com
              </div>
            </div>
          </div>

          {/* Manage Account */}
          <div className="p-2">
            <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5">
              <Settings className="size-4 text-gray-500" />
              <span className="text-sm">Manage my account</span>
            </DropdownMenuItem>
          </div>

          {/* Change View Section */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              Change view
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="view"
                  value="landlord"
                  checked={view === "landlord"}
                  onChange={() => handleViewChange("landlord")}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary dark:border-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Landlord</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="view"
                  value="tenant"
                  checked={view === "tenant"}
                  onChange={() => handleViewChange("tenant")}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary dark:border-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Tenant</span>
              </label>
            </div>
          </div>

          {/* Log Out - With grey background */}
          <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
            <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 m-0 rounded-b-lg">
              <LogOut className="size-4" />
              <span className="text-sm">Log out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
