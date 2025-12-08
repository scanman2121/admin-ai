"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Checkbox } from "@/components/Checkbox"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/Dialog"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/Table"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { RiArrowLeftLine, RiMore2Line } from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

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

// Salesforce fields that need to be mapped
const salesforceMappingFields = [
    { id: "Subject", name: "Subject", required: true },
    { id: "Description", name: "Description", required: true },
    { id: "Building_Name__c", name: "Building Name", required: false },
    { id: "Your_Location__c", name: "Your Location", required: false },
    { id: "OwnerId", name: "Owner", required: false },
    { id: "Origin", name: "Origin", required: false }
]

// Service request field templates that can be used in mappings
const serviceRequestFieldTemplates = [
    { value: "{issueTypeName}", label: "Issue Type Name" },
    { value: "{description}", label: "Description" },
    { value: "{description}. sent by {adminEmail}", label: "Description + Admin Email" },
    { value: "{building}", label: "Building" },
    { value: "{location_name}", label: "Location Name" },
    { value: "{location_name}....{building}", label: "Location Name + Building" },
    { value: "{userId}", label: "User ID" },
    { value: "{adminEmail}", label: "Admin Email" },
    { value: "Community", label: "Community (Static)" }
]

// Default field mappings
const defaultFieldMappings: Record<string, string> = {
    "Subject": "{issueTypeName}",
    "Description": "{description}. sent by {adminEmail}",
    "Building_Name__c": "{building}",
    "Your_Location__c": "{location_name}....{building}",
    "OwnerId": "{userId}",
    "Origin": "Community"
}

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

export default function ServiceRequestsConnectedAccounts() {
    const pathname = usePathname()
    
    const [isConnected, setIsConnected] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isKebabOpen, setIsKebabOpen] = useState(false)
    const [salesforceConfig, setSalesforceConfig] = useState({
        instanceUrl: "",
        username: "",
        password: "",
        securityToken: "",
        consumerKey: "",
        consumerSecret: ""
    })
    const [fieldMappings, setFieldMappings] = useState<Record<string, string>>(defaultFieldMappings)
    const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([])
    const [imageError, setImageError] = useState(false)

    const handleConfigChange = (field: string, value: string) => {
        setSalesforceConfig(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleConnect = () => {
        // Demo prototype - fake connection, no actual Salesforce API call
        setIsConnected(true)
        setFieldMappings({ ...defaultFieldMappings })
        setIsModalOpen(false)
    }

    const handleDisable = () => {
        setIsConnected(false)
        setFieldMappings({})
        setSelectedServiceTypes([])
        setIsKebabOpen(false)
    }

    const handleFieldMappingChange = (salesforceFieldId: string, templateValue: string) => {
        setFieldMappings(prev => ({
            ...prev,
            [salesforceFieldId]: templateValue
        }))
    }

    const handleServiceTypeToggle = (serviceTypeId: string) => {
        setSelectedServiceTypes(prev => {
            if (prev.includes(serviceTypeId)) {
                return prev.filter(id => id !== serviceTypeId)
            } else {
                return [...prev, serviceTypeId]
            }
        })
    }

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
                        {/* Salesforce Header with Logo and Enable/Enabled Badge */}
                        <div className="flex items-start justify-between gap-3 py-2">
                            <div className="flex items-start gap-3 flex-1">
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
                            <div className="flex items-center gap-2">
                                {isConnected ? (
                                    <>
                                        <Badge variant="success">Enabled</Badge>
                                        <div className="relative">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="p-2 h-8 w-8"
                                                onClick={() => setIsKebabOpen(!isKebabOpen)}
                                            >
                                                <RiMore2Line className="size-4" />
                                            </Button>
                                            
                                            {isKebabOpen && (
                                                <>
                                                    <div className="fixed inset-0 z-10" onClick={() => setIsKebabOpen(false)} />
                                                    <div className="absolute right-0 top-full mt-1 z-20 min-w-[140px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                                                        <button
                                                            onClick={() => {
                                                                setIsModalOpen(true)
                                                                setIsKebabOpen(false)
                                                            }}
                                                            className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                                                        >
                                                            View settings
                                                        </button>
                                                        <button
                                                            onClick={handleDisable}
                                                            className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                                        >
                                                            Disable
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <Button
                                        variant="primary"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Enable
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Field Mapping and Service Types - Shown when connected */}
                        {isConnected && (
                            <>
                                {/* Field Mapping Table */}
                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-1">
                                            Field mapping
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Map your service request fields to Salesforce fields
                                        </p>
                                    </div>

                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableHeaderCell>Salesforce field</TableHeaderCell>
                                                <TableHeaderCell>Service request field mapping</TableHeaderCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {salesforceMappingFields.map((field) => {
                                                const currentValue = fieldMappings[field.id] ?? ""
                                                return (
                                                    <TableRow key={field.id}>
                                                        <TableCell>
                                                            <div>
                                                                <div className="font-medium text-gray-900 dark:text-gray-100">
                                                                    {field.name}
                                                                </div>
                                                                {field.required && (
                                                                    <span className="text-xs text-red-500">Required</span>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Select
                                                                value={currentValue || undefined}
                                                                onValueChange={(value) => handleFieldMappingChange(field.id, value)}
                                                            >
                                                                <SelectTrigger className="w-full max-w-md">
                                                                    <SelectValue placeholder="Select mapping" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {serviceRequestFieldTemplates.map((template) => (
                                                                        <SelectItem key={template.value} value={template.value}>
                                                                            {template.label}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            {currentValue && (
                                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                    Template: {currentValue}
                                                                </p>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Service Types Selection */}
                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-1">
                                            Service types
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Select which service types this Salesforce connection should apply to
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        {serviceTypeCategories.map((category) => (
                                            <div
                                                key={category.id}
                                                className="flex items-start justify-between gap-3 py-2"
                                            >
                                                <div className="flex-1">
                                                    <Label
                                                        htmlFor={`service-type-${category.id}`}
                                                        className="text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer"
                                                    >
                                                        {category.name}
                                                    </Label>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                        {category.description}
                                                    </p>
                                                </div>
                                                <Checkbox
                                                    id={`service-type-${category.id}`}
                                                    checked={selectedServiceTypes.includes(category.id)}
                                                    onCheckedChange={() => handleServiceTypeToggle(category.id)}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {selectedServiceTypes.length > 0 && (
                                        <div className="pt-2">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {selectedServiceTypes.length} service type{selectedServiceTypes.length !== 1 ? 's' : ''} selected
                                            </p>
                                        </div>
                                    )}
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
