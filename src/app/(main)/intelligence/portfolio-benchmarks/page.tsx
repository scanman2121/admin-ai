"use client"

import { PageTemplate } from "@/components/PageTemplate"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Define tabs for the Portfolio Benchmarks page
const tabs = [
    { name: "Overview", href: "/intelligence/portfolio-benchmarks" },
    { name: "Market Analysis", href: "/intelligence/portfolio-benchmarks/market-analysis" },
    { name: "Peer Comparison", href: "/intelligence/portfolio-benchmarks/peer-comparison" },
    { name: "Historical Trends", href: "/intelligence/portfolio-benchmarks/historical-trends" },
]

// Performance metrics data
const performanceMetrics = [
    {
        title: "Portfolio Value",
        value: "$2.8B",
        comparison: "vs. Market Avg: $2.1B",
        trend: "up",
        trendValue: 15,
    },
    {
        title: "NOI Growth",
        value: "8.5%",
        comparison: "vs. Peer Avg: 6.2%",
        trend: "up",
        trendValue: 12,
    },
    {
        title: "Operating Expenses",
        value: "$42/sqft",
        comparison: "vs. Market: $48/sqft",
        trend: "down",
        trendValue: 8,
    },
    {
        title: "Energy Efficiency",
        value: "85/100",
        comparison: "vs. Industry: 72/100",
        trend: "up",
        trendValue: 10,
    },
]

// Market position data
const marketPosition = [
    {
        metric: "Occupancy Rate",
        value: "94%",
        marketAvg: "89%",
        percentile: "85th",
    },
    {
        metric: "Rental Rate",
        value: "$45/sqft",
        marketAvg: "$42/sqft",
        percentile: "75th",
    },
    {
        metric: "Tenant Satisfaction",
        value: "4.5/5",
        marketAvg: "4.1/5",
        percentile: "82nd",
    },
    {
        metric: "Building Quality",
        value: "A+",
        marketAvg: "A-",
        percentile: "90th",
    },
]

// Sustainability metrics
const sustainabilityMetrics = [
    {
        metric: "Energy Star Score",
        score: 85,
        target: 75,
        status: "Exceeding",
    },
    {
        metric: "Carbon Footprint",
        score: 92,
        target: 80,
        status: "Leading",
    },
    {
        metric: "Water Usage",
        score: 78,
        target: 80,
        status: "Near Target",
    },
    {
        metric: "Waste Diversion",
        score: 88,
        target: 85,
        status: "Exceeding",
    },
]

function PerformanceMetrics() {
    return (
        <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {performanceMetrics.map((metric) => (
                    <div key={metric.title} className="space-y-2">
                        <div className="text-sm text-gray-500">{metric.title}</div>
                        <div className="text-2xl font-semibold">{metric.value}</div>
                        <div className="flex items-center gap-2">
                            <span className={cn(
                                "text-sm",
                                metric.trend === "up" ? "text-green-600" : "text-red-600"
                            )}>
                                {metric.trend === "up" ? "↑" : "↓"} {metric.trendValue}%
                            </span>
                            <span className="text-sm text-gray-500">{metric.comparison}</span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

function MarketPosition() {
    return (
        <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Market Position</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {marketPosition.map((item) => (
                    <div key={item.metric} className="space-y-2">
                        <div className="text-sm text-gray-500">{item.metric}</div>
                        <div className="text-2xl font-semibold">{item.value}</div>
                        <div className="space-y-1">
                            <div className="text-sm text-gray-500">
                                Market Average: {item.marketAvg}
                            </div>
                            <div className="text-sm text-primary">
                                {item.percentile} Percentile
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

function SustainabilityMetrics() {
    return (
        <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Sustainability Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sustainabilityMetrics.map((metric) => (
                    <div key={metric.metric} className="space-y-2">
                        <div className="text-sm text-gray-500">{metric.metric}</div>
                        <div className="text-2xl font-semibold">{metric.score}/100</div>
                        <div className="space-y-1">
                            <div className="text-sm text-gray-500">
                                Target: {metric.target}
                            </div>
                            <div className={cn(
                                "text-sm",
                                metric.status === "Exceeding" ? "text-green-600" :
                                    metric.status === "Leading" ? "text-blue-600" :
                                        metric.status === "Near Target" ? "text-yellow-600" :
                                            "text-red-600"
                            )}>
                                • {metric.status}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default function PortfolioBenchmarks() {
    return (
        <PageTemplate
            title="Portfolio Benchmarks"
            primaryCta="Export Report"
            onPrimaryClick={() => { }}
            tabs={tabs}
        >
            <div className="space-y-6">
                <PerformanceMetrics />
                <MarketPosition />
                <SustainabilityMetrics />
            </div>
        </PageTemplate>
    )
} 