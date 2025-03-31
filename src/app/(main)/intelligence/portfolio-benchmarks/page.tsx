"use client"

import { PageTemplate } from "@/components/PageTemplate"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define tabs for the Portfolio Benchmarks page
const tabs = [
    { name: "Overview", href: "/intelligence/portfolio-benchmarks" },
    { name: "Market Analysis", href: "/intelligence/portfolio-benchmarks/market-analysis" },
    { name: "Peer Comparison", href: "/intelligence/portfolio-benchmarks/peer-comparison" },
    { name: "Historical Trends", href: "/intelligence/portfolio-benchmarks/historical-trends" },
]

// Top performing buildings data
const topPerformingBuildings = [
    {
        name: "Tech Square",
        score: "91/100",
        rank: 1,
    },
    {
        name: "125 Lincoln",
        score: "87/100",
        rank: 2,
    },
    {
        name: "Riverfront Tower",
        score: "82/100",
        rank: 3,
    },
]

// Building comparison data
const buildingComparisonData = [
    {
        name: "Tech Square",
        amenityUsage: 88.5,
        satisfaction: 4.8,
    },
    {
        name: "125 Lincoln",
        amenityUsage: 78.5,
        satisfaction: 4.3,
    },
    {
        name: "Riverfront Tower",
        amenityUsage: 72.5,
        satisfaction: 4.0,
    },
    {
        name: "Harborview Plaza",
        amenityUsage: 52.5,
        satisfaction: 3.2,
    },
]

// Feedback insights data
const feedbackInsights = {
    buildingName: "125 Lincoln",
    responses: 142,
    responseRate: "68.5%",
    overallSatisfaction: 4.2,
    sentimentBreakdown: {
        positive: 65,
        neutral: 25,
        negative: 10,
    },
    positiveThemes: [
        { theme: "Lobby Renovation", mentions: 42, percentage: 29.6 },
        { theme: "Staff Responsiveness", mentions: 38, percentage: 26.8 },
        { theme: "Building Cleanliness", mentions: 35, percentage: 24.6 },
    ],
    negativeThemes: [
        { theme: "HVAC Issues", mentions: 18, percentage: 12.7 },
        { theme: "Elevator Wait Times", mentions: 15, percentage: 10.6 },
        { theme: "Limited Parking", mentions: 12, percentage: 8.5 },
    ],
}

function PortfolioPerformanceOverview() {
    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold">Portfolio Performance Overview</h2>
                    <p className="text-sm text-gray-500">AI-powered analysis of your building portfolio</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">4 Buildings</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-4 border">
                    <div className="text-sm text-gray-500">Occupancy Rate</div>
                    <div className="text-3xl font-semibold mt-1">90.2%</div>
                    <div className="flex items-center gap-1 mt-1">
                        <span className="text-sm text-gray-500">vs. Industry Avg: 89.5%</span>
                        <span className="text-sm text-green-600">↑ 1.8%</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                    <div className="text-sm text-gray-500">Tenant Satisfaction</div>
                    <div className="text-3xl font-semibold mt-1">4.0/5</div>
                    <div className="flex items-center gap-1 mt-1">
                        <span className="text-sm text-gray-500">vs. Industry Avg: 3.8/5</span>
                        <span className="text-sm text-green-600">↑ 3.5%</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                    <div className="text-sm text-gray-500">Avg. Revenue</div>
                    <div className="text-3xl font-semibold mt-1">$31.2</div>
                    <div className="flex items-center gap-1 mt-1">
                        <span className="text-sm text-gray-500">vs. Industry Avg: $30.0/sqft</span>
                        <span className="text-sm text-green-600">↑ 2.7%</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                    <div className="text-sm text-gray-500">Amenity Usage</div>
                    <div className="text-3xl font-semibold mt-1">67.0%</div>
                    <div className="flex items-center gap-1 mt-1">
                        <span className="text-sm text-gray-500">vs. Industry Avg: 65.0%</span>
                        <span className="text-sm text-green-600">↑ 5.3%</span>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <Tabs defaultValue="top-performers">
                    <TabsList>
                        <TabsTrigger value="top-performers">Top Performers</TabsTrigger>
                        <TabsTrigger value="needs-attention">Needs Attention</TabsTrigger>
                        <TabsTrigger value="industry-comparison">Industry Comparison</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {topPerformingBuildings.map((building) => (
                        <div key={building.name} className="bg-white rounded-lg p-4 border">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium">{building.name}</h3>
                                <span className="text-lg">{building.rank}</span>
                            </div>
                            <div className="mt-2">
                                <div className="text-sm text-gray-500">Score: {building.score}</div>
                            </div>
                            <button className="mt-4 text-primary text-sm flex items-center gap-1">
                                View Details
                                <span className="text-lg">→</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <span>✨ AI-generated ranking based on multiple performance metrics</span>
                <span className="ml-4">Last updated: 3/31/2025</span>
            </div>
        </Card>
    )
}

function BuildingComparison() {
    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold">Building Comparison</h2>
                    <p className="text-sm text-gray-500">Compare performance metrics across buildings</p>
                </div>
            </div>

            <Tabs defaultValue="amenity-usage">
                <TabsList>
                    <TabsTrigger value="amenity-usage">Amenity Usage</TabsTrigger>
                    <TabsTrigger value="feedback-themes">Feedback Themes</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Conference/Meeting Rooms</span>
                    <span className="ml-auto">Portfolio Avg: 68.5%</span>
                </div>

                {buildingComparisonData.map((building) => (
                    <div key={building.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{building.name}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-primary">{building.amenityUsage}%</span>
                                <span className="text-sm text-gray-500">{building.satisfaction}/5</span>
                            </div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${building.amenityUsage}%` }}
                            />
                        </div>
                    </div>
                ))}

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">AI Insights</h3>
                    <p className="text-sm text-gray-600">
                        Tech Square has the highest conference room usage (88.5%) and satisfaction (4.8/5).
                        Consider studying their booking system and room configurations to improve utilization in
                        other buildings.
                    </p>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                    Last updated: 3/31/2025
                </div>
            </div>
        </Card>
    )
}

function AIFeedbackInsights() {
    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold">AI-Powered Feedback Insights</h2>
                    <p className="text-sm text-gray-500">Automated analysis of tenant feedback</p>
                </div>
                <select className="border rounded-md px-2 py-1 text-sm">
                    <option>125 Lincoln</option>
                    <option>Tech Square</option>
                    <option>Riverfront Tower</option>
                </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl font-semibold">{feedbackInsights.overallSatisfaction}</div>
                        <div className="text-sm text-gray-500">
                            {feedbackInsights.responses} Responses
                            <span className="ml-2">
                                {feedbackInsights.responseRate} Response Rate
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium mb-2">Sentiment Breakdown</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">Positive</span>
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-500 rounded-full"
                                            style={{ width: `${feedbackInsights.sentimentBreakdown.positive}%` }}
                                        />
                                    </div>
                                    <span className="text-sm">{feedbackInsights.sentimentBreakdown.positive}%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">Neutral</span>
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gray-400 rounded-full"
                                            style={{ width: `${feedbackInsights.sentimentBreakdown.neutral}%` }}
                                        />
                                    </div>
                                    <span className="text-sm">{feedbackInsights.sentimentBreakdown.neutral}%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">Negative</span>
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-red-500 rounded-full"
                                            style={{ width: `${feedbackInsights.sentimentBreakdown.negative}%` }}
                                        />
                                    </div>
                                    <span className="text-sm">{feedbackInsights.sentimentBreakdown.negative}%</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium mb-2">Response Trend</h3>
                            <div className="h-32 bg-gray-50 rounded-lg"></div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-medium mb-3">Top Positive Themes</h3>
                            <div className="space-y-3">
                                {feedbackInsights.positiveThemes.map((theme) => (
                                    <div key={theme.theme} className="flex items-center gap-2">
                                        <span className="text-sm flex-1">{theme.theme}</span>
                                        <span className="text-sm text-gray-500">{theme.mentions} mentions</span>
                                        <span className="text-sm text-green-600">{theme.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium mb-3">Top Negative Themes</h3>
                            <div className="space-y-3">
                                {feedbackInsights.negativeThemes.map((theme) => (
                                    <div key={theme.theme} className="flex items-center gap-2">
                                        <span className="text-sm flex-1">{theme.theme}</span>
                                        <span className="text-sm text-gray-500">{theme.mentions} mentions</span>
                                        <span className="text-sm text-red-600">{theme.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-medium mb-2">AI Theme Analysis</h3>
                            <p className="text-sm text-gray-600">
                                Recent lobby renovations have significantly improved tenant perception, with a 15.2%
                                increase in positive mentions. HVAC issues are decreasing (-5.3%) but remain the top
                                concern. Consider targeted communication about ongoing HVAC improvements to further
                                reduce concerns.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-sm text-gray-500">
                Last updated: 3/31/2025
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
                <PortfolioPerformanceOverview />
                <BuildingComparison />
                <AIFeedbackInsights />
            </div>
        </PageTemplate>
    )
} 