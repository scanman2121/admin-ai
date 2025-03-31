"use client"

import { PageHeader } from "@/components/PageHeader"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface PageTemplateProps {
    title: string
    primaryCta?: string
    onPrimaryClick?: () => void
    tabs?: { name: string; href: string }[]
    children?: React.ReactNode
}

export function PageTemplate({
    title,
    primaryCta,
    onPrimaryClick,
    tabs,
    children
}: PageTemplateProps) {
    const pathname = usePathname()

    return (
        <div className="flex flex-col gap-4 w-full">
            <PageHeader
                title={title}
                primaryCta={primaryCta}
                onPrimaryClick={onPrimaryClick}
            />

            {tabs && tabs.length > 0 ? (
                <>
                    <TabNavigation>
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

                    <div className="pt-4">
                        {children}
                    </div>
                </>
            ) : (
                <div>
                    {children}
                </div>
            )}
        </div>
    )
} 