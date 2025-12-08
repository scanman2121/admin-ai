"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/Dialog"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { RiArrowLeftLine, RiCloseLine, RiMore2Line, RiSearchLine } from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Mention, MentionsInput } from "react-mentions"

// Define tabs for the Service Requests Settings page
const tabs = [
    { name: "Settings", href: "/operations/service-requests/settings/general" },
    { name: "Statuses", href: "/operations/service-requests/settings/statuses" },
    { name: "Service types", href: "/operations/service-requests/settings/service-types-categories" },
    { name: "Teams", href: "/operations/service-requests/settings/teams" },
    { name: "Tenant users", href: "/operations/service-requests/settings/users" },
    { name: "Email templates", href: "/operations/service-requests/settings/email-template" },
    { name: "Connected accounts", href: "/operations/service-requests/settings/connected-accounts" },
]

// Available Salesforce fields for dropdown selection
const salesforceFields = [
    { id: "Subject", name: "Subject" },
    { id: "Description", name: "Description" },
    { id: "Building_Name__c", name: "Building Name" },
    { id: "Your_Location__c", name: "Your Location" },
    { id: "OwnerId", name: "Owner" },
    { id: "CreatedById", name: "Created By" },
    { id: "Origin", name: "Origin" },
    { id: "Status", name: "Status" },
    { id: "Priority", name: "Priority" }
]


// Available fields for mentions
const mentionFields = [
    { id: "issueTypeName", display: "Issue Type Name" },
    { id: "description", display: "Description" },
    { id: "building", display: "Building" },
    { id: "location_name", display: "Location Name" },
    { id: "userId", display: "User ID" },
    { id: "adminEmail", display: "Admin Email" },
    { id: "requestor", display: "Requestor" },
    { id: "created_date", display: "Created Date" },
    { id: "status", display: "Status" },
    { id: "priority", display: "Priority" },
    { id: "assignedTo", display: "Assigned To" }
]

// Default field mappings - array structure to allow adding/removing rows
const defaultFieldMappings: Array<{ id: string; requestInfo: string; required: boolean; salesforceField: string; information: string }> = [
    { id: "subject", requestInfo: "Subject", required: true, salesforceField: "Subject", information: "@issueTypeName" },
    { id: "description", requestInfo: "Description", required: true, salesforceField: "Description", information: "@description. sent by @adminEmail" },
    { id: "location", requestInfo: "Location", required: false, salesforceField: "Your_Location__c", information: "@location_name....@building" },
    { id: "owner", requestInfo: "Owner", required: false, salesforceField: "OwnerId", information: "@userId" },
    { id: "creator", requestInfo: "Creator", required: false, salesforceField: "CreatedById", information: "@requestor" }
]

// Service type categories
const serviceTypeCategories = [
    { id: "cleaning-waste", name: "Cleaning & Waste", description: "Cleaning services and waste removal" },
    { id: "temperature-air", name: "Temperature & Air", description: "HVAC and climate control issues" },
    { id: "repairs-maintenance", name: "Repairs & Maintenance", description: "General repairs and maintenance" },
    { id: "access-security", name: "Access & Security", description: "Access control and security requests" },
    { id: "hospitality-concierge", name: "Hospitality & Concierge", description: "Concierge and hospitality services" },
    { id: "signage-facilities", name: "Signage & Facilities", description: "Signage and facilities management" },
    { id: "other", name: "Other", description: "Miscellaneous service requests" }
]

// Sample service types (request types) - in real app, this would come from the service types data
const serviceTypes = [
    { id: "more-cleaning", name: "More Cleaning", category: "Cleaning & Waste", categoryId: "cleaning-waste" },
    { id: "bin-service", name: "Bin Service", category: "Cleaning & Waste", categoryId: "cleaning-waste" },
    { id: "garbage-bin", name: "Garbage Bin", category: "Cleaning & Waste", categoryId: "cleaning-waste" },
    { id: "hvac-maintenance", name: "HVAC Maintenance", category: "Temperature & Air", categoryId: "temperature-air" },
    { id: "too-hot", name: "Too Hot", category: "Temperature & Air", categoryId: "temperature-air" },
    { id: "too-cold", name: "Too Cold", category: "Temperature & Air", categoryId: "temperature-air" },
    { id: "electrical", name: "Electrical", category: "Repairs & Maintenance", categoryId: "repairs-maintenance" },
    { id: "plumbing", name: "Plumbing", category: "Repairs & Maintenance", categoryId: "repairs-maintenance" },
    { id: "access-request", name: "Access Request", category: "Access & Security", categoryId: "access-security" },
    { id: "key-lock", name: "Key & Lock", category: "Access & Security", categoryId: "access-security" },
    { id: "porter-service", name: "Porter Service", category: "Hospitality & Concierge", categoryId: "hospitality-concierge" },
    { id: "signage", name: "Signage", category: "Signage & Facilities", categoryId: "signage-facilities" },
]

interface SalesforceConnection {
    id: string
    name: string
    isInherited: boolean
    isConnected: boolean
    fieldMappings: Array<{ id: string; requestInfo: string; required: boolean; salesforceField: string; information: string }>
    selectedCategories: string[]
    selectedTypes: string[]
    salesforceConfig?: {
        instanceUrl: string
        username: string
    }
}

export default function ServiceRequestsConnectedAccounts() {
    const pathname = usePathname()
    
    // Mock inherited connection from global settings (in real app, this would come from API)
    const [inheritedConnection] = useState<SalesforceConnection | null>({
        id: "inherited-1",
        name: "Salesforce",
        isInherited: true,
        isConnected: true,
        fieldMappings: defaultFieldMappings,
        selectedCategories: ["cleaning-waste"],
        selectedTypes: [],
        salesforceConfig: {
            instanceUrl: "https://company.salesforce.com",
            username: "admin@company.com"
        }
    })
    
    const [connections, setConnections] = useState<SalesforceConnection[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingConnectionId, setEditingConnectionId] = useState<string | null>(null)
    const [isKebabOpen, setIsKebabOpen] = useState<Record<string, boolean>>({})
    const [salesforceConfig, setSalesforceConfig] = useState({
        instanceUrl: "",
        username: "",
        password: "",
        securityToken: "",
        consumerKey: "",
        consumerSecret: ""
    })
    const [fieldMappings, setFieldMappings] = useState<Array<{ id: string; requestInfo: string; required: boolean; salesforceField: string; information: string }>>(defaultFieldMappings)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [serviceTypeSearch, setServiceTypeSearch] = useState("")
    const [showServiceTypeResults, setShowServiceTypeResults] = useState(false)
    const [imageError, setImageError] = useState(false)
    const serviceTypeSearchRef = useRef<HTMLDivElement>(null)

    // Close service type dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (serviceTypeSearchRef.current && !serviceTypeSearchRef.current.contains(event.target as Node)) {
                setShowServiceTypeResults(false)
            }
        }

        if (showServiceTypeResults) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [showServiceTypeResults])

    const handleConfigChange = (field: string, value: string) => {
        setSalesforceConfig(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleConnect = () => {
        // Demo prototype - fake connection, no actual Salesforce API call
        const newConnection: SalesforceConnection = {
            id: `connection-${Date.now()}`,
            name: "Salesforce",
            isInherited: false,
            isConnected: true,
            fieldMappings: { ...fieldMappings },
            selectedCategories: [...selectedCategories],
            selectedTypes: [...selectedTypes],
            salesforceConfig: {
                instanceUrl: salesforceConfig.instanceUrl,
                username: salesforceConfig.username
            }
        }
        
        if (editingConnectionId) {
            setConnections(prev => prev.map(conn => 
                conn.id === editingConnectionId ? newConnection : conn
            ))
        } else {
            setConnections(prev => [...prev, newConnection])
        }
        
        // Reset form
        setSalesforceConfig({
            instanceUrl: "",
            username: "",
            password: "",
            securityToken: "",
            consumerKey: "",
            consumerSecret: ""
        })
        setFieldMappings(defaultFieldMappings)
        setSelectedCategories([])
        setSelectedTypes([])
        setIsModalOpen(false)
        setEditingConnectionId(null)
    }

    const handleDisable = (connectionId: string) => {
        setConnections(prev => prev.filter(conn => conn.id !== connectionId))
        setIsKebabOpen(prev => {
            const next = { ...prev }
            delete next[connectionId]
            return next
        })
    }

    const handleEdit = (connection: SalesforceConnection) => {
        setEditingConnectionId(connection.id)
        setSalesforceConfig({
            instanceUrl: connection.salesforceConfig?.instanceUrl || "",
            username: connection.salesforceConfig?.username || "",
            password: "",
            securityToken: "",
            consumerKey: "",
            consumerSecret: ""
        })
        setFieldMappings(connection.fieldMappings)
        setSelectedCategories(connection.selectedCategories)
        setSelectedTypes(connection.selectedTypes)
        setIsModalOpen(true)
        setIsKebabOpen(prev => ({ ...prev, [connection.id]: false }))
    }

    const handleAddConnection = () => {
        setEditingConnectionId(null)
        setSalesforceConfig({
            instanceUrl: "",
            username: "",
            password: "",
            securityToken: "",
            consumerKey: "",
            consumerSecret: ""
        })
        setFieldMappings(defaultFieldMappings)
        setSelectedCategories([])
        setSelectedTypes([])
        setIsModalOpen(true)
    }

    const handleSalesforceFieldChange = (mappingId: string, salesforceField: string) => {
        setFieldMappings(prev => prev.map(mapping => 
            mapping.id === mappingId 
                ? { ...mapping, salesforceField }
                : mapping
        ))
    }

    const handleInformationChange = (mappingId: string, information: string) => {
        setFieldMappings(prev => prev.map(mapping => 
            mapping.id === mappingId 
                ? { ...mapping, information }
                : mapping
        ))
    }

    const handleAddServiceRequestRow = () => {
        setFieldMappings(prev => [...prev, { 
            id: `sr-${Date.now()}`, 
            requestInfo: "", 
            required: false,
            salesforceField: "", 
            information: "" 
        }])
    }

    const handleRemoveServiceRequestRow = (mappingId: string) => {
        setFieldMappings(prev => prev.filter(mapping => mapping.id !== mappingId))
    }


    const handleCategoryToggle = (categoryId: string) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(prev => prev.filter(id => id !== categoryId))
            // Also remove all types from this category
            const categoryTypes = serviceTypes.filter(t => t.categoryId === categoryId).map(t => t.id)
            setSelectedTypes(prev => prev.filter(id => !categoryTypes.includes(id)))
        } else {
            setSelectedCategories(prev => [...prev, categoryId])
            // Automatically add all types from this category
            const categoryTypes = serviceTypes.filter(t => t.categoryId === categoryId).map(t => t.id)
            setSelectedTypes(prev => {
                const newTypes = [...prev]
                categoryTypes.forEach(typeId => {
                    if (!newTypes.includes(typeId)) {
                        newTypes.push(typeId)
                    }
                })
                return newTypes
            })
            setServiceTypeSearch("")
            setShowServiceTypeResults(false)
        }
    }

    const handleTypeToggle = (typeId: string) => {
        if (selectedTypes.includes(typeId)) {
            setSelectedTypes(prev => prev.filter(id => id !== typeId))
        } else {
            setSelectedTypes(prev => [...prev, typeId])
            setServiceTypeSearch("")
            setShowServiceTypeResults(false)
        }
    }

    const handleRemoveCategory = (categoryId: string) => {
        setSelectedCategories(prev => prev.filter(id => id !== categoryId))
        const categoryTypes = serviceTypes.filter(t => t.categoryId === categoryId).map(t => t.id)
        setSelectedTypes(prev => prev.filter(id => !categoryTypes.includes(id)))
    }

    const handleRemoveType = (typeId: string) => {
        setSelectedTypes(prev => prev.filter(id => id !== typeId))
    }

    // Combine categories and types for search
    const allSearchableItems = [
        ...serviceTypeCategories.map(cat => ({ ...cat, type: 'category' as const })),
        ...serviceTypes.map(type => ({ ...type, type: 'type' as const }))
    ]

    const filteredItems = allSearchableItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(serviceTypeSearch.toLowerCase()) ||
            ('description' in item && item.description?.toLowerCase().includes(serviceTypeSearch.toLowerCase()))
        
        if (item.type === 'category') {
            return matchesSearch && !selectedCategories.includes(item.id)
        } else {
            return matchesSearch && !selectedTypes.includes(item.id)
        }
    })

    // Calculate counts - include types from selected categories
    const categoryCount = selectedCategories.length
    const typesFromCategories = selectedCategories.flatMap(catId => 
        serviceTypes.filter(t => t.categoryId === catId).map(t => t.id)
    )
    const individualTypes = selectedTypes.filter(typeId => {
        const type = serviceTypes.find(t => t.id === typeId)
        return type && !selectedCategories.includes(type.categoryId)
    })
    const typeCount = typesFromCategories.length + individualTypes.length

    // Determine if connected based on inherited connection or any connections
    const isConnected = inheritedConnection?.isConnected || connections.some(conn => conn.isConnected)

    return (
        <div className="space-y-6">
            {/* Header with back navigation */}
            <div className="flex items-center gap-3">
                <Link 
                    href="/operations/service-requests"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <RiArrowLeftLine className="mr-1 size-4" />
                    Service Requests
                </Link>
            </div>

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                        Service request settings
                    </h1>
                </div>
                <div className="flex items-center gap-3">
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

            {/* Connected Accounts Content */}
            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                        Connected accounts
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage external account integrations for service requests
                    </p>
                </div>

                {/* Salesforce Connection Card */}
                <Card>
                    <div className="space-y-6">
                        {/* Salesforce Header with Logo and Connect/Connected Badge */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 flex-1">
                                {/* Square Logo container */}
                                <div className="flex-shrink-0 bg-white border border-gray-300 dark:border-gray-600 rounded p-2 flex items-center justify-center w-16 h-16">
                                    {imageError ? (
                                        <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                            SF
                                        </div>
                                    ) : (
                                        <Image
                                            src="/images/sf.png"
                                            alt="Salesforce"
                                            width={60}
                                            height={20}
                                            className="object-contain"
                                            onError={() => setImageError(true)}
                                        />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        Salesforce
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        Connect your Salesforce account to sync service requests and manage cases
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                {isConnected ? (
                                    <>
                                        <Badge variant="success">Connected</Badge>
                                        <div className="relative">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="p-2 h-8 w-8"
                                                onClick={() => setIsKebabOpen(prev => ({ ...prev, inherited: !prev.inherited }))}
                                            >
                                                <RiMore2Line className="size-4" />
                                            </Button>
                                            
                                            {isKebabOpen.inherited && (
                                                <>
                                                    <div className="fixed inset-0 z-10" onClick={() => setIsKebabOpen(prev => ({ ...prev, inherited: false }))} />
                                                    <div className="absolute right-0 top-full mt-1 z-20 min-w-[140px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                                                        <button
                                                            onClick={() => {
                                                                if (inheritedConnection) {
                                                                    handleEdit(inheritedConnection)
                                                                }
                                                            }}
                                                            className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                                                        >
                                                            View settings
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (inheritedConnection) {
                                                                    handleDisable(inheritedConnection.id)
                                                                }
                                                            }}
                                                            className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                                        >
                                                            Disconnect
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <Button
                                        variant="primary"
                                        onClick={handleAddConnection}
                                    >
                                        Connect
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Field Mapping and Service Types - Shown when connected */}
                        {isConnected && (
                            <>
                                {/* Service Types Selection */}
                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-1">
                                                Service types
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Select which service types this Salesforce connection should apply to
                                            </p>
                                        </div>
                                        {/* Summary Box */}
                                        {(categoryCount > 0 || typeCount > 0) && (
                                            <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-md text-xs text-gray-600 dark:text-gray-400">
                                                {categoryCount > 0 && (
                                                    <span>{categoryCount} {categoryCount === 1 ? 'Category' : 'Categories'}</span>
                                                )}
                                                {categoryCount > 0 && typeCount > 0 && <span className="mx-1">•</span>}
                                                {typeCount > 0 && (
                                                    <span>{typeCount} {typeCount === 1 ? 'Type' : 'Types'}</span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Selected Chips */}
                                    {(selectedCategories.length > 0 || selectedTypes.length > 0) && (
                                        <div className="flex flex-wrap gap-2">
                                            {/* Category Chips */}
                                            {selectedCategories.map((categoryId) => {
                                                const category = serviceTypeCategories.find(c => c.id === categoryId)
                                                if (!category) return null
                                                return (
                                                    <div
                                                        key={`category-${categoryId}`}
                                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                                                    >
                                                        <span className="text-xs font-medium">Category:</span>
                                                        <span>{category.name}</span>
                                                        <button
                                                            onClick={() => handleRemoveCategory(categoryId)}
                                                            className="hover:bg-purple-200 dark:hover:bg-purple-800 rounded p-0.5 transition-colors"
                                                            type="button"
                                                        >
                                                            <RiCloseLine className="size-3.5" />
                                                        </button>
                                                    </div>
                                                )
                                            })}
                                            {/* Type Chips - Only show types not included via categories */}
                                            {selectedTypes.map((typeId) => {
                                                const type = serviceTypes.find(t => t.id === typeId)
                                                if (!type) return null
                                                // Don't show type if its category is already selected
                                                if (selectedCategories.includes(type.categoryId)) return null
                                                return (
                                                    <div
                                                        key={`type-${typeId}`}
                                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                                                    >
                                                        <span className="text-xs font-medium">Type:</span>
                                                        <span>{type.name}</span>
                                                        <button
                                                            onClick={() => handleRemoveType(typeId)}
                                                            className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded p-0.5 transition-colors"
                                                            type="button"
                                                        >
                                                            <RiCloseLine className="size-3.5" />
                                                        </button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}

                                    {/* Service Type Search */}
                                    <div className="relative" ref={serviceTypeSearchRef}>
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <RiSearchLine className="size-4 text-gray-400" />
                                        </div>
                                        <Input
                                            placeholder="Search by service type or category..."
                                            value={serviceTypeSearch}
                                            onChange={(e) => {
                                                setServiceTypeSearch(e.target.value)
                                                setShowServiceTypeResults(true)
                                            }}
                                            onFocus={() => setShowServiceTypeResults(true)}
                                            className="w-full pl-10"
                                        />
                                        
                                        {/* Search Results Dropdown */}
                                        {showServiceTypeResults && serviceTypeSearch && filteredItems.length > 0 && (
                                            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                                {filteredItems.map((item) => (
                                                    <button
                                                        key={`${item.type}-${item.id}`}
                                                        onClick={() => {
                                                            if (item.type === 'category') {
                                                                handleCategoryToggle(item.id)
                                                            } else {
                                                                handleTypeToggle(item.id)
                                                            }
                                                        }}
                                                        className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-start gap-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                                                    >
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                {item.type === 'category' ? (
                                                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                                                                        Category
                                                                    </span>
                                                                ) : (
                                                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                                                        Type
                                                                    </span>
                                                                )}
                                                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                    {item.name}
                                                                </span>
                                                            </div>
                                                            {'description' in item && item.description && (
                                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                                    {item.description}
                                                                </div>
                                                            )}
                                                            {item.type === 'type' && 'category' in item && (
                                                                <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                                                    {item.category}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Information Sent to Salesforce */}
                                <div className="pt-4 space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-1">
                                            Information sent to Salesforce
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Configure which request information maps to which Salesforce fields and how the data is formatted.
                                        </p>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-50">
                                                        Salesforce field
                                                    </th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-50">
                                                        Information that will be sent to Salesforce. Type @ to select values.
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {fieldMappings.map((mapping) => (
                                                    <tr key={mapping.id} className="border-b border-gray-200 dark:border-gray-700">
                                                        <td className="py-3 px-4">
                                                            <Select
                                                                value={mapping.salesforceField}
                                                                onValueChange={(value) => handleSalesforceFieldChange(mapping.id, value)}
                                                            >
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select field" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {salesforceFields.map((sfField) => (
                                                                        <SelectItem key={sfField.id} value={sfField.id}>
                                                                            {sfField.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </td>
                                                        <td className="py-3 px-4">
                                                            <div className="flex items-center gap-2">
                                                                <MentionsInput
                                                                    value={mapping.information}
                                                                    onChange={(e) => handleInformationChange(mapping.id, e.target.value)}
                                                                    placeholder="Type @ to mention a field..."
                                                                    singleLine
                                                                    style={{
                                                                        control: {
                                                                            backgroundColor: 'transparent',
                                                                            fontSize: 14,
                                                                            fontWeight: 'normal',
                                                                        },
                                                                        '&singleLine': {
                                                                            control: {
                                                                                fontFamily: 'inherit',
                                                                                display: 'inline-block',
                                                                            },
                                                                            highlighter: {
                                                                                padding: '8px 10px',
                                                                                border: '1px solid transparent',
                                                                                minHeight: '38px',
                                                                            },
                                                                            input: {
                                                                                padding: '8px 10px',
                                                                                border: '1px solid rgb(209, 213, 219)',
                                                                                borderRadius: '0.375rem',
                                                                                backgroundColor: 'white',
                                                                                color: 'rgb(17, 24, 39)',
                                                                                fontSize: '14px',
                                                                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                                                                width: '100%',
                                                                            },
                                                                        },
                                                                        suggestions: {
                                                                            list: {
                                                                                backgroundColor: 'white',
                                                                                border: '1px solid rgba(0,0,0,0.15)',
                                                                                fontSize: 14,
                                                                                borderRadius: '0.375rem',
                                                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                                                            },
                                                                            item: {
                                                                                padding: '8px 12px',
                                                                                '&focused': {
                                                                                    backgroundColor: '#f3f4f6',
                                                                                },
                                                                            },
                                                                        },
                                                                    }}
                                                                >
                                                                    <Mention
                                                                        trigger="@"
                                                                        data={mentionFields}
                                                                        displayTransform={(id) => `@${id}`}
                                                                        markup="@__id__"
                                                                        style={{
                                                                            backgroundColor: '#dbeafe',
                                                                            color: '#1e40af',
                                                                            padding: '2px 4px',
                                                                            borderRadius: '4px',
                                                                        }}
                                                                    />
                                                                </MentionsInput>
                                                                {!mapping.required && (
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => handleRemoveServiceRequestRow(mapping.id)}
                                                                        className="text-red-600 hover:text-red-700"
                                                                    >
                                                                        Remove
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button
                                            variant="ghost"
                                            onClick={handleAddServiceRequestRow}
                                        >
                                            Add row
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </Card>
            </div>

            {/* Enable Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Connect Salesforce</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4 px-6 py-4">
                        <div>
                            <Label htmlFor="modal-instance-url">
                                Instance URL <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="modal-instance-url"
                                type="url"
                                placeholder="https://yourinstance.salesforce.com"
                                value={salesforceConfig.instanceUrl}
                                onChange={(e) => handleConfigChange("instanceUrl", e.target.value)}
                                className="mt-1"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Your Salesforce instance URL (e.g., https://yourinstance.salesforce.com)
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="modal-username">
                                Username <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="modal-username"
                                type="text"
                                placeholder="user@example.com"
                                value={salesforceConfig.username}
                                onChange={(e) => handleConfigChange("username", e.target.value)}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="modal-password">
                                Password <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="modal-password"
                                type="password"
                                placeholder="Enter your password"
                                value={salesforceConfig.password}
                                onChange={(e) => handleConfigChange("password", e.target.value)}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="modal-security-token">
                                Security token <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="modal-security-token"
                                type="password"
                                placeholder="Enter your security token"
                                value={salesforceConfig.securityToken}
                                onChange={(e) => handleConfigChange("securityToken", e.target.value)}
                                className="mt-1"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Your Salesforce security token. Reset it in your Salesforce account settings if needed.
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="modal-consumer-key">
                                Consumer key <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="modal-consumer-key"
                                type="text"
                                placeholder="Enter consumer key"
                                value={salesforceConfig.consumerKey}
                                onChange={(e) => handleConfigChange("consumerKey", e.target.value)}
                                className="mt-1"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Consumer key from your Salesforce Connected App
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="modal-consumer-secret">
                                Consumer secret <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="modal-consumer-secret"
                                type="password"
                                placeholder="Enter consumer secret"
                                value={salesforceConfig.consumerSecret}
                                onChange={(e) => handleConfigChange("consumerSecret", e.target.value)}
                                className="mt-1"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Consumer secret from your Salesforce Connected App
                            </p>
                        </div>
                    </div>
                    
                    <DialogFooter>
                        <Button
                            variant="ghost"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleConnect}
                            disabled={
                                !salesforceConfig.instanceUrl ||
                                !salesforceConfig.username ||
                                !salesforceConfig.password ||
                                !salesforceConfig.securityToken ||
                                !salesforceConfig.consumerKey ||
                                !salesforceConfig.consumerSecret
                            }
                        >
                            Connect
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
