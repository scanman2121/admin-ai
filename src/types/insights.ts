export interface MetricInsight {
    title: string;
    value: string | number;
    comparison: string;
    trend?: "up" | "down";
    trendValue?: number;
}

// Building Insights
export const buildingInsights: MetricInsight[] = [
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
]

// Tenant Insights
export const tenantInsights: MetricInsight[] = [
    {
        title: "Total Tenants",
        value: "127",
        comparison: "8 new this month",
        trend: "up",
        trendValue: 6,
    },
    {
        title: "Retention Rate",
        value: "94%",
        comparison: "vs. Industry Avg: 88%",
        trend: "up",
        trendValue: 6,
    },
    {
        title: "Average Lease Length",
        value: "36 mo",
        comparison: "vs. Last Year: 24 mo",
        trend: "up",
        trendValue: 50,
    },
    {
        title: "Satisfaction Score",
        value: "4.6/5",
        comparison: "vs. Last Quarter: 4.2",
        trend: "up",
        trendValue: 9,
    },
]

// Space Insights
export const spaceInsights: MetricInsight[] = [
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
]

// Operations Insights
export const operationsInsights: MetricInsight[] = [
    {
        title: "Service Requests",
        value: "42",
        comparison: "15 pending approval",
        trend: "down",
        trendValue: 12,
    },
    {
        title: "Response Time",
        value: "2.4 hrs",
        comparison: "vs. Target: 4 hrs",
        trend: "up",
        trendValue: 40,
    },
    {
        title: "PM Completion",
        value: "94%",
        comparison: "vs. Target: 90%",
        trend: "up",
        trendValue: 4,
    },
    {
        title: "Vendor Compliance",
        value: "98%",
        comparison: "vs. Required: 95%",
        trend: "up",
        trendValue: 3,
    },
]

// Visitor Insights
export const visitorInsights: MetricInsight[] = [
    {
        title: "Daily Visitors",
        value: "342",
        comparison: "vs. Last Week: 298",
        trend: "up",
        trendValue: 15,
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
    {
        title: "Security Alerts",
        value: "2",
        comparison: "vs. Daily Avg: 5",
        trend: "down",
        trendValue: 60,
    },
]

// Analytics Insights
export const analyticsInsights: MetricInsight[] = [
    {
        title: "Data Points",
        value: "1.2M",
        comparison: "across all properties",
        trend: "up",
        trendValue: 8,
    },
    {
        title: "AI Predictions",
        value: "94%",
        comparison: "accuracy rate",
        trend: "up",
        trendValue: 2,
    },
    {
        title: "Cost Savings",
        value: "$127K",
        comparison: "This Quarter",
        trend: "up",
        trendValue: 15,
    },
    {
        title: "Energy Efficiency",
        value: "24%",
        comparison: "improvement YoY",
        trend: "up",
        trendValue: 24,
    },
]

// Document Insights
export const documentInsights: MetricInsight[] = [
    {
        title: "Total Documents",
        value: "156",
        comparison: "12 new this month",
        trend: "up",
        trendValue: 8,
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
        title: "Average Upload Size",
        value: "3.2 MB",
        comparison: "vs. Last Month: 2.8 MB",
        trend: "up",
        trendValue: 14,
    },
]

// User Insights
export const userInsights: MetricInsight[] = [
    {
        title: "Total Users",
        value: "245",
        comparison: "across all properties",
        trend: "up",
        trendValue: 5,
    },
    {
        title: "Active Users",
        value: "89%",
        comparison: "in last 30 days",
        trend: "up",
        trendValue: 3,
    },
    {
        title: "Admin Users",
        value: "12",
        comparison: "with full access",
    },
    {
        title: "New Users",
        value: "18",
        comparison: "this month",
        trend: "up",
        trendValue: 20,
    },
]

// Vendor Insights
export const vendorInsights: MetricInsight[] = [
    {
        title: "Total Vendors",
        value: "86",
        comparison: "across all properties",
        trend: "up",
        trendValue: 4,
    },
    {
        title: "Active Contracts",
        value: "92%",
        comparison: "compliance rate",
        trend: "up",
        trendValue: 3,
    },
    {
        title: "Response Time",
        value: "1.8 hrs",
        comparison: "vs. SLA: 4 hrs",
        trend: "up",
        trendValue: 55,
    },
    {
        title: "Spend YTD",
        value: "$1.2M",
        comparison: "vs. Budget: $1.5M",
        trend: "down",
        trendValue: 20,
    },
]

// Transaction Insights
export const transactionInsights: MetricInsight[] = [
    {
        title: "Monthly Revenue",
        value: "$892K",
        comparison: "vs. Target: $850K",
        trend: "up",
        trendValue: 5,
    },
    {
        title: "Payment Success",
        value: "99.2%",
        comparison: "vs. Industry: 98.5%",
        trend: "up",
        trendValue: 0.7,
    },
    {
        title: "Processing Time",
        value: "1.2 sec",
        comparison: "vs. Avg: 2.1 sec",
        trend: "up",
        trendValue: 43,
    },
    {
        title: "Late Payments",
        value: "2.1%",
        comparison: "vs. Last Month: 3.5%",
        trend: "down",
        trendValue: 40,
    },
] 