"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Input } from "@/components/ui/input"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import { getPageInsights } from "@/lib/insights"
import { RiAddLine, RiSearchLine, RiTeamLine } from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

// Define tabs for the Tenants page
const tabs = [
    { name: "All Tenants", href: "/tenants" },
    { name: "Active", href: "/tenants/active" },
    { name: "Inactive", href: "/tenants/inactive" },
] as const

// Mock data for tenants
const tenantsData = [
    {
        id: "1",
        name: "Acme Corporation",
        logoUrl: "https://cdn-icons-png.flaticon.com/512/5969/5969043.png",
        building: "125 Highland Ave",
        industry: "Technology",
        employees: 120,
        leaseStart: "2022-01-15",
        leaseEnd: "2025-01-14",
        status: "Active",
    },
    {
        id: "2",
        name: "Global Enterprises",
        logoUrl: "https://cdn-icons-png.flaticon.com/512/5969/5969184.png",
        building: "400 Market Street",
        industry: "Finance",
        employees: 85,
        leaseStart: "2021-06-01",
        leaseEnd: "2024-05-31",
        status: "Active",
    },
    {
        id: "3",
        name: "Retail Solutions",
        logoUrl: "https://cdn-icons-png.flaticon.com/512/5969/5969007.png",
        building: "75 State Street",
        industry: "Retail",
        employees: 45,
        leaseStart: "2020-03-15",
        leaseEnd: "2023-03-14",
        status: "Inactive",
    },
    {
        id: "4",
        name: "Tech Innovators",
        logoUrl: "https://cdn-icons-png.flaticon.com/512/5969/5969085.png",
        building: "200 Congress Ave",
        industry: "Technology",
        employees: 150,
        leaseStart: "2023-02-01",
        leaseEnd: "2026-01-31",
        status: "Active",
    },
    {
        id: "5",
        name: "Financial Services Inc",
        logoUrl: "https://cdn-icons-png.flaticon.com/512/5969/5969113.png",
        building: "500 Boylston Street",
        industry: "Finance",
        employees: 95,
        leaseStart: "2022-09-01",
        leaseEnd: "2025-08-31",
        status: "Active",
    },
]

// Define columns for the tenants table
const tenantsColumns = [
    {
        accessorKey: "name",
        header: "Tenant Name",
        cell: ({ row }: { row: any }) => {
            const name = row.getValue("name") as string;
            const logoUrl = row.original.logoUrl as string;

            return (
                <div className="flex items-center gap-3">
                    <div className="relative size-8 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">
                        <Image
                            src={logoUrl}
                            alt={name}
                            width={24}
                            height={24}
                            className="object-contain"
                        />
                    </div>
                    <span>{name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "building",
        header: "Building",
    },
    {
        accessorKey: "industry",
        header: "Industry",
    },
    {
        accessorKey: "employees",
        header: "Employees",
    },
    {
        accessorKey: "leaseStart",
        header: "Lease Start",
    },
    {
        accessorKey: "leaseEnd",
        header: "Lease End",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("status") as string
            return (
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status === "Active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}>
                    {status}
                </span>
            )
        },
    },
]

interface Tenant {
    id: string;
    [key: string]: any;
}

export default function TenantsPage() {
    const pathname = usePathname()
    const router = useRouter()
    const [data] = useState(tenantsData)
    const insights = getPageInsights("tenants")

    return (
        <div className="flex h-full w-full flex-col space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950">
                        <RiTeamLine className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                    </div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Tenants</h1>
                </div>
                <Button onClick={() => router.push("/tenants/new")} size="sm">
                    <RiAddLine className="mr-1 h-4 w-4" />
                    Add tenant
                </Button>
            </div>

            <AIInsights insights={insights} className="mt-6" />

            <div className="flex flex-col gap-4 w-full">
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

                <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                        <RiSearchLine className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Search tenants..."
                            className="pl-9"
                        />
                    </div>
                    <Button variant="outline">Filters</Button>
                </div>

                <DataTable
                    columns={tenantsColumns}
                    data={data}
                    onRowClick={(row: Tenant) => router.push(`/tenants/${row.id}`)}
                />
            </div>
        </div>
    )
} 