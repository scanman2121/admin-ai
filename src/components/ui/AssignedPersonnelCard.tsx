"use client"

import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, X } from "lucide-react"
import { useState } from "react"

interface Personnel {
  id: string
  name: string
  email: string
  avatar?: string
  initials: string
  role?: string
}

interface AssignedPersonnelCardProps {
  assignedPersonnel?: Personnel[]
  onAssignPersonnel?: (person: Personnel) => void
  onRemovePersonnel?: (personId: string) => void
}

// Mock search results - in a real app, this would come from an API
const mockSearchResults: Personnel[] = [
  {
    id: "search-1",
    name: "John Doe",
    email: "john.doe@company.com",
    avatar: "/avatars/john-doe.jpg",
    initials: "JD"
  },
  {
    id: "search-2", 
    name: "Jane Smith",
    email: "jane.smith@company.com",
    avatar: "/avatars/jane-smith.jpg",
    initials: "JS"
  },
  {
    id: "search-3",
    name: "Mike Johnson", 
    email: "mike.johnson@company.com",
    avatar: "/avatars/mike-johnson.jpg",
    initials: "MJ"
  },
  {
    id: "search-4",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com", 
    avatar: "/avatars/sarah-wilson.jpg",
    initials: "SW"
  }
]

export function AssignedPersonnelCard({ 
  assignedPersonnel = [], 
  onAssignPersonnel,
  onRemovePersonnel 
}: AssignedPersonnelCardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)

  const filteredResults = mockSearchResults.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.email.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(person => !assignedPersonnel.find(assigned => assigned.id === person.id))

  const handleSearchFocus = () => {
    setShowSearchResults(true)
  }

  const handleSearchBlur = () => {
    // Delay hiding to allow clicks on results
    setTimeout(() => setShowSearchResults(false), 200)
  }

  const handlePersonClick = (person: Personnel) => {
    onAssignPersonnel?.(person)
    setSearchTerm("")
    setShowSearchResults(false)
  }

  const handleRemovePerson = (personId: string) => {
    onRemovePersonnel?.(personId)
  }

  return (
    <Card>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
          Assigned personnel
        </h3>
        
        {/* Search Input */}
        <div className="relative mb-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search users by name or email..."
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
              {filteredResults.map((person) => (
                <button
                  key={person.id}
                  onClick={() => handlePersonClick(person)}
                  className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Avatar className="size-10">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                      {person.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {person.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {person.email}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Assigned Personnel */}
        {assignedPersonnel.length > 0 ? (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Assigned ({assignedPersonnel.length})
            </h4>
            <div className="space-y-2">
              {assignedPersonnel.map((person) => (
                <div
                  key={person.id}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                        {person.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {person.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {person.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemovePerson(person.id)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-8">
            <div className="size-12 mx-auto mb-3 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-gray-400" />
            </div>
            <h4 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-1">
              No personnel assigned yet
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Once personnel are assigned, they will appear here
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
