"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Access Control User Access page
const tabs = [
    { name: "Overview", href: "/operations/access-control" },
    { name: "Activity", href: "/operations/access-control/activity" },
    { name: "Access groups", href: "/operations/access-control/access-groups" },
    { name: "User access", href: "/operations/access-control/user-access" },
]

export default function AccessControlUserAccess() {
    return (
        <PageTemplate
            title="Access Control"
            primaryCta="Grant Access"
            tabs={tabs}
        >
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                    User Access Management
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Review and manage user access requests and permissions.
                </p>
                
                {/* User access content will go here */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
                        Pending Access Requests
                    </h3>
                    <p className="text-blue-700 dark:text-blue-300 mb-4">
                        You have 3 users awaiting access approval.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            User access request management coming soon...
                        </p>
                    </div>
                </div>
            </div>
        </PageTemplate>
    )
}
