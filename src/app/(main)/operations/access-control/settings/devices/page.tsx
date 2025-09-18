"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { RiAddLine, RiArrowLeftLine, RiSettings3Line } from "@remixicon/react"
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

// Access Control Devices data
const accessControlDevicesData = [
    {
        id: 1,
        deviceName: "Main Entrance Reader",
        deviceType: "Card Reader",
        location: "Building A - Main Entrance",
        ipAddress: "192.168.1.101",
        status: "Online",
        lastSeen: "2 minutes ago",
        firmware: "v2.1.4",
        isActive: true,
    },
    {
        id: 2,
        deviceName: "Lobby Turnstile",
        deviceType: "Turnstile",
        location: "Building A - Lobby",
        ipAddress: "192.168.1.102",
        status: "Online",
        lastSeen: "1 minute ago",
        firmware: "v1.8.2",
        isActive: true,
    },
    {
        id: 3,
        deviceName: "Parking Garage Reader",
        deviceType: "Card Reader",
        location: "Parking Garage - Level 1",
        ipAddress: "192.168.1.103",
        status: "Offline",
        lastSeen: "1 hour ago",
        firmware: "v2.1.3",
        isActive: false,
    },
    {
        id: 4,
        deviceName: "Executive Floor Biometric",
        deviceType: "Biometric Scanner",
        location: "Building A - Floor 15",
        ipAddress: "192.168.1.104",
        status: "Online",
        lastSeen: "5 minutes ago",
        firmware: "v3.0.1",
        isActive: true,
    },
    {
        id: 5,
        deviceName: "Server Room Access",
        deviceType: "Keypad",
        location: "Building A - Server Room",
        ipAddress: "192.168.1.105",
        status: "Maintenance",
        lastSeen: "30 minutes ago",
        firmware: "v1.5.8",
        isActive: true,
    },
]

// Device status color mapping
const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Online":
            return "success" as const
        case "Offline":
            return "error" as const
        case "Maintenance":
            return "warning" as const
        default:
            return "neutral" as const
    }
}

// Device type color mapping
const getDeviceTypeBadgeVariant = (deviceType: string) => {
    switch (deviceType) {
        case "Card Reader":
            return "default" as const
        case "Turnstile":
            return "warning" as const
        case "Biometric Scanner":
            return "error" as const
        case "Keypad":
            return "success" as const
        default:
            return "neutral" as const
    }
}

export default function AccessControlDevicesSettings() {
    const pathname = usePathname()
    const [devices, setDevices] = useState(accessControlDevicesData)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [deviceTypeFilter, setDeviceTypeFilter] = useState("All Types")

    const handleDeviceToggle = (id: number) => {
        setDevices(prev => 
            prev.map(device => 
                device.id === id ? { ...device, isActive: !device.isActive } : device
            )
        )
    }

    const filteredDevices = devices.filter(device => {
        const matchesSearch = device.deviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            device.location.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "All" || device.status === statusFilter
        const matchesDeviceType = deviceTypeFilter === "All Types" || device.deviceType === deviceTypeFilter

        return matchesSearch && matchesStatus && matchesDeviceType
    })

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

            {/* Devices Content */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                            Access Control Devices
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {devices.filter(device => device.isActive).length} of {devices.length} devices active
                        </p>
                    </div>
                    <Button variant="ghost">
                        <RiAddLine className="size-4 mr-1.5" />
                        Add Device
                    </Button>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="Search devices..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option>All</option>
                        <option>Online</option>
                        <option>Offline</option>
                        <option>Maintenance</option>
                    </select>
                    
                    <select 
                        value={deviceTypeFilter}
                        onChange={(e) => setDeviceTypeFilter(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option>All Types</option>
                        <option>Card Reader</option>
                        <option>Turnstile</option>
                        <option>Biometric Scanner</option>
                        <option>Keypad</option>
                    </select>
                </div>

                {/* Devices Table */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Device Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    IP Address
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Firmware
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Active
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredDevices.map((device) => (
                                <tr key={device.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                                {device.deviceName}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {device.location}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge variant={getDeviceTypeBadgeVariant(device.deviceType)}>
                                            {device.deviceType}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <Badge variant={getStatusBadgeVariant(device.status)}>
                                                • {device.status}
                                            </Badge>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                Last seen: {device.lastSeen}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-50">
                                        {device.ipAddress}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-50">
                                        {device.firmware}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Switch
                                            checked={device.isActive}
                                            onCheckedChange={() => handleDeviceToggle(device.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="p-2 h-8 w-8"
                                        >
                                            <RiSettings3Line className="size-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {filteredDevices.length === 0 && (
                        <div className="p-8 text-center">
                            <p className="text-gray-500 dark:text-gray-400">
                                No devices found matching your criteria.
                            </p>
                        </div>
                    )}
                </div>

                {/* Device Health Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <div className="p-4">
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Online Devices</h4>
                            <div className="mt-2 flex items-baseline">
                                <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                                    {devices.filter(d => d.status === "Online").length}
                                </p>
                                <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                    / {devices.length}
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="p-4">
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Offline Devices</h4>
                            <div className="mt-2 flex items-baseline">
                                <p className="text-2xl font-semibold text-red-600 dark:text-red-400">
                                    {devices.filter(d => d.status === "Offline").length}
                                </p>
                                <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                    devices
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="p-4">
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Maintenance</h4>
                            <div className="mt-2 flex items-baseline">
                                <p className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
                                    {devices.filter(d => d.status === "Maintenance").length}
                                </p>
                                <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                    devices
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="p-4">
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Firmware Updates</h4>
                            <div className="mt-2 flex items-baseline">
                                <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                                    2
                                </p>
                                <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                    available
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
