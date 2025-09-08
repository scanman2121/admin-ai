"use client"

import { PageTemplate } from "@/components/PageTemplate"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

// Extended prospective tenants data
const prospectiveTenants = [
    {
        id: "1",
        name: "Acme Corp",
        email: "john@acme.com",
        space: "5,000 sqft",
        rate: "$28/sqft",
        quarter: "Q3 2024",
        status: "new-prospect",
        industry: "Technology",
        contact: "John Smith",
        phone: "(555) 123-4567",
        broker: {
            name: "Sarah Johnson",
            avatar: "/avatars/default-avatar.png"
        },
        logoUrl: "/tenant-logos/acme.png",
        notes: "Interested in expanding office space",
        spaces: [
            { id: "s1", name: "North Wing", floor: "3rd Floor", sqft: "3,000 sqft" },
            { id: "s2", name: "South Wing", floor: "3rd Floor", sqft: "2,000 sqft" }
        ]
    },
    {
        id: "2",
        name: "Globex Corp",
        email: "emily@globex.com",
        space: "8,000 sqft",
        rate: "$32/sqft",
        quarter: "Q3 2024",
        status: "fit-out",
        industry: "Finance",
        contact: "Emily Chen",
        phone: "(555) 234-5678",
        broker: {
            name: "Michael Brown",
            avatar: "/avatars/default-avatar.png"
        },
        logoUrl: "/tenant-logos/globex.png",
        notes: "Moving in July 15th, 2024",
        spaces: [
            { id: "s3", name: "Executive Suite", floor: "5th Floor", sqft: "8,000 sqft" }
        ]
    },
    {
        id: "3",
        name: "Initech",
        email: "peter@initech.com",
        space: "6,000 sqft",
        rate: "$25/sqft",
        quarter: "Q4 2024",
        status: "tour",
        industry: "Software",
        contact: "Peter Gibbons",
        phone: "(555) 345-6789",
        broker: {
            name: "Lisa Wilson",
            avatar: "/avatars/default-avatar.png"
        },
        logoUrl: "/tenant-logos/initech.png",
        notes: "Tour scheduled for next week",
        spaces: [
            { id: "s4", name: "Tech Hub", floor: "2nd Floor", sqft: "3,500 sqft" },
            { id: "s5", name: "Innovation Center", floor: "2nd Floor", sqft: "2,500 sqft" }
        ]
    }
]

const statusOptions = [
    { value: "new-prospect", label: "New prospect" },
    { value: "tour", label: "Tour" },
    { value: "negotiation", label: "Negotiation" },
    { value: "sign-off", label: "Sign off" },
    { value: "fit-out", label: "Fit out" },
    { value: "onboard", label: "Onboard" },
    { value: "active-tenant", label: "Active tenant" }
] as const

interface Space {
    id: string;
    name: string;
    floor: string;
    sqft: string;
}

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
    spaces: Space[];
}

interface ColumnMeta {
    className: string;
    displayName: string;
    filterOptions?: { value: string; label: string; }[];
}

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
                            onError={(e) => {
                                // Fallback to a colored circle with company initial
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const initial = name.charAt(0).toUpperCase();
                                const parent = target.parentElement;
                                if (parent) {
                                    parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-blue-500 text-white font-medium">${initial}</div>`;
                                }
                            }}
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
        cell: ({ row }) => {
            const broker = row.getValue("broker") as { name: string; avatar?: string } | null;

            const getInitials = (name: string) => {
                return name.split(' ')
                    .map(part => part[0])
                    .join('')
                    .toUpperCase();
            };

            // Generate a consistent color based on broker name
            const getBackgroundColor = (name: string) => {
                const colors = [
                    'bg-blue-500',
                    'bg-green-500',
                    'bg-purple-500',
                    'bg-pink-500',
                    'bg-indigo-500',
                    'bg-orange-500',
                    'bg-teal-500',
                    'bg-cyan-500'
                ];
                const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
                return colors[index];
            };

            return (
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                        {broker ? (
                            <div className={cn("h-full w-full flex items-center justify-center text-white font-medium", getBackgroundColor(broker.name))}>
                                {getInitials(broker.name)}
                            </div>
                        ) : (
                            <div className="h-full w-full flex items-center justify-center bg-gray-300 text-gray-600 font-medium">
                                ?
                            </div>
                        )}
                    </div>
                    <span className="text-sm">{broker?.name || 'Unassigned'}</span>
                </div>
            )
        },
        meta: {
            className: "text-left",
            displayName: "Broker"
        } as ColumnMeta
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
        accessorKey: "spaces",
        header: "Space",
        cell: ({ row }: { row: any }) => {
            const spaces = row.getValue("spaces") as Space[];

            return (
                <div className="space-y-2">
                    {spaces.map(space => (
                        <div key={space.id} className="text-sm">
                            <div className="font-medium text-gray-900">{space.name}</div>
                            <div className="text-gray-500">{space.floor} • {space.sqft}</div>
                        </div>
                    ))}
                </div>
            );
        },
        meta: {
            className: "text-left",
            displayName: "Space"
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

export default function ProspectsPage() {
    return (
        <PageTemplate
            title="Portfolio Overview"
            tabs={[
                { name: "Overview", href: "/portfolio/overview" },
                { name: "Analysis", href: "/portfolio/overview/analysis" },
                { name: "Reports", href: "/portfolio/overview/reports" },
                { name: "Lifecycle", href: "/portfolio/overview/lifecycle" },
                { name: "Prospects", href: "/portfolio/overview/prospects" },
            ]}
        >
            <div className="space-y-6">
                <DataTable
                    columns={columns}
                    data={prospectiveTenants}
                    searchKey="name"
                />
            </div>
        </PageTemplate>
    )
} 