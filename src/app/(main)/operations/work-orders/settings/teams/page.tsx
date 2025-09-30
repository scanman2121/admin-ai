"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { RiAddLine, RiArrowLeftLine, RiBrushLine, RiServiceLine, RiSettingsLine, RiShieldLine, RiTeamLine, RiToolsLine } from "@remixicon/react"
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
    
    const handleTeamToggle = (teamId: string) => {
        setTeams(prev => prev.map(team => 
            team.id === teamId ? { ...team, isActive: !team.isActive } : team
        ))
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
                            Default Teams
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Pre-configured teams for common service categories
                            </p>
                        </div>
                        <Button variant="primary" className="flex items-center gap-2">
                            <RiAddLine className="h-4 w-4" />
                            Add Custom Team
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {teams.map((team) => {
                            const IconComponent = team.icon
                            return (
                                <Card key={team.id} className={!team.isActive ? 'opacity-60' : ''}>
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${
                                                    team.color === 'error' ? 'bg-red-100 dark:bg-red-900/20' :
                                                    team.color === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                                                    team.color === 'success' ? 'bg-green-100 dark:bg-green-900/20' :
                                                    'bg-blue-100 dark:bg-blue-900/20'
                                                }`}>
                                                    <IconComponent className={`h-5 w-5 ${
                                                        team.color === 'error' ? 'text-red-600 dark:text-red-400' :
                                                        team.color === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                                                        team.color === 'success' ? 'text-green-600 dark:text-green-400' :
                                                        'text-blue-600 dark:text-blue-400'
                                                    }`} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                                                        {team.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {team.description}
                                                    </p>
                                                </div>
                                            </div>
                                                <Switch
                                                    checked={team.isActive}
                                                    onCheckedChange={() => handleTeamToggle(team.id)}
                                                />
                                        </div>

                                    {team.isActive && (
                                        <div className="space-y-4">
                                            <div>
                                                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                                                        Team Members ({team.members.length})
                                                    </h4>
                                                <div className="flex -space-x-2">
                                                        {team.members.map((member) => (
                                                        <Avatar key={member.id} className="border-2 border-white dark:border-gray-800 relative">
                                                            <AvatarFallback className="text-xs font-medium bg-gray-100 dark:bg-gray-700">
                                                                            {member.initials}
                                                                        </AvatarFallback>
                                                            {member.isLead && (
                                                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-white dark:border-gray-800">
                                                                    <RiSettingsLine className="w-2 h-2 text-white absolute top-0.5 left-0.5" />
                                                                </div>
                                                                )}
                                                        </Avatar>
                                                        ))}
                                                    </div>
                                                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                                    {team.members.find(m => m.isLead)?.name} (Lead) + {team.members.filter(m => !m.isLead).length} members
                                                </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                                                    Assigned Request Types
                                                    </h4>
                                                    <div className="flex flex-wrap gap-1">
                                                        {team.requestTypes.slice(0, 3).map((type) => (
                                                            <Badge key={type} variant="neutral" className="text-xs">
                                                                {type}
                                                            </Badge>
                                                        ))}
                                                        {team.requestTypes.length > 3 && (
                                                            <Badge variant="neutral" className="text-xs">
                                                                +{team.requestTypes.length - 3} more
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>

                                            <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                                                <Button variant="ghost" size="sm" className="w-full">
                                                    Configure Team Settings
                                                </Button>
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
                                                    Configure Team
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}