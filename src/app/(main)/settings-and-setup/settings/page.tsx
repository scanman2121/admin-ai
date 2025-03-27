"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Settings page
const tabs = [
    { name: "General", href: "/settings-and-setup/settings" },
    { name: "Security", href: "/settings-and-setup/settings/security" },
    { name: "Notifications", href: "/settings-and-setup/settings/notifications" },
    { name: "Billing", href: "/settings-and-setup/settings/billing" },
    { name: "Integrations", href: "/settings-and-setup/settings/integrations" },
]

export default function Settings() {
    return (
        <PageTemplate
            title="Settings"
            primaryCta="Save Changes"
            tabs={tabs}
        />
    )
} 