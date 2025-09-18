"use client"

import { useState } from "react"
import { PageHeader } from "@/components/PageHeader"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { DateRangePicker } from "@/components/DatePicker"
import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { Select } from "@/components/Select"
import { CalendarIcon, ChevronDownIcon, DownloadIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { Checkbox } from "@/components/Checkbox"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
        badge: "De-Activated"
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
        badge: "De-Activated"
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
        badge: "De-Activated"
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
        badge: "De-Activated"
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
] as ColumnDef<VisitorRow>[]

export default function VisitorManagement() {
    const pathname = usePathname()
    const [selectedDates, setSelectedDates] = useState({
        from: new Date(2025, 6, 1), // July 1, 2025
        to: new Date(2025, 8, 17)   // September 17, 2025
    })

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <PageHeader 
                title="Visitor Management" 
                customButtons={
                    <div className="relative">
                        <Button variant="primary" className="flex items-center gap-2">
                            Create visit
                            <ChevronDownIcon className="h-4 w-4" />
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

            {/* Date Picker */}
            <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <DateRangePicker
                    value={selectedDates}
                    onChange={setSelectedDates}
                    className="w-fit"
                />
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-4 gap-6">
                <div className="space-y-1">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50">4</p>
                    <p className="text-sm text-gray-500">Total Visits</p>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50">4</p>
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
                        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50">0</p>
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
                            <DownloadIcon className="h-4 w-4" />
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

                {/* Search and Filter Bar */}
                <div className="flex flex-wrap items-center gap-4 pb-4">
                    <div className="relative flex-1 min-w-[300px]">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search"
                            className="pl-10"
                        />
                    </div>
                    <Select>
                        <option value="">Type</option>
                        <option value="visitor">Visitor</option>
                        <option value="vendor">Vendor</option>
                        <option value="employee">Employee</option>
                    </Select>
                    <Select>
                        <option value="">Group</option>
                        <option value="group1">Group 1</option>
                        <option value="group2">Group 2</option>
                    </Select>
                    <Select>
                        <option value="">Brendan D...</option>
                        <option value="brendan">Brendan DeStefano</option>
                    </Select>
                    <Select>
                        <option value="">Host Company</option>
                        <option value="hqo">HqO</option>
                        <option value="acme">Acme Corp</option>
                    </Select>
                    <Select>
                        <option value="">Status</option>
                        <option value="expected">Expected</option>
                        <option value="checked-in">Checked In</option>
                        <option value="checked-out">Checked Out</option>
                        <option value="cancelled">Cancelled</option>
                    </Select>
                </div>

                {/* Data Table */}
                <DataTable
                    columns={visitorColumns}
                    data={visitorData}
                    searchKey="visitor.name"
                />
            </div>
        </div>
    )
} 