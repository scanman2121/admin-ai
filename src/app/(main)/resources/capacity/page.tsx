"use client"

import { PageHeader } from "@/components/PageHeader"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
    { name: "Requests", href: "/resources" },
    { name: "Calendar", href: "/resources/calendar" },
    { name: "Capacity", href: "/resources/capacity" },
] as const

export default function Capacity() {
    const pathname = usePathname()
    return (
        <div>
            <PageHeader
                title="Resources"
                secondaryCta="Add Resource"
                primaryCta="Book Resource"
            />
            <TabNavigation className="mt-4">
                {tabs.map((tab) => (
                    <TabNavigationLink
                        key={tab.name}
                        asChild
                        active={pathname === tab.href}
                    >
                        <Link href={tab.href}>{tab.name}</Link>
                    </TabNavigationLink>
                ))}
            </TabNavigation>
            <div className="mt-4">
                <h2>Capacity Content</h2>
            </div>
        </div>
    )
} 