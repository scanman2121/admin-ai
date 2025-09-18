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

export default function AccessControlSecuritySettings() {
    const pathname = usePathname()
    
    // Security Policies state
    const [securityPolicies, setSecurityPolicies] = useState({
        enableMultiFactorAuth: true,
        enableAntiPassback: true,
        enableTailgatingDetection: false,
        enableForcedDoorSecurity: true,
        enableDuressCode: false,
        requireSecurityEscort: false
    })

    // Encryption Settings state
    const [encryptionSettings, setEncryptionSettings] = useState({
        encryptionLevel: "AES-256",
        enableSSL: true,
        enableCertificateAuth: false,
        keyRotationInterval: "90 days"
    })

    // Threat Detection state
    const [threatDetection, setThreatDetection] = useState({
        enableBruteForceProtection: true,
        maxFailedAttempts: "5",
        lockoutDuration: "30 minutes",
        enableAnomalyDetection: true,
        alertOnSuspiciousActivity: true
    })

    const handleSecurityPolicyToggle = (key: string) => {
        setSecurityPolicies(prev => ({
            ...prev,
            [key]: !prev[key as keyof typeof prev]
        }))
    }

    const handleEncryptionSettingChange = (key: string, value: string) => {
        setEncryptionSettings(prev => ({
            ...prev,
            [key]: value === "true" ? true : value === "false" ? false : value
        }))
    }

    const handleThreatDetectionChange = (key: string, value: string) => {
        setThreatDetection(prev => ({
            ...prev,
            [key]: value === "true" ? true : value === "false" ? false : value
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
                {/* Security Policies Card */}
                <Card className="lg:col-span-2">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Security Policies
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Multi-factor authentication
                                        </label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Require multiple forms of authentication
                                        </p>
                                    </div>
                                    <Switch
                                        checked={securityPolicies.enableMultiFactorAuth}
                                        onCheckedChange={() => handleSecurityPolicyToggle("enableMultiFactorAuth")}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Anti-passback protection
                                        </label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Prevent credential sharing and tailgating
                                        </p>
                                    </div>
                                    <Switch
                                        checked={securityPolicies.enableAntiPassback}
                                        onCheckedChange={() => handleSecurityPolicyToggle("enableAntiPassback")}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Tailgating detection
                                        </label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Detect when multiple people use one credential
                                        </p>
                                    </div>
                                    <Switch
                                        checked={securityPolicies.enableTailgatingDetection}
                                        onCheckedChange={() => handleSecurityPolicyToggle("enableTailgatingDetection")}
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Forced door security
                                        </label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Alert when doors are forced open
                                        </p>
                                    </div>
                                    <Switch
                                        checked={securityPolicies.enableForcedDoorSecurity}
                                        onCheckedChange={() => handleSecurityPolicyToggle("enableForcedDoorSecurity")}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Duress code
                                        </label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Enable emergency silent alarm codes
                                        </p>
                                    </div>
                                    <Switch
                                        checked={securityPolicies.enableDuressCode}
                                        onCheckedChange={() => handleSecurityPolicyToggle("enableDuressCode")}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Security escort required
                                        </label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Require escort for visitor access
                                        </p>
                                    </div>
                                    <Switch
                                        checked={securityPolicies.requireSecurityEscort}
                                        onCheckedChange={() => handleSecurityPolicyToggle("requireSecurityEscort")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Encryption Settings Card */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Encryption Settings
                        </h3>
                        
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="encryptionLevel">Encryption level</Label>
                                <select
                                    id="encryptionLevel"
                                    value={encryptionSettings.encryptionLevel}
                                    onChange={(e) => handleEncryptionSettingChange("encryptionLevel", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="AES-128">AES-128</option>
                                    <option value="AES-256">AES-256</option>
                                    <option value="RSA-2048">RSA-2048</option>
                                    <option value="RSA-4096">RSA-4096</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable SSL/TLS
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Secure all network communications
                                    </p>
                                </div>
                                <Switch
                                    checked={encryptionSettings.enableSSL}
                                    onCheckedChange={(checked) => handleEncryptionSettingChange("enableSSL", checked.toString())}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Certificate authentication
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Use digital certificates for device auth
                                    </p>
                                </div>
                                <Switch
                                    checked={encryptionSettings.enableCertificateAuth}
                                    onCheckedChange={(checked) => handleEncryptionSettingChange("enableCertificateAuth", checked.toString())}
                                />
                            </div>

                            <div>
                                <Label htmlFor="keyRotation">Key rotation interval</Label>
                                <select
                                    id="keyRotation"
                                    value={encryptionSettings.keyRotationInterval}
                                    onChange={(e) => handleEncryptionSettingChange("keyRotationInterval", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="30 days">30 days</option>
                                    <option value="90 days">90 days</option>
                                    <option value="6 months">6 months</option>
                                    <option value="1 year">1 year</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Threat Detection Card */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Threat Detection
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Brute force protection
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Detect and block repeated failed attempts
                                    </p>
                                </div>
                                <Switch
                                    checked={threatDetection.enableBruteForceProtection}
                                    onCheckedChange={(checked) => handleThreatDetectionChange("enableBruteForceProtection", checked.toString())}
                                />
                            </div>

                            <div>
                                <Label htmlFor="maxFailedAttempts">Max failed attempts</Label>
                                <Input
                                    id="maxFailedAttempts"
                                    type="number"
                                    value={threatDetection.maxFailedAttempts}
                                    onChange={(e) => handleThreatDetectionChange("maxFailedAttempts", e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="lockoutDuration">Lockout duration</Label>
                                <select
                                    id="lockoutDuration"
                                    value={threatDetection.lockoutDuration}
                                    onChange={(e) => handleThreatDetectionChange("lockoutDuration", e.target.value)}
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
                                        Anomaly detection
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Detect unusual access patterns
                                    </p>
                                </div>
                                <Switch
                                    checked={threatDetection.enableAnomalyDetection}
                                    onCheckedChange={(checked) => handleThreatDetectionChange("enableAnomalyDetection", checked.toString())}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Alert on suspicious activity
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Send alerts for potential security threats
                                    </p>
                                </div>
                                <Switch
                                    checked={threatDetection.alertOnSuspiciousActivity}
                                    onCheckedChange={(checked) => handleThreatDetectionChange("alertOnSuspiciousActivity", checked.toString())}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
