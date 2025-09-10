"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/Dropdown"
import { Input } from "@/components/Input"
import { Checkbox } from "@/components/Checkbox"
import { cn } from "@/lib/utils"
import {
  RiSettings4Line,
  RiLogoutBoxLine,
  RiSearchLine
} from "@remixicon/react"
import * as React from "react"

export type DropdownUserProfileProps = {
  children: React.ReactNode
  align?: "center" | "start" | "end"
}

export function DropdownUserProfile({
  children,
  align = "start",
}: DropdownUserProfileProps) {
  const [view, setView] = React.useState<"landlord" | "tenant">("tenant")
  const [customerSearch, setCustomerSearch] = React.useState("")
  const [customerView, setCustomerView] = React.useState(false)

  // Mock customer data
  const customers = [
    { id: 1, name: "Customer name", color: "bg-pink-500" },
    { id: 2, name: "Customer name", color: "bg-blue-500" },
    { id: 3, name: "Customer name", color: "bg-orange-500" },
    { id: 4, name: "Customer name", color: "bg-purple-500" },
  ]

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearch.toLowerCase())
  )

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
              <RiSettings4Line className="size-4 text-gray-500" />
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
                  onChange={(e) => setView(e.target.value as "landlord" | "tenant")}
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
                  onChange={(e) => setView(e.target.value as "landlord" | "tenant")}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary dark:border-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Tenant</span>
              </label>
            </div>
          </div>

          {/* Change Customer Section */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              Change customer
            </div>
            
            {/* Search Input */}
            <div className="relative mb-3">
              <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search"
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="pl-10 text-sm"
              />
            </div>

            {/* Customer List */}
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {filteredCustomers.map((customer) => (
                <button
                  key={customer.id}
                  className="flex items-center gap-3 w-full px-2 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium", customer.color)}>
                    C
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{customer.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Customer View Checkbox */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <label className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={customerView}
                onCheckedChange={(checked) => setCustomerView(checked === true)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Customer view</span>
            </label>
          </div>

          {/* Log Out - With grey background */}
          <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
            <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 m-0 rounded-b-lg">
              <RiLogoutBoxLine className="size-4" />
              <span className="text-sm">Log out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
