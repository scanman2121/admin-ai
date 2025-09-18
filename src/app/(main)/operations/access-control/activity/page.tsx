"use client"

import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import { UserDetailsModal } from "@/components/ui/user-access/UserDetailsModal"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Access Control Activity page
const tabs = [
  { name: "Overview", href: "/operations/access-control" },
  { name: "User access", href: "/operations/access-control/user-access" },
  { name: "Activity", href: "/operations/access-control/activity" },
  { name: "Access groups", href: "/operations/access-control/access-groups" },
  { name: "Audit trail", href: "/operations/access-control/audit-trail" },
]

// Mock data for activity log
const activityData = [
    {
        id: "1",
        dateTime: "Oct 18, 2024 12:37 PM",
        action: "Access granted",
        accessPoint: "Main Entrance",
        company: "TechCorp Solutions",
        name: "Sarah Chen",
        email: "sarah.chen@techcorp.com",
        floorSuite: "Floor 12 / Suite 1205",
        serviceRequest: "New Employee MKA Req...",
        serviceRequestType: "New Employee Access",
        serviceRequestStatus: "In Progress",
        acsStatus: "active",
        hasNotes: true,
        badgeId: "HID-9XY34A",
        host: "Reception Desk",
    },
    {
        id: "2",
        dateTime: "Oct 18, 2024 12:37 PM",
        action: "Access denied",
        accessPoint: "Parking Garage",
        company: "Thompson Consulting Group",
        name: "Michael Thompson",
        email: "michael.thompson@consulting.com",
        floorSuite: "Floor 15 / Suite 1501",
        serviceRequest: "No open requests",
        serviceRequestType: null,
        serviceRequestStatus: null,
        acsStatus: "active",
        hasNotes: false,
        badgeId: "HID-8BC56D",
        host: "-",
    },
    {
        id: "3",
        dateTime: "Oct 18, 2024 11:02 AM",
        action: "Access granted",
        accessPoint: "Main Entrance",
        company: "HealthTech Innovations",
        name: "Dr. Emma Davis",
        email: "emma.davis@healthtech.com",
        floorSuite: "Floor 6 / Suite 605",
        serviceRequest: "Lost Device Access R...",
        serviceRequestType: "Lost Device",
        serviceRequestStatus: "In Progress",
        acsStatus: "active",
        hasNotes: false,
        badgeId: "HID-7GH89E",
        host: "Security",
    },
    {
        id: "4",
        dateTime: "Oct 16, 2024 10:20 AM",
        action: "Access granted",
        accessPoint: "Side Entrance",
        company: "Rodriguez & Associates Law",
        name: "David Rodriguez",
        email: "david.rodriguez@lawfirm.com",
        floorSuite: "Floor 8 / Suite 802",
        serviceRequest: "No open requests",
        serviceRequestType: null,
        serviceRequestStatus: null,
        acsStatus: "active",
        hasNotes: false,
        badgeId: "HID-7AB12C",
        host: "-",
    },
    {
        id: "5",
        dateTime: "Oct 16, 2024 8:26 AM",
        action: "Access granted",
        accessPoint: "Main Entrance",
        company: "Wilson Strategic Consulting",
        name: "Robert Wilson",
        email: "robert.wilson@wilson-strategy.com",
        floorSuite: "Floor 11 / Suite 1108",
        serviceRequest: "No open requests",
        serviceRequestType: null,
        serviceRequestStatus: null,
        acsStatus: "active",
        hasNotes: false,
        badgeId: "HID-5MN78F",
        host: "Front Desk",
    },
    {
        id: "6",
        dateTime: "Oct 14, 2024 6:43 AM",
        action: "Access granted",
        accessPoint: "Parking Garage",
        company: "Park Architecture Studio",
        name: "Lisa Park",
        email: "lisa.park@parkarch.com",
        floorSuite: "Floor 7 / Suite 705",
        serviceRequest: "No open requests",
        serviceRequestType: null,
        serviceRequestStatus: null,
        acsStatus: "revoked",
        hasNotes: false,
        badgeId: "HID-3PQ21G",
        host: "-",
    },
    {
        id: "7",
        dateTime: "Oct 14, 2024 6:43 AM",
        action: "Access granted",
        accessPoint: "Main Entrance",
        company: "TechCorp Solutions",
        name: "Sarah Chen",
        email: "sarah.chen@techcorp.com",
        floorSuite: "Floor 12 / Suite 1205",
        serviceRequest: "New Employee MKA Req...",
        serviceRequestType: "New Employee Access",
        serviceRequestStatus: "In Progress",
        acsStatus: "active",
        hasNotes: true,
        badgeId: "HID-9XY34A",
        host: "Reception Desk",
    },
    {
        id: "8",
        dateTime: "Oct 14, 2024 5:04 AM",
        action: "Access denied",
        accessPoint: "Side Entrance",
        company: "HealthTech Innovations",
        name: "Dr. Emma Davis",
        email: "emma.davis@healthtech.com",
        floorSuite: "Floor 6 / Suite 605",
        serviceRequest: "Lost Device Access R...",
        serviceRequestType: "Lost Device",
        serviceRequestStatus: "In Progress",
        acsStatus: "active",
        hasNotes: false,
        badgeId: "HID-7GH89E",
        host: "-",
    },
]


// Define columns for the activity table with click handler
const createActivityColumns = (onNameClick: (user: any) => void) => [
    {
        accessorKey: "dateTime",
        header: "Date and time",
        cell: ({ row }: { row: any }) => {
            const dateTime = row.getValue("dateTime") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50 font-medium">
                    {dateTime}
                </span>
            );
        },
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }: { row: any }) => {
            const action = row.getValue("action") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50">
                    {action}
                </span>
            );
        },
    },
    {
        accessorKey: "accessPoint",
        header: "Access point",
        cell: ({ row }: { row: any }) => {
            const accessPoint = row.getValue("accessPoint") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50">
                    {accessPoint}
                </span>
            );
        },
    },
    {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }: { row: any }) => {
            const company = row.getValue("company") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50">
                    {company}
                </span>
            );
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }: { row: any }) => {
            const name = row.getValue("name") as string;
            return (
                <button
                    onClick={() => onNameClick(row.original)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 font-medium text-left"
                >
                    {name}
                </button>
            );
        },
    },
    {
        accessorKey: "host",
        header: "Host",
        cell: ({ row }: { row: any }) => {
            const host = row.getValue("host") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50">
                    {host}
                </span>
            );
        },
    },
]

export default function AccessControlActivity() {
    const pathname = usePathname()
    const [data] = useState(activityData)
    const [selectedUser, setSelectedUser] = useState<typeof activityData[0] | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleNameClick = (user: typeof activityData[0]) => {
        setSelectedUser(user)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedUser(null)
    }

    const activityColumns = createActivityColumns(handleNameClick)

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <PageHeader 
                title="Access Control" 
            />

            {/* Tab Navigation */}
            <TabNavigation>
                {tabs.map((tab) => (
                    <TabNavigationLink
                        key={tab.name}
                        asChild
                        active={pathname === tab.href}
                    >
                        <Link href={tab.href}>
                            {tab.name}
                        </Link>
                    </TabNavigationLink>
                ))}
            </TabNavigation>

            {/* Data Table */}
            <DataTable
                columns={activityColumns}
                data={data}
                searchKey="name"
            />

            {/* User Details Modal */}
            <UserDetailsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                user={selectedUser}
                defaultTab="activity"
            />
        </div>
    )
}
