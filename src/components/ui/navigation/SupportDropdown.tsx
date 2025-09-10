"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/Dropdown"
import {
  Headphones,
  Book,
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
      <DropdownMenuContent align={align} className="px-4 py-3">
        <DropdownMenuItem onClick={handleContactSupport} className="px-3 py-2.5">
          <Headphones className="size-4 shrink-0 mr-2" aria-hidden="true" />
          Contact support
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleHelpHub} className="px-3 py-2.5">
          <Book className="size-4 shrink-0 mr-2" aria-hidden="true" />
          HelpHub
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSubmitIdea} className="px-3 py-2.5">
          <Lightbulb className="size-4 shrink-0 mr-2" aria-hidden="true" />
          Submit an idea
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
