"use client"

import { Button } from "@/components/Button"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { RiAddLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
    { name: "All employees", href: "/tenant/employees" },
    { name: "IdP groups", href: "/tenant/employees/idp-groups" },
] as const

export default function EmployeesLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()

    return (
        <div className="flex h-full w-full flex-col space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                        Employees
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage your employees and their permissions
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="secondary">
                        Connect IdP
                    </Button>
                    <Button>
                        <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                        Add employees
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

