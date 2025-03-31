"use client"

import { PageTemplate } from "@/components/PageTemplate"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define tabs for the Experience Manager Overview page
const tabs = [
    { name: "Overview", href: "/experience-manager/overview" },
    { name: "Content Performance", href: "/experience-manager/overview/content" },
    { name: "Event Analytics", href: "/experience-manager/overview/events" },
    { name: "Community Engagement", href: "/experience-manager/overview/community" },
]

// Top performing content data
const topPerformingContent = [
    {
        name: "Summer Events Calendar",
        views: 2845,
        engagement: "92%",
        rank: 1,
    },
    {
        name: "Fitness Center Schedule",
        views: 2156,
        engagement: "88%",
        rank: 2,
    },
    {
        name: "Building Newsletter",
        views: 1987,
        engagement: "85%",
        rank: 3,
    },
]

// Event performance data
const eventPerformanceData = [
    {
        name: "Rooftop Yoga",
        attendance: 95.5,
        satisfaction: 4.8,
    },
    {
        name: "Networking Mixer",
        attendance: 88.5,
        satisfaction: 4.6,
    },
    {
        name: "Wellness Workshop",
        attendance: 82.5,
        satisfaction: 4.4,
    },
    {
        name: "Food Truck Friday",
        attendance: 78.5,
        satisfaction: 4.2,
    },
]

// Community insights data
const communityInsights = {
    totalMembers: 1250,
    activeRate: "78.5%",
    overallEngagement: 4.5,
    sentimentBreakdown: {
        positive: 72,
        neutral: 20,
        negative: 8,
    },
    topDiscussions: [
        { topic: "Building Amenities", participants: 156, percentage: 35.8 },
        { topic: "Community Events", participants: 142, percentage: 32.6 },
        { topic: "Local Recommendations", participants: 98, percentage: 22.5 },
    ],
    improvementAreas: [
        { area: "Event Timing", mentions: 24, percentage: 15.2 },
        { area: "RSVP System", mentions: 18, percentage: 11.4 },
        { area: "Mobile App Access", mentions: 15, percentage: 9.5 },
    ],
}

function ExperiencePerformanceOverview() {
    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold">Experience Performance Overview</h2>
                    <p className="text-sm text-gray-500">AI-powered analysis of tenant experience metrics</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Last 30 Days</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-4 border">
                    <div className="text-sm text-gray-500">Content Engagement</div>
                    <div className="text-3xl font-semibold mt-1">88.5%</div>
                    <div className="flex items-center gap-1 mt-1">
                        <span className="text-sm text-gray-500">vs. Last Month: 85.2%</span>
                        <span className="text-sm text-green-600">↑ 3.3%</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                    <div className="text-sm text-gray-500">Event Attendance</div>
                    <div className="text-3xl font-semibold mt-1">92.0%</div>
                    <div className="flex items-center gap-1 mt-1">
                        <span className="text-sm text-gray-500">vs. Target: 85%</span>
                        <span className="text-sm text-green-600">↑ 7.0%</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                    <div className="text-sm text-gray-500">Community Activity</div>
                    <div className="text-3xl font-semibold mt-1">1.2K</div>
                    <div className="flex items-center gap-1 mt-1">
                        <span className="text-sm text-gray-500">Active Members</span>
                        <span className="text-sm text-green-600">↑ 12.5%</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                    <div className="text-sm text-gray-500">Satisfaction Score</div>
                    <div className="text-3xl font-semibold mt-1">4.6/5</div>
                    <div className="flex items-center gap-1 mt-1">
                        <span className="text-sm text-gray-500">vs. Last Month: 4.4</span>
                        <span className="text-sm text-green-600">↑ 4.5%</span>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <Tabs defaultValue="top-content">
                    <TabsList>
                        <TabsTrigger value="top-content">Top Content</TabsTrigger>
                        <TabsTrigger value="trending">Trending</TabsTrigger>
                        <TabsTrigger value="engagement">Engagement</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {topPerformingContent.map((content) => (
                        <div key={content.name} className="bg-white rounded-lg p-4 border">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium">{content.name}</h3>
                                <span className="text-lg">#{content.rank}</span>
                            </div>
                            <div className="mt-2 space-y-1">
                                <div className="text-sm text-gray-500">Views: {content.views}</div>
                                <div className="text-sm text-gray-500">Engagement: {content.engagement}</div>
                            </div>
                            <button className="mt-4 text-primary text-sm flex items-center gap-1">
                                View Analytics
                                <span className="text-lg">→</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <span>✨ AI-generated insights based on user interaction data</span>
                <span className="ml-4">Last updated: 3/31/2025</span>
            </div>
        </Card>
    )
}

function EventPerformance() {
    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold">Event Performance</h2>
                    <p className="text-sm text-gray-500">Compare metrics across different events</p>
                </div>
            </div>

            <Tabs defaultValue="attendance">
                <TabsList>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Recent Events</span>
                    <span className="ml-auto">Portfolio Avg: 86.2%</span>
                </div>

                {eventPerformanceData.map((event) => (
                    <div key={event.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{event.name}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-primary">{event.attendance}%</span>
                                <span className="text-sm text-gray-500">{event.satisfaction}/5</span>
                            </div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${event.attendance}%` }}
                            />
                        </div>
                    </div>
                ))}

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">AI Insights</h3>
                    <p className="text-sm text-gray-600">
                        Wellness-focused events like Rooftop Yoga show consistently high attendance (95.5%) and satisfaction (4.8/5).
                        Consider expanding wellness programming and applying successful elements to other event categories.
                    </p>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                    Last updated: 3/31/2025
                </div>
            </div>
        </Card>
    )
}

function CommunityEngagementInsights() {
    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold">Community Engagement Insights</h2>
                    <p className="text-sm text-gray-500">Analysis of community participation and feedback</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl font-semibold">{communityInsights.overallEngagement}</div>
                        <div className="text-sm text-gray-500">
                            {communityInsights.totalMembers} Members
                            <span className="ml-2">
                                {communityInsights.activeRate} Active
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium mb-2">Engagement Breakdown</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">Positive</span>
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-500 rounded-full"
                                            style={{ width: `${communityInsights.sentimentBreakdown.positive}%` }}
                                        />
                                    </div>
                                    <span className="text-sm">{communityInsights.sentimentBreakdown.positive}%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">Neutral</span>
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gray-400 rounded-full"
                                            style={{ width: `${communityInsights.sentimentBreakdown.neutral}%` }}
                                        />
                                    </div>
                                    <span className="text-sm">{communityInsights.sentimentBreakdown.neutral}%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">Negative</span>
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-red-500 rounded-full"
                                            style={{ width: `${communityInsights.sentimentBreakdown.negative}%` }}
                                        />
                                    </div>
                                    <span className="text-sm">{communityInsights.sentimentBreakdown.negative}%</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium mb-2">Participation Trend</h3>
                            <div className="h-32 bg-gray-50 rounded-lg"></div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-medium mb-3">Top Discussion Topics</h3>
                            <div className="space-y-3">
                                {communityInsights.topDiscussions.map((topic) => (
                                    <div key={topic.topic} className="flex items-center gap-2">
                                        <span className="text-sm flex-1">{topic.topic}</span>
                                        <span className="text-sm text-gray-500">{topic.participants} participants</span>
                                        <span className="text-sm text-green-600">{topic.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium mb-3">Areas for Improvement</h3>
                            <div className="space-y-3">
                                {communityInsights.improvementAreas.map((area) => (
                                    <div key={area.area} className="flex items-center gap-2">
                                        <span className="text-sm flex-1">{area.area}</span>
                                        <span className="text-sm text-gray-500">{area.mentions} mentions</span>
                                        <span className="text-sm text-red-600">{area.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-medium mb-2">AI Community Analysis</h3>
                            <p className="text-sm text-gray-600">
                                Building amenities and community events drive the most engagement. Consider improving
                                event timing and RSVP system based on feedback. Mobile app access improvements could
                                increase participation by making the platform more accessible.
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

export default function ExperienceManagerOverview() {
    return (
        <PageTemplate
            title="Experience Manager Overview"
            primaryCta="Export Report"
            onPrimaryClick={() => { }}
            tabs={tabs}
        >
            <div className="space-y-6">
                <ExperiencePerformanceOverview />
                <EventPerformance />
                <CommunityEngagementInsights />
            </div>
        </PageTemplate>
    )
} 