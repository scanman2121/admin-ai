"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/Dropdown"
import {
    Book,
    Headphones,
    Lightbulb
} from "lucide-react"
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
      <DropdownMenuContent align={align} className="px-2 py-2">
        <DropdownMenuItem onClick={handleContactSupport} className="px-2 py-2 text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900">
          <Headphones className="size-4 shrink-0 mr-2 text-[#696E72] group-hover:text-gray-900 dark:text-gray-400 group-hover:dark:text-gray-50" aria-hidden="true" />
          Contact support
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleHelpHub} className="px-2 py-2 text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900">
          <Book className="size-4 shrink-0 mr-2 text-[#696E72] group-hover:text-gray-900 dark:text-gray-400 group-hover:dark:text-gray-50" aria-hidden="true" />
          HelpHub
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSubmitIdea} className="px-2 py-2 text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900">
          <Lightbulb className="size-4 shrink-0 mr-2 text-[#696E72] group-hover:text-gray-900 dark:text-gray-400 group-hover:dark:text-gray-50" aria-hidden="true" />
          Submit an idea
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
