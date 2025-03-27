"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Access Control page
const tabs = [
    { name: "All Access Points", href: "/operations/access-control" },
    { name: "Doors", href: "/operations/access-control/doors" },
    { name: "Elevators", href: "/operations/access-control/elevators" },
    { name: "Gates", href: "/operations/access-control/gates" },
    { name: "Access Groups", href: "/operations/access-control/groups" },
]

export default function AccessControl() {
    return (
        <PageTemplate
            title="Access Control"
            primaryCta="Add Access Point"
            tabs={tabs}
        />
    )
} 