"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Checkbox } from "@/components/Checkbox"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { FullPageModal } from "@/components/ui/FullPageModal"
import { RiArrowLeftLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Work Orders Settings page
const tabs = [
    { name: "Settings", href: "/operations/work-orders/settings/general" },
    { name: "Teams", href: "/operations/work-orders/settings/teams" },
    { name: "Categories", href: "/operations/work-orders/settings/categories" },
    { name: "Statuses", href: "/operations/work-orders/settings/statuses" },
    { name: "Service Types", href: "/operations/work-orders/settings" },
]

export default function WorkOrdersGeneralSettings() {
    const pathname = usePathname()
    
    // Form Fields state with enabled and required properties
    const [formFields, setFormFields] = useState({
        location: { enabled: true, required: true },
        description: { enabled: true, required: true },
        attachments: { enabled: true, required: false }
    })
    
    // Notifications state
    const [notifications, setNotifications] = useState({
        alwaysNotifyRequestor: true,
        notifyAssignedTeam: true,
        notifyOnStatusChanges: true,
        notifyOnReassignment: false
    })
    
    // Setup modal state
    const [isSetupModalOpen, setIsSetupModalOpen] = useState(false)
    
    const handleFormFieldToggle = (field: keyof typeof formFields) => {
        setFormFields(prev => ({
            ...prev,
            [field]: { ...prev[field], enabled: !prev[field].enabled }
        }))
    }
    
    const handleRequiredFieldToggle = (field: keyof typeof formFields) => {
        setFormFields(prev => ({
            ...prev,
            [field]: { ...prev[field], required: !prev[field].required }
        }))
    }
    
    const handleNotificationToggle = (field: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [field]: !prev[field] }))
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

            {/* Settings Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Request Form Settings Card */}
                <Card className="h-fit">
                    <div>
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                                Request form settings
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Configure which fields appear on service request forms and their validation requirements.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Location Field */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Location
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                            Building, floor, room number
                                        </p>
                                    </div>
                                    <Switch
                                        checked={formFields.location.enabled}
                                        onCheckedChange={() => handleFormFieldToggle('location')}
                                    />
                                </div>
                                {formFields.location.enabled && (
                                    <div className="ml-4 pl-3 border-l-2 border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="required-location"
                                                checked={formFields.location.required}
                                                onCheckedChange={() => handleRequiredFieldToggle('location')}
                                            />
                                            <label htmlFor="required-location" className="text-xs text-gray-600 dark:text-gray-400">
                                                Required field
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Description Field */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Description
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                            Detailed issue description
                                        </p>
                                    </div>
                                    <Switch
                                        checked={formFields.description.enabled}
                                        onCheckedChange={() => handleFormFieldToggle('description')}
                                    />
                                </div>
                                {formFields.description.enabled && (
                                    <div className="ml-4 pl-3 border-l-2 border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="required-description"
                                                checked={formFields.description.required}
                                                onCheckedChange={() => handleRequiredFieldToggle('description')}
                                            />
                                            <label htmlFor="required-description" className="text-xs text-gray-600 dark:text-gray-400">
                                                Required field
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Attachments Field */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Attachments
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                            Photo/file uploads
                                        </p>
                                    </div>
                                    <Switch
                                        checked={formFields.attachments.enabled}
                                        onCheckedChange={() => handleFormFieldToggle('attachments')}
                                    />
                                </div>
                                {formFields.attachments.enabled && (
                                    <div className="ml-4 pl-3 border-l-2 border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="required-attachments"
                                                checked={formFields.attachments.required}
                                                onCheckedChange={() => handleRequiredFieldToggle('attachments')}
                                            />
                                            <label htmlFor="required-attachments" className="text-xs text-gray-600 dark:text-gray-400">
                                                Required field
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Notification Preferences Card */}
                <Card className="h-fit">
                    <div>
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                                Notification preferences
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Configure email notifications for work order events and status changes.
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-start justify-between gap-3 py-2">
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        Always notify requestor
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        Send confirmation and status updates to the person who submitted each request
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.alwaysNotifyRequestor}
                                    onCheckedChange={() => handleNotificationToggle('alwaysNotifyRequestor')}
                                />
                            </div>
                            
                            <div className="flex items-start justify-between gap-3 py-2">
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Notify assigned team
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                            Send email to assigned team when new requests are submitted
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notifications.notifyAssignedTeam}
                                        onCheckedChange={() => handleNotificationToggle('notifyAssignedTeam')}
                                    />
                                </div>
                                
                                <div className="flex items-start justify-between gap-3 py-2">
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Notify on status changes
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                            Send email when request status is updated or comments are added
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notifications.notifyOnStatusChanges}
                                        onCheckedChange={() => handleNotificationToggle('notifyOnStatusChanges')}
                                    />
                                </div>
                                
                                <div className="flex items-start justify-between gap-3 py-2">
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Notify on reassignment
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                            Send email to new assignee when requests are reassigned between teams
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notifications.notifyOnReassignment}
                                        onCheckedChange={() => handleNotificationToggle('notifyOnReassignment')}
                                    />
                                </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Setup Modal */}
            <FullPageModal
                isOpen={isSetupModalOpen}
                onClose={() => setIsSetupModalOpen(false)}
                title="Service Request Setup"
                iframeUrl="https://v0-workflow-system-design-sage.vercel.app/"
            />
        </div>
    )
}
