"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Select } from "@/components/Select"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { RiArrowLeftLine } from "@remixicon/react"
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

export default function AccessControlGeneralSettings() {
    const pathname = usePathname()
    
    // Access Control Preferences state
    const [preferences, setPreferences] = useState({
        autoExpireVisitorAccess: true,
        requirePhotoVerification: true,
        enableMobileCredentials: true,
        allowBulkProvisioning: false,
        enableAccessLogging: true,
        requireManagerApproval: true
    })

    // Time-based Settings state
    const [timeSettings, setTimeSettings] = useState({
        defaultAccessDuration: "8 hours",
        maxVisitorDuration: "24 hours",
        inactivityTimeout: "30 minutes"
    })

    // Integration Settings state
    const [integrationSettings, setIntegrationSettings] = useState({
        syncWithHR: true,
        enableDirectoryIntegration: false,
        autoDeactivateTerminatedUsers: true
    })

    const handlePreferenceToggle = (key: string) => {
        setPreferences(prev => ({
            ...prev,
            [key]: !prev[key as keyof typeof prev]
        }))
    }

    const handleIntegrationToggle = (key: string) => {
        setIntegrationSettings(prev => ({
            ...prev,
            [key]: !prev[key as keyof typeof prev]
        }))
    }

    const handleTimeSettingChange = (key: string, value: string) => {
        setTimeSettings(prev => ({
            ...prev,
            [key]: value
        }))
    }

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

            {/* Settings Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Access Control Preferences Card */}
                <Card className="lg:col-span-2">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Access Control Preferences
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Auto-expire visitor access
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Automatically revoke visitor credentials after scheduled visit ends
                                    </p>
                                </div>
                                <Switch
                                    checked={preferences.autoExpireVisitorAccess}
                                    onCheckedChange={() => handlePreferenceToggle("autoExpireVisitorAccess")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Require photo verification
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Require photo upload for all new access requests
                                    </p>
                                </div>
                                <Switch
                                    checked={preferences.requirePhotoVerification}
                                    onCheckedChange={() => handlePreferenceToggle("requirePhotoVerification")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable mobile credentials
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Allow users to access building using mobile devices
                                    </p>
                                </div>
                                <Switch
                                    checked={preferences.enableMobileCredentials}
                                    onCheckedChange={() => handlePreferenceToggle("enableMobileCredentials")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Allow bulk provisioning
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Enable bulk import and provisioning of access credentials
                                    </p>
                                </div>
                                <Switch
                                    checked={preferences.allowBulkProvisioning}
                                    onCheckedChange={() => handlePreferenceToggle("allowBulkProvisioning")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable access logging
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Log all access events for security and audit purposes
                                    </p>
                                </div>
                                <Switch
                                    checked={preferences.enableAccessLogging}
                                    onCheckedChange={() => handlePreferenceToggle("enableAccessLogging")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Require manager approval
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        All access requests require approval from manager or admin
                                    </p>
                                </div>
                                <Switch
                                    checked={preferences.requireManagerApproval}
                                    onCheckedChange={() => handlePreferenceToggle("requireManagerApproval")}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Time-based Settings Card */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Time-based Settings
                        </h3>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Default access duration
                                </label>
                                <Select 
                                    value={timeSettings.defaultAccessDuration}
                                    onValueChange={(value) => handleTimeSettingChange("defaultAccessDuration", value)}
                                >
                                    <option value="4 hours">4 hours</option>
                                    <option value="8 hours">8 hours</option>
                                    <option value="24 hours">24 hours</option>
                                    <option value="1 week">1 week</option>
                                    <option value="Custom">Custom</option>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Maximum visitor duration
                                </label>
                                <Select 
                                    value={timeSettings.maxVisitorDuration}
                                    onValueChange={(value) => handleTimeSettingChange("maxVisitorDuration", value)}
                                >
                                    <option value="4 hours">4 hours</option>
                                    <option value="8 hours">8 hours</option>
                                    <option value="24 hours">24 hours</option>
                                    <option value="72 hours">72 hours</option>
                                    <option value="1 week">1 week</option>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Inactivity timeout
                                </label>
                                <Select 
                                    value={timeSettings.inactivityTimeout}
                                    onValueChange={(value) => handleTimeSettingChange("inactivityTimeout", value)}
                                >
                                    <option value="15 minutes">15 minutes</option>
                                    <option value="30 minutes">30 minutes</option>
                                    <option value="1 hour">1 hour</option>
                                    <option value="2 hours">2 hours</option>
                                    <option value="Never">Never</option>
                                </Select>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Integration Settings Card */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Integration Settings
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Sync with HR system
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Automatically sync employee data
                                    </p>
                                </div>
                                <Switch
                                    checked={integrationSettings.syncWithHR}
                                    onCheckedChange={() => handleIntegrationToggle("syncWithHR")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Directory integration
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Connect with Active Directory or LDAP
                                    </p>
                                </div>
                                <Switch
                                    checked={integrationSettings.enableDirectoryIntegration}
                                    onCheckedChange={() => handleIntegrationToggle("enableDirectoryIntegration")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Auto-deactivate terminated users
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Remove access when employee is terminated
                                    </p>
                                </div>
                                <Switch
                                    checked={integrationSettings.autoDeactivateTerminatedUsers}
                                    onCheckedChange={() => handleIntegrationToggle("autoDeactivateTerminatedUsers")}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
