"use client"

import { Button } from "@/components/Button"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { DocumentUploadDrawer } from "@/components/ui/documents/DocumentUploadDrawer"
import { cn } from "@/lib/utils"
import {
    RiAddLine,
    RiArrowLeftLine,
    RiDownload2Line,
    RiFileTextLine,
    RiTimeLine,
    RiUserLine,
} from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import * as React from "react"

// Mock data for vendor details
const vendorData = {
    id: "1",
    name: "Maintenance Pro",
    logoUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Maintenance",
    status: "Active",
}

// Mock data for documents
const documentsData = [
    {
        id: "1",
        name: "Service Agreement",
        type: "PDF",
        size: "2.4 MB",
        uploadedBy: "John Smith",
        uploadedAt: "2024-03-15",
        status: "Active",
    },
    {
        id: "2",
        name: "Insurance Certificate",
        type: "PDF",
        size: "1.8 MB",
        uploadedBy: "Sarah Johnson",
        uploadedAt: "2024-03-14",
        status: "Active",
    },
    {
        id: "3",
        name: "Work Schedule",
        type: "XLSX",
        size: "856 KB",
        uploadedBy: "Michael Brown",
        uploadedAt: "2024-03-10",
        status: "Active",
    },
    {
        id: "4",
        name: "Safety Procedures",
        type: "PDF",
        size: "3.2 MB",
        uploadedBy: "Lisa Green",
        uploadedAt: "2024-03-08",
        status: "Archived",
    },
]

// Define tabs for the vendor details page
const tabs = [
    { name: "Overview", href: "" },
    { name: "Team", href: "/team" },
    { name: "Documents", href: "/documents" },
    { name: "Settings", href: "/settings" },
] as const

// Define columns for the documents table
const documentsColumns = [
    {
        accessorKey: "name",
        header: "Document Name",
        cell: ({ row }: { row: any }) => {
            const name = row.getValue("name") as string
            const type = row.original.type as string

            return (
                <div className="flex items-center gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                        <RiFileTextLine className="size-4" />
                    </div>
                    <div>
                        <div className="font-medium text-gray-900 dark:text-gray-50">
                            {name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            {type}
                        </div>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        accessorKey: "uploadedBy",
        header: "Uploaded By",
        cell: ({ row }: { row: any }) => {
            const uploadedBy = row.getValue("uploadedBy") as string
            const uploadedAt = row.original.uploadedAt as string

            return (
                <div className="flex items-center gap-3">
                    <RiUserLine className="size-4 text-gray-400" />
                    <div>
                        <div className="text-gray-900 dark:text-gray-50">
                            {uploadedBy}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                            <RiTimeLine className="size-3" />
                            <span>{uploadedAt}</span>
                        </div>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("status") as string
            return (
                <span className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                    status === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                )}>
                    {status}
                </span>
            )
        },
    },
    {
        id: "actions",
        cell: () => {
            return (
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                >
                    <RiDownload2Line className="size-4" />
                    <span className="sr-only">Download</span>
                </Button>
            )
        },
    },
]

export default function VendorDocuments() {
    const pathname = usePathname()
    const params = useParams()
    const baseUrl = `/vendors/${params.id}`
    const [isUploadDrawerOpen, setIsUploadDrawerOpen] = React.useState(false)

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
                    <Button onClick={() => setIsUploadDrawerOpen(true)}>
                        <RiAddLine className="size-4 shrink-0 mr-1.5" />
                        Add document
                    </Button>
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
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent overflow-hidden">
                <DataTable
                    columns={documentsColumns}
                    data={documentsData}
                    searchKey="name"
                />
            </div>

            {/* Document Upload Drawer */}
            <DocumentUploadDrawer
                isOpen={isUploadDrawerOpen}
                onOpenChange={setIsUploadDrawerOpen}
            />
        </div>
    )
} 