"use client"

import { Button } from "@/components/Button"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { cn } from "@/lib/utils"
import {
    RiArrowLeftLine,
    RiBuilding2Line,
    RiCalendarEventLine,
    RiMailLine,
    RiMapPinLine,
    RiPhoneLine,
    RiTeamLine,
    RiTimeLine,
    RiUserLine,
} from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

// Mock data for vendor details
const vendorData = {
    id: "1",
    name: "Maintenance Pro",
    logoUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Maintenance",
    contact: "John Smith",
    email: "john@maintenancepro.com",
    phone: "617-555-1234",
    address: "123 Main Street, Boston, MA 02110",
    buildings: ["125 Highland Ave", "500 Boylston Street"],
    status: "Active",
    description: "Maintenance Pro provides comprehensive building maintenance services including HVAC, electrical, plumbing, and general repairs.",
    workingHours: "Monday - Friday: 8:00 AM - 5:00 PM",
    team: [
        {
            id: "1",
            name: "John Smith",
            role: "Lead Technician",
            imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: "2",
            name: "Sarah Johnson",
            role: "HVAC Specialist",
            imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: "3",
            name: "Michael Brown",
            role: "Electrician",
            imageUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    ],
    upcomingVisits: [
        {
            id: "1",
            purpose: "HVAC Maintenance",
            date: "2024-03-20",
            time: "10:00 AM",
            location: "125 Highland Ave",
            status: "Scheduled",
        },
        {
            id: "2",
            purpose: "Electrical Inspection",
            date: "2024-03-22",
            time: "2:00 PM",
            location: "500 Boylston Street",
            status: "Pending",
        },
    ],
}

// Define tabs for the vendor details page
const tabs = [
    { name: "Overview", href: "" },
    { name: "Team", href: "/team" },
    { name: "Documents", href: "/documents" },
    { name: "Settings", href: "/settings" },
] as const

export default function VendorDetails() {
    const pathname = usePathname()
    const params = useParams()
    const baseUrl = `/vendors/${params.id}`

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/vendors"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4"
                >
                    <RiArrowLeftLine className="mr-1" />
                    Back to vendors
                </Link>

                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative size-16 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
                            <Image
                                src={vendorData.logoUrl}
                                alt={vendorData.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
                                {vendorData.name}
                            </h1>
                            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <span>{vendorData.category}</span>
                                <span className="text-gray-300 dark:text-gray-700">•</span>
                                <span className={cn(
                                    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                                    vendorData.status === "Active"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                )}>
                                    {vendorData.status}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="secondary">Edit</Button>
                        <Button>Schedule Visit</Button>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <TabNavigation className="mb-6">
                {tabs.map((tab) => (
                    <TabNavigationLink
                        key={tab.name}
                        asChild
                        active={pathname === baseUrl + tab.href}
                    >
                        <Link href={baseUrl + tab.href}>{tab.name}</Link>
                    </TabNavigationLink>
                ))}
            </TabNavigation>

            {/* Content */}
            <div className="grid grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="col-span-2 space-y-6">
                    {/* About */}
                    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent overflow-hidden">
                        <div className="border-b border-gray-200 dark:border-gray-800 px-4 py-3">
                            <h2 className="font-medium text-gray-900 dark:text-gray-50">About</h2>
                        </div>
                        <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
                            {vendorData.description}
                        </div>
                    </div>

                    {/* Building Access */}
                    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent overflow-hidden">
                        <div className="border-b border-gray-200 dark:border-gray-800 px-4 py-3">
                            <h2 className="font-medium text-gray-900 dark:text-gray-50">Building Access</h2>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-800">
                            {vendorData.buildings.map((building, index) => (
                                <div key={index} className="flex items-center gap-3 p-4">
                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                        <RiBuilding2Line className="size-4" />
                                    </div>
                                    <div className="text-gray-900 dark:text-gray-50">
                                        {building}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team */}
                    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent overflow-hidden">
                        <div className="border-b border-gray-200 dark:border-gray-800 px-4 py-3">
                            <h2 className="font-medium text-gray-900 dark:text-gray-50">Team</h2>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-800">
                            {vendorData.team.map((member) => (
                                <div key={member.id} className="flex items-center gap-3 p-4">
                                    <div className="relative size-10 overflow-hidden rounded-full">
                                        <Image
                                            src={member.imageUrl}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900 dark:text-gray-50">
                                            {member.name}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {member.role}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Visits */}
                    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent overflow-hidden">
                        <div className="border-b border-gray-200 dark:border-gray-800 px-4 py-3">
                            <h2 className="font-medium text-gray-900 dark:text-gray-50">Upcoming Visits</h2>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-800">
                            {vendorData.upcomingVisits.map((visit) => (
                                <div key={visit.id} className="p-4">
                                    <div className="font-medium text-gray-900 dark:text-gray-50 mb-1">
                                        {visit.purpose}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-1.5">
                                            <RiCalendarEventLine className="size-4" />
                                            <span>{visit.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <RiTimeLine className="size-4" />
                                            <span>{visit.time}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <RiMapPinLine className="size-4" />
                                            <span>{visit.location}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Contact Information */}
                    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent overflow-hidden">
                        <div className="border-b border-gray-200 dark:border-gray-800 px-4 py-3">
                            <h2 className="font-medium text-gray-900 dark:text-gray-50">Contact Information</h2>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <RiUserLine className="size-4 text-gray-400" />
                                <div>
                                    <div className="text-gray-500 dark:text-gray-400">Contact Person</div>
                                    <div className="text-gray-900 dark:text-gray-50">{vendorData.contact}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <RiMailLine className="size-4 text-gray-400" />
                                <div>
                                    <div className="text-gray-500 dark:text-gray-400">Email</div>
                                    <div className="text-gray-900 dark:text-gray-50">{vendorData.email}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <RiPhoneLine className="size-4 text-gray-400" />
                                <div>
                                    <div className="text-gray-500 dark:text-gray-400">Phone</div>
                                    <div className="text-gray-900 dark:text-gray-50">{vendorData.phone}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <RiMapPinLine className="size-4 text-gray-400" />
                                <div>
                                    <div className="text-gray-500 dark:text-gray-400">Address</div>
                                    <div className="text-gray-900 dark:text-gray-50">{vendorData.address}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent overflow-hidden">
                        <div className="border-b border-gray-200 dark:border-gray-800 px-4 py-3">
                            <h2 className="font-medium text-gray-900 dark:text-gray-50">Additional Information</h2>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <RiTimeLine className="size-4 text-gray-400" />
                                <div>
                                    <div className="text-gray-500 dark:text-gray-400">Working Hours</div>
                                    <div className="text-gray-900 dark:text-gray-50">{vendorData.workingHours}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <RiTeamLine className="size-4 text-gray-400" />
                                <div>
                                    <div className="text-gray-500 dark:text-gray-400">Team Size</div>
                                    <div className="text-gray-900 dark:text-gray-50">{vendorData.team.length} members</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <RiBuilding2Line className="size-4 text-gray-400" />
                                <div>
                                    <div className="text-gray-500 dark:text-gray-400">Buildings Serviced</div>
                                    <div className="text-gray-900 dark:text-gray-50">
                                        {vendorData.buildings.join(", ")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 