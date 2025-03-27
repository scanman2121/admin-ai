"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Assessments page
const tabs = [
    { name: "All Assessments", href: "/intelligence/assessments" },
    { name: "Completed", href: "/intelligence/assessments/completed" },
    { name: "In Progress", href: "/intelligence/assessments/in-progress" },
    { name: "Scheduled", href: "/intelligence/assessments/scheduled" },
    { name: "Templates", href: "/intelligence/assessments/templates" },
]

export default function Assessments() {
    return (
        <PageTemplate
            title="Assessments"
            primaryCta="Create Assessment"
            tabs={tabs}
        />
    )
} 