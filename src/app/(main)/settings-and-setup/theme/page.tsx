"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Theme page
const tabs = [
    { name: "Appearance", href: "/settings-and-setup/theme" },
    { name: "Colors", href: "/settings-and-setup/theme/colors" },
    { name: "Typography", href: "/settings-and-setup/theme/typography" },
    { name: "Logo", href: "/settings-and-setup/theme/logo" },
    { name: "Custom CSS", href: "/settings-and-setup/theme/css" },
]

export default function Theme() {
    return (
        <PageTemplate
            title="Theme"
            primaryCta="Save Changes"
            tabs={tabs}
        />
    )
} 