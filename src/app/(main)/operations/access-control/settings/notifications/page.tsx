"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
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

export default function AccessControlNotificationsSettings() {
    const pathname = usePathname()
    
    // Email Notifications state
    const [emailNotifications, setEmailNotifications] = useState({
        enableEmailAlerts: true,
        accessDeniedAlerts: true,
        deviceOfflineAlerts: true,
        unauthorizedAccessAlerts: true,
        maintenanceAlerts: false,
        systemErrorAlerts: true
    })

    // SMS Notifications state
    const [smsNotifications, setSmsNotifications] = useState({
        enableSMSAlerts: false,
        emergencyAlertsOnly: true,
        deviceFailureAlerts: false,
        securityBreachAlerts: true
    })

    // Real-time Notifications state
    const [realtimeNotifications, setRealtimeNotifications] = useState({
        enablePushNotifications: true,
        browserNotifications: true,
        mobileAppNotifications: true,
        desktopNotifications: false
    })

    // Notification Settings state
    const [notificationSettings, setNotificationSettings] = useState({
        alertFrequency: "immediate",
        quietHours: false,
        quietStart: "22:00",
        quietEnd: "06:00",
        escalationDelay: "15 minutes"
    })

    // Contact Information state
    const [contactInfo, setContactInfo] = useState({
        primaryEmail: "security@company.com",
        secondaryEmail: "admin@company.com",
        emergencyPhone: "+1 (555) 123-4567",
        backupPhone: "+1 (555) 987-6543"
    })

    const handleEmailNotificationToggle = (key: string) => {
        setEmailNotifications(prev => ({
            ...prev,
            [key]: !prev[key as keyof typeof prev]
        }))
    }

    const handleSmsNotificationToggle = (key: string) => {
        setSmsNotifications(prev => ({
            ...prev,
            [key]: !prev[key as keyof typeof prev]
        }))
    }

    const handleRealtimeNotificationToggle = (key: string) => {
        setRealtimeNotifications(prev => ({
            ...prev,
            [key]: !prev[key as keyof typeof prev]
        }))
    }

    const handleNotificationSettingChange = (key: string, value: string | boolean) => {
        setNotificationSettings(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleContactInfoChange = (key: string, value: string) => {
        setContactInfo(prev => ({
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
                {/* Email Notifications Card */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Email Notifications
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable email alerts
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Send notifications via email
                                    </p>
                                </div>
                                <Switch
                                    checked={emailNotifications.enableEmailAlerts}
                                    onCheckedChange={() => handleEmailNotificationToggle("enableEmailAlerts")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Access denied alerts
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Alert when access is denied
                                    </p>
                                </div>
                                <Switch
                                    checked={emailNotifications.accessDeniedAlerts}
                                    onCheckedChange={() => handleEmailNotificationToggle("accessDeniedAlerts")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Device offline alerts
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Alert when devices go offline
                                    </p>
                                </div>
                                <Switch
                                    checked={emailNotifications.deviceOfflineAlerts}
                                    onCheckedChange={() => handleEmailNotificationToggle("deviceOfflineAlerts")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Unauthorized access alerts
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Alert on suspicious access attempts
                                    </p>
                                </div>
                                <Switch
                                    checked={emailNotifications.unauthorizedAccessAlerts}
                                    onCheckedChange={() => handleEmailNotificationToggle("unauthorizedAccessAlerts")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Maintenance alerts
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Alert for scheduled maintenance
                                    </p>
                                </div>
                                <Switch
                                    checked={emailNotifications.maintenanceAlerts}
                                    onCheckedChange={() => handleEmailNotificationToggle("maintenanceAlerts")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        System error alerts
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Alert on system errors and failures
                                    </p>
                                </div>
                                <Switch
                                    checked={emailNotifications.systemErrorAlerts}
                                    onCheckedChange={() => handleEmailNotificationToggle("systemErrorAlerts")}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* SMS Notifications Card */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            SMS Notifications
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable SMS alerts
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Send notifications via SMS
                                    </p>
                                </div>
                                <Switch
                                    checked={smsNotifications.enableSMSAlerts}
                                    onCheckedChange={() => handleSmsNotificationToggle("enableSMSAlerts")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Emergency alerts only
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Only send SMS for emergency situations
                                    </p>
                                </div>
                                <Switch
                                    checked={smsNotifications.emergencyAlertsOnly}
                                    onCheckedChange={() => handleSmsNotificationToggle("emergencyAlertsOnly")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Device failure alerts
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        SMS when critical devices fail
                                    </p>
                                </div>
                                <Switch
                                    checked={smsNotifications.deviceFailureAlerts}
                                    onCheckedChange={() => handleSmsNotificationToggle("deviceFailureAlerts")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Security breach alerts
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        SMS for security incidents
                                    </p>
                                </div>
                                <Switch
                                    checked={smsNotifications.securityBreachAlerts}
                                    onCheckedChange={() => handleSmsNotificationToggle("securityBreachAlerts")}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Real-time Notifications Card */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Real-time Notifications
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable push notifications
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Send real-time push notifications
                                    </p>
                                </div>
                                <Switch
                                    checked={realtimeNotifications.enablePushNotifications}
                                    onCheckedChange={() => handleRealtimeNotificationToggle("enablePushNotifications")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Browser notifications
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Show notifications in web browser
                                    </p>
                                </div>
                                <Switch
                                    checked={realtimeNotifications.browserNotifications}
                                    onCheckedChange={() => handleRealtimeNotificationToggle("browserNotifications")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Mobile app notifications
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Send notifications to mobile app
                                    </p>
                                </div>
                                <Switch
                                    checked={realtimeNotifications.mobileAppNotifications}
                                    onCheckedChange={() => handleRealtimeNotificationToggle("mobileAppNotifications")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Desktop notifications
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Show desktop popup notifications
                                    </p>
                                </div>
                                <Switch
                                    checked={realtimeNotifications.desktopNotifications}
                                    onCheckedChange={() => handleRealtimeNotificationToggle("desktopNotifications")}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Notification Settings Card */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Notification Settings
                        </h3>
                        
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="alertFrequency">Alert frequency</Label>
                                <select
                                    id="alertFrequency"
                                    value={notificationSettings.alertFrequency}
                                    onChange={(e) => handleNotificationSettingChange("alertFrequency", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="immediate">Immediate</option>
                                    <option value="5 minutes">Every 5 minutes</option>
                                    <option value="15 minutes">Every 15 minutes</option>
                                    <option value="hourly">Hourly digest</option>
                                    <option value="daily">Daily digest</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable quiet hours
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Suppress non-emergency notifications
                                    </p>
                                </div>
                                <Switch
                                    checked={notificationSettings.quietHours}
                                    onCheckedChange={(checked) => handleNotificationSettingChange("quietHours", checked)}
                                />
                            </div>

                            {notificationSettings.quietHours && (
                                <>
                                    <div>
                                        <Label htmlFor="quietStart">Quiet hours start</Label>
                                        <Input
                                            id="quietStart"
                                            type="time"
                                            value={notificationSettings.quietStart}
                                            onChange={(e) => handleNotificationSettingChange("quietStart", e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="quietEnd">Quiet hours end</Label>
                                        <Input
                                            id="quietEnd"
                                            type="time"
                                            value={notificationSettings.quietEnd}
                                            onChange={(e) => handleNotificationSettingChange("quietEnd", e.target.value)}
                                        />
                                    </div>
                                </>
                            )}

                            <div>
                                <Label htmlFor="escalationDelay">Escalation delay</Label>
                                <select
                                    id="escalationDelay"
                                    value={notificationSettings.escalationDelay}
                                    onChange={(e) => handleNotificationSettingChange("escalationDelay", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="5 minutes">5 minutes</option>
                                    <option value="15 minutes">15 minutes</option>
                                    <option value="30 minutes">30 minutes</option>
                                    <option value="1 hour">1 hour</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Contact Information Card */}
                <Card className="lg:col-span-2">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Emergency Contact Information
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="primaryEmail">Primary email</Label>
                                <Input
                                    id="primaryEmail"
                                    type="email"
                                    value={contactInfo.primaryEmail}
                                    onChange={(e) => handleContactInfoChange("primaryEmail", e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="secondaryEmail">Secondary email</Label>
                                <Input
                                    id="secondaryEmail"
                                    type="email"
                                    value={contactInfo.secondaryEmail}
                                    onChange={(e) => handleContactInfoChange("secondaryEmail", e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="emergencyPhone">Emergency phone</Label>
                                <Input
                                    id="emergencyPhone"
                                    type="tel"
                                    value={contactInfo.emergencyPhone}
                                    onChange={(e) => handleContactInfoChange("emergencyPhone", e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="backupPhone">Backup phone</Label>
                                <Input
                                    id="backupPhone"
                                    type="tel"
                                    value={contactInfo.backupPhone}
                                    onChange={(e) => handleContactInfoChange("backupPhone", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
