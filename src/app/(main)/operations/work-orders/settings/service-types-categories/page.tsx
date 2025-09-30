"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FullPageModal } from "@/components/ui/FullPageModal"
import { workOrderStatuses } from "@/data/statuses"
import { RiAddLine, RiArrowDownSLine, RiArrowLeftLine, RiArrowRightSLine, RiDeleteBin6Line, RiEdit2Line, RiMore2Line } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Work Orders Settings page
const tabs = [
    { name: "Settings", href: "/operations/work-orders/settings/general" },
    { name: "Teams", href: "/operations/work-orders/settings/teams" },
    { name: "Service types and categories", href: "/operations/work-orders/settings/service-types-categories" },
    { name: "Statuses", href: "/operations/work-orders/settings/statuses" },
]

// Categories data
const categoriesData = [
    {
        id: 1,
        name: "Security",
        description: "Security-related service requests and incidents",
        status: true,
    },
    {
        id: 2,
        name: "Maintenance",
        description: "Building maintenance and repair requests",
        status: true,
    },
    {
        id: 3,
        name: "Cleaning",
        description: "Cleaning and janitorial service requests",
        status: true,
    },
    {
        id: 4,
        name: "Concierge",
        description: "Concierge and guest services",
        status: true,
    },
    {
        id: 5,
        name: "IT Support",
        description: "Technology and IT-related requests",
        status: true,
    },
    {
        id: 6,
        name: "HVAC",
        description: "Heating, ventilation, and air conditioning",
        status: false,
    },
    {
        id: 7,
        name: "Landscaping",
        description: "Outdoor maintenance and landscaping",
        status: false,
    }
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
        statuses: ["New", "Open", "In Progress", "Completed", "Cancelled"],
    },
    {
        id: 2,
        requestType: "Key Card Request", 
        description: "New or replacement key cards",
        category: "Security",
        approval: "Tenant POC",
        assignedTo: "Security Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed", "Cancelled"],
    },
    {
        id: 3,
        requestType: "Visitor Access",
        description: "Temporary visitor access permissions",
        category: "Security",
        approval: "Tenant POC",
        assignedTo: "Security Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed", "Cancelled"],
    },
    {
        id: 4,
        requestType: "Security Incident",
        description: "Security-related incident reporting",
        category: "Security",
        approval: "None",
        assignedTo: "Security Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    // Maintenance Category
    {
        id: 5,
        requestType: "HVAC Issue",
        description: "Heating, cooling, or ventilation problems",
        category: "Maintenance",
        approval: "Building Manager",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "On Hold", "Completed"],
    },
    {
        id: 6,
        requestType: "Plumbing Repair",
        description: "Plumbing fixtures and pipe repairs",
        category: "Maintenance", 
        approval: "Building Manager",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "On Hold", "Completed"],
    },
    {
        id: 7,
        requestType: "Electrical Problem",
        description: "Electrical system issues and repairs",
        category: "Maintenance",
        approval: "Building Manager",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "On Hold", "Completed"],
    },
    {
        id: 8,
        requestType: "General Repair",
        description: "General maintenance and repair tasks",
        category: "Maintenance",
        approval: "None",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    // Cleaning Category
    {
        id: 9,
        requestType: "Deep Cleaning",
        description: "Thorough cleaning of specific areas",
        category: "Cleaning",
        approval: "None",
        assignedTo: "Housekeeping Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 10,
        requestType: "Carpet Cleaning",
        description: "Professional carpet cleaning service",
        category: "Cleaning",
        approval: "Building Manager",
        assignedTo: "Housekeeping Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 11,
        requestType: "Window Cleaning",
        description: "Interior and exterior window cleaning",
        category: "Cleaning",
        approval: "None",
        assignedTo: "Housekeeping Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 12,
        requestType: "Waste Removal",
        description: "Special waste removal and disposal",
        category: "Cleaning",
        approval: "Building Manager",
        assignedTo: "Housekeeping Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    // Concierge Category
    {
        id: 13,
        requestType: "Package Delivery",
        description: "Package receiving and delivery coordination",
        category: "Concierge",
        approval: "None",
        assignedTo: "Concierge Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 14,
        requestType: "Event Setup",
        description: "Meeting and event space preparation",
        category: "Concierge",
        approval: "Tenant POC",
        assignedTo: "Concierge Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 15,
        requestType: "Guest Services",
        description: "General guest assistance and services",
        category: "Concierge",
        approval: "None",
        assignedTo: "Concierge Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 16,
        requestType: "Information Request",
        description: "Building information and directory assistance",
        category: "Concierge",
        approval: "None",
        assignedTo: "Concierge Team",
        status: false,
        statuses: ["New", "Open", "Completed"],
    },
    // IT Support Category
    {
        id: 17,
        requestType: "Network Issue",
        description: "Internet and network connectivity problems",
        category: "IT Support",
        approval: "Building Manager",
        assignedTo: "IT Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 18,
        requestType: "Hardware Support",
        description: "Computer and hardware technical support",
        category: "IT Support",
        approval: "None",
        assignedTo: "IT Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
]

export default function WorkOrdersServiceTypesCategories() {
    const pathname = usePathname()
    const [categories, setCategories] = useState(categoriesData)
    const [serviceTypes, setServiceTypes] = useState(serviceTypesData)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [categoryFilter, setCategoryFilter] = useState("All Categories")
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
    
    // Service Type Modal States
    const [isAddServiceTypeModalOpen, setIsAddServiceTypeModalOpen] = useState(false)
    const [isEditServiceTypeModalOpen, setIsEditServiceTypeModalOpen] = useState(false)
    const [editingServiceType, setEditingServiceType] = useState<typeof serviceTypesData[0] | null>(null)
    const [openServiceTypeDropdownId, setOpenServiceTypeDropdownId] = useState<number | null>(null)
    
    // Category Modal States
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false)
    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<typeof categoriesData[0] | null>(null)
    const [openCategoryDropdownId, setOpenCategoryDropdownId] = useState<number | null>(null)
    
    const [isSetupModalOpen, setIsSetupModalOpen] = useState(false)
    
    const [newServiceType, setNewServiceType] = useState({
        requestType: "",
        description: "",
        category: "Security",
        approval: "None",
        assignedTo: "",
        statuses: [] as string[]
    })

    const [newCategory, setNewCategory] = useState({
        name: "",
        description: ""
    })

    const getCategoryBadgeVariant = (category: string) => {
        switch (category) {
            case 'Security':
                return 'error' as const
            case 'Maintenance':
                return 'warning' as const
            case 'Cleaning':
                return 'success' as const
            case 'Concierge':
                return 'default' as const
            case 'IT Support':
                return 'neutral' as const
            case 'HVAC':
                return 'warning' as const
            case 'Landscaping':
                return 'success' as const
            default:
                return 'default' as const
        }
    }

    const toggleCategoryExpansion = (categoryName: string) => {
        setExpandedCategories(prev => {
            const newSet = new Set(Array.from(prev))
            if (newSet.has(categoryName)) {
                newSet.delete(categoryName)
            } else {
                newSet.add(categoryName)
            }
            return newSet
        })
    }

    const handleCategoryStatusToggle = (id: number) => {
        setCategories(prev => 
            prev.map(category => 
                category.id === id ? { ...category, status: !category.status } : category
            )
        )
    }

    const handleServiceTypeStatusToggle = (id: number) => {
        setServiceTypes(prev => 
            prev.map(item => 
                item.id === id ? { ...item, status: !item.status } : item
            )
        )
    }

    const handleAddCategory = () => {
        if (!newCategory.name.trim() || !newCategory.description.trim()) {
            return
        }

        const newId = Math.max(...categories.map(item => item.id)) + 1
        const category = {
            id: newId,
            ...newCategory,
            status: true
        }

        setCategories(prev => [...prev, category])
        setNewCategory({
            name: "",
            description: ""
        })
        setIsAddCategoryModalOpen(false)
    }

    const handleEditCategory = (category: typeof categoriesData[0]) => {
        setEditingCategory(category)
        setNewCategory({
            name: category.name,
            description: category.description
        })
        setIsEditCategoryModalOpen(true)
    }

    const handleUpdateCategory = () => {
        if (!editingCategory || !newCategory.name.trim() || !newCategory.description.trim()) {
            return
        }

        setCategories(prev => prev.map(item => 
            item.id === editingCategory.id 
                ? { ...item, ...newCategory }
                : item
        ))
        
        setEditingCategory(null)
        setNewCategory({
            name: "",
            description: ""
        })
        setIsEditCategoryModalOpen(false)
    }

    const handleDeleteCategory = (id: number) => {
        setCategories(prev => prev.filter(item => item.id !== id))
        setOpenCategoryDropdownId(null)
    }

    const handleAddServiceType = () => {
        if (!newServiceType.requestType.trim() || !newServiceType.description.trim() || !newServiceType.assignedTo.trim()) {
            return
        }

        const newId = Math.max(...serviceTypes.map(item => item.id)) + 1
        const serviceType = {
            id: newId,
            ...newServiceType,
            status: true
        }

        setServiceTypes(prev => [...prev, serviceType])
        setNewServiceType({
            requestType: "",
            description: "",
            category: "Security",
            approval: "None",
            assignedTo: "",
            statuses: []
        })
        setIsAddServiceTypeModalOpen(false)
    }

    const handleEditServiceType = (serviceType: typeof serviceTypesData[0]) => {
        setEditingServiceType(serviceType)
        setNewServiceType({
            requestType: serviceType.requestType,
            description: serviceType.description,
            category: serviceType.category,
            approval: serviceType.approval,
            assignedTo: serviceType.assignedTo,
            statuses: serviceType.statuses || []
        })
        setIsEditServiceTypeModalOpen(true)
    }

    const handleUpdateServiceType = () => {
        if (!editingServiceType || !newServiceType.requestType.trim() || !newServiceType.description.trim() || !newServiceType.assignedTo.trim()) {
            return
        }

        setServiceTypes(prev => prev.map(item => 
            item.id === editingServiceType.id 
                ? { ...item, ...newServiceType }
                : item
        ))
        
        setEditingServiceType(null)
        setNewServiceType({
            requestType: "",
            description: "",
            category: "Security",
            approval: "None",
            assignedTo: "",
            statuses: []
        })
        setIsEditServiceTypeModalOpen(false)
    }

    const handleDeleteServiceType = (id: number) => {
        setServiceTypes(prev => prev.filter(item => item.id !== id))
        setOpenServiceTypeDropdownId(null)
    }

    const handleStatusToggleInModal = (statusName: string) => {
        setNewServiceType(prev => ({
            ...prev,
            statuses: prev.statuses.includes(statusName)
                ? prev.statuses.filter(s => s !== statusName)
                : [...prev.statuses, statusName]
        }))
    }

    const filteredCategories = categories.filter(category => {
        const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            category.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "All" || 
                            (statusFilter === "Active" && category.status) ||
                            (statusFilter === "Inactive" && !category.status)
        return matchesSearch && matchesStatus
    })

    const getFilteredServiceTypes = (categoryName: string) => {
        const categoryServiceTypes = serviceTypes.filter(serviceType => serviceType.category === categoryName)
        return categoryServiceTypes.filter(serviceType => {
            const matchesSearch = serviceType.requestType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                serviceType.description.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesStatus = statusFilter === "All" || 
                                (statusFilter === "Active" && serviceType.status) ||
                                (statusFilter === "Inactive" && !serviceType.status)
            return matchesSearch && matchesStatus
        })
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

            {/* Service Types and Categories Content */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                            Service types and categories
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Organize service requests by category and define specific service types with approval workflows
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button 
                            variant="ghost" 
                            onClick={() => setIsAddCategoryModalOpen(true)}
                        >
                            <RiAddLine className="size-4 mr-1.5" />
                            Add category
                        </Button>
                        <Button 
                            variant="ghost" 
                            onClick={() => setIsAddServiceTypeModalOpen(true)}
                        >
                            <RiAddLine className="size-4 mr-1.5" />
                            Add service type
                        </Button>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center justify-between gap-4">
                <input
                    type="text"
                    placeholder="Search categories and service types..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="flex items-center gap-3">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option>All</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option>All Categories</option>
                        <option>Security</option>
                        <option>Maintenance</option>
                        <option>Cleaning</option>
                        <option>Concierge</option>
                        <option>IT Support</option>
                        <option>HVAC</option>
                        <option>Landscaping</option>
                    </select>
                </div>
            </div>

            {/* Hierarchical Table */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Name / Request Type
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
                                Statuses
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
                        {filteredCategories.map((category) => {
                            const isExpanded = expandedCategories.has(category.name)
                            const categoryServiceTypes = getFilteredServiceTypes(category.name)
                            
                            return (
                                <>
                                    {/* Category Row */}
                                    <tr key={`category-${category.id}`} className="bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => toggleCategoryExpansion(category.name)}
                                                className="flex items-center gap-2 text-left w-full"
                                            >
                                                {isExpanded ? (
                                                    <RiArrowDownSLine className="size-4 text-gray-500" />
                                                ) : (
                                                    <RiArrowRightSLine className="size-4 text-gray-500" />
                                                )}
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                                                        {category.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {category.description} ({categoryServiceTypes.length} service types)
                                                    </div>
                                                </div>
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge variant={getCategoryBadgeVariant(category.name)}>
                                                Category
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            -
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            -
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            -
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Switch
                                                checked={category.status}
                                                onCheckedChange={() => handleCategoryStatusToggle(category.id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="p-2 h-8 w-8"
                                                    onClick={() => handleEditCategory(category)}
                                                >
                                                    <RiEdit2Line className="size-4" />
                                                </Button>
                                                
                                                <div className="relative">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="p-2 h-8 w-8"
                                                        onClick={() => setOpenCategoryDropdownId(openCategoryDropdownId === category.id ? null : category.id)}
                                                    >
                                                        <RiMore2Line className="size-4" />
                                                    </Button>
                                                    
                                                    {openCategoryDropdownId === category.id && (
                                                        <>
                                                            <div 
                                                                className="fixed inset-0 z-10" 
                                                                onClick={() => setOpenCategoryDropdownId(null)}
                                                            />
                                                            <div className="absolute right-0 top-full mt-1 z-20 min-w-[120px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                                                                <button
                                                                    onClick={() => handleDeleteCategory(category.id)}
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
                                        </td>
                                    </tr>
                                    
                                    {/* Service Type Rows (shown when expanded) */}
                                    {isExpanded && categoryServiceTypes.map((serviceType) => (
                                        <tr key={`service-${serviceType.id}`} className="hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900">
                                            <td className="px-6 py-4 whitespace-nowrap pl-12">
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
                                                <div className="flex flex-wrap gap-1">
                                                    {serviceType.statuses?.slice(0, 3).map((status) => (
                                                        <span
                                                            key={status}
                                                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                                        >
                                                            {status}
                                                        </span>
                                                    ))}
                                                    {(serviceType.statuses?.length || 0) > 3 && (
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                                                            +{(serviceType.statuses?.length || 0) - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Switch
                                                    checked={serviceType.status}
                                                    onCheckedChange={() => handleServiceTypeStatusToggle(serviceType.id)}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="p-2 h-8 w-8"
                                                        onClick={() => handleEditServiceType(serviceType)}
                                                    >
                                                        <RiEdit2Line className="size-4" />
                                                    </Button>
                                                    
                                                    <div className="relative">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="p-2 h-8 w-8"
                                                            onClick={() => setOpenServiceTypeDropdownId(openServiceTypeDropdownId === serviceType.id ? null : serviceType.id)}
                                                        >
                                                            <RiMore2Line className="size-4" />
                                                        </Button>
                                                        
                                                        {openServiceTypeDropdownId === serviceType.id && (
                                                            <>
                                                                <div 
                                                                    className="fixed inset-0 z-10" 
                                                                    onClick={() => setOpenServiceTypeDropdownId(null)}
                                                                />
                                                                <div className="absolute right-0 top-full mt-1 z-20 min-w-[120px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                                                                    <button
                                                                        onClick={() => handleDeleteServiceType(serviceType.id)}
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
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )
                        })}
                    </tbody>
                </table>
                
                {filteredCategories.length === 0 && (
                    <div className="p-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            No categories or service types found matching your criteria.
                        </p>
                    </div>
                )}
            </div>
            </div>

            {/* Add Category Modal */}
            <Dialog open={isAddCategoryModalOpen} onOpenChange={setIsAddCategoryModalOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add new category</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="category-name">Category name *</Label>
                            <input
                                id="category-name"
                                type="text"
                                placeholder="Enter category name"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="category-description">Description *</Label>
                            <textarea
                                id="category-description"
                                rows={3}
                                placeholder="Enter category description"
                                value={newCategory.description}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        
                        <div className="flex justify-end gap-2 pt-4">
                            <Button variant="ghost" onClick={() => setIsAddCategoryModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddCategory}>
                                Add category
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Category Modal */}
            <Dialog open={isEditCategoryModalOpen} onOpenChange={setIsEditCategoryModalOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit category</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="edit-category-name">Category name *</Label>
                            <input
                                id="edit-category-name"
                                type="text"
                                placeholder="Enter category name"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="edit-category-description">Description *</Label>
                            <textarea
                                id="edit-category-description"
                                rows={3}
                                placeholder="Enter category description"
                                value={newCategory.description}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        
                        <div className="flex justify-end gap-2 pt-4">
                            <Button variant="ghost" onClick={() => setIsEditCategoryModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleUpdateCategory}>
                                Update category
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Add Service Type Modal */}
            <Dialog open={isAddServiceTypeModalOpen} onOpenChange={setIsAddServiceTypeModalOpen}>
                <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add service type</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="service-type-name">Request type *</Label>
                            <Input
                                id="service-type-name"
                                placeholder="Enter request type"
                                value={newServiceType.requestType}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, requestType: e.target.value }))}
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="service-type-description">Description *</Label>
                            <textarea
                                id="service-type-description"
                                rows={3}
                                placeholder="Enter description"
                                value={newServiceType.description}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, description: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="service-type-category">Category *</Label>
                            <select
                                id="service-type-category"
                                value={newServiceType.category}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, category: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            >
                                <option>Security</option>
                                <option>Maintenance</option>
                                <option>Cleaning</option>
                                <option>Concierge</option>
                                <option>IT Support</option>
                                <option>HVAC</option>
                                <option>Landscaping</option>
                            </select>
                        </div>
                        
                        <div>
                            <Label htmlFor="service-type-approval">Approval type</Label>
                            <select
                                id="service-type-approval"
                                value={newServiceType.approval}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, approval: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            >
                                <option>None</option>
                                <option>Tenant POC</option>
                                <option>Building Manager</option>
                                <option>Property Manager</option>
                            </select>
                        </div>
                        
                        <div>
                            <Label htmlFor="service-type-assigned">Assigned to *</Label>
                            <Input
                                id="service-type-assigned"
                                placeholder="Enter assigned team/person"
                                value={newServiceType.assignedTo}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, assignedTo: e.target.value }))}
                            />
                        </div>

                        <div>
                            <Label>Available statuses</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {workOrderStatuses.map((status) => (
                                    <label key={status.name} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={newServiceType.statuses.includes(status.name)}
                                            onChange={() => handleStatusToggleInModal(status.name)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{status.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex justify-end gap-2 pt-4">
                            <Button variant="ghost" onClick={() => setIsAddServiceTypeModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddServiceType}>
                                Add service type
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Service Type Modal */}
            <Dialog open={isEditServiceTypeModalOpen} onOpenChange={setIsEditServiceTypeModalOpen}>
                <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit service type</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="edit-service-type-name">Request type *</Label>
                            <Input
                                id="edit-service-type-name"
                                placeholder="Enter request type"
                                value={newServiceType.requestType}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, requestType: e.target.value }))}
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="edit-service-type-description">Description *</Label>
                            <textarea
                                id="edit-service-type-description"
                                rows={3}
                                placeholder="Enter description"
                                value={newServiceType.description}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, description: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="edit-service-type-category">Category *</Label>
                            <select
                                id="edit-service-type-category"
                                value={newServiceType.category}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, category: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            >
                                <option>Security</option>
                                <option>Maintenance</option>
                                <option>Cleaning</option>
                                <option>Concierge</option>
                                <option>IT Support</option>
                                <option>HVAC</option>
                                <option>Landscaping</option>
                            </select>
                        </div>
                        
                        <div>
                            <Label htmlFor="edit-service-type-approval">Approval type</Label>
                            <select
                                id="edit-service-type-approval"
                                value={newServiceType.approval}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, approval: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            >
                                <option>None</option>
                                <option>Tenant POC</option>
                                <option>Building Manager</option>
                                <option>Property Manager</option>
                            </select>
                        </div>
                        
                        <div>
                            <Label htmlFor="edit-service-type-assigned">Assigned to *</Label>
                            <Input
                                id="edit-service-type-assigned"
                                placeholder="Enter assigned team/person"
                                value={newServiceType.assignedTo}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, assignedTo: e.target.value }))}
                            />
                        </div>

                        <div>
                            <Label>Available statuses</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {workOrderStatuses.map((status) => (
                                    <label key={status.name} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={newServiceType.statuses.includes(status.name)}
                                            onChange={() => handleStatusToggleInModal(status.name)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{status.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex justify-end gap-2 pt-4">
                            <Button variant="ghost" onClick={() => setIsEditServiceTypeModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleUpdateServiceType}>
                                Update service type
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Setup Modal */}
            <FullPageModal
                isOpen={isSetupModalOpen}
                onClose={() => setIsSetupModalOpen(false)}
                title="Setup wizard"
                iframeUrl="https://v0-workflow-system-design-sage.vercel.app/"
            />
        </div>
    )
}
