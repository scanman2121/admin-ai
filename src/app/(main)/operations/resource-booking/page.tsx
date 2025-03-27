"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Resource Booking page
const tabs = [
    { name: "All Bookings", href: "/operations/resource-booking" },
    { name: "Today", href: "/operations/resource-booking/today" },
    { name: "Upcoming", href: "/operations/resource-booking/upcoming" },
    { name: "Past", href: "/operations/resource-booking/past" },
    { name: "Resources", href: "/operations/resource-booking/resources" },
]

export default function ResourceBooking() {
    return (
        <PageTemplate
            title="Resource Booking"
            primaryCta="Create Booking"
            tabs={tabs}
        />
    )
} 