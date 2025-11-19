"use client"

import { Button } from "@/components/Button"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { getPageInsights } from "@/lib/insights"
import { RiSettings3Line } from "@remixicon/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const tabs = [
    { name: "Requests", href: "/operations/service-requests" },
    { name: "Equipment", href: "/operations/service-requests/equipment" },
    { name: "Calendar", href: "/operations/service-requests/calendar" },
] as const

export default function ServiceRequestsLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    const router = useRouter()
    const insights = getPageInsights("operations")

    // Check if we're on a service request detail page (e.g., /operations/service-requests/[id])
    // But exclude the base paths that should show tabs
    const isServiceRequestDetailPage = pathname.match(/^\/operations\/service-requests\/[^\/]+$/) && 
        pathname !== "/operations/service-requests" &&
        pathname !== "/operations/service-requests/equipment" &&
        pathname !== "/operations/service-requests/calendar"
    
    // Check if we're on a service request settings page, new page, equipment detail, or schedule page
    const isServiceRequestSettingsPage = pathname.startsWith("/operations/service-requests/settings")
    const isNewServiceRequestPage = pathname === "/operations/service-requests/new"
    // Equipment detail page: /equipment/[id] but not the base /equipment or /equipment/schedule
    const isEquipmentDetailPage = pathname.match(/^\/operations\/service-requests\/equipment\/[^\/]+$/) && 
        pathname !== "/operations/service-requests/equipment" &&
        !pathname.includes("/schedule")
    const isSchedulePage = pathname === "/operations/service-requests/equipment/schedule"

    // If on service request detail page, settings page, new page, equipment detail, or schedule page, render without header and tabs
    if (isServiceRequestDetailPage || isServiceRequestSettingsPage || isNewServiceRequestPage || isEquipmentDetailPage || isSchedulePage) {
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
                <Button onClick={() => router.push('/operations/service-requests/new')}>
                    Add service request
                </Button>
            </div>

            <AIInsights insights={insights} className="mt-6" />

            <TabNavigation>
                {tabs.map((tab) => (
                    <TabNavigationLink
                        key={tab.name}
                        asChild
                        active={pathname === tab.href || (tab.href === "/operations/service-requests" && pathname === "/operations/service-requests")}
                    >
                        <Link href={tab.href}>{tab.name}</Link>
                    </TabNavigationLink>
                ))}
            </TabNavigation>

            <div className="flex flex-col gap-4 w-full">
                <div className="pt-6">{children}</div>
            </div>
        </div>
    )
}
