"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the About Intelligence page
const tabs = [
    { name: "Overview", href: "/intelligence/about" },
    { name: "Features", href: "/intelligence/about/features" },
    { name: "Use Cases", href: "/intelligence/about/use-cases" },
    { name: "Documentation", href: "/intelligence/about/documentation" },
    { name: "FAQ", href: "/intelligence/about/faq" },
]

export default function AboutIntelligence() {
    return (
        <PageTemplate
            title="About Intelligence"
            primaryCta="Get Started"
            tabs={tabs}
        />
    )
} 