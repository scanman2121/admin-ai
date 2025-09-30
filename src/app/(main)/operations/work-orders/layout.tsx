"use client"

import { Button } from "@/components/Button"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { WorkOrderCreateModal } from "@/components/ui/work-orders/WorkOrderCreateModal"
import { getPageInsights } from "@/lib/insights"
import { RiSettings3Line } from "@remixicon/react"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

export default function WorkOrdersLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    const router = useRouter()
    const insights = getPageInsights("operations")
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const handleCreateWorkOrder = (workOrderData: any) => {
        // TODO: Implement work order creation logic
        console.log('Creating work order:', workOrderData)
    }

    // Check if we're on a work order detail page (e.g., /operations/work-orders/[id])
    const isWorkOrderDetailPage = pathname.match(/^\/operations\/work-orders\/[^\/]+$/) && pathname !== "/operations/work-orders"
    
    // Check if we're on a work order settings page
    const isWorkOrderSettingsPage = pathname.startsWith("/operations/work-orders/settings")

    // If on work order detail page or settings page, render without header and tabs
    if (isWorkOrderDetailPage || isWorkOrderSettingsPage) {
        return <div className="flex h-full w-full flex-col">{children}</div>
    }

    return (
        <div className="flex h-full w-full flex-col space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                        Work Orders
                    </h1>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push('/operations/work-orders/settings/general')}
                        className="p-2 h-8 w-8"
                    >
                        <RiSettings3Line className="size-4" />
                    </Button>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    Add work order
                </Button>
            </div>

            <AIInsights insights={insights} className="mt-6" />

            <div className="flex flex-col gap-4 w-full">
                <div className="pt-6">{children}</div>
            </div>

            {/* Work Order Create Modal */}
            <WorkOrderCreateModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateWorkOrder}
            />
        </div>
    )
}
