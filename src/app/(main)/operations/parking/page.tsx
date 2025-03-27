"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Parking page
const tabs = [
    { name: "All Spaces", href: "/operations/parking" },
    { name: "Assigned", href: "/operations/parking/assigned" },
    { name: "Available", href: "/operations/parking/available" },
    { name: "Visitor Parking", href: "/operations/parking/visitor" },
    { name: "Permits", href: "/operations/parking/permits" },
]

export default function Parking() {
    return (
        <PageTemplate
            title="Parking"
            primaryCta="Assign Space"
            tabs={tabs}
        />
    )
} 