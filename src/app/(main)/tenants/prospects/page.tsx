"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import { getPageInsights } from "@/lib/insights"
import { RiAddLine } from "@remixicon/react"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Define tabs for the Tenants page
const tabs = [
    { name: "All Tenants", href: "/tenants" },
    { name: "Active", href: "/tenants/active" },
    { name: "Inactive", href: "/tenants/inactive" },
    { name: "Prospects", href: "/tenants/prospects" },
] as const

// Extended prospective tenants data
const prospectiveTenants = [
    {
        id: "A",
        name: "Acme Corporation",
        email: "contact@acmecorp.com",
        space: "5,000 sqft",
        rate: "$28/sqft",
        quarter: "Q3 2023",
        status: "New prospect",
        industry: "Technology",
        contact: "John Smith",
        phone: "(555) 123-4567",
        broker: {
            name: "Sarah Wilson",
            avatar: "https://cdn-icons-png.flaticon.com/512/5969/5969043.png"
        },
        logoUrl: "https://cdn-icons-png.flaticon.com/512/5969/5969043.png",
        notes: "Interested in expanding office space",
    },
    {
        id: "T",
        name: "TechStart Inc.",
        email: "leasing@techstart.com",
        space: "2,500 sqft",
        rate: "$32/sqft",
        quarter: "Q2 2023",
        status: "Tour",
        industry: "Software",
        contact: "Sarah Johnson",
        phone: "(555) 234-5678",
        broker: {
            name: "Michael Chang",
            avatar: "https://cdn-icons-png.flaticon.com/512/5969/5969184.png"
        },
        logoUrl: "https://cdn-icons-png.flaticon.com/512/5969/5969184.png",
        notes: "Looking for startup-friendly space",
    },
    {
        id: "G",
        name: "Global Services LLC",
        email: "real.estate@globalservices.com",
        space: "10,000 sqft",
        rate: "$25/sqft",
        quarter: "Q4 2023",
        status: "Tour",
        industry: "Consulting",
        contact: "Michael Brown",
        phone: "(555) 345-6789",
        broker: {
            name: "Lisa Chen",
            avatar: "https://cdn-icons-png.flaticon.com/512/5969/5969113.png"
        },
        logoUrl: "https://cdn-icons-png.flaticon.com/512/5969/5969113.png",
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
        broker: null,
        logoUrl: "https://cdn-icons-png.flaticon.com/512/5969/5969007.png",
        notes: "Requires creative studio space",
    },
]

const statusOptions = [
    { value: "new-prospect", label: "New prospect" },
    { value: "tour", label: "Tour" },
    { value: "negotiation", label: "Negotiation" },
    { value: "sign-off", label: "Sign off" },
    { value: "fit-out", label: "Fit out" },
    { value: "onboard", label: "Onboard" },
    { value: "active-tenant", label: "Active tenant" },
] as const

interface ProspectiveTenant {
    id: string;
    name: string;
    email: string;
    space: string;
    rate: string;
    quarter: string;
    status: string;
    industry: string;
    contact: string;
    phone: string;
    broker: {
        name: string;
        avatar: string;
    } | null;
    logoUrl: string;
    notes: string;
}

interface ColumnMeta {
    className: string;
    displayName: string;
    filterOptions?: { value: string; label: string; }[];
}

function ProspectsTable() {
    const columns: ColumnDef<ProspectiveTenant, unknown>[] = [
        {
            accessorKey: "name",
            header: "Company",
            cell: ({ row }: { row: any }) => {
                const name = row.getValue("name") as string;
                const logoUrl = row.original.logoUrl as string;
                const industry = row.original.industry as string;

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
                        <div>
                            <div className="font-medium">{name}</div>
                            <div className="text-sm text-gray-500">{industry}</div>
                        </div>
                    </div>
                );
            },
            filterFn: (row: { getValue: (id: string) => string }, id: string, value: string) => {
                return row.getValue(id).toLowerCase().includes(value.toLowerCase())
            },
            meta: {
                className: "text-left",
                displayName: "Company Name"
            } as ColumnMeta
        },
        {
            accessorKey: "contact",
            header: "Contact",
            cell: ({ row }: { row: any }) => {
                const contact = row.getValue("contact") as string;
                const email = row.original.email as string;
                const phone = row.original.phone as string;

                return (
                    <div>
                        <div>{contact}</div>
                        <div className="text-sm text-gray-500">{email}</div>
                        <div className="text-sm text-gray-500">{phone}</div>
                    </div>
                );
            },
        },
        {
            accessorKey: "broker",
            header: "Broker",
            cell: ({ row }: { row: any }) => {
                const broker = row.original.broker;
                if (!broker) {
                    return <div className="text-sm text-gray-500">No broker assigned</div>;
                }
                return (
                    <div className="flex items-center gap-3">
                        <div className="relative size-8 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">
                            {broker.avatar ? (
                                <Image
                                    src={broker.avatar}
                                    alt={broker.name}
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />
                            ) : (
                                <span className="text-sm text-gray-400">?</span>
                            )}
                        </div>
                        <span>{broker.name}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "space",
            header: "Space Requirements",
            cell: ({ row }: { row: any }) => {
                const space = row.getValue("space") as string;
                const rate = row.original.rate as string;
                const quarter = row.original.quarter as string;

                return (
                    <div>
                        <div>{space}</div>
                        <div className="text-sm text-gray-500">{rate}</div>
                        <div className="text-sm text-gray-500">Target: {quarter}</div>
                    </div>
                );
            },
        },
        {
            accessorKey: "industry",
            header: "Industry",
            filterFn: (row: { getValue: (id: string) => string }, id: string, value: string[]) => {
                return value.includes(row.getValue(id))
            },
            meta: {
                className: "text-left",
                displayName: "Industry"
            } as ColumnMeta
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }: { row: any }) => {
                return (
                    <Select defaultValue={row.getValue("status")}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {statusOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            },
            filterFn: (row: { getValue: (id: string) => string }, id: string, value: string[]) => {
                return value.includes(row.getValue(id))
            },
            meta: {
                className: "text-left",
                displayName: "Status"
            } as ColumnMeta
        },
        {
            accessorKey: "notes",
            header: "Notes",
            cell: ({ row }: { row: any }) => {
                const notes = row.getValue("notes") as string;
                return <div className="max-w-xs truncate">{notes}</div>;
            },
        },
    ];

    return (
        <div className="space-y-6">
            <DataTable
                columns={columns}
                data={prospectiveTenants}
                searchKey="name"
            />
        </div>
    )
}

export default function TenantsProspectsPage() {
    const router = useRouter()
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
                            active={tab.href === "/tenants/prospects"}
                        >
                            <Link href={tab.href}>{tab.name}</Link>
                        </TabNavigationLink>
                    ))}
                </TabNavigation>

                <ProspectsTable />
            </div>
        </div>
    )
} 