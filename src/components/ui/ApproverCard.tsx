"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getRelativeTime } from "@/lib/utils"
import { Search, UserCheck, X } from "lucide-react"
import { useState } from "react"

interface Approver {
  id: string
  name: string
  email: string
  avatar?: string
  initials: string
  role?: string
  department?: string
}

interface ApproverCardProps {
  approver?: Approver | null
  onAssignApprover?: (approver: Approver) => void
  onRemoveApprover?: () => void
  approval?: string | undefined // "Approved", "Denied", or undefined (pending)
  approvalDate?: string | undefined // ISO date string
  onApprove?: () => void
  onDeny?: () => void
}

// Mock search results - in a real app, this would come from an API
const mockApproverResults: Approver[] = [
  {
    id: "approver-1",
    name: "Michael Zhang",
    email: "michael.zhang@company.com",
    avatar: "/avatars/michael-zhang.jpg",
    initials: "MZ",
    role: "Operations Manager",
    department: "Operations"
  },
  {
    id: "approver-team-1",
    name: "Facilities Team",
    email: "facilities-team@company.com",
    initials: "FT",
    role: "Approval Team",
    department: "5 members"
  },
  {
    id: "approver-2",
    name: "Sarah Williams",
    email: "sarah.williams@company.com",
    avatar: "/avatars/sarah-williams.jpg",
    initials: "SW",
    role: "Facilities Director",
    department: "Facilities"
  },
  {
    id: "approver-3",
    name: "David Kim",
    email: "david.kim@company.com",
    avatar: "/avatars/david-kim.jpg",
    initials: "DK",
    role: "Property Manager",
    department: "Property Management"
  },
  {
    id: "approver-4",
    name: "Lisa Chen",
    email: "lisa.chen@company.com",
    avatar: "/avatars/lisa-chen.jpg",
    initials: "LC",
    role: "Security Manager",
    department: "Security"
  }
]

// Approver info component used in all states
function ApproverInfo({ approver }: { approver: Approver }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-10">
        <AvatarImage src={approver.avatar} alt={approver.name} />
        <AvatarFallback className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 text-sm">
          {approver.initials}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {approver.name}
          </p>
          <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
            Approver
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {approver.role} • {approver.department}
        </p>
      </div>
    </div>
  )
}

export function ApproverCard({
  approver,
  onAssignApprover,
  onRemoveApprover,
  approval,
  approvalDate,
  onApprove,
  onDeny
}: ApproverCardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)

  const filteredResults = mockApproverResults.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.department?.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(person => !approver || person.id !== approver.id)

  const handleSearchFocus = () => {
    setShowSearchResults(true)
  }

  const handleSearchBlur = () => {
    // Delay hiding to allow clicks on results
    setTimeout(() => setShowSearchResults(false), 200)
  }

  const handleApproverClick = (selectedApprover: Approver) => {
    onAssignApprover?.(selectedApprover)
    setSearchTerm("")
    setShowSearchResults(false)
  }

  const handleRemoveApprover = () => {
    onRemoveApprover?.()
  }

  // Determine the current state
  const getApprovalState = () => {
    if (!approver) return "empty"
    if (approval === "Approved") return "approved"
    if (approval === "Denied") return "denied"
    if (onApprove && onDeny) return "needs_action"
    return "pending"
  }

  const state = getApprovalState()

  // Get internal card title based on state
  const getInternalTitle = () => {
    switch (state) {
      case "approved":
        return "Approved"
      case "denied":
        return "Denied"
      case "pending":
        return "Pending"
      default:
        return null
    }
  }

  return (
    <Card>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
          Approver
        </h3>

        {/* Empty State - No approver assigned */}
        {state === "empty" && (
          <>
            {/* Search Input */}
            <div className="relative mb-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for approver by name, role, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className="w-full pl-10 pr-4 py-2 text-sm"
                />
              </div>

              {/* Search Results Dropdown */}
              {showSearchResults && searchTerm && filteredResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {filteredResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleApproverClick(result)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Avatar className="size-10">
                        <AvatarImage src={result.avatar} alt={result.name} />
                        <AvatarFallback className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 text-sm">
                          {result.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {result.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {result.role} • {result.department}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Empty State Message */}
            <div className="text-center py-8">
              <div className="size-12 mx-auto mb-3 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-gray-400" />
              </div>
              <h4 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-1">
                No approver assigned
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This service request doesn't require approval
              </p>
            </div>
          </>
        )}

        {/* State 1: Needs Action - Approver assigned, can approve/deny */}
        {state === "needs_action" && approver && (
          <div className="space-y-4">
            <div className="p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <ApproverInfo approver={approver} />
                <button
                  onClick={handleRemoveApprover}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                </button>
              </div>
            </div>

            {/* Approve/Deny Buttons */}
            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="flex-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 border border-blue-600 dark:border-blue-400"
                onClick={onApprove}
              >
                Approve
              </Button>
              <Button
                variant="ghost"
                className="flex-1 text-pink-600 hover:text-pink-700 hover:bg-pink-50 dark:text-pink-400 dark:hover:bg-pink-900/20 border border-pink-600 dark:border-pink-400"
                onClick={onDeny}
              >
                Deny
              </Button>
            </div>
          </div>
        )}

        {/* State 2: Approved */}
        {state === "approved" && approver && (
          <div className="p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                {getInternalTitle()}
              </p>
              {approvalDate && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {getRelativeTime(approvalDate)}
                </p>
              )}
            </div>
            <ApproverInfo approver={approver} />
          </div>
        )}

        {/* State 3: Denied */}
        {state === "denied" && approver && (
          <div className="p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                {getInternalTitle()}
              </p>
              {approvalDate && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {getRelativeTime(approvalDate)}
                </p>
              )}
            </div>
            <ApproverInfo approver={approver} />
          </div>
        )}

        {/* State 4: Pending Approval */}
        {state === "pending" && approver && (
          <div className="p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 mb-3">
              {getInternalTitle()}
            </p>
            <ApproverInfo approver={approver} />
          </div>
        )}
      </div>
    </Card>
  )
}
