"use client"

import { PageTemplate } from "@/components/PageTemplate"
import { KanbanBoard } from "@/components/ui/kanban/KanbanBoard"

export default function LifecyclePage() {
    return (
        <PageTemplate
            title="Portfolio Overview"
            tabs={[
                { name: "Overview", href: "/portfolio/overview" },
                { name: "Analysis", href: "/portfolio/overview/analysis" },
                { name: "Reports", href: "/portfolio/overview/reports" },
                { name: "Lifecycle", href: "/portfolio/overview/lifecycle" },
                { name: "Prospects", href: "/portfolio/overview/prospects" },
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