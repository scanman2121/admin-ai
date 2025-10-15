"use client"

import { Button } from "@/components/Button"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { Coins } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
    { name: "Employees", href: "/tenant/credits" },
    { name: "Transactions", href: "/tenant/credits/transactions" },
] as const

export default function CreditsLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()

    return (
        <div className="flex h-full w-full flex-col space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                    Credits
                </h1>
                <Button>
                    <Coins className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                    Distribute credits
                </Button>
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

