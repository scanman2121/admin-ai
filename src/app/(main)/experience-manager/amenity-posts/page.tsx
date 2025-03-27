"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Amenity Posts page
const tabs = [
    { name: "All Posts", href: "/experience-manager/amenity-posts" },
    { name: "Published", href: "/experience-manager/amenity-posts/published" },
    { name: "Scheduled", href: "/experience-manager/amenity-posts/scheduled" },
    { name: "Drafts", href: "/experience-manager/amenity-posts/drafts" },
]

export default function AmenityPosts() {
    return (
        <PageTemplate
            title="Amenity Posts"
            primaryCta="Create Post"
            tabs={tabs}
        />
    )
} 