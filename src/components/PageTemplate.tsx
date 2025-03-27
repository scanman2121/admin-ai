"use client"

import { PageHeader } from "@/components/PageHeader"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { columns } from "@/components/ui/data-table/columns"
import { usage } from "@/data/data"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface PageTemplateProps {
    title: string
    primaryCta?: string
    onPrimaryClick?: () => void
    tabs?: { name: string; href: string }[]
}

export function PageTemplate({
    title,
    primaryCta,
    onPrimaryClick,
    tabs
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
                        <DataTable data={usage} columns={columns} />
                    </div>
                </>
            ) : (
                <div>
                    <DataTable data={usage} columns={columns} />
                </div>
            )}
        </div>
    )
} 