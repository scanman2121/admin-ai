"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { RiArrowLeftLine, RiSettings3Line, RiAddLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Work Orders Settings page
const tabs = [
    { name: "Service Types", href: "/operations/work-orders/settings" },
    { name: "Teams", href: "/operations/work-orders/settings/teams" },
    { name: "Settings", href: "/operations/work-orders/settings/general" },
]

// Comprehensive service types data based on the v0 prototype
const serviceTypesData = [
    // Security Category
    {
        id: 1,
        requestType: "Access Request",
        description: "Building or area access requests",
        category: "Security",
        approval: "Tenant POC",
        assignedTo: "Security Team",
        status: true,
    },
    {
        id: 2,
        requestType: "Key Card Request", 
        description: "New or replacement key cards",
        category: "Security",
        approval: "Tenant POC",
        assignedTo: "Security Team",
        status: true,
    },
    {
        id: 3,
        requestType: "Visitor Access",
        description: "Temporary visitor access setup",
        category: "Security",
        approval: "Tenant POC",
        assignedTo: "Security Team",
        status: true,
    },
    {
        id: 4,
        requestType: "Security Incident",
        description: "Security-related incidents",
        category: "Security",
        approval: "Direct",
        assignedTo: "Security Team",
        status: true,
    },
    {
        id: 5,
        requestType: "Lock/Unlock Request",
        description: "Door lock/unlock requests",
        category: "Security",
        approval: "Direct",
        assignedTo: "Security Team",
        status: true,
    },
    // Maintenance Category
    {
        id: 6,
        requestType: "HVAC Issue",
        description: "Heating, ventilation, and AC problems",
        category: "Maintenance",
        approval: "Direct",
        assignedTo: "Maintenance Team",
        status: true,
    },
    {
        id: 7,
        requestType: "Plumbing Repair",
        description: "Plumbing and water-related issues",
        category: "Maintenance",
        approval: "Direct",
        assignedTo: "Maintenance Team",
        status: true,
    },
    {
        id: 8,
        requestType: "Electrical Problem",
        description: "Electrical system issues",
        category: "Maintenance",
        approval: "Direct",
        assignedTo: "Maintenance Team",
        status: true,
    },
    {
        id: 9,
        requestType: "General Repair",
        description: "General maintenance and repairs",
        category: "Maintenance",
        approval: "Direct",
        assignedTo: "Maintenance Team",
        status: true,
    },
    {
        id: 10,
        requestType: "Appliance Issue",
        description: "Appliance repairs and maintenance",
        category: "Maintenance",
        approval: "Direct",
        assignedTo: "Maintenance Team",
        status: true,
    },
    // Cleaning Category
    {
        id: 11,
        requestType: "Deep Cleaning",
        description: "Thorough cleaning services",
        category: "Cleaning",
        approval: "Direct",
        assignedTo: "Housekeeping Team",
        status: false,
    },
    {
        id: 12,
        requestType: "Carpet Cleaning",
        description: "Carpet and upholstery cleaning",
        category: "Cleaning",
        approval: "Direct",
        assignedTo: "Housekeeping Team",
        status: true,
    },
    {
        id: 13,
        requestType: "Window Cleaning",
        description: "Window and glass cleaning",
        category: "Cleaning",
        approval: "Direct",
        assignedTo: "Housekeeping Team",
        status: true,
    },
    {
        id: 14,
        requestType: "Waste Removal",
        description: "Waste and debris removal",
        category: "Cleaning",
        approval: "Direct",
        assignedTo: "Housekeeping Team",
        status: true,
    },
    {
        id: 15,
        requestType: "Supply Restocking",
        description: "Restocking supplies and amenities",
        category: "Cleaning",
        approval: "Direct",
        assignedTo: "Housekeeping Team",
        status: true,
    },
    // Concierge Category
    {
        id: 16,
        requestType: "Package Delivery",
        description: "Package handling and delivery",
        category: "Concierge",
        approval: "Direct",
        assignedTo: "Concierge Team",
        status: true,
    },
    {
        id: 17,
        requestType: "Event Setup",
        description: "Event planning and setup",
        category: "Concierge",
        approval: "Tenant POC",
        assignedTo: "Concierge Team",
        status: true,
    },
    {
        id: 18,
        requestType: "Guest Services",
        description: "General guest assistance",
        category: "Concierge",
        approval: "Direct",
        assignedTo: "Concierge Team",
        status: true,
    },
    {
        id: 19,
        requestType: "Information Request",
        description: "Information and directions",
        category: "Concierge",
        approval: "Direct",
        assignedTo: "Concierge Team",
        status: true,
    },
    {
        id: 20,
        requestType: "Reservation Assistance",
        description: "Booking and reservation help",
        category: "Concierge",
        approval: "Direct",
        assignedTo: "Concierge Team",
        status: false,
    },
]

// Category color mapping
const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
        case "Security":
            return "error" as const
        case "Maintenance":
            return "warning" as const
        case "Cleaning":
            return "success" as const
        case "Concierge":
            return "default" as const
        default:
            return "default" as const
    }
}

export default function WorkOrdersSettings() {
    const pathname = usePathname()
    const [serviceTypes, setServiceTypes] = useState(serviceTypesData)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [categoryFilter, setCategoryFilter] = useState("All Categories")
    const [isAddCustomModalOpen, setIsAddCustomModalOpen] = useState(false)
    const [newServiceType, setNewServiceType] = useState({
        requestType: "",
        description: "",
        category: "Security",
        approval: "Direct",
        assignedTo: ""
    })

    const handleStatusToggle = (id: number) => {
        setServiceTypes(prev => 
            prev.map(item => 
                item.id === id ? { ...item, status: !item.status } : item
            )
        )
    }

    const handleAddCustomType = () => {
        if (!newServiceType.requestType.trim() || !newServiceType.description.trim() || !newServiceType.assignedTo.trim()) {
            return
        }

        const newId = Math.max(...serviceTypes.map(item => item.id)) + 1
        const customType = {
            id: newId,
            ...newServiceType,
            status: true
        }

        setServiceTypes(prev => [...prev, customType])
        setNewServiceType({
            requestType: "",
            description: "",
            category: "Security",
            approval: "Direct",
            assignedTo: ""
        })
        setIsAddCustomModalOpen(false)
    }

    const filteredServiceTypes = serviceTypes.filter(item => {
        const matchesSearch = item.requestType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "All" || 
                            (statusFilter === "Active" && item.status) ||
                            (statusFilter === "Inactive" && !item.status)
        const matchesCategory = categoryFilter === "All Categories" || item.category === categoryFilter

        return matchesSearch && matchesStatus && matchesCategory
    })

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

            {/* Service Types Content */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                            Service Types
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {serviceTypes.filter(item => item.status).length} of {serviceTypes.length} request types enabled
                        </p>
                    </div>
                    <Button variant="ghost" onClick={() => setIsAddCustomModalOpen(true)}>
                        <RiAddLine className="size-4 mr-1.5" />
                        Add Custom Type
                    </Button>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="Search service types..."
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
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option>All Categories</option>
                        <option>Security</option>
                        <option>Maintenance</option>
                        <option>Cleaning</option>
                        <option>Concierge</option>
                    </select>
                </div>

                {/* Service Types Table */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Request Type
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Approval
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Assigned To
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
                            {filteredServiceTypes.map((serviceType) => (
                                <tr key={serviceType.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                                {serviceType.requestType}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {serviceType.description}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge variant={getCategoryBadgeVariant(serviceType.category)}>
                                            {serviceType.category}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-50">
                                        {serviceType.approval}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-50">
                                        {serviceType.assignedTo}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Switch
                                            checked={serviceType.status}
                                            onCheckedChange={() => handleStatusToggle(serviceType.id)}
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
                    
                    {filteredServiceTypes.length === 0 && (
                        <div className="p-8 text-center">
                            <p className="text-gray-500 dark:text-gray-400">
                                No service types found matching your criteria.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Custom Type Modal */}
            <Dialog open={isAddCustomModalOpen} onOpenChange={setIsAddCustomModalOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add Custom Service Type</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="requestType">Request Type *</Label>
                            <Input
                                id="requestType"
                                placeholder="Enter request type name"
                                value={newServiceType.requestType}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, requestType: e.target.value }))}
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="description">Description *</Label>
                            <Input
                                id="description"
                                placeholder="Enter description"
                                value={newServiceType.description}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, description: e.target.value }))}
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <select
                                id="category"
                                value={newServiceType.category}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, category: e.target.value }))}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option>Security</option>
                                <option>Maintenance</option>
                                <option>Cleaning</option>
                                <option>Concierge</option>
                            </select>
                        </div>
                        
                        <div>
                            <Label htmlFor="approval">Approval Type</Label>
                            <select
                                id="approval"
                                value={newServiceType.approval}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, approval: e.target.value }))}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option>Direct</option>
                                <option>Tenant POC</option>
                                <option>Manager Approval</option>
                            </select>
                        </div>
                        
                        <div>
                            <Label htmlFor="assignedTo">Assigned To *</Label>
                            <Input
                                id="assignedTo"
                                placeholder="Enter team or person responsible"
                                value={newServiceType.assignedTo}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, assignedTo: e.target.value }))}
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-3 mt-6">
                        <Button
                            variant="ghost"
                            onClick={() => setIsAddCustomModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddCustomType}
                            disabled={!newServiceType.requestType.trim() || !newServiceType.description.trim() || !newServiceType.assignedTo.trim()}
                        >
                            Add Service Type
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
