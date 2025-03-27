"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Content page
const tabs = [
    { name: "All Content", href: "/experience-manager/content" },
    { name: "Published", href: "/experience-manager/content/published" },
    { name: "Drafts", href: "/experience-manager/content/drafts" },
    { name: "Archived", href: "/experience-manager/content/archived" },
]

export default function Content() {
    return (
        <PageTemplate
            title="Content"
            primaryCta="Create Content"
            tabs={tabs}
        />
    )
} 