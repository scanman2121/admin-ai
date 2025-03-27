"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Intelligence Dashboard page
const tabs = [
    { name: "Overview", href: "/intelligence/dashboard" },
    { name: "Tenant Experience", href: "/intelligence/dashboard/tenant-experience" },
    { name: "Building Performance", href: "/intelligence/dashboard/building-performance" },
    { name: "Operational Efficiency", href: "/intelligence/dashboard/operational-efficiency" },
    { name: "Custom Reports", href: "/intelligence/dashboard/custom-reports" },
]

export default function Dashboard() {
    return (
        <PageTemplate
            title="Intelligence Dashboard"
            primaryCta="Export Data"
            tabs={tabs}
        />
    )
} 