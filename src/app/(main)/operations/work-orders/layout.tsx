"use client"

import { Button } from "@/components/Button"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { getPageInsights } from "@/lib/insights"
import { RiAddLine } from "@remixicon/react"

export default function WorkOrdersLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const insights = getPageInsights("work-orders")

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
