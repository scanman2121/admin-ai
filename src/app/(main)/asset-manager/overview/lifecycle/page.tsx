"use client"

import { PageTemplate } from "@/components/PageTemplate"
import { KanbanBoard } from "@/components/ui/kanban/KanbanBoard"

export default function LifecyclePage() {
    return (
        <PageTemplate
            title="Asset Manager Overview"
            tabs={[
                { name: "Overview", href: "/asset-manager/overview" },
                { name: "Analysis", href: "/asset-manager/overview/analysis" },
                { name: "Reports", href: "/asset-manager/overview/reports" },
                { name: "Lifecycle", href: "/asset-manager/overview/lifecycle" },
                { name: "Prospects", href: "/asset-manager/overview/prospects" },
            ]}
        >
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">Tenant Lifecycle</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Track and manage tenants through their entire lifecycle, from initial prospect to active tenant.
                        </p>
                    </div>
                </div>

                <KanbanBoard />
            </div>
        </PageTemplate>
    )
} 