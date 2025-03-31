"use client"

import { PageTemplate } from "@/components/PageTemplate"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RiSearchLine } from "@remixicon/react"

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

export default function ProspectsPage() {
    return (
        <PageTemplate
            title="Asset Manager Overview"
            tabs={[
                { name: "Overview", href: "/asset-manager/overview" },
                { name: "Analysis", href: "/asset-manager/overview/analysis" },
                { name: "Reports", href: "/asset-manager/overview/reports" },
                { name: "Prospects", href: "/asset-manager/overview/prospects" },
            ]}
        >
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
        </PageTemplate>
    )
} 