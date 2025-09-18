"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
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

export default function AccessControlCredentialsSettings() {
    const pathname = usePathname()
    
    // Credential Types state
    const [credentialTypes, setCredentialTypes] = useState({
        physicalCards: true,
        mobileCredentials: true,
        biometricScan: false,
        pinCodes: true,
        temporaryTokens: true
    })

    // Card Configuration state
    const [cardConfig, setCardConfig] = useState({
        enableProximityCards: true,
        enableSmartCards: false,
        requireEncryption: true,
        enableCloning: false
    })

    const handleCredentialTypeToggle = (key: string) => {
        setCredentialTypes(prev => ({
            ...prev,
            [key]: !prev[key as keyof typeof prev]
        }))
    }

    const handleCardConfigToggle = (key: string) => {
        setCardConfig(prev => ({
            ...prev,
            [key]: !prev[key as keyof typeof prev]
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
                {/* Credential Types Card */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Credential Types
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Physical key cards
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Traditional RFID or magnetic stripe cards
                                    </p>
                                </div>
                                <Switch
                                    checked={credentialTypes.physicalCards}
                                    onCheckedChange={() => handleCredentialTypeToggle("physicalCards")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Mobile credentials
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Smartphone-based access credentials
                                    </p>
                                </div>
                                <Switch
                                    checked={credentialTypes.mobileCredentials}
                                    onCheckedChange={() => handleCredentialTypeToggle("mobileCredentials")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Biometric scanning
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Fingerprint or facial recognition access
                                    </p>
                                </div>
                                <Switch
                                    checked={credentialTypes.biometricScan}
                                    onCheckedChange={() => handleCredentialTypeToggle("biometricScan")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        PIN codes
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Numeric access codes for keypads
                                    </p>
                                </div>
                                <Switch
                                    checked={credentialTypes.pinCodes}
                                    onCheckedChange={() => handleCredentialTypeToggle("pinCodes")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Temporary tokens
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        One-time or time-limited access codes
                                    </p>
                                </div>
                                <Switch
                                    checked={credentialTypes.temporaryTokens}
                                    onCheckedChange={() => handleCredentialTypeToggle("temporaryTokens")}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Card Configuration Card */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Card Configuration
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable proximity cards
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Support for 125kHz proximity cards
                                    </p>
                                </div>
                                <Switch
                                    checked={cardConfig.enableProximityCards}
                                    onCheckedChange={() => handleCardConfigToggle("enableProximityCards")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable smart cards
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Support for 13.56MHz smart cards
                                    </p>
                                </div>
                                <Switch
                                    checked={cardConfig.enableSmartCards}
                                    onCheckedChange={() => handleCardConfigToggle("enableSmartCards")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Require encryption
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Encrypt all card data transmissions
                                    </p>
                                </div>
                                <Switch
                                    checked={cardConfig.requireEncryption}
                                    onCheckedChange={() => handleCardConfigToggle("requireEncryption")}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable card cloning protection
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Detect and prevent card duplication
                                    </p>
                                </div>
                                <Switch
                                    checked={cardConfig.enableCloning}
                                    onCheckedChange={() => handleCardConfigToggle("enableCloning")}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
