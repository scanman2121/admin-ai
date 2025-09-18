"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RiAddLine, RiArrowLeftLine, RiSettings3Line } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Access Control Settings page
const tabs = [
    { name: "General", href: "/operations/access-control/settings" },
    { name: "Credentials", href: "/operations/access-control/settings/credentials" },
    { name: "Card Art", href: "/operations/access-control/settings/card-art" },
    { name: "Security", href: "/operations/access-control/settings/security" },
    { name: "Devices", href: "/operations/access-control/settings/devices" },
    { name: "Notifications", href: "/operations/access-control/settings/notifications" },
    { name: "Advanced", href: "/operations/access-control/settings/advanced" },
]

// Access control policies data
const accessControlPoliciesData = [
    {
        id: 1,
        policyName: "Standard Employee Access",
        description: "Default access level for employees",
        accessLevel: "Employee",
        hours: "Business Hours",
        zones: "Common Areas, Office Floors",
        status: true,
    },
    {
        id: 2,
        policyName: "Manager Access",
        description: "Extended access for management staff",
        accessLevel: "Manager",
        hours: "Extended Hours",
        zones: "All Areas",
        status: true,
    },
    {
        id: 3,
        policyName: "Visitor Access",
        description: "Limited access for visitors",
        accessLevel: "Visitor",
        hours: "Business Hours",
        zones: "Lobby, Conference Rooms",
        status: true,
    },
    {
        id: 4,
        policyName: "Maintenance Access",
        description: "Service personnel access",
        accessLevel: "Service",
        hours: "24/7",
        zones: "Service Areas, Mechanical",
        status: true,
    },
    {
        id: 5,
        policyName: "Executive Access",
        description: "Full building access for executives",
        accessLevel: "Executive",
        hours: "24/7",
        zones: "All Areas",
        status: false,
    },
]

// Access level color mapping
const getAccessLevelBadgeVariant = (accessLevel: string) => {
    switch (accessLevel) {
        case "Employee":
            return "default" as const
        case "Manager":
            return "warning" as const
        case "Visitor":
            return "neutral" as const
        case "Service":
            return "success" as const
        case "Executive":
            return "error" as const
        default:
            return "default" as const
    }
}

export default function AccessControlSettings() {
    const pathname = usePathname()
    const [accessPolicies, setAccessPolicies] = useState(accessControlPoliciesData)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [accessLevelFilter, setAccessLevelFilter] = useState("All Levels")
    const [isAddPolicyModalOpen, setIsAddPolicyModalOpen] = useState(false)
    const [newPolicy, setNewPolicy] = useState({
        policyName: "",
        description: "",
        accessLevel: "Employee",
        hours: "Business Hours",
        zones: ""
    })

    const handleStatusToggle = (id: number) => {
        setAccessPolicies(prev => 
            prev.map(item => 
                item.id === id ? { ...item, status: !item.status } : item
            )
        )
    }

    const handleAddPolicy = () => {
        if (!newPolicy.policyName.trim() || !newPolicy.description.trim() || !newPolicy.zones.trim()) {
            return
        }

        const newId = Math.max(...accessPolicies.map(item => item.id)) + 1
        const policy = {
            id: newId,
            ...newPolicy,
            status: true
        }

        setAccessPolicies(prev => [...prev, policy])
        setNewPolicy({
            policyName: "",
            description: "",
            accessLevel: "Employee",
            hours: "Business Hours",
            zones: ""
        })
        setIsAddPolicyModalOpen(false)
    }

    const filteredPolicies = accessPolicies.filter(item => {
        const matchesSearch = item.policyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "All" || 
                            (statusFilter === "Active" && item.status) ||
                            (statusFilter === "Inactive" && !item.status)
        const matchesAccessLevel = accessLevelFilter === "All Levels" || item.accessLevel === accessLevelFilter

        return matchesSearch && matchesStatus && matchesAccessLevel
    })

    return (
        <div className="space-y-6">
            {/* Header with back navigation */}
            <div className="flex items-center gap-3">
                <Link 
                    href="/operations/access-control"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <RiArrowLeftLine className="mr-1 size-4" />
                    Access Control
                </Link>
            </div>

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                        Access Control Settings
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

            {/* Access Policies Content */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                            Access Policies
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {accessPolicies.filter(item => item.status).length} of {accessPolicies.length} access policies enabled
                        </p>
                    </div>
                    <Button variant="ghost" onClick={() => setIsAddPolicyModalOpen(true)}>
                        <RiAddLine className="size-4 mr-1.5" />
                        Add Policy
                    </Button>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="Search access policies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option>All</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                    
                    <select 
                        value={accessLevelFilter}
                        onChange={(e) => setAccessLevelFilter(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option>All Levels</option>
                        <option>Employee</option>
                        <option>Manager</option>
                        <option>Visitor</option>
                        <option>Service</option>
                        <option>Executive</option>
                    </select>
                </div>

                {/* Access Policies Table */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Policy Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Access Level
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Hours
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Zones
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Enable
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredPolicies.map((policy) => (
                                <tr key={policy.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                                {policy.policyName}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {policy.description}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge variant={getAccessLevelBadgeVariant(policy.accessLevel)}>
                                            {policy.accessLevel}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-50">
                                        {policy.hours}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-50">
                                        {policy.zones}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Switch
                                            checked={policy.status}
                                            onCheckedChange={() => handleStatusToggle(policy.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="p-2 h-8 w-8"
                                        >
                                            <RiSettings3Line className="size-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {filteredPolicies.length === 0 && (
                        <div className="p-8 text-center">
                            <p className="text-gray-500 dark:text-gray-400">
                                No access policies found matching your criteria.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Policy Modal */}
            <Dialog open={isAddPolicyModalOpen} onOpenChange={setIsAddPolicyModalOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add Access Policy</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="policyName">Policy Name *</Label>
                            <Input
                                id="policyName"
                                placeholder="Enter policy name"
                                value={newPolicy.policyName}
                                onChange={(e) => setNewPolicy(prev => ({ ...prev, policyName: e.target.value }))}
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="description">Description *</Label>
                            <Input
                                id="description"
                                placeholder="Enter description"
                                value={newPolicy.description}
                                onChange={(e) => setNewPolicy(prev => ({ ...prev, description: e.target.value }))}
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="accessLevel">Access Level</Label>
                            <select
                                id="accessLevel"
                                value={newPolicy.accessLevel}
                                onChange={(e) => setNewPolicy(prev => ({ ...prev, accessLevel: e.target.value }))}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option>Employee</option>
                                <option>Manager</option>
                                <option>Visitor</option>
                                <option>Service</option>
                                <option>Executive</option>
                            </select>
                        </div>
                        
                        <div>
                            <Label htmlFor="hours">Hours</Label>
                            <select
                                id="hours"
                                value={newPolicy.hours}
                                onChange={(e) => setNewPolicy(prev => ({ ...prev, hours: e.target.value }))}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option>Business Hours</option>
                                <option>Extended Hours</option>
                                <option>24/7</option>
                                <option>Custom</option>
                            </select>
                        </div>
                        
                        <div>
                            <Label htmlFor="zones">Zones *</Label>
                            <Input
                                id="zones"
                                placeholder="Enter accessible zones"
                                value={newPolicy.zones}
                                onChange={(e) => setNewPolicy(prev => ({ ...prev, zones: e.target.value }))}
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-3 mt-6">
                        <Button
                            variant="ghost"
                            onClick={() => setIsAddPolicyModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddPolicy}
                            disabled={!newPolicy.policyName.trim() || !newPolicy.description.trim() || !newPolicy.zones.trim()}
                        >
                            Add Policy
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
