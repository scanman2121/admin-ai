"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { Switch } from "@/components/Switch"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/Table"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { RiArrowLeftLine } from "@remixicon/react"
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

// Service request fields that can be mapped to Salesforce
const serviceRequestFields = [
    { id: "requestId", name: "Request ID", type: "text" },
    { id: "title", name: "Title", type: "text" },
    { id: "description", name: "Description", type: "textarea" },
    { id: "status", name: "Status", type: "select" },
    { id: "priority", name: "Priority", type: "select" },
    { id: "location", name: "Location", type: "text" },
    { id: "assignedTo", name: "Assigned To", type: "text" },
    { id: "createdDate", name: "Created Date", type: "date" },
    { id: "dueDate", name: "Due Date", type: "date" },
    { id: "attachments", name: "Attachments", type: "file" }
]

// Sample Salesforce fields (in a real app, these would be fetched from Salesforce)
const salesforceFields = [
    { value: "", label: "None" },
    { value: "CaseNumber", label: "Case Number" },
    { value: "Subject", label: "Subject" },
    { value: "Description", label: "Description" },
    { value: "Status", label: "Status" },
    { value: "Priority", label: "Priority" },
    { value: "Location__c", label: "Location" },
    { value: "OwnerId", label: "Owner" },
    { value: "CreatedDate", label: "Created Date" },
    { value: "Due_Date__c", label: "Due Date" },
    { value: "Attachment", label: "Attachment" }
]

export default function ServiceRequestsConnectedAccounts() {
    const pathname = usePathname()
    
    const [salesforceEnabled, setSalesforceEnabled] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const [salesforceConfig, setSalesforceConfig] = useState({
        instanceUrl: "",
        username: "",
        password: "",
        securityToken: "",
        consumerKey: "",
        consumerSecret: ""
    })
    const [fieldMappings, setFieldMappings] = useState<Record<string, string>>({})

    const handleSalesforceToggle = (checked: boolean) => {
        setSalesforceEnabled(checked)
        if (!checked) {
            setIsConnected(false)
            setFieldMappings({})
        }
    }

    const handleConfigChange = (field: string, value: string) => {
        setSalesforceConfig(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleConnect = () => {
        // In a real app, this would validate credentials and connect to Salesforce
        // For now, we'll just set connected to true
        setIsConnected(true)
    }

    const handleFieldMappingChange = (serviceRequestFieldId: string, salesforceField: string) => {
        setFieldMappings(prev => ({
            ...prev,
            [serviceRequestFieldId]: salesforceField
        }))
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
                        {/* Salesforce Header with Logo and Toggle */}
                        <div className="flex items-start justify-between gap-3 py-2">
                            <div className="flex items-start gap-4 flex-1">
                                {/* Logo in white box with gray outline */}
                                <div className="flex-shrink-0 bg-white border border-gray-300 dark:border-gray-600 rounded p-3">
                                    <Image
                                        src="/images/sf.png"
                                        alt="Salesforce"
                                        width={120}
                                        height={40}
                                        className="object-contain"
                                    />
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
                            <Switch
                                checked={salesforceEnabled}
                                onCheckedChange={handleSalesforceToggle}
                            />
                        </div>

                        {/* Configuration Inputs - Shown when enabled */}
                        {salesforceEnabled && (
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                                <div>
                                    <Label htmlFor="instance-url">
                                        Instance URL <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="instance-url"
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
                                    <Label htmlFor="username">
                                        Username <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="user@example.com"
                                        value={salesforceConfig.username}
                                        onChange={(e) => handleConfigChange("username", e.target.value)}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="password">
                                        Password <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={salesforceConfig.password}
                                        onChange={(e) => handleConfigChange("password", e.target.value)}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="security-token">
                                        Security token <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="security-token"
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
                                    <Label htmlFor="consumer-key">
                                        Consumer key <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="consumer-key"
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
                                    <Label htmlFor="consumer-secret">
                                        Consumer secret <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="consumer-secret"
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

                                {/* Connect Button */}
                                <div className="pt-2">
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
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Field Mapping Table - Shown after connection */}
                {isConnected && (
                    <Card>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
                                    Field mapping
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Map your service request fields to Salesforce fields
                                </p>
                            </div>

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderCell>Service request field</TableHeaderCell>
                                        <TableHeaderCell>Salesforce field</TableHeaderCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {serviceRequestFields.map((field) => (
                                        <TableRow key={field.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-gray-100">
                                                        {field.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {field.type}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    value={fieldMappings[field.id] || ""}
                                                    onValueChange={(value) => handleFieldMappingChange(field.id, value)}
                                                >
                                                    <SelectTrigger className="w-full max-w-xs">
                                                        <SelectValue placeholder="Select Salesforce field" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {salesforceFields.map((sfField) => (
                                                            <SelectItem key={sfField.value} value={sfField.value}>
                                                                {sfField.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    )
}

