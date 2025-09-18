"use client"

import { Button } from "@/components/Button"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { getPageInsights } from "@/lib/insights"
import { RiAddLine } from "@remixicon/react"
import { usePathname } from "next/navigation"

export default function WorkOrdersLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    const insights = getPageInsights("operations")

    // Check if we're on a work order detail page (e.g., /operations/work-orders/[id])
    const isWorkOrderDetailPage = pathname.match(/^\/operations\/work-orders\/[^\/]+$/) && pathname !== "/operations/work-orders"

    // If on work order detail page, render without header and tabs
    if (isWorkOrderDetailPage) {
        return <div className="flex h-full w-full flex-col">{children}</div>
    }

    return (
        <div className="flex h-full w-full flex-col space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                    Work Orders
                </h1>
                <Button>
                    <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                    Add work order
                </Button>
            </div>

            <AIInsights insights={insights} className="mt-6" />

            <div className="flex flex-col gap-4 w-full">
                <div className="pt-6">{children}</div>
            </div>
        </div>
    )
}
