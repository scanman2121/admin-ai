"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { DocumentUploadDrawer } from "@/components/ui/documents/DocumentUploadDrawer"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { RiUploadLine } from "@remixicon/react"
import * as React from "react"
import { documentsColumns } from "./columns"
import { data } from "./data"

const mockInsights = [
    {
        title: "Total Documents",
        value: "156",
        comparison: "12 new this month",
        trend: "up" as const,
        trendValue: 8,
    },
    {
        title: "Storage Used",
        value: "2.4 GB",
        comparison: "of 5 GB limit",
        trend: "up" as const,
        trendValue: 15,
    },
    {
        title: "Active Documents",
        value: "89%",
        comparison: "vs. Last Month: 85%",
        trend: "up" as const,
        trendValue: 4,
    },
    {
        title: "Average Upload Size",
        value: "3.2 MB",
        comparison: "vs. Last Month: 2.8 MB",
        trend: "up" as const,
        trendValue: 14,
    },
]

export default function Documents() {
    const [isOpen, setIsOpen] = React.useState(false)

    const handleUpload = async (files: File[], fields: Record<string, string>) => {
        try {
            // TODO: Implement actual file upload logic
            console.log('Uploading files:', files)
            console.log('With fields:', fields)

            // Simulate upload delay
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Show success message
            // TODO: Add toast notification

            return Promise.resolve()
        } catch (error) {
            console.error('Error uploading files:', error)
            // TODO: Add error toast notification
            return Promise.reject(error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">Documents</h1>
                </div>
                <Button onClick={() => setIsOpen(true)}>
                    <RiUploadLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                    Add document
                </Button>
            </div>

            <AIInsights insights={mockInsights} />

            <div className="flex flex-col gap-4 w-full">
                <div className="pt-4">
                    <DataTable columns={documentsColumns} data={data} />
                </div>
            </div>

            <DocumentUploadDrawer
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                onUpload={handleUpload}
            />
        </div>
    )
} 