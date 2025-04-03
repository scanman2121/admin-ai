"use client"

import { PageTemplate } from "@/components/PageTemplate"
import { Card } from "@/components/ui/card"
import { AreaChart, BarChart, DonutChart, Grid, Text, Title } from "@tremor/react"

// Mock data for performance trends
const performanceData = [
    {
        date: "Jan 24",
        "Tenant Satisfaction": 85,
        "Tenant Engagement": 75,
        "Revenue Growth": 82
    },
    {
        date: "Feb 24",
        "Tenant Satisfaction": 88,
        "Tenant Engagement": 79,
        "Revenue Growth": 85
    },
    {
        date: "Mar 24",
        "Tenant Satisfaction": 87,
        "Tenant Engagement": 81,
        "Revenue Growth": 88
    },
    {
        date: "Apr 24",
        "Tenant Satisfaction": 92,
        "Tenant Engagement": 85,
        "Revenue Growth": 92
    }
];

// Mock data for space utilization
const spaceUtilizationData = [
    {
        category: "Office Space",
        utilization: 92
    },
    {
        category: "Meeting Rooms",
        utilization: 78
    },
    {
        category: "Common Areas",
        utilization: 85
    },
    {
        category: "Amenities",
        utilization: 72
    }
];

// Mock data for revenue distribution
const revenueDistributionData = [
    {
        name: "Office Leases",
        value: 65
    },
    {
        name: "Retail Spaces",
        value: 20
    },
    {
        name: "Parking",
        value: 10
    },
    {
        name: "Additional Services",
        value: 5
    }
];

export default function AnalysisPage() {
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
                {/* Performance Trends */}
                <Card>
                    <Title className="text-text-primary mb-2">Performance Trends</Title>
                    <Text className="text-text-secondary mb-4">Monthly performance metrics over time</Text>
                    <AreaChart
                        className="h-72"
                        data={performanceData}
                        index="date"
                        categories={["Tenant Satisfaction", "Tenant Engagement", "Revenue Growth"]}
                        colors={["emerald", "blue", "amber"]}
                        valueFormatter={(value) => `${value}%`}
                        showLegend={true}
                        showGridLines={false}
                        showAnimation={true}
                    />
                </Card>

                {/* Space Utilization */}
                <Card>
                    <Title className="text-text-primary mb-2">Space Utilization Analysis</Title>
                    <Text className="text-text-secondary mb-4">Current utilization rates by space type</Text>
                    <BarChart
                        className="h-72"
                        data={spaceUtilizationData}
                        index="category"
                        categories={["utilization"]}
                        colors={["blue"]}
                        valueFormatter={(value) => `${value}%`}
                        showLegend={false}
                        showGridLines={false}
                        showAnimation={true}
                    />
                </Card>

                {/* Revenue Distribution */}
                <Grid numItemsMd={2} className="gap-6">
                    <Card>
                        <Title className="text-text-primary">Revenue Distribution</Title>
                        <Text className="text-text-secondary mb-4">Breakdown of revenue sources</Text>
                        <DonutChart
                            className="mt-6"
                            data={revenueDistributionData}
                            category="value"
                            index="name"
                            valueFormatter={(value) => `${value}%`}
                            colors={["emerald", "blue", "amber", "indigo"]}
                            showAnimation={true}
                        />
                    </Card>

                    <Card>
                        <Title className="text-text-primary">Key Insights</Title>
                        <div className="mt-4 space-y-4">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                                <h3 className="font-medium text-blue-900 dark:text-blue-100">Tenant Satisfaction</h3>
                                <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                                    Satisfaction rates have increased by 7% in the last quarter, primarily driven by improved amenity services.
                                </p>
                            </div>
                            <div className="p-4 bg-emerald-50 dark:bg-emerald-900 rounded-lg">
                                <h3 className="font-medium text-emerald-900 dark:text-emerald-100">Space Optimization</h3>
                                <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
                                    Meeting room utilization could be improved. Consider implementing a new booking system or reconfiguring underutilized spaces.
                                </p>
                            </div>
                            <div className="p-4 bg-amber-50 dark:bg-amber-900 rounded-lg">
                                <h3 className="font-medium text-amber-900 dark:text-amber-100">Revenue Growth</h3>
                                <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                                    Additional services show potential for growth. Consider expanding service offerings to increase revenue diversification.
                                </p>
                            </div>
                        </div>
                    </Card>
                </Grid>
            </div>
        </PageTemplate>
    )
} 