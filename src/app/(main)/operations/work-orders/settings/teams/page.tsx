"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Checkbox } from "@/components/Checkbox"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RiAddLine, RiArrowLeftLine, RiBrushLine, RiDeleteBin6Line, RiEdit2Line, RiMore2Line, RiSearchLine, RiServiceLine, RiShieldLine, RiTeamLine, RiToolsLine, RiUserAddLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Work Orders Settings page
const tabs = [
    { name: "Settings", href: "/operations/work-orders/settings/general" },
    { name: "Teams", href: "/operations/work-orders/settings/teams" },
    { name: "Categories", href: "/operations/work-orders/settings/categories" },
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
                <Button variant="primary">
                    Save
                </Button>
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
                                    <div className="p-6">
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

                                    {team.isActive && (
                                        <div className="space-y-4">
                                            <div>
                                                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                                                        Team members ({team.members.length})
                                                    </h4>
                                                <div className="flex -space-x-2">
                                                        {team.members.map((member) => (
                                                        <Avatar key={member.id} className="border-2 border-white dark:border-gray-800">
                                                            <AvatarFallback className="text-xs font-medium bg-gray-100 dark:bg-gray-700">
                                                                            {member.initials}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                        ))}
                                                    </div>
                                                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                                    {team.members.find(m => m.isLead)?.name} (Lead) + {team.members.filter(m => !m.isLead).length} members
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                                                        Service category and request types
                                                    </h4>
                                                    <div className="flex flex-wrap gap-1">
                                                        <Badge variant="success" className="text-xs">
                                                            {team.category}
                                                        </Badge>
                                                        {team.requestTypes.slice(0, 2).map((type) => (
                                                            <Badge key={type} variant="neutral" className="text-xs">
                                                                {type}
                                                            </Badge>
                                                        ))}
                                                        {team.requestTypes.length > 2 && (
                                                            <Badge variant="neutral" className="text-xs">
                                                                +{team.requestTypes.length - 2} more
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>

                                        </div>
                                    )}

                                    {!team.isActive && (
                                        <div className="text-center py-4 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                                                <RiTeamLine className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                                    No team configured for {team.category.toLowerCase()} requests
                                                </p>
                                                <Button variant="primary" size="sm">
                                                    Configure team
                                                </Button>
                                            </div>
                                        )}
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
                        <DialogTitle>{isEditMode ? 'Edit Team' : 'Add New Team'}</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="team-name">Team Name *</Label>
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
                            <Label htmlFor="team-category">Category</Label>
                            <select
                                id="team-category"
                                value={newTeam.category}
                                onChange={(e) => setNewTeam(prev => ({ ...prev, category: e.target.value }))}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="Security">Security</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Cleaning">Cleaning</option>
                                <option value="Concierge">Concierge</option>
                            </select>
                        </div>
                        
                        <div>
                            <Label>Team Members</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                Search and add users to this team
                            </p>
                            
                            {/* Selected Users */}
                            {selectedUsers.length > 0 && (
                                <div className="mb-3">
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
                            
                            {/* User Search */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <RiSearchLine className="size-4 text-gray-400" />
                                </div>
                                <Input
                                    placeholder="Search users by name or email..."
                                    value={userSearchQuery}
                                    onChange={(e) => setUserSearchQuery(e.target.value)}
                                    className="pl-10"
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
                        </div>
                        
                        <div>
                            <Label>Request Types</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                Select which request types this team will handle
                            </p>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                                {[
                                    'Access Request', 'Key Card Request', 'Visitor Access', 'Security Incident',
                                    'HVAC Issue', 'Plumbing Repair', 'Electrical Problem', 'General Repair',
                                    'Deep Cleaning', 'Carpet Cleaning', 'Window Cleaning', 'Waste Removal',
                                    'Package Delivery', 'Event Setup', 'Guest Services', 'Information Request'
                                ].map((requestType) => (
                                    <div key={requestType} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`request-${requestType}`}
                                            checked={newTeam.requestTypes.includes(requestType)}
                                            onCheckedChange={() => handleRequestTypeToggle(requestType)}
                                        />
                                        <label htmlFor={`request-${requestType}`} className="text-sm text-gray-900 dark:text-gray-100">
                                            {requestType}
                                        </label>
                                    </div>
                                ))}
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
                            {isEditMode ? 'Update Team' : 'Add Team'}
                        </Button>
            </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}