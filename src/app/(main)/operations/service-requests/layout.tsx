"use client"

import { Button } from "@/components/Button"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { ServiceRequestCreateModal } from "@/components/ui/service-requests/ServiceRequestCreateModal"
import { getPageInsights } from "@/lib/insights"
import { RiSettings3Line } from "@remixicon/react"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

export default function ServiceRequestsLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    const router = useRouter()
    const insights = getPageInsights("operations")
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const handleCreateServiceRequest = (serviceRequestData: any) => {
        // TODO: Implement service request creation logic
        console.log('Creating service request:', serviceRequestData)
    }

    // Check if we're on a service request detail page (e.g., /operations/service-requests/[id])
    const isServiceRequestDetailPage = pathname.match(/^\/operations\/service-requests\/[^\/]+$/) && pathname !== "/operations/service-requests"
    
    // Check if we're on a service request settings page
    const isServiceRequestSettingsPage = pathname.startsWith("/operations/service-requests/settings")

    // If on service request detail page or settings page, render without header and tabs
    if (isServiceRequestDetailPage || isServiceRequestSettingsPage) {
        return <div className="flex h-full w-full flex-col">{children}</div>
    }

    return (
        <div className="flex h-full w-full flex-col space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                        Service Requests
                    </h1>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push('/operations/service-requests/settings/general')}
                        className="p-2 h-8 w-8"
                    >
                        <RiSettings3Line className="size-4" />
                    </Button>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    Add service request
                </Button>
            </div>

            <AIInsights insights={insights} className="mt-6" />

            <div className="flex flex-col gap-4 w-full">
                <div className="pt-6">{children}</div>
            </div>

            {/* Service Request Create Modal */}
            <ServiceRequestCreateModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateServiceRequest}
            />
        </div>
    )
}
