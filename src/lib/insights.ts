import { MetricInsight } from "@/types/insights";

type PageType =
    | "buildings"
    | "tenants"
    | "spaces"
    | "operations"
    | "visitors"
    | "analytics"
    | "documents"
    | "users"
    | "vendors"
    | "transactions"
    | "portfolio"
    | "leasing";

export function getPageInsights(pageType: PageType): MetricInsight[] {
    switch (pageType) {
        case "buildings":
            return [
                {
                    title: "Occupancy Rate",
                    value: "87.5%",
                    comparison: "vs. Industry Avg: 89.5%",
                    trend: "down",
                    trendValue: 2,
                },
                {
                    title: "Tenant Satisfaction",
                    value: "4.4 / 5",
                    comparison: "vs. Industry Avg: 3.9",
                    trend: "up",
                    trendValue: 12,
                },
                {
                    title: "Amenity Usage",
                    value: "54.1%",
                    comparison: "vs. Industry Avg: 40.5%",
                    trend: "up",
                    trendValue: 33,
                },
                {
                    title: "Average Revenue",
                    value: "$31.09",
                    comparison: "vs. Industry Avg: $34.00 per sqft",
                    trend: "down",
                    trendValue: 8,
                },
            ];

        case "tenants":
            return [
                {
                    title: "Average THS",
                    value: "72",
                    comparison: "across all tenants",
                    trend: "up",
                    trendValue: 5,
                },
                {
                    title: "Total LTV",
                    value: "$5.67M",
                    comparison: "lifetime value",
                    trend: "up",
                    trendValue: 12,
                },
                {
                    title: "Retention Rate",
                    value: "94%",
                    comparison: "vs. Target: 90%",
                    trend: "up",
                    trendValue: 4,
                },
                {
                    title: "Avg Lease Duration",
                    value: "3.2 years",
                    comparison: "vs. Market Avg: 2.8 years",
                    trend: "up",
                    trendValue: 14,
                },
            ];

        case "spaces":
            return [
                {
                    title: "Total Space",
                    value: "250,000 sqft",
                    comparison: "across all properties",
                },
                {
                    title: "Occupancy Rate",
                    value: "92%",
                    comparison: "vs. Target: 95%",
                    trend: "down",
                    trendValue: 3,
                },
                {
                    title: "Revenue per sqft",
                    value: "$45.50",
                    comparison: "vs. Market Avg: $42.00",
                    trend: "up",
                    trendValue: 8,
                },
                {
                    title: "Space Utilization",
                    value: "76%",
                    comparison: "vs. Last Month: 71%",
                    trend: "up",
                    trendValue: 7,
                },
            ];

        case "operations":
            return [
                {
                    title: "Active Tasks",
                    value: "127",
                    comparison: "across all properties",
                    trend: "up",
                    trendValue: 15,
                },
                {
                    title: "Avg Response Time",
                    value: "2.4 hours",
                    comparison: "vs. Target: 4 hours",
                    trend: "up",
                    trendValue: 40,
                },
                {
                    title: "Resolution Rate",
                    value: "93%",
                    comparison: "vs. Target: 90%",
                    trend: "up",
                    trendValue: 3,
                },
                {
                    title: "Tenant Satisfaction",
                    value: "4.5 / 5",
                    comparison: "from service requests",
                    trend: "up",
                    trendValue: 7,
                },
            ];

        case "visitors":
            return [
                {
                    title: "Daily Visitors",
                    value: "845",
                    comparison: "vs. Last Week: 780",
                    trend: "up",
                    trendValue: 8,
                },
                {
                    title: "Avg Visit Duration",
                    value: "2.5 hours",
                    comparison: "vs. Last Month: 2.2 hours",
                    trend: "up",
                    trendValue: 14,
                },
                {
                    title: "Check-in Time",
                    value: "45 sec",
                    comparison: "vs. Target: 60 sec",
                    trend: "up",
                    trendValue: 25,
                },
                {
                    title: "Pre-registered",
                    value: "76%",
                    comparison: "of total visitors",
                    trend: "up",
                    trendValue: 5,
                },
            ];

        case "analytics":
            return [
                {
                    title: "Active Users",
                    value: "2,456",
                    comparison: "vs. Last Month: 2,100",
                    trend: "up",
                    trendValue: 17,
                },
                {
                    title: "Engagement Rate",
                    value: "68%",
                    comparison: "vs. Industry Avg: 55%",
                    trend: "up",
                    trendValue: 24,
                },
                {
                    title: "Data Quality",
                    value: "96%",
                    comparison: "accuracy score",
                    trend: "up",
                    trendValue: 2,
                },
                {
                    title: "Insights Generated",
                    value: "342",
                    comparison: "this month",
                    trend: "up",
                    trendValue: 28,
                },
            ];

        case "documents":
            return [
                {
                    title: "Total Documents",
                    value: "1,245",
                    comparison: "across all properties",
                    trend: "up",
                    trendValue: 12,
                },
                {
                    title: "Storage Used",
                    value: "2.4 GB",
                    comparison: "of 5 GB limit",
                    trend: "up",
                    trendValue: 15,
                },
                {
                    title: "Active Documents",
                    value: "89%",
                    comparison: "vs. Last Month: 85%",
                    trend: "up",
                    trendValue: 4,
                },
                {
                    title: "Avg Upload Size",
                    value: "3.2 MB",
                    comparison: "vs. Last Month: 2.8 MB",
                    trend: "up",
                    trendValue: 14,
                },
            ];

        case "users":
            return [
                {
                    title: "Total Users",
                    value: "456",
                    comparison: "across all properties",
                    trend: "up",
                    trendValue: 8,
                },
                {
                    title: "Active Users",
                    value: "92%",
                    comparison: "in last 30 days",
                    trend: "up",
                    trendValue: 3,
                },
                {
                    title: "Avg Session Time",
                    value: "28 min",
                    comparison: "vs. Last Month: 24 min",
                    trend: "up",
                    trendValue: 17,
                },
                {
                    title: "Support Tickets",
                    value: "12",
                    comparison: "open tickets",
                    trend: "down",
                    trendValue: 25,
                },
            ];

        case "vendors":
            return [
                {
                    title: "Active Vendors",
                    value: "87",
                    comparison: "across all properties",
                    trend: "up",
                    trendValue: 5,
                },
                {
                    title: "Compliance Rate",
                    value: "96%",
                    comparison: "vs. Target: 95%",
                    trend: "up",
                    trendValue: 1,
                },
                {
                    title: "Avg Response Time",
                    value: "1.8 hours",
                    comparison: "vs. Target: 2 hours",
                    trend: "up",
                    trendValue: 10,
                },
                {
                    title: "Service Quality",
                    value: "4.7 / 5",
                    comparison: "from 234 reviews",
                    trend: "up",
                    trendValue: 4,
                },
            ];

        case "transactions":
            return [
                {
                    title: "Monthly Revenue",
                    value: "$245K",
                    comparison: "vs. Last Month: $225K",
                    trend: "up",
                    trendValue: 9,
                },
                {
                    title: "Avg Transaction",
                    value: "$1,250",
                    comparison: "vs. Last Quarter: $1,180",
                    trend: "up",
                    trendValue: 6,
                },
                {
                    title: "Payment Success",
                    value: "99.2%",
                    comparison: "vs. Target: 99%",
                    trend: "up",
                    trendValue: 0.2,
                },
                {
                    title: "Processing Time",
                    value: "1.2 sec",
                    comparison: "vs. Industry Avg: 1.8 sec",
                    trend: "up",
                    trendValue: 33,
                },
            ];

        case "portfolio":
            return [
                {
                    title: "Total Properties",
                    value: "12",
                    comparison: "across all regions",
                    trend: "up",
                    trendValue: 2,
                },
                {
                    title: "Occupancy Rate",
                    value: "94%",
                    comparison: "vs. Target: 90%",
                    trend: "up",
                    trendValue: 4,
                },
                {
                    title: "Revenue Growth",
                    value: "$2.4M",
                    comparison: "vs. Last Quarter",
                    trend: "up",
                    trendValue: 12,
                },
                {
                    title: "Tenant Satisfaction",
                    value: "4.7/5",
                    comparison: "from 2,456 reviews",
                    trend: "up",
                    trendValue: 5,
                },
            ];

        case "leasing":
            return [
                {
                    title: "Active Transactions",
                    value: "24",
                    comparison: "in pipeline",
                    trend: "up",
                    trendValue: 12,
                },
                {
                    title: "Total Pipeline Value",
                    value: "$8.6M",
                    comparison: "potential revenue",
                    trend: "up",
                    trendValue: 18,
                },
                {
                    title: "Tours This Month",
                    value: "18",
                    comparison: "vs. 14 last month",
                    trend: "up",
                    trendValue: 28,
                },
                {
                    title: "Conversion Rate",
                    value: "32%",
                    comparison: "tour to lease",
                    trend: "up",
                    trendValue: 5,
                },
            ];

        default:
            return [];
    }
} 