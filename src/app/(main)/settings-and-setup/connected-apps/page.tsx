"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Connected Apps page
const tabs = [
    { name: "All Apps", href: "/settings-and-setup/connected-apps" },
    { name: "Active", href: "/settings-and-setup/connected-apps/active" },
    { name: "Inactive", href: "/settings-and-setup/connected-apps/inactive" },
    { name: "API Keys", href: "/settings-and-setup/connected-apps/api-keys" },
]

export default function ConnectedApps() {
    return (
        <PageTemplate
            title="Connected Apps"
            primaryCta="Connect App"
            tabs={tabs}
        />
    )
} 