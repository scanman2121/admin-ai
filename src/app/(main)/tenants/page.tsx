"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Input } from "@/components/ui/input"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getPageInsights } from "@/lib/insights"
import { RiAddLine, RiSearchLine } from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

// Define tabs for the Tenants page
const tabs = [
    { name: "All Tenants", href: "/tenants" },
    { name: "Active", href: "/tenants/active" },
    { name: "Inactive", href: "/tenants/inactive" },
    { name: "Prospects", href: "/tenants/prospects" },
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

// Extended prospective tenants data
const prospectiveTenants = [
    {
        id: "A",
        name: "Acme Corporation",
        email: "contact@acmecorp.com",
        space: "5,000 sqft",
        rate: "$28/sqft",
        quarter: "Q3 2023",
        status: "Hot Lead",
        industry: "Technology",
        contact: "John Smith",
        phone: "(555) 123-4567",
        lastContact: "2024-03-15",
        notes: "Interested in expanding office space",
    },
    {
        id: "T",
        name: "TechStart Inc.",
        email: "leasing@techstart.com",
        space: "2,500 sqft",
        rate: "$32/sqft",
        quarter: "Q2 2023",
        status: "Initial Contact",
        industry: "Software",
        contact: "Sarah Johnson",
        phone: "(555) 234-5678",
        lastContact: "2024-03-10",
        notes: "Looking for startup-friendly space",
    },
    {
        id: "G",
        name: "Global Services LLC",
        email: "real.estate@globalservices.com",
        space: "10,000 sqft",
        rate: "$25/sqft",
        quarter: "Q4 2023",
        status: "Tour Scheduled",
        industry: "Consulting",
        contact: "Michael Brown",
        phone: "(555) 345-6789",
        lastContact: "2024-03-18",
        notes: "Tour scheduled for next week",
    },
    {
        id: "C",
        name: "Creative Design Co.",
        email: "space@creativedesign.co",
        space: "1,800 sqft",
        rate: "$35/sqft",
        quarter: "Q3 2023",
        status: "Initial Inquiry",
        industry: "Design",
        contact: "Emma Wilson",
        phone: "(555) 456-7890",
        lastContact: "2024-03-12",
        notes: "Requires creative studio space",
    },
]

const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "hot-lead", label: "Hot Lead" },
    { value: "tour-scheduled", label: "Tour Scheduled" },
    { value: "initial-inquiry", label: "Initial Inquiry" },
    { value: "initial-contact", label: "Initial Contact" },
]

const industryOptions = [
    { value: "all", label: "All Industries" },
    { value: "technology", label: "Technology" },
    { value: "software", label: "Software" },
    { value: "consulting", label: "Consulting" },
    { value: "design", label: "Design" },
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

function ProspectsTable() {
    return (
        <div className="space-y-6">
            {/* Filters */}
            <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search prospects..."
                            className="pl-9"
                        />
                    </div>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statusOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by industry" />
                        </SelectTrigger>
                        <SelectContent>
                            {industryOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </Card>

            {/* Prospects Table */}
            <Card className="p-6">
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Company</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Space Requirements</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Contact</TableHead>
                                <TableHead>Notes</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {prospectiveTenants.map((tenant) => (
                                <TableRow key={tenant.id}>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{tenant.name}</div>
                                            <div className="text-sm text-gray-500">{tenant.industry}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div>{tenant.contact}</div>
                                            <div className="text-sm text-gray-500">{tenant.phone}</div>
                                            <div className="text-sm text-gray-500">{tenant.email}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div>{tenant.space}</div>
                                            <div className="text-sm text-gray-500">{tenant.rate}</div>
                                            <div className="text-sm text-gray-500">Target: {tenant.quarter}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                            {tenant.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(tenant.lastContact).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">
                                        {tenant.notes}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    )
}

export default function TenantsPage() {
    const pathname = usePathname()
    const router = useRouter()
    const [data] = useState(tenantsData)
    const insights = getPageInsights("tenants")

    return (
        <div className="flex h-full w-full flex-col space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">Tenants</h1>
                <Button onClick={() => router.push("/tenants/new")}>
                    <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                    Add Tenant
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

                {pathname === "/tenants/prospects" ? (
                    <ProspectsTable />
                ) : (
                    <DataTable
                        columns={tenantsColumns}
                        data={data}
                        onRowClick={(row: Tenant) => router.push(`/tenants/${row.id}`)}
                    />
                )}
            </div>
        </div>
    )
} 