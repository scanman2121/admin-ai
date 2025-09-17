"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Access Control Access Groups page
const tabs = [
    { name: "Overview", href: "/operations/access-control" },
    { name: "Activity", href: "/operations/access-control/activity" },
    { name: "Access groups", href: "/operations/access-control/access-groups" },
    { name: "User access", href: "/operations/access-control/user-access" },
]

export default function AccessControlGroups() {
    return (
        <PageTemplate
            title="Access Control"
            primaryCta="Create Access Group"
            tabs={tabs}
        >
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                    Access Groups
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage access groups and permissions for different areas and resources.
                </p>
                
                {/* Access groups content will go here */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                        Access groups management coming soon...
                    </p>
                </div>
            </div>
        </PageTemplate>
    )
}
