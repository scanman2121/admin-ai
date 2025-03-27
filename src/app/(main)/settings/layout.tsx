"use client"

import { siteConfig } from "@/app/siteConfig"
import { PageHeader } from "@/components/PageHeader"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationSettings = [
    { name: "General", href: siteConfig.baseLinks.settings.general },
    { name: "Billing & Usage", href: siteConfig.baseLinks.settings.billing },
]

export default function SettingsLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    return (
        <div>
            <PageHeader title="Settings & setup" />
            <TabNavigation className="mt-4">
                {navigationSettings.map((item) => (
                    <TabNavigationLink
                        key={item.name}
                        asChild
                        active={pathname === item.href}
                    >
                        <Link href={item.href}>{item.name}</Link>
                    </TabNavigationLink>
                ))}
            </TabNavigation>
            <div className="pt-6">{children}</div>
        </div>
    )
} 