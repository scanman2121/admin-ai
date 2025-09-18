"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { RiArrowLeftLine, RiDownloadLine, RiUploadLine } from "@remixicon/react"
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

export default function AccessControlAdvancedSettings() {
    const pathname = usePathname()
    
    // API Settings state
    const [apiSettings, setApiSettings] = useState({
        enableAPIAccess: true,
        requireAPIKeys: true,
        enableRateLimiting: true,
        enableWebhooks: false,
        webhookURL: "https://api.company.com/webhooks/access-control"
    })

    // Database Settings state
    const [databaseSettings, setDatabaseSettings] = useState({
        enableBackups: true,
        backupFrequency: "daily",
        retentionPeriod: "90 days",
        enableArchiving: true,
        enableReplication: false
    })

    // Performance Settings state
    const [performanceSettings, setPerformanceSettings] = useState({
        enableCaching: true,
        cacheExpiration: "1 hour",
        enableCompression: true,
        optimizeImages: true,
        maxConcurrentUsers: "1000"
    })

    // Maintenance Settings state
    const [maintenanceSettings, setMaintenanceSettings] = useState({
        enableMaintenanceMode: false,
        scheduledMaintenance: false,
        maintenanceStart: "02:00",
        maintenanceEnd: "04:00",
        allowEmergencyAccess: true
    })

    const handleApiSettingChange = (key: string, value: string | boolean) => {
        setApiSettings(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleDatabaseSettingChange = (key: string, value: string | boolean) => {
        setDatabaseSettings(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handlePerformanceSettingChange = (key: string, value: string | boolean) => {
        setPerformanceSettings(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleMaintenanceSettingChange = (key: string, value: string | boolean) => {
        setMaintenanceSettings(prev => ({
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
                {/* API Settings Card */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            API Settings
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable API access
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Allow external systems to access via API
                                    </p>
                                </div>
                                <Switch
                                    checked={apiSettings.enableAPIAccess}
                                    onCheckedChange={(checked) => handleApiSettingChange("enableAPIAccess", checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Require API keys
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Authenticate API requests with keys
                                    </p>
                                </div>
                                <Switch
                                    checked={apiSettings.requireAPIKeys}
                                    onCheckedChange={(checked) => handleApiSettingChange("requireAPIKeys", checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable rate limiting
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Limit API requests per minute
                                    </p>
                                </div>
                                <Switch
                                    checked={apiSettings.enableRateLimiting}
                                    onCheckedChange={(checked) => handleApiSettingChange("enableRateLimiting", checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable webhooks
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Send real-time event notifications
                                    </p>
                                </div>
                                <Switch
                                    checked={apiSettings.enableWebhooks}
                                    onCheckedChange={(checked) => handleApiSettingChange("enableWebhooks", checked)}
                                />
                            </div>

                            {apiSettings.enableWebhooks && (
                                <div>
                                    <Label htmlFor="webhookURL">Webhook URL</Label>
                                    <Input
                                        id="webhookURL"
                                        type="url"
                                        value={apiSettings.webhookURL}
                                        onChange={(e) => handleApiSettingChange("webhookURL", e.target.value)}
                                        placeholder="https://api.company.com/webhooks"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Database Settings Card */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Database Settings
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable automatic backups
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Automatically backup database
                                    </p>
                                </div>
                                <Switch
                                    checked={databaseSettings.enableBackups}
                                    onCheckedChange={(checked) => handleDatabaseSettingChange("enableBackups", checked)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="backupFrequency">Backup frequency</Label>
                                <select
                                    id="backupFrequency"
                                    value={databaseSettings.backupFrequency}
                                    onChange={(e) => handleDatabaseSettingChange("backupFrequency", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="hourly">Hourly</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="retentionPeriod">Data retention period</Label>
                                <select
                                    id="retentionPeriod"
                                    value={databaseSettings.retentionPeriod}
                                    onChange={(e) => handleDatabaseSettingChange("retentionPeriod", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="30 days">30 days</option>
                                    <option value="90 days">90 days</option>
                                    <option value="1 year">1 year</option>
                                    <option value="2 years">2 years</option>
                                    <option value="indefinite">Indefinite</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable data archiving
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Archive old data to reduce size
                                    </p>
                                </div>
                                <Switch
                                    checked={databaseSettings.enableArchiving}
                                    onCheckedChange={(checked) => handleDatabaseSettingChange("enableArchiving", checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable replication
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Replicate data to backup servers
                                    </p>
                                </div>
                                <Switch
                                    checked={databaseSettings.enableReplication}
                                    onCheckedChange={(checked) => handleDatabaseSettingChange("enableReplication", checked)}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Performance Settings Card */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Performance Settings
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable caching
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Cache frequently accessed data
                                    </p>
                                </div>
                                <Switch
                                    checked={performanceSettings.enableCaching}
                                    onCheckedChange={(checked) => handlePerformanceSettingChange("enableCaching", checked)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="cacheExpiration">Cache expiration</Label>
                                <select
                                    id="cacheExpiration"
                                    value={performanceSettings.cacheExpiration}
                                    onChange={(e) => handlePerformanceSettingChange("cacheExpiration", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="15 minutes">15 minutes</option>
                                    <option value="30 minutes">30 minutes</option>
                                    <option value="1 hour">1 hour</option>
                                    <option value="24 hours">24 hours</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable compression
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Compress data transfers
                                    </p>
                                </div>
                                <Switch
                                    checked={performanceSettings.enableCompression}
                                    onCheckedChange={(checked) => handlePerformanceSettingChange("enableCompression", checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Optimize images
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Compress and optimize user photos
                                    </p>
                                </div>
                                <Switch
                                    checked={performanceSettings.optimizeImages}
                                    onCheckedChange={(checked) => handlePerformanceSettingChange("optimizeImages", checked)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="maxConcurrentUsers">Max concurrent users</Label>
                                <Input
                                    id="maxConcurrentUsers"
                                    type="number"
                                    value={performanceSettings.maxConcurrentUsers}
                                    onChange={(e) => handlePerformanceSettingChange("maxConcurrentUsers", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Maintenance Settings Card */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            System Maintenance
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Maintenance mode
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Enable system maintenance mode
                                    </p>
                                </div>
                                <Switch
                                    checked={maintenanceSettings.enableMaintenanceMode}
                                    onCheckedChange={(checked) => handleMaintenanceSettingChange("enableMaintenanceMode", checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Scheduled maintenance
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Schedule automatic maintenance windows
                                    </p>
                                </div>
                                <Switch
                                    checked={maintenanceSettings.scheduledMaintenance}
                                    onCheckedChange={(checked) => handleMaintenanceSettingChange("scheduledMaintenance", checked)}
                                />
                            </div>

                            {maintenanceSettings.scheduledMaintenance && (
                                <>
                                    <div>
                                        <Label htmlFor="maintenanceStart">Maintenance start time</Label>
                                        <Input
                                            id="maintenanceStart"
                                            type="time"
                                            value={maintenanceSettings.maintenanceStart}
                                            onChange={(e) => handleMaintenanceSettingChange("maintenanceStart", e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="maintenanceEnd">Maintenance end time</Label>
                                        <Input
                                            id="maintenanceEnd"
                                            type="time"
                                            value={maintenanceSettings.maintenanceEnd}
                                            onChange={(e) => handleMaintenanceSettingChange("maintenanceEnd", e.target.value)}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Allow emergency access
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Permit access during maintenance
                                    </p>
                                </div>
                                <Switch
                                    checked={maintenanceSettings.allowEmergencyAccess}
                                    onCheckedChange={(checked) => handleMaintenanceSettingChange("allowEmergencyAccess", checked)}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Data Export/Import Card */}
                <Card className="lg:col-span-2">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Data Export & Import
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="font-medium text-gray-900 dark:text-gray-50">Export Data</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Export access control data for backup or migration
                                </p>
                                <div className="space-y-2">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <RiDownloadLine className="size-4 mr-2" />
                                        Export user data
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start">
                                        <RiDownloadLine className="size-4 mr-2" />
                                        Export access logs
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start">
                                        <RiDownloadLine className="size-4 mr-2" />
                                        Export configuration
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-medium text-gray-900 dark:text-gray-50">Import Data</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Import data from external systems or backups
                                </p>
                                <div className="space-y-2">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <RiUploadLine className="size-4 mr-2" />
                                        Import user data
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start">
                                        <RiUploadLine className="size-4 mr-2" />
                                        Import access policies
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start">
                                        <RiUploadLine className="size-4 mr-2" />
                                        Import device configuration
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
