"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Visitor Management page
const tabs = [
    { name: "All Visitors", href: "/operations/visitor-management" },
    { name: "Expected Today", href: "/operations/visitor-management/today" },
    { name: "Checked In", href: "/operations/visitor-management/checked-in" },
    { name: "Checked Out", href: "/operations/visitor-management/checked-out" },
    { name: "Upcoming", href: "/operations/visitor-management/upcoming" },
]

export default function VisitorManagement() {
    return (
        <PageTemplate
            title="Visitor Management"
            primaryCta="Register Visitor"
            tabs={tabs}
        />
    )
} 