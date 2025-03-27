"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Community Forum page
const tabs = [
    { name: "All Posts", href: "/experience-manager/community-forum" },
    { name: "Discussions", href: "/experience-manager/community-forum/discussions" },
    { name: "Questions", href: "/experience-manager/community-forum/questions" },
    { name: "Announcements", href: "/experience-manager/community-forum/announcements" },
    { name: "Flagged", href: "/experience-manager/community-forum/flagged" },
]

export default function CommunityForum() {
    return (
        <PageTemplate
            title="Community Forum"
            primaryCta="Create Post"
            tabs={tabs}
        />
    )
} 