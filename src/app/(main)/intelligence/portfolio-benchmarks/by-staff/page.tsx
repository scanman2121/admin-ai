"use client"

import { PageTemplate } from "@/components/PageTemplate"
import { ByStaffTable } from "../components"
import { useFeedbackData } from "../hooks"

// Define tabs for the Feedback page
const tabs = [
    { name: "All feedback", href: "/intelligence/portfolio-benchmarks" },
    { name: "Resources", href: "/intelligence/portfolio-benchmarks/resources" },
    { name: "Service Requests", href: "/intelligence/portfolio-benchmarks/service-requests" },
    { name: "Events", href: "/intelligence/portfolio-benchmarks/events" },
    { name: "By Staff", href: "/intelligence/portfolio-benchmarks/by-staff" },
]

export default function ByStaffFeedback() {
    const { feedback, handleDelete } = useFeedbackData()
    const filteredFeedback = feedback.filter(f => f.staffMember !== undefined)

    return (
        <PageTemplate
            title="Feedback"
            tabs={tabs}
        >
            <ByStaffTable feedback={filteredFeedback} onDelete={handleDelete} />
        </PageTemplate>
    )
}
