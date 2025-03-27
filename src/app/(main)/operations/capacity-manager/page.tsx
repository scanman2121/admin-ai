"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Capacity Manager page
const tabs = [
    { name: "Overview", href: "/operations/capacity-manager" },
    { name: "Spaces", href: "/operations/capacity-manager/spaces" },
    { name: "Occupancy Limits", href: "/operations/capacity-manager/limits" },
    { name: "Alerts", href: "/operations/capacity-manager/alerts" },
    { name: "Reports", href: "/operations/capacity-manager/reports" },
]

export default function CapacityManager() {
    return (
        <PageTemplate
            title="Capacity Manager"
            primaryCta="Add Space"
            tabs={tabs}
        />
    )
} 