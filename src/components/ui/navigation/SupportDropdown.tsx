"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/Dropdown"
import {
  RiCustomerService2Line,
  RiBook2Line,
  RiLightbulbLine
} from "@remixicon/react"
import * as React from "react"

export type SupportDropdownProps = {
  children: React.ReactNode
  align?: "center" | "start" | "end"
}

export function SupportDropdown({
  children,
  align = "start",
}: SupportDropdownProps) {
  const handleContactSupport = () => {
    // Handle contact support action
    console.log("Contact support clicked")
  }

  const handleHelpHub = () => {
    // Handle help hub action  
    console.log("HelpHub clicked")
  }

  const handleSubmitIdea = () => {
    // Handle submit idea action
    console.log("Submit an idea clicked")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuItem onClick={handleContactSupport}>
          <RiCustomerService2Line className="size-4 shrink-0 mr-2" aria-hidden="true" />
          Contact support
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleHelpHub}>
          <RiBook2Line className="size-4 shrink-0 mr-2" aria-hidden="true" />
          HelpHub
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSubmitIdea}>
          <RiLightbulbLine className="size-4 shrink-0 mr-2" aria-hidden="true" />
          Submit an idea
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
