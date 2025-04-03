"use client"

import { PageTemplate } from "@/components/PageTemplate"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RiDownload2Line, RiFileChartLine, RiFileList2Line, RiMailLine, RiPieChart2Line, RiSettings5Line } from "@remixicon/react"
import { Grid } from "@tremor/react"

// Mock data for available reports
const reports = [
    {
        id: "tenant-satisfaction",
        name: "Tenant Satisfaction Report",
        description: "Comprehensive analysis of tenant satisfaction scores and feedback",
        type: "Monthly",
        lastGenerated: "Apr 15, 2024",
        icon: RiPieChart2Line,
    },
    {
        id: "occupancy-trends",
        name: "Occupancy Trends",
        description: "Detailed breakdown of occupancy rates and space utilization",
        type: "Weekly",
        lastGenerated: "Apr 21, 2024",
        icon: RiFileChartLine,
    },
    {
        id: "financial-performance",
        name: "Financial Performance",
        description: "Revenue analysis, operating costs, and financial projections",
        type: "Monthly",
        lastGenerated: "Apr 1, 2024",
        icon: RiFileList2Line,
    },
    {
        id: "maintenance-summary",
        name: "Maintenance Summary",
        description: "Overview of maintenance requests, resolutions, and costs",
        type: "Weekly",
        lastGenerated: "Apr 21, 2024",
        icon: RiSettings5Line,
    }
];

// Mock data for scheduled reports
const scheduledReports = [
    {
        id: "exec-summary",
        name: "Executive Summary",
        frequency: "Monthly",
        nextScheduled: "May 1, 2024",
        recipients: ["management@company.com", "executives@company.com"],
    },
    {
        id: "weekly-metrics",
        name: "Weekly Metrics Dashboard",
        frequency: "Weekly",
        nextScheduled: "Apr 28, 2024",
        recipients: ["operations@company.com"],
    }
];

export default function ReportsPage() {
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
                {/* Available Reports */}
                <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-4">Available Reports</h2>
                    <Grid numItemsMd={2} className="gap-6">
                        {reports.map((report) => (
                            <Card key={report.id} className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <report.icon className="size-5 text-primary" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-medium text-gray-900 dark:text-gray-50">
                                            {report.name}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            {report.description}
                                        </p>
                                        <div className="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                            <span>{report.type}</span>
                                            <span>•</span>
                                            <span>Last generated: {report.lastGenerated}</span>
                                        </div>
                                        <div className="mt-4">
                                            <Button variant="outline" size="sm" className="gap-2">
                                                <RiDownload2Line className="size-4" />
                                                Download Report
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </Grid>
                </div>

                {/* Scheduled Reports */}
                <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-4">Scheduled Reports</h2>
                    <Card className="p-6">
                        <div className="space-y-6">
                            {scheduledReports.map((report) => (
                                <div
                                    key={report.id}
                                    className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0"
                                >
                                    <div>
                                        <h3 className="text-base font-medium text-gray-900 dark:text-gray-50">
                                            {report.name}
                                        </h3>
                                        <div className="mt-1 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                            <span>Frequency: {report.frequency}</span>
                                            <span>•</span>
                                            <span>Next: {report.nextScheduled}</span>
                                        </div>
                                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                            <RiMailLine className="size-4" />
                                            <span>{report.recipients.join(", ")}</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Edit Schedule
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Generate Custom Report */}
                <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-medium text-gray-900 dark:text-gray-50">
                                Generate Custom Report
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Create a customized report by selecting specific metrics and date ranges
                            </p>
                        </div>
                        <Button>Create Report</Button>
                    </div>
                </Card>
            </div>
        </PageTemplate>
    )
} 