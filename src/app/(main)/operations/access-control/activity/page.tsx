"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Access Control Activity page
const tabs = [
    { name: "Overview", href: "/operations/access-control" },
    { name: "Activity", href: "/operations/access-control/activity" },
    { name: "Access groups", href: "/operations/access-control/access-groups" },
    { name: "User access", href: "/operations/access-control/user-access" },
]

export default function AccessControlActivity() {
    return (
        <PageTemplate
            title="Access Control"
            primaryCta="Add Access Point"
            tabs={tabs}
        >
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                    Activity Log
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    View and monitor all access control activities and events.
                </p>
                
                {/* Activity content will go here */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                        Activity log content coming soon...
                    </p>
                </div>
            </div>
        </PageTemplate>
    )
}
