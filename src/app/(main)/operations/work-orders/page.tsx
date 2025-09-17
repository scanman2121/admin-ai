"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Work Orders page
const tabs = [
    { name: "All Work Orders", href: "/operations/work-orders" },
    { name: "Open", href: "/operations/work-orders/open" },
    { name: "In Progress", href: "/operations/work-orders/in-progress" },
    { name: "Completed", href: "/operations/work-orders/completed" },
    { name: "Vendors", href: "/operations/work-orders/vendors" },
]

export default function WorkOrders() {
    return (
        <PageTemplate
            title="Work Orders"
            primaryCta="Create work order"
            tabs={tabs}
        />
    )
} 