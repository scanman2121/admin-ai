"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Checkbox"
import { DatePicker } from "@/components/DatePicker"
import { PageHeader } from "@/components/PageHeader"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, Download } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Visitor Management page
const tabs = [
    { name: "Visits", href: "/operations/visitor-management" },
    { name: "Visitors", href: "/operations/visitor-management/visitors" },
    { name: "Vendors", href: "/operations/visitor-management/vendors" },
    { name: "Tenant Employees", href: "/operations/visitor-management/tenant-employees" },
    { name: "Watchlist", href: "/operations/visitor-management/watchlist", badge: "18" },
    { name: "Groups", href: "/operations/visitor-management/groups" },
]

// Sample visitor data based on the screenshot
const visitorData = [
    {
        id: "1",
        visitor: {
            initials: "BD",
            name: "B D"
        },
        expected: {
            date: "07/01/2025",
            time: "3:45 PM",
            endTime: "9:00 PM"
        },
        host: {
            name: "Brendan DeStefano",
            company: "HqO"
        },
        invite: "-",
        floor: "14 (s14.2)",
        status: "Expected",
        badge: "De-Activated",
        hostCompany: "HqO",
        visitorType: "Visitor"
    },
    {
        id: "2",
        visitor: {
            initials: "BT",
            name: "Brendan Test1"
        },
        expected: {
            date: "07/30/2025",
            time: "2:30 PM",
            endTime: "10:00 PM"
        },
        host: {
            name: "Brendan DeStefano",
            company: "HqO"
        },
        invite: "-",
        floor: "-",
        status: "Expected",
        badge: "De-Activated",
        hostCompany: "HqO",
        visitorType: "Visitor"
    },
    {
        id: "3",
        visitor: {
            initials: "BT",
            name: "Brendan Test"
        },
        expected: {
            date: "08/25/2025",
            time: "4:30 PM",
            endTime: "10:00 PM"
        },
        host: {
            name: "Brendan DeStefano",
            company: "HqO"
        },
        invite: "-",
        floor: "12 (s12.1)",
        status: "Expected",
        badge: "De-Activated",
        hostCompany: "HqO",
        visitorType: "Visitor"
    },
    {
        id: "4",
        visitor: {
            initials: "BD",
            name: "Brendan D"
        },
        expected: {
            date: "08/26/2025",
            time: "10:00 AM",
            endTime: "10:00 PM"
        },
        host: {
            name: "Brendan DeStefano",
            company: "HqO"
        },
        invite: "-",
        floor: "-",
        status: "Expected",
        badge: "De-Activated",
        hostCompany: "HqO",
        visitorType: "Visitor"
    }
]

// Type definition for visitor data
type VisitorRow = {
    id: string
    visitor: {
        initials: string
        name: string
    }
    expected: {
        date: string
        time: string
        endTime: string
    }
    host: {
        name: string
        company: string
    }
    invite: string
    floor: string
    status: string
    badge: string
    hostCompany: string
    visitorType: string
}

// Column helper
const columnHelper = createColumnHelper<VisitorRow>()

// Table columns
const visitorColumns = [
    columnHelper.display({
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    }),
    columnHelper.accessor("visitor", {
        header: "Visitor",
        cell: ({ row }) => {
            const visitor = row.getValue("visitor") as VisitorRow["visitor"]
            return (
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-900 dark:bg-gray-800 dark:text-gray-100">
                        {visitor.initials}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                        {visitor.name}
                    </span>
                </div>
            )
        },
        enableSorting: true,
    }),
    columnHelper.accessor("expected", {
        header: "Expected",
        cell: ({ row }) => {
            const expected = row.getValue("expected") as VisitorRow["expected"]
            return (
                <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {expected.date}, {expected.time}
                    </div>
                    <div className="text-xs text-gray-500">
                        End time: {expected.endTime}
                    </div>
                </div>
            )
        },
        enableSorting: true,
    }),
    columnHelper.accessor("host", {
        header: "Host",
        cell: ({ row }) => {
            const host = row.getValue("host") as VisitorRow["host"]
            return (
                <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {host.name}
                    </div>
                    <div className="text-xs text-gray-500">
                        {host.company}
                    </div>
                </div>
            )
        },
        enableSorting: true,
    }),
    columnHelper.accessor("invite", {
        header: "Invite",
        cell: ({ row }) => {
            const invite = row.getValue("invite") as string
            return (
                <span className="text-sm text-gray-500">
                    {invite}
                </span>
            )
        },
        enableSorting: false,
    }),
    columnHelper.accessor("floor", {
        header: "Floor",
        cell: ({ row }) => {
            const floor = row.getValue("floor") as string
            return (
                <span className="text-sm text-gray-900 dark:text-gray-100">
                    {floor}
                </span>
            )
        },
        enableSorting: false,
    }),
    columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <Badge variant="warning" className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    {status}
                </Badge>
            )
        },
        enableSorting: false,
        filterFn: "equals" as const,
        enableColumnFilter: true,
    }),
    columnHelper.accessor("badge", {
        header: "Badge",
        cell: ({ row }) => {
            const badge = row.getValue("badge") as string
            return (
                <span className="text-sm text-gray-500">
                    {badge}
                </span>
            )
        },
        enableSorting: false,
    }),
    // Hidden columns for filtering
    columnHelper.display({
        id: "hostCompany",
        header: "Host Company",
        cell: () => null,
        enableColumnFilter: true,
        filterFn: "equals" as const,
        meta: {
            displayName: "Host Company",
        },
    }),
    columnHelper.display({
        id: "visitorType",
        header: "Type", 
        cell: () => null,
        enableColumnFilter: true,
        filterFn: "equals" as const,
        meta: {
            displayName: "Type",
        },
    }),
] as ColumnDef<VisitorRow>[]

export default function VisitorManagement() {
    const pathname = usePathname()
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        new Date(2025, 8, 17) // September 17, 2025
    )

    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date)
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <PageHeader 
            title="Visitor Management"
                customButtons={
                    <div className="relative">
                        <Button variant="primary" className="flex items-center gap-2">
                            Create visit
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </div>
                }
            />

            {/* Tab Navigation */}
            <TabNavigation>
                {tabs.map((tab) => (
                    <TabNavigationLink
                        key={tab.name}
                        asChild
                        active={pathname === tab.href}
                    >
                        <Link href={tab.href} className="flex items-center gap-2">
                            {tab.name}
                            {tab.badge && (
                                <Badge variant="error" className="px-1.5 py-0.5 text-xs">
                                    {tab.badge}
                                </Badge>
                            )}
                        </Link>
                    </TabNavigationLink>
                ))}
            </TabNavigation>

            {/* Date Picker with Navigation and Statistics */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <DatePicker
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="w-fit"
                        />
                    </div>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-80 h-2 bg-gray-200 rounded-full">
                    <div className="w-full h-2 bg-gray-400 rounded-full"></div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-4 gap-6">
                <div className="space-y-1">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50">1</p>
                    <p className="text-sm text-gray-500">Total Visits</p>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50">0</p>
                    </div>
                    <p className="text-sm text-gray-500">Expected</p>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50">0</p>
                    </div>
                    <p className="text-sm text-gray-500">Checked-in</p>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50">1</p>
                    </div>
                    <p className="text-sm text-gray-500">Cancelled</p>
                </div>
            </div>

            {/* Visits Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">Visits</h2>
                    <div className="flex items-center gap-4">
                        <Button variant="secondary" size="sm" className="flex items-center gap-2">
                            <Download className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>1 - 4 of 4</span>
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" disabled>
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </Button>
                                <Button variant="ghost" size="sm" disabled>
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <DataTable
                    columns={visitorColumns}
                    data={visitorData}
                    searchKey="status"
                />
            </div>
        </div>
    )
} 