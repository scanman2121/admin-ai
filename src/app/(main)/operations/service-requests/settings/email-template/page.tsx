"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { RiArrowLeftLine, RiCloseLine, RiInformationLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChangeEvent, useRef, useState } from "react"

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

export default function ServiceRequestsEmailTemplate() {
    const pathname = usePathname()
    const fileInputRef = useRef<HTMLInputElement>(null)
    
    const [emailSettings, setEmailSettings] = useState({
        templateImage: null as string | null,
        primaryColor: "#044AEF",
        secondaryColor: "#445645",
        emailDisplayName: "SuperRogue",
        sendFrom: "appsupport3454sdf@kalea.ai",
        replyToEnabled: false,
    })

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setEmailSettings((prev: typeof emailSettings) => ({
                    ...prev,
                    templateImage: reader.result as string
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleRemoveImage = () => {
        setEmailSettings((prev: typeof emailSettings) => ({
            ...prev,
            templateImage: null
        }))
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleInputChange = (field: string, value: string | boolean) => {
        setEmailSettings((prev: typeof emailSettings) => ({
            ...prev,
            [field]: value
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

            {/* Main Content - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Email Settings */}
                <div className="space-y-6">
                    {/* Email Template Image */}
                    <Card>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="template-image">Email template image</Label>
                            </div>
                            
                            <div className="relative">
                                {emailSettings.templateImage ? (
                                    <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                                        <img 
                                            src={emailSettings.templateImage} 
                                            alt="Email template" 
                                            className="w-full h-auto"
                                        />
                                        <button
                                            onClick={handleRemoveImage}
                                            className="absolute top-2 right-2 p-1 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                            aria-label="Remove image"
                                        >
                                            <RiCloseLine className="size-4 text-gray-600 dark:text-gray-400" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            id="template-image"
                                            accept="image/png,image/jpeg,image/jpg,image/webp"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="template-image"
                                            className="cursor-pointer"
                                        >
                                            <div className="space-y-2">
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    Click to upload or drag and drop
                                                </div>
                                                <Button
                                                    variant="primary"
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                >
                                                    Upload image
                                                </Button>
                                                <div className="text-xs text-gray-400 dark:text-gray-500">
                                                    Accepted files: PNG, JPEG, JPG, WEBP
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Primary Color */}
                    <Card>
                        <div className="space-y-2">
                            <Label htmlFor="primary-color">
                                Primary color <span className="text-red-500">*</span>
                            </Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Used in key actions like buttons
                            </p>
                            <div className="flex items-center gap-3">
                                <div 
                                    className="w-8 h-8 rounded border border-gray-300 dark:border-gray-700 flex-shrink-0"
                                    style={{ backgroundColor: emailSettings.primaryColor }}
                                />
                                <Input
                                    id="primary-color"
                                    type="text"
                                    value={emailSettings.primaryColor}
                                    onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                                    placeholder="#044AEF"
                                    className="flex-1"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Secondary Color */}
                    <Card>
                        <div className="space-y-2">
                            <Label htmlFor="secondary-color">
                                Secondary color <span className="text-red-500">*</span>
                            </Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Used in supporting elements like link text
                            </p>
                            <div className="flex items-center gap-3">
                                <div 
                                    className="w-8 h-8 rounded border border-gray-300 dark:border-gray-700 flex-shrink-0"
                                    style={{ backgroundColor: emailSettings.secondaryColor }}
                                />
                                <Input
                                    id="secondary-color"
                                    type="text"
                                    value={emailSettings.secondaryColor}
                                    onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
                                    placeholder="#445645"
                                    className="flex-1"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Email Display Name */}
                    <Card>
                        <div className="space-y-2">
                            <Label htmlFor="email-display-name">
                                Email display name <span className="text-red-500">*</span>
                            </Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                This is the name that will appear to recipients when you send an email
                            </p>
                            <Input
                                id="email-display-name"
                                type="text"
                                value={emailSettings.emailDisplayName}
                                onChange={(e) => handleInputChange("emailDisplayName", e.target.value)}
                                placeholder="SuperRogue"
                            />
                        </div>
                    </Card>

                    {/* Send From */}
                    <Card>
                        <div className="space-y-2">
                            <Label htmlFor="send-from">Send from</Label>
                            <Input
                                id="send-from"
                                type="email"
                                value={emailSettings.sendFrom}
                                disabled
                                className="bg-gray-50 dark:bg-gray-900"
                            />
                            <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <RiInformationLine className="size-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-blue-700 dark:text-blue-300">
                                    To update the 'send from' field, please reach out to your account team to connect your domain
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Reply To Toggle */}
                    <Card>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <Label htmlFor="reply-to-toggle">Set 'reply to' to email address</Label>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        Allow replies to be sent to a different email address
                                    </p>
                                </div>
                                <Switch
                                    id="reply-to-toggle"
                                    checked={emailSettings.replyToEnabled}
                                    onCheckedChange={(checked: boolean) => handleInputChange("replyToEnabled", checked)}
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column - Email Preview */}
                <div className="lg:sticky lg:top-6 h-fit">
                    <Card className="p-0 overflow-hidden">
                        {/* Preview Header */}
                        <div className="bg-gray-800 dark:bg-gray-900 px-4 py-2">
                            <h3 className="text-sm font-medium text-white">EMAIL PREVIEW</h3>
                        </div>

                        {/* Email Preview Content */}
                        <div className="bg-white dark:bg-gray-950 p-6 space-y-4">
                            {/* Sender Info */}
                            <div className="flex items-center gap-3">
                                {emailSettings.templateImage && (
                                    <img 
                                        src={emailSettings.templateImage} 
                                        alt="Template" 
                                        className="w-10 h-10 rounded object-cover"
                                    />
                                )}
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                    {emailSettings.emailDisplayName || "Email display name"}
                                </span>
                            </div>

                            {/* Email Header */}
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
                                Email header
                            </h2>

                            {/* Email Body */}
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                This section will display service request information appropriate with a status update, cancellation, completion, or new messages
                            </p>

                            {/* Link Text */}
                            <a 
                                href="#" 
                                className="text-sm inline-block"
                                style={{ color: emailSettings.secondaryColor }}
                            >
                                Link text
                            </a>

                            {/* Button */}
                            <div className="pt-2">
                                <Button
                                    variant="primary"
                                    style={{ backgroundColor: emailSettings.primaryColor }}
                                    className="border-0"
                                >
                                    Button
                                </Button>
                            </div>

                            {/* Footer */}
                            <div className="pt-6 mt-6 bg-gray-100 dark:bg-gray-800 -mx-6 -mb-6 px-6 py-4 space-y-2 text-center">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    © 2025 Landlord name here. All rights reserved.
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    If you have any questions please contact us
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {emailSettings.sendFrom}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

