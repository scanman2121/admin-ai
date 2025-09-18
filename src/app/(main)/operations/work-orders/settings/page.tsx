"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { RiArrowLeftLine, RiSettings3Line } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Work Orders Settings page
const tabs = [
    { name: "Service Types", href: "/operations/work-orders/settings" },
    { name: "Teams", href: "/operations/work-orders/settings/teams" },
    { name: "Settings", href: "/operations/work-orders/settings/general" },
]

// Sample service types data based on the uploaded interface
const serviceTypesData = [
    {
        id: 1,
        requestType: "Access Request",
        description: "Requests for building or area access",
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
        requestType: "HVAC",
        description: "Heating, ventilation, and air conditioning issues",
        category: "Maintenance",
        approval: "Direct",
        assignedTo: "Maintenance Team",
        status: true,
    },
    {
        id: 4,
        requestType: "Bin Request",
        description: "Waste bin collection or replacement",
        category: "Cleaning",
        approval: "Direct",
        assignedTo: "Housekeeping Team",
        status: true,
    },
    {
        id: 5,
        requestType: "Deep Clean",
        description: "Comprehensive cleaning service",
        category: "Cleaning",
        approval: "Direct",
        assignedTo: "Housekeeping Team",
        status: false,
    },
    {
        id: 6,
        requestType: "Package Delivery",
        description: "Package handling and delivery coordination",
        category: "Concierge",
        approval: "Direct",
        assignedTo: "Concierge Team",
        status: true,
    },
    {
        id: 7,
        requestType: "Guest Registration",
        description: "Visitor registration and check-in",
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

    const handleStatusToggle = (id: number) => {
        setServiceTypes(prev => 
            prev.map(item => 
                item.id === id ? { ...item, status: !item.status } : item
            )
        )
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
                        Work Orders 
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Manage individual service request types and their configurations
                    </p>
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

            {/* Service Types Content */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                        Service Types
                    </h2>
                    <Button>
                        Add Custom
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
                                    Status
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
        </div>
    )
}
