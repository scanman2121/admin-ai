"use client"

import { PageTemplate } from "@/components/PageTemplate"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { getPageInsights } from "@/lib/insights"

// Define tabs for the Asset Manager Overview page
const tabs = [
    { name: "Overview", href: "/asset-manager/overview" },
    { name: "Activity", href: "/asset-manager/overview/activity" },
    { name: "Analytics", href: "/asset-manager/overview/analytics" },
    { name: "Reports", href: "/asset-manager/overview/reports" },
]

export default function AssetManagerOverview() {
    // Get insights for the Asset Manager Overview page
    const insights = getPageInsights("assetManager")

    return (
        <div className="flex flex-col gap-6">
            <AIInsights insights={insights} />
            <PageTemplate
                title="Asset Manager Overview"
                tabs={tabs}
            />
        </div>
    )
} 