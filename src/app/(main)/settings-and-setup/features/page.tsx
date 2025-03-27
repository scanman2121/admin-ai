"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Features page
const tabs = [
    { name: "All Features", href: "/settings-and-setup/features" },
    { name: "Enabled", href: "/settings-and-setup/features/enabled" },
    { name: "Disabled", href: "/settings-and-setup/features/disabled" },
    { name: "Beta", href: "/settings-and-setup/features/beta" },
]

export default function Features() {
    return (
        <PageTemplate
            title="Features"
            primaryCta="Enable Feature"
            tabs={tabs}
        />
    )
} 