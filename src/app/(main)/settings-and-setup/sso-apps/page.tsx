"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the SSO Apps page
const tabs = [
    { name: "All Apps", href: "/settings-and-setup/sso-apps" },
    { name: "Active", href: "/settings-and-setup/sso-apps/active" },
    { name: "Inactive", href: "/settings-and-setup/sso-apps/inactive" },
    { name: "Configurations", href: "/settings-and-setup/sso-apps/configurations" },
]

export default function SsoApps() {
    return (
        <PageTemplate
            title="SSO Apps"
            primaryCta="Add SSO App"
            tabs={tabs}
        />
    )
} 