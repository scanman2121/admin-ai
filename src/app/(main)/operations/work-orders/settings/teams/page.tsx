"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Checkbox } from "@/components/Checkbox"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FullPageModal } from "@/components/ui/FullPageModal"
import { RiAddLine, RiArrowDownSLine, RiArrowLeftLine, RiArrowRightSLine, RiBrushLine, RiDeleteBin6Line, RiEdit2Line, RiMore2Line, RiSearchLine, RiServiceLine, RiShieldLine, RiTeamLine, RiToolsLine, RiUserAddLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Work Orders Settings page
const tabs = [
    { name: "Settings", href: "/operations/work-orders/settings/general" },
    { name: "Teams", href: "/operations/work-orders/settings/teams" },
    { name: "Categories", href: "/operations/work-orders/settings/categories" },
    { name: "Statuses", href: "/operations/work-orders/settings/statuses" },
    { name: "Service Types", href: "/operations/work-orders/settings" },
]

// Sample users data for search
const sampleUsers = [
    { id: '1', name: 'David Wilson', role: 'Security Lead', initials: 'DW', email: 'david.wilson@company.com' },
    { id: '2', name: 'Alex Chen', role: 'Security Officer', initials: 'AC', email: 'alex.chen@company.com' },
    { id: '3', name: 'Maria Rodriguez', role: 'Security Officer', initials: 'MR', email: 'maria.rodriguez@company.com' },
    { id: '4', name: 'John Smith', role: 'Maintenance Manager', initials: 'JS', email: 'john.smith@company.com' },
    { id: '5', name: 'Sarah Johnson', role: 'Technician', initials: 'SJ', email: 'sarah.johnson@company.com' },
    { id: '6', name: 'Mike Thompson', role: 'Technician', initials: 'MT', email: 'mike.thompson@company.com' },
    { id: '7', name: 'Emma Davis', role: 'Housekeeping Lead', initials: 'ED', email: 'emma.davis@company.com' },
    { id: '8', name: 'Carlos Martinez', role: 'Cleaner', initials: 'CM', email: 'carlos.martinez@company.com' },
    { id: '9', name: 'Lisa Wang', role: 'Concierge Manager', initials: 'LW', email: 'lisa.wang@company.com' },
    { id: '10', name: 'Robert Brown', role: 'Facility Manager', initials: 'RB', email: 'robert.brown@company.com' },
    { id: '11', name: 'Jennifer Lee', role: 'Operations Coordinator', initials: 'JL', email: 'jennifer.lee@company.com' },
    { id: '12', name: 'Michael Chang', role: 'Maintenance Technician', initials: 'MC', email: 'michael.chang@company.com' }
]

// Default teams data
const defaultTeams = [
    {
        id: 'security',
        name: 'Security Team',
        description: '24/7 security monitoring and incident response',
        category: 'Security',
        icon: RiShieldLine,
        color: 'error' as const,
        members: [
            { id: '1', name: 'David Wilson', role: 'Security Lead', initials: 'DW', isLead: true },
            { id: '2', name: 'Alex Chen', role: 'Security Officer', initials: 'AC', isLead: false },
            { id: '3', name: 'Maria Rodriguez', role: 'Security Officer', initials: 'MR', isLead: false }
        ],
        requestTypes: ['Access Request', 'Key Card Request', 'Visitor Access', 'Security Incident'],
        isActive: true
    },
    {
        id: 'maintenance',
        name: 'Maintenance Team', 
        description: 'Handles property-related requests and maintenance coordination',
        category: 'Maintenance',
        icon: RiToolsLine,
        color: 'warning' as const,
        members: [
            { id: '4', name: 'John Smith', role: 'Maintenance Manager', initials: 'JS', isLead: true },
            { id: '5', name: 'Sarah Johnson', role: 'Technician', initials: 'SJ', isLead: false },
            { id: '6', name: 'Mike Thompson', role: 'Technician', initials: 'MT', isLead: false }
        ],
        requestTypes: ['HVAC Issue', 'Plumbing Repair', 'Electrical Problem', 'General Repair'],
        isActive: true
    },
    {
        id: 'housekeeping',
        name: 'Housekeeping Team',
        description: 'Cleaning services and facility maintenance',
        category: 'Cleaning',
        icon: RiBrushLine,
        color: 'success' as const,
        members: [
            { id: '7', name: 'Emma Davis', role: 'Housekeeping Lead', initials: 'ED', isLead: true },
            { id: '8', name: 'Carlos Martinez', role: 'Cleaner', initials: 'CM', isLead: false }
        ],
        requestTypes: ['Deep Cleaning', 'Carpet Cleaning', 'Window Cleaning', 'Waste Removal'],
        isActive: true
    },
    {
        id: 'concierge',
        name: 'Concierge Team',
        description: 'Guest services and general assistance',
        category: 'Concierge',
        icon: RiServiceLine,
        color: 'default' as const,
        members: [
            { id: '9', name: 'Lisa Wang', role: 'Concierge Manager', initials: 'LW', isLead: true }
        ],
        requestTypes: ['Package Delivery', 'Event Setup', 'Guest Services', 'Information Request'],
        isActive: false // This one is not configured yet
    }
]

// Request types organized by category
const requestTypesByCategory = {
    Security: ['Access Request', 'Key Card Request', 'Visitor Access', 'Security Incident'],
    Maintenance: ['HVAC Issue', 'Plumbing Repair', 'Electrical Problem', 'General Repair'],
    Cleaning: ['Deep Cleaning', 'Carpet Cleaning', 'Window Cleaning', 'Waste Removal'],
    Concierge: ['Package Delivery', 'Event Setup', 'Guest Services', 'Information Request']
}

export default function WorkOrdersTeams() {
    const pathname = usePathname()
    
    // Team management state
    const [teams, setTeams] = useState(defaultTeams)
    const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [editingTeam, setEditingTeam] = useState<typeof defaultTeams[0] | null>(null)
    const [userSearchQuery, setUserSearchQuery] = useState("")
    const [selectedUsers, setSelectedUsers] = useState<typeof sampleUsers>([])    
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
    const [isSetupModalOpen, setIsSetupModalOpen] = useState(false)
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
    const [expandedTeamCardCategories, setExpandedTeamCardCategories] = useState<Set<string>>(new Set())
    const [newTeam, setNewTeam] = useState({
        name: "",
        description: "",
        category: "Security",
        requestTypes: [] as string[],
        members: [] as typeof sampleUsers
    })
    
    const handleTeamToggle = (teamId: string) => {
        setTeams(prev => prev.map(team => 
            team.id === teamId ? { ...team, isActive: !team.isActive } : team
        ))
    }

    const handleAddTeam = () => {
        if (!newTeam.name.trim() || !newTeam.description.trim()) {
            return
        }

        const teamId = isEditMode ? editingTeam!.id : newTeam.name.toLowerCase().replace(/\s+/g, '-')
        const categoryIconMap = {
            Security: RiShieldLine,
            Maintenance: RiToolsLine,
            Cleaning: RiBrushLine,
            Concierge: RiServiceLine
        }
        const categoryColorMap = {
            Security: 'error' as const,
            Maintenance: 'warning' as const,
            Cleaning: 'success' as const,
            Concierge: 'default' as const
        }

        const teamData = {
            id: teamId,
            name: newTeam.name,
            description: newTeam.description,
            category: newTeam.category,
            icon: categoryIconMap[newTeam.category as keyof typeof categoryIconMap] || RiTeamLine,
            color: categoryColorMap[newTeam.category as keyof typeof categoryColorMap],
            members: newTeam.members.map(user => ({ ...user, isLead: false })),
            requestTypes: newTeam.requestTypes,
            isActive: true
        }

        if (isEditMode) {
            setTeams(prev => prev.map(team => team.id === editingTeam!.id ? teamData : team))
        } else {
            setTeams(prev => [...prev, teamData])
        }
        
        resetModal()
    }

    const handleEditTeam = (team: typeof defaultTeams[0]) => {
        setIsEditMode(true)
        setEditingTeam(team)
        setNewTeam({
            name: team.name,
            description: team.description,
            category: team.category,
            requestTypes: team.requestTypes,
            members: team.members.map(member => ({ ...member, email: `${member.name.toLowerCase().replace(' ', '.')}@company.com` }))
        })
        setSelectedUsers(team.members.map(member => ({ ...member, email: `${member.name.toLowerCase().replace(' ', '.')}@company.com` })))
        
        // Auto-expand categories that have selected request types
        const categoriesToExpand = new Set<string>()
        Object.entries(requestTypesByCategory).forEach(([category, requestTypes]) => {
            if (requestTypes.some(type => team.requestTypes.includes(type))) {
                categoriesToExpand.add(category)
            }
        })
        setExpandedCategories(categoriesToExpand)
        
        setIsAddTeamModalOpen(true)
    }

    const handleDeleteTeam = (teamId: string) => {
        setTeams(prev => prev.filter(team => team.id !== teamId))
        setOpenDropdownId(null)
    }

    const resetModal = () => {
        setNewTeam({
            name: "",
            description: "",
            category: "Security",
            requestTypes: [],
            members: []
        })
        setSelectedUsers([])
        setUserSearchQuery("")
        setExpandedCategories(new Set())
        setIsEditMode(false)
        setEditingTeam(null)
        setIsAddTeamModalOpen(false)
    }

    const handleRequestTypeToggle = (requestType: string) => {
        setNewTeam(prev => ({
            ...prev,
            requestTypes: prev.requestTypes.includes(requestType)
                ? prev.requestTypes.filter(type => type !== requestType)
                : [...prev.requestTypes, requestType]
        }))
    }

    const toggleCategoryExpansion = (category: string) => {
        setExpandedCategories(prev => {
            const newExpanded = new Set(prev)
            if (newExpanded.has(category)) {
                newExpanded.delete(category)
            } else {
                newExpanded.add(category)
            }
            return newExpanded
        })
    }

    const handleCategoryToggle = (category: string) => {
        const categoryRequestTypes = requestTypesByCategory[category as keyof typeof requestTypesByCategory]
        const allCategoryTypesSelected = categoryRequestTypes.every(type => 
            newTeam.requestTypes.includes(type)
        )

        setNewTeam(prev => ({
            ...prev,
            requestTypes: allCategoryTypesSelected
                ? prev.requestTypes.filter(type => !categoryRequestTypes.includes(type))
                : Array.from(new Set([...prev.requestTypes, ...categoryRequestTypes]))
        }))

        // Expand the category if we're selecting it
        if (!allCategoryTypesSelected) {
            setExpandedCategories(prev => {
                const newSet = new Set(prev)
                newSet.add(category)
                return newSet
            })
        }
    }

    const isCategoryFullySelected = (category: string) => {
        const categoryRequestTypes = requestTypesByCategory[category as keyof typeof requestTypesByCategory]
        return categoryRequestTypes.every(type => newTeam.requestTypes.includes(type))
    }

    const isCategoryPartiallySelected = (category: string) => {
        const categoryRequestTypes = requestTypesByCategory[category as keyof typeof requestTypesByCategory]
        return categoryRequestTypes.some(type => newTeam.requestTypes.includes(type)) &&
               !categoryRequestTypes.every(type => newTeam.requestTypes.includes(type))
    }

    const handleAddUser = (user: typeof sampleUsers[0]) => {
        if (!selectedUsers.find(u => u.id === user.id)) {
            const newSelectedUsers = [...selectedUsers, user]
            setSelectedUsers(newSelectedUsers)
            setNewTeam(prev => ({ ...prev, members: newSelectedUsers }))
        }
        setUserSearchQuery("")
    }

    const handleRemoveUser = (userId: string) => {
        const newSelectedUsers = selectedUsers.filter(u => u.id !== userId)
        setSelectedUsers(newSelectedUsers)
        setNewTeam(prev => ({ ...prev, members: newSelectedUsers }))
    }

    const filteredUsers = sampleUsers.filter(user => 
        !selectedUsers.find(u => u.id === user.id) &&
        (user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
         user.email.toLowerCase().includes(userSearchQuery.toLowerCase()))
    )

    const toggleTeamCardCategoryExpansion = (categoryKey: string) => {
        setExpandedTeamCardCategories(prev => {
            const newSet = new Set(Array.from(prev))
            if (newSet.has(categoryKey)) {
                newSet.delete(categoryKey)
            } else {
                newSet.add(categoryKey)
            }
            return newSet
        })
    }

    const getTeamRequestTypesByCategory = (team: typeof defaultTeams[0]) => {
        const categorizedTypes: Record<string, string[]> = {}
        
        // Group the team's request types by category
        Object.entries(requestTypesByCategory).forEach(([category, categoryTypes]) => {
            const teamTypesInCategory = team.requestTypes.filter(type => categoryTypes.includes(type))
            if (teamTypesInCategory.length > 0) {
                categorizedTypes[category] = teamTypesInCategory
            }
        })
        
        return categorizedTypes
    }

    return (
        <div className="space-y-6">
            {/* Header with back navigation */}
            <div className="flex items-center gap-3">
                <Link 
                    href="/operations/work-orders"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <RiArrowLeftLine className="mr-1 size-4" />
                    Work Orders
                </Link>
            </div>

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                        Work order settings
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <Button 
                        variant="ghost" 
                        onClick={() => setIsSetupModalOpen(true)}
                    >
                        Setup wizard
                    </Button>
                <Button variant="primary">
                        Save
                </Button>
                </div>
            </div>

            {/* Tab Navigation */}
            <TabNavigation>
                {tabs.map((tab) => (
                    <TabNavigationLink
                        key={tab.name}
                        asChild
                        active={pathname === tab.href}
                    >
                        <Link href={tab.href}>{tab.name}</Link>
                    </TabNavigationLink>
                ))}
            </TabNavigation>

            {/* Default Teams Content */}
                <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                            Teams
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Manage teams and assign members for different service categories
                            </p>
                        </div>
                        <Button variant="ghost" onClick={() => {
                            setIsEditMode(false)
                            setEditingTeam(null)
                            setIsAddTeamModalOpen(true)
                        }}>
                            <RiAddLine className="size-4 mr-1.5" />
                            Add team
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {teams.map((team) => {
                            return (
                                <Card key={team.id} className={!team.isActive ? 'opacity-60' : ''}>
                                    <div>
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                                                        {team.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {team.description}
                                                    </p>
                                                </div>
                                                    <div className="flex items-center gap-2 ml-4">
                                                <Switch
                                                    checked={team.isActive}
                                                    onCheckedChange={() => handleTeamToggle(team.id)}
                                                />
                                                        <div className="relative">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="p-2 h-8 w-8"
                                                                onClick={() => setOpenDropdownId(openDropdownId === team.id ? null : team.id)}
                                                            >
                                                                <RiMore2Line className="size-4" />
                                                            </Button>
                                                            
                                                            {openDropdownId === team.id && (
                                                                <>
                                                                    <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownId(null)} />
                                                                    <div className="absolute right-0 top-full mt-1 z-20 min-w-[120px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                                                                        <button
                                                                            onClick={() => {
                                                                                handleEditTeam(team)
                                                                                setOpenDropdownId(null)
                                                                            }}
                                                                            className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                                                                        >
                                                                            <RiEdit2Line className="size-4" />
                                                                            Edit
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDeleteTeam(team.id)}
                                                                            className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                                                        >
                                                                            <RiDeleteBin6Line className="size-4" />
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`space-y-4 ${!team.isActive ? 'opacity-60' : ''}`}>
                                            <div>
                                                    <h4 className={`text-sm font-medium mb-3 ${team.isActive ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-500'}`}>
                                                        Team members ({team.members.length})
                                                    </h4>
                                                <div className="space-y-1">
                                                        {team.members.map((member) => (
                                                        <div key={member.id} className={`text-sm ${team.isActive ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-500'}`}>
                                                                            {member.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className={`text-sm font-medium mb-2 ${team.isActive ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-500'}`}>
                                                        Service category and request types
                                                    </h4>
                                                    <div className="space-y-2">
                                                        {Object.entries(getTeamRequestTypesByCategory(team)).map(([category, requestTypes]) => {
                                                            const categoryKey = `${team.id}-${category}`
                                                            const isExpanded = expandedTeamCardCategories.has(categoryKey)
                                                            
                                                            return (
                                                                <div key={category} className="border border-gray-200 dark:border-gray-700 rounded-md">
                                                                    <button
                                                                        onClick={() => toggleTeamCardCategoryExpansion(categoryKey)}
                                                                        className={`w-full px-3 py-2 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors ${!team.isActive ? 'opacity-60' : ''}`}
                                                                    >
                                                                        <div className="flex items-center gap-2">
                                                                            <Badge variant={team.isActive ? "success" : "neutral"} className="text-xs">
                                                                                {category}
                                                            </Badge>
                                                                            <span className={`text-xs ${team.isActive ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'}`}>
                                                                                ({requestTypes.length} types)
                                                                            </span>
                                                                        </div>
                                                                        {isExpanded ? (
                                                                            <RiArrowDownSLine className={`size-4 ${team.isActive ? 'text-gray-400' : 'text-gray-500'}`} />
                                                                        ) : (
                                                                            <RiArrowRightSLine className={`size-4 ${team.isActive ? 'text-gray-400' : 'text-gray-500'}`} />
                                                                        )}
                                                                    </button>
                                                                    {isExpanded && (
                                                                        <div className="px-3 pb-2 space-y-1">
                                                                            {requestTypes.map((type) => (
                                                                                <div key={type} className={`pl-4 text-xs ${team.isActive ? 'text-gray-600 dark:text-gray-300' : 'text-gray-500 dark:text-gray-500'}`}>
                                                                                    • {type}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>

                                            {!team.isActive && (
                                                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-shrink-0 w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                                                        <p className="text-sm text-amber-800 dark:text-amber-200">
                                                            This team is currently inactive and won't receive new work order assignments.
                                                        </p>
                                                    </div>
                                            </div>
                                        )}

                                        </div>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </div>

            {/* Add/Edit Team Modal */}
            <Dialog open={isAddTeamModalOpen} onOpenChange={(open) => {
                if (!open) resetModal()
            }}>
                <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{isEditMode ? 'Edit team' : 'Add new team'}</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="team-name">Team name *</Label>
                            <Input
                                id="team-name"
                                placeholder="Enter team name"
                                value={newTeam.name}
                                onChange={(e) => setNewTeam(prev => ({ ...prev, name: e.target.value }))}
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="team-description">Description *</Label>
                            <Input
                                id="team-description"
                                placeholder="Enter team description"
                                value={newTeam.description}
                                onChange={(e) => setNewTeam(prev => ({ ...prev, description: e.target.value }))}
                            />
                        </div>
                        
                        <div>
                            <Label>Team members</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                Search and add users to this team
                            </p>
                            
                            {/* User Search */}
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <RiSearchLine className="size-4 text-gray-400" />
                                </div>
                                <Input
                                    placeholder="Search users by name or email..."
                                    value={userSearchQuery}
                                    onChange={(e) => setUserSearchQuery(e.target.value)}
                                    className="w-full pl-10"
                                />
                            </div>
                            
                            {/* User Search Results */}
                            {userSearchQuery && filteredUsers.length > 0 && (
                                <div className="mt-2 max-h-40 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-md">
                                    {filteredUsers.slice(0, 5).map((user) => (
                                        <button
                                            key={user.id}
                                            onClick={() => handleAddUser(user)}
                                            className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3"
                                        >
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-sm font-medium">
                                                {user.initials}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {user.name}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {user.role} • {user.email}
                                                </div>
                                            </div>
                                            <RiUserAddLine className="size-4 text-gray-400" />
                                        </button>
                                    ))}
                                </div>
                            )}
                            
                            {/* Selected Users Chips - Now Below Search */}
                            {selectedUsers.length > 0 && (
                                <div className="mt-3">
                                    <div className="flex flex-wrap gap-2">
                                        {selectedUsers.map((user) => (
                                            <div key={user.id} className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-sm">
                                                <span>{user.name}</span>
                                                <button
                                                    onClick={() => handleRemoveUser(user.id)}
                                                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div>
                            <Label>Service categories & request types</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                Select categories to automatically include all their request types, or customize individual selections
                            </p>
                            
                            <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                                {Object.entries(requestTypesByCategory).map(([category, requestTypes]) => {
                                    const isExpanded = expandedCategories.has(category)
                                    const isFullySelected = isCategoryFullySelected(category)
                                    const isPartiallySelected = isCategoryPartiallySelected(category)
                                    
                                    return (
                                        <div key={category} className="space-y-2">
                                            {/* Category Header */}
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleCategoryExpansion(category)}
                                                    className="flex items-center justify-center w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                >
                                                    {isExpanded ? (
                                                        <RiArrowDownSLine className="w-4 h-4" />
                                                    ) : (
                                                        <RiArrowRightSLine className="w-4 h-4" />
                                                    )}
                                                </button>
                                                <Checkbox
                                                    id={`category-${category}`}
                                                    checked={isFullySelected ? true : isPartiallySelected ? "indeterminate" : false}
                                                    onCheckedChange={() => handleCategoryToggle(category)}
                                                />
                                                <label 
                                                    htmlFor={`category-${category}`} 
                                                    className="font-medium text-sm text-gray-900 dark:text-gray-100 cursor-pointer"
                                                    onClick={() => toggleCategoryExpansion(category)}
                                                >
                                                    {category}
                                                </label>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    ({requestTypes.filter(type => newTeam.requestTypes.includes(type)).length}/{requestTypes.length})
                                                </span>
                                            </div>
                                            
                                            {/* Request Types (when expanded) */}
                                            {isExpanded && (
                                                <div className="ml-6 space-y-1.5">
                                                    {requestTypes.map((requestType) => (
                                                        <div key={requestType} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`request-${requestType}`}
                                                                checked={newTeam.requestTypes.includes(requestType)}
                                                                onCheckedChange={() => handleRequestTypeToggle(requestType)}
                                                            />
                                                            <label htmlFor={`request-${requestType}`} className="text-sm text-gray-700 dark:text-gray-300">
                                                                {requestType}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-3 mt-6">
                        <Button
                            variant="ghost"
                            onClick={resetModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddTeam}
                            disabled={!newTeam.name.trim() || !newTeam.description.trim()}
                        >
                            {isEditMode ? 'Update team' : 'Add team'}
                        </Button>
            </div>
                </DialogContent>
            </Dialog>

            {/* Setup Modal */}
            <FullPageModal
                isOpen={isSetupModalOpen}
                onClose={() => setIsSetupModalOpen(false)}
                title="Service Request Setup"
                iframeUrl="https://v0-workflow-system-design-sage.vercel.app/"
            />
        </div>
    )
}