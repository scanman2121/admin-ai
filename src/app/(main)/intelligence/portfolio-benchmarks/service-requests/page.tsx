"use client"

import { PageTemplate } from "@/components/PageTemplate"
import { FeedbackTable } from "../components"
import { useFeedbackData } from "../hooks"

// Define tabs for the Feedback page
const tabs = [
    { name: "All feedback", href: "/intelligence/portfolio-benchmarks" },
    { name: "Resources", href: "/intelligence/portfolio-benchmarks/resources" },
    { name: "Service Requests", href: "/intelligence/portfolio-benchmarks/service-requests" },
    { name: "Events", href: "/intelligence/portfolio-benchmarks/events" },
    { name: "By Staff", href: "/intelligence/portfolio-benchmarks/by-staff" },
]

export default function ServiceRequestsFeedback() {
    const { feedback, handleDelete } = useFeedbackData()
    const filteredFeedback = feedback.filter(f => f.type === "Service Request")

    return (
        <PageTemplate
            title="Feedback"
            tabs={tabs}
        >
            <FeedbackTable feedback={filteredFeedback} onDelete={handleDelete} />
        </PageTemplate>
    )
}


