"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Label } from "@/components/Label"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { RiArrowLeftLine, RiUploadLine } from "@remixicon/react"
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

export default function AccessControlCardArtSettings() {
    const pathname = usePathname()
    
    // Card Design state
    const [cardDesign, setCardDesign] = useState({
        useCustomDesign: true,
        includeCompanyLogo: true,
        includeBuildingImage: false,
        includeQRCode: true,
        showEmployeePhoto: true,
        showEmployeeName: true,
        showDepartment: true,
        showAccessLevel: false
    })

    // Card Layout state
    const [cardLayout, setCardLayout] = useState({
        orientation: "landscape",
        colorScheme: "corporate",
        fontFamily: "Arial",
        logoPosition: "top-left"
    })

    const handleCardDesignToggle = (key: string) => {
        setCardDesign(prev => ({
            ...prev,
            [key]: !prev[key as keyof typeof prev]
        }))
    }

    const handleCardLayoutChange = (key: string, value: string) => {
        setCardLayout(prev => ({
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
                {/* Card Design Elements Card */}
                <Card className="lg:col-span-2">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Card Design Elements
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Use custom design
                                        </label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Apply custom branding and layout
                                        </p>
                                    </div>
                                    <Switch
                                        checked={cardDesign.useCustomDesign}
                                        onCheckedChange={() => handleCardDesignToggle("useCustomDesign")}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Include company logo
                                        </label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Display organization logo on cards
                                        </p>
                                    </div>
                                    <Switch
                                        checked={cardDesign.includeCompanyLogo}
                                        onCheckedChange={() => handleCardDesignToggle("includeCompanyLogo")}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Include building image
                                        </label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Show building photo as background
                                        </p>
                                    </div>
                                    <Switch
                                        checked={cardDesign.includeBuildingImage}
                                        onCheckedChange={() => handleCardDesignToggle("includeBuildingImage")}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Include QR code
                                        </label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Add QR code for mobile verification
                                        </p>
                                    </div>
                                    <Switch
                                        checked={cardDesign.includeQRCode}
                                        onCheckedChange={() => handleCardDesignToggle("includeQRCode")}
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Show employee photo
                                        </label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Display employee headshot
                                        </p>
                                    </div>
                                    <Switch
                                        checked={cardDesign.showEmployeePhoto}
                                        onCheckedChange={() => handleCardDesignToggle("showEmployeePhoto")}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Show employee name
                                        </label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Print full name on card
                                        </p>
                                    </div>
                                    <Switch
                                        checked={cardDesign.showEmployeeName}
                                        onCheckedChange={() => handleCardDesignToggle("showEmployeeName")}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Show department
                                        </label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Include department information
                                        </p>
                                    </div>
                                    <Switch
                                        checked={cardDesign.showDepartment}
                                        onCheckedChange={() => handleCardDesignToggle("showDepartment")}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Show access level
                                        </label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Display security clearance level
                                        </p>
                                    </div>
                                    <Switch
                                        checked={cardDesign.showAccessLevel}
                                        onCheckedChange={() => handleCardDesignToggle("showAccessLevel")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Card Layout Settings Card */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Card Layout
                        </h3>
                        
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="orientation">Card orientation</Label>
                                <select
                                    id="orientation"
                                    value={cardLayout.orientation}
                                    onChange={(e) => handleCardLayoutChange("orientation", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="landscape">Landscape</option>
                                    <option value="portrait">Portrait</option>
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="colorScheme">Color scheme</Label>
                                <select
                                    id="colorScheme"
                                    value={cardLayout.colorScheme}
                                    onChange={(e) => handleCardLayoutChange("colorScheme", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="corporate">Corporate Blue</option>
                                    <option value="modern">Modern Gray</option>
                                    <option value="professional">Professional Black</option>
                                    <option value="custom">Custom Colors</option>
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="fontFamily">Font family</Label>
                                <select
                                    id="fontFamily"
                                    value={cardLayout.fontFamily}
                                    onChange={(e) => handleCardLayoutChange("fontFamily", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="Arial">Arial</option>
                                    <option value="Helvetica">Helvetica</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="Calibri">Calibri</option>
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="logoPosition">Logo position</Label>
                                <select
                                    id="logoPosition"
                                    value={cardLayout.logoPosition}
                                    onChange={(e) => handleCardLayoutChange("logoPosition", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="top-left">Top Left</option>
                                    <option value="top-right">Top Right</option>
                                    <option value="center">Center</option>
                                    <option value="bottom-left">Bottom Left</option>
                                    <option value="bottom-right">Bottom Right</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Logo Upload Card */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Logo Upload
                        </h3>
                        
                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                                <RiUploadLine className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    Drag and drop your logo here, or click to browse
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    PNG, JPG up to 2MB. Recommended: 300x100px
                                </p>
                                <Button variant="ghost" size="sm" className="mt-3">
                                    Browse Files
                                </Button>
                            </div>
                            
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Current logo: company-logo.png (245KB)
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
