"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Events page
const tabs = [
    { name: "All Events", href: "/experience-manager/events" },
    { name: "Upcoming", href: "/experience-manager/events/upcoming" },
    { name: "Past", href: "/experience-manager/events/past" },
    { name: "Drafts", href: "/experience-manager/events/drafts" },
]

export default function Events() {
    return (
        <PageTemplate
            title="Events"
            primaryCta="Create Event"
            tabs={tabs}
        />
    )
} 