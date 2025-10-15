"use client"

import { Button } from "@/components/Button"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { Building2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
    { name: "All Buildings", href: "/tenant/buildings" },
    { name: "Active", href: "/tenant/buildings/active" },
    { name: "Inactive", href: "/tenant/buildings/inactive" },
    { name: "Analysis", href: "/tenant/buildings/analysis" },
    { name: "Reports", href: "/tenant/buildings/reports" },
] as const

export default function TenantBuildingsLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()

    return (
        <div className="flex h-full w-full flex-col space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                    Buildings
                </h1>
                <Button>
                    Add Building
                </Button>
            </div>

            {/* Info Banner */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                            <Building2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                Do you have employees in other buildings?
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                See if they are on the HqO network. You will be able to manage all your employee workplace needs all in one place.
                            </p>
                        </div>
                    </div>
                    <Button variant="secondary">
                        Search buildings
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
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
                <div className="pt-2">{children}</div>
            </div>
        </div>
    )
}

