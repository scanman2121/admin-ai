"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Checkbox } from "@/components/Checkbox"
import { Select } from "@/components/Select"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { RiAddLine, RiArrowLeftLine, RiBrushLine, RiServiceLine, RiSettingsLine, RiShieldLine, RiTeamLine, RiToolsLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Work Orders Settings page
const tabs = [
    { name: "Service Types", href: "/operations/work-orders/settings" },
    { name: "Teams", href: "/operations/work-orders/settings/teams" },
    { name: "Settings", href: "/operations/work-orders/settings/general" },
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
    const [teamConfig, setTeamConfig] = useState({
        autoRouting: true,
        loadBalancing: true,
        escalationEnabled: true,
        responseTimeTracking: true
    })
    
    // Routing rules state
    const [routingRules, setRoutingRules] = useState({
        priorityBased: true,
        locationBased: false,
        skillBased: true,
        timeBasedRouting: false
    })
    
    const handleTeamConfigToggle = (key: keyof typeof teamConfig) => {
        setTeamConfig(prev => ({ ...prev, [key]: !prev[key] }))
    }
    
    const handleRoutingRuleToggle = (key: keyof typeof routingRules) => {
        setRoutingRules(prev => ({ ...prev, [key]: !prev[key] }))
    }
    
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
                        Work Order Settings
                    </h1>
                </div>
                <Button variant="primary">
                    Save Changes
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

            {/* Team Management Content */}
            <div className="space-y-8">
                {/* Team Management Section */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                            Team Management
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Configure teams and routing rules for service requests
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Category-based Team Routing */}
                        <Card>
                            <div className="p-6">
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                                        Category-based Team Routing
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Automatically route requests based on service categories and team specializations.
                                    </p>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-2">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Auto-routing
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Automatically assign requests to appropriate teams
                                            </p>
                                        </div>
                                        <Switch
                                            checked={teamConfig.autoRouting}
                                            onCheckedChange={() => handleTeamConfigToggle('autoRouting')}
                                        />
                                    </div>
                                    
                                    <div className="flex items-center justify-between py-2">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Load Balancing
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Distribute workload evenly across team members
                                            </p>
                                        </div>
                                        <Switch
                                            checked={teamConfig.loadBalancing}
                                            onCheckedChange={() => handleTeamConfigToggle('loadBalancing')}
                                        />
                                    </div>
                                    
                                    <div className="flex items-center justify-between py-2">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Escalation Enabled
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Escalate unresolved requests to team leads
                                            </p>
                                        </div>
                                        <Switch
                                            checked={teamConfig.escalationEnabled}
                                            onCheckedChange={() => handleTeamConfigToggle('escalationEnabled')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Routing Rule Customization */}
                        <Card>
                            <div className="p-6">
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                                        Routing Rule Customization
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Configure advanced routing rules for optimal request assignment.
                                    </p>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-2">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Priority-based Routing
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Route high-priority requests to senior team members
                                            </p>
                                        </div>
                                        <Switch
                                            checked={routingRules.priorityBased}
                                            onCheckedChange={() => handleRoutingRuleToggle('priorityBased')}
                                        />
                                    </div>
                                    
                                    <div className="flex items-center justify-between py-2">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Location-based Routing
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Assign requests based on geographical proximity
                                            </p>
                                        </div>
                                        <Switch
                                            checked={routingRules.locationBased}
                                            onCheckedChange={() => handleRoutingRuleToggle('locationBased')}
                                        />
                                    </div>
                                    
                                    <div className="flex items-center justify-between py-2">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Skill-based Routing
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Match requests with team member expertise
                                            </p>
                                        </div>
                                        <Switch
                                            checked={routingRules.skillBased}
                                            onCheckedChange={() => handleRoutingRuleToggle('skillBased')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Team Member Management */}
                        <Card>
                            <div className="p-6">
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                                        Team Member Management
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Manage team member roles, permissions, and availability.
                                    </p>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                                            Member Assignment Rules
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <Checkbox id="auto-assign" defaultChecked />
                                                <label htmlFor="auto-assign" className="text-sm text-gray-900 dark:text-gray-100">
                                                    Auto-assign to available members
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Checkbox id="lead-approval" defaultChecked />
                                                <label htmlFor="lead-approval" className="text-sm text-gray-900 dark:text-gray-100">
                                                    Require team lead approval
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Checkbox id="backup-assignment" />
                                                <label htmlFor="backup-assignment" className="text-sm text-gray-900 dark:text-gray-100">
                                                    Enable backup member assignment
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Workload Distribution Settings */}
                        <Card>
                            <div className="p-6">
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                                        Workload Distribution Settings
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Configure how requests are distributed among team members.
                                    </p>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                                            Distribution Method
                                        </h4>
                                        <Select defaultValue="round-robin">
                                            <option value="round-robin">Round Robin</option>
                                            <option value="load-based">Load-based</option>
                                            <option value="skill-based">Skill-based</option>
                                            <option value="availability">Availability-based</option>
                                        </Select>
                                    </div>
                                    
                                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center justify-between py-2">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    Response Time Tracking
                                                </h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Monitor and optimize response times
                                                </p>
                                            </div>
                                            <Switch
                                                checked={teamConfig.responseTimeTracking}
                                                onCheckedChange={() => handleTeamConfigToggle('responseTimeTracking')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Default Teams Section */}
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
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="sm">
                                                    <RiSettingsLine className="h-4 w-4" />
                                                </Button>
                                                <Switch
                                                    checked={team.isActive}
                                                    onCheckedChange={() => handleTeamToggle(team.id)}
                                                />
                                            </div>
                                        </div>

                                        {team.isActive ? (
                                            <>
                                                {/* Service Categories */}
                                                <div className="mb-4">
                                                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                                                        Service Categories
                                                    </h4>
                                                    <Badge variant={team.color}>
                                                        {team.category}
                                                    </Badge>
                                                </div>

                                                {/* Team Members */}
                                                <div className="mb-4">
                                                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                                                        Team Members ({team.members.length})
                                                    </h4>
                                                    <div className="space-y-2">
                                                        {team.members.map((member) => (
                                                            <div key={member.id} className="flex items-center justify-between">
                                                                <div className="flex items-center gap-3">
                                                                    <Avatar className="size-8">
                                                                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                                                            {member.initials}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                            {member.name}
                                                                        </p>
                                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                            {member.role}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                {member.isLead && (
                                                                    <Badge variant="default" className="text-xs">
                                                                        Lead
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Request Types */}
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                                                        Handles Request Types
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
                                            </>
                                        ) : (
                                            <div className="text-center py-8">
                                                <RiTeamLine className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
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
        </div>
    )
}
