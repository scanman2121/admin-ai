"use client"

import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Brush, Headphones, Search, Shield, Users, Wrench, X } from "lucide-react"
import { useState } from "react"

interface Personnel {
  id: string
  name: string
  email: string
  avatar?: string
  initials: string
  role?: string
  type?: 'individual'
}

interface Team {
  id: string
  name: string
  description: string
  category: string
  members: Array<{
    id: string
    name: string
    role: string
    initials: string
    isLead: boolean
  }>
  requestTypes: string[]
  isActive: boolean
  type: 'team'
}

type Assignment = Personnel | Team

interface AssignedPersonnelCardProps {
  assignedPersonnel?: Assignment[]
  onAssignPersonnel?: (assignment: Assignment) => void
  onRemovePersonnel?: (assignmentId: string) => void
}

// Mock search results - in a real app, this would come from an API
const mockIndividualResults: Personnel[] = [
  {
    id: "search-1",
    name: "John Doe",
    email: "john.doe@company.com",
    avatar: "/avatars/john-doe.jpg",
    initials: "JD",
    type: 'individual'
  },
  {
    id: "search-2", 
    name: "Jane Smith",
    email: "jane.smith@company.com",
    avatar: "/avatars/jane-smith.jpg",
    initials: "JS",
    type: 'individual'
  },
  {
    id: "search-3",
    name: "Mike Johnson", 
    email: "mike.johnson@company.com",
    avatar: "/avatars/mike-johnson.jpg",
    initials: "MJ",
    type: 'individual'
  },
  {
    id: "search-4",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com", 
    avatar: "/avatars/sarah-wilson.jpg",
    initials: "SW",
    type: 'individual'
  }
]

const mockTeamResults: Team[] = [
  {
    id: 'security',
    name: 'Security Team',
    description: '24/7 security monitoring and incident response',
    category: 'Security',
    members: [
        { id: '1', name: 'David Wilson', role: 'Security Lead', initials: 'DW', isLead: true },
        { id: '2', name: 'Alex Chen', role: 'Security Officer', initials: 'AC', isLead: false },
        { id: '3', name: 'Maria Rodriguez', role: 'Security Officer', initials: 'MR', isLead: false }
    ],
    requestTypes: ['Access Request', 'Key Card Request', 'Visitor Access', 'Security Incident'],
    isActive: true,
    type: 'team'
  },
  {
    id: 'maintenance',
    name: 'Maintenance Team', 
    description: 'Handles property-related requests and maintenance coordination',
    category: 'Maintenance',
    members: [
        { id: '4', name: 'John Smith', role: 'Maintenance Manager', initials: 'JS', isLead: true },
        { id: '5', name: 'Sarah Johnson', role: 'Technician', initials: 'SJ', isLead: false },
        { id: '6', name: 'Mike Thompson', role: 'Technician', initials: 'MT', isLead: false }
    ],
    requestTypes: ['HVAC Issue', 'Plumbing Repair', 'Electrical Problem', 'General Repair'],
    isActive: true,
    type: 'team'
  },
  {
    id: 'housekeeping',
    name: 'Housekeeping Team',
    description: 'Cleaning services and facility maintenance',
    category: 'Cleaning',
    members: [
        { id: '7', name: 'Emma Davis', role: 'Housekeeping Lead', initials: 'ED', isLead: true },
        { id: '8', name: 'Carlos Martinez', role: 'Cleaner', initials: 'CM', isLead: false }
    ],
    requestTypes: ['Deep Cleaning', 'Carpet Cleaning', 'Window Cleaning', 'Waste Removal'],
    isActive: true,
    type: 'team'
  },
  {
    id: 'concierge',
    name: 'Concierge Team',
    description: 'Guest services and general assistance',
    category: 'Concierge',
    members: [
        { id: '9', name: 'Lisa Wang', role: 'Concierge Manager', initials: 'LW', isLead: true }
    ],
    requestTypes: ['Package Delivery', 'Event Setup', 'Guest Services', 'Information Request'],
    isActive: true,
    type: 'team'
  }
]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Security': return Shield
    case 'Maintenance': return Wrench  
    case 'Cleaning': return Brush
    case 'Concierge': return Headphones
    default: return Users
  }
}

export function AssignedPersonnelCard({ 
  assignedPersonnel = [], 
  onAssignPersonnel,
  onRemovePersonnel 
}: AssignedPersonnelCardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)

  // Combine and filter both individuals and teams
  const allSearchResults: Assignment[] = [
    ...mockIndividualResults,
    ...mockTeamResults.filter(team => team.isActive)
  ]

  const filteredResults = allSearchResults.filter(result => {
    const matchesSearch = result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ('email' in result && result.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ('description' in result && result.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ('category' in result && result.category.toLowerCase().includes(searchTerm.toLowerCase()))

    const notAlreadyAssigned = !assignedPersonnel.find(assigned => assigned.id === result.id)
    
    return matchesSearch && notAlreadyAssigned
  })

  const handleSearchFocus = () => {
    setShowSearchResults(true)
  }

  const handleSearchBlur = () => {
    // Delay hiding to allow clicks on results
    setTimeout(() => setShowSearchResults(false), 200)
  }

  const handleAssignmentClick = (assignment: Assignment) => {
    onAssignPersonnel?.(assignment)
    setSearchTerm("")
    setShowSearchResults(false)
  }

  const handleRemoveAssignment = (assignmentId: string) => {
    onRemovePersonnel?.(assignmentId)
  }

  return (
    <Card>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
          Assigned personnel
        </h3>
        
        {/* Search Input */}
        <div className="relative mb-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, email, team, or category..."
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
                  onClick={() => handleAssignmentClick(result)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {result.type === 'team' ? (
                    <>
                      <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        {(() => {
                          const IconComponent = getCategoryIcon(result.category)
                          return <IconComponent className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        })()}
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {result.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {result.description} • {result.members.length} members
                        </p>
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                        Team
                      </div>
                    </>
                  ) : (
                    <>
                      <Avatar className="size-10">
                        <AvatarImage src={result.avatar} alt={result.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                          {result.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {result.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {result.email}
                        </p>
                      </div>
                    </>
                  )}
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
            <div className="space-y-3">
              {assignedPersonnel.map((assignment) => (
                <div
                  key={assignment.id}
                  className={`p-3 rounded-lg ${
                    assignment.type === 'team' 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' 
                      : 'bg-gray-50 dark:bg-gray-800'
                  }`}
                >
                  {assignment.type === 'team' ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm">
                            {(() => {
                              const IconComponent = getCategoryIcon(assignment.category)
                              return <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            })()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                                {assignment.name}
                              </p>
                              <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded">
                                Team
                              </div>
                            </div>
                            <p className="text-xs text-blue-700 dark:text-blue-300">
                              {assignment.description}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveAssignment(assignment.id)}
                          className="p-1 hover:bg-blue-100 dark:hover:bg-blue-800/50 rounded transition-colors"
                        >
                          <X className="h-4 w-4 text-blue-400 hover:text-blue-600 dark:hover:text-blue-300" />
                        </button>
                      </div>
                      
                      {/* Team Members */}
                      <div className="ml-13">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-xs font-medium text-blue-700 dark:text-blue-300">
                            Team Members ({assignment.members.length})
                          </p>
                        </div>
                        <div className="flex -space-x-1">
                          {assignment.members.slice(0, 4).map((member) => (
                            <Avatar key={member.id} className="size-6 border-2 border-white dark:border-gray-800">
                              <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                {member.initials}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {assignment.members.length > 4 && (
                            <div className="size-6 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                +{assignment.members.length - 4}
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          Lead: {assignment.members.find(m => m.isLead)?.name || 'Unassigned'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                          <AvatarImage src={assignment.avatar} alt={assignment.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                            {assignment.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {assignment.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {assignment.email}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveAssignment(assignment.id)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                      >
                        <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                      </button>
                    </div>
                  )}
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
              No assignments yet
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Search for teams or individuals to assign to this work order
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
