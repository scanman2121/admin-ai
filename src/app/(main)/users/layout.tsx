"use client"

import { Button } from "@/components/Button"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { ModalAddUser } from "@/components/ui/settings/ModalAddUser"
import { RiAddLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
    { name: "All Users", href: "/users" },
    { name: "Active", href: "/users/active" },
    { name: "Inactive", href: "/users/inactive" },
    { name: "Invited users", href: "/users/invited" },
] as const

export default function UsersLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                    Users
                </h1>
                <ModalAddUser>
                    <Button>
                        <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                        Add users
                    </Button>
                </ModalAddUser>
            </div>
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
            <div className="pt-6">{children}</div>
        </div>
    )
} 