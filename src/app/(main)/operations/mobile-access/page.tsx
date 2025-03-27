"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Mobile Access page
const tabs = [
    { name: "All Users", href: "/operations/mobile-access" },
    { name: "Active", href: "/operations/mobile-access/active" },
    { name: "Pending", href: "/operations/mobile-access/pending" },
    { name: "Revoked", href: "/operations/mobile-access/revoked" },
    { name: "Access Logs", href: "/operations/mobile-access/logs" },
]

export default function MobileAccess() {
    return (
        <PageTemplate
            title="Mobile Access"
            primaryCta="Grant Access"
            tabs={tabs}
        />
    )
} 