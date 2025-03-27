"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Surveys page
const tabs = [
    { name: "All Surveys", href: "/experience-manager/surveys" },
    { name: "Active", href: "/experience-manager/surveys/active" },
    { name: "Completed", href: "/experience-manager/surveys/completed" },
    { name: "Drafts", href: "/experience-manager/surveys/drafts" },
]

export default function Surveys() {
    return (
        <PageTemplate
            title="Surveys"
            primaryCta="Create Survey"
            tabs={tabs}
        />
    )
} 