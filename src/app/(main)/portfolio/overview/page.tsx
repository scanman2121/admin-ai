"use client"

import { PageTemplate } from "@/components/PageTemplate"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowDownIcon, ArrowUpIcon, ClockIcon, DollarSignIcon, PercentIcon, UsersIcon } from "lucide-react"
import Link from "next/link"

// Define tabs for the Portfolio Overview page
const tabs = [
    { name: "Overview", href: "/portfolio/overview" },
    { name: "Analysis", href: "/portfolio/overview/analysis" },
    { name: "Reports", href: "/portfolio/overview/reports" },
    { name: "Lifecycle", href: "/portfolio/overview/lifecycle" },
    { name: "Prospects", href: "/portfolio/overview/prospects" },
]

// Metric card data
const metrics = [
    {
        title: "Occupancy Rate",
        value: "92.4%",
        change: "+2.1%",
        trend: "up",
        period: "last month",
        icon: PercentIcon,
    },
    {
        title: "Tenant Retention",
        value: "87.3%",
        change: "+1.2%",
        trend: "up",
        period: "last quarter",
        icon: UsersIcon,
    },
    {
        title: "Avg. Resolution Time",
        value: "18.2h",
        change: "-2.4h",
        trend: "down",
        period: "last month",
        icon: ClockIcon,
    },
    {
        title: "Avg. Rental Rate",
        value: "$24.50/sqft",
        change: "+$0.75",
        trend: "up",
        period: "last quarter",
        icon: DollarSignIcon,
    },
]

const satisfactionMetrics = [
    { label: "Maintenance", rating: 4.5 },
    { label: "Communication", rating: 4.3 },
    { label: "Amenities", rating: 3.8 },
    { label: "Value", rating: 4.0 },
    { label: "Security", rating: 4.4 },
]

const leaseTermMetrics = [
    { term: "1-5yr lease", satisfaction: 4.1 },
    { term: "5-10yr lease", satisfaction: 4.4 },
    { term: "10+ yr lease", satisfaction: 4.7 },
]

const resolutionRateMetrics = [
    { type: "Premium Properties", rate: "$30+/sqft", resolution: "12.4h avg. resolution" },
    { type: "Standard Properties", rate: "$20-30/sqft", resolution: "18.2h avg. resolution" },
    { type: "Economy Properties", rate: "$10-20/sqft", resolution: "24.8h avg. resolution" },
]

const leasingCycleMetrics = [
    { type: "Small Office Spaces", days: 32 },
    { type: "Medium Office Spaces", days: 45 },
    { type: "Large Office Spaces", days: 68 },
    { type: "Retail Spaces", days: 52 },
]

const retentionOccupancyMetrics = [
    { label: "Overall Occupancy Rate", value: "92.4%" },
    { label: "Tenant Retention Rate", value: "87.3%" },
    { label: "Avg. Lease Renewal Rate", value: "76.8%" },
    { label: "Vacancy Duration", value: "45 days avg." },
]

const prospectiveTenants = [
    {
        id: "A",
        name: "Acme Corporation",
        email: "contact@acmecorp.com",
        space: "5,000 sqft",
        rate: "$28/sqft",
        quarter: "Q3 2023",
        status: "Hot Lead",
    },
    {
        id: "T",
        name: "TechStart Inc.",
        email: "leasing@techstart.com",
        space: "2,500 sqft",
        rate: "$32/sqft",
        quarter: "Q2 2023",
        status: null,
    },
    {
        id: "G",
        name: "Global Services LLC",
        email: "real.estate@globalservices.com",
        space: "10,000 sqft",
        rate: "$25/sqft",
        quarter: "Q4 2023",
        status: "Tour Scheduled",
    },
    {
        id: "C",
        name: "Creative Design Co.",
        email: "space@creativedesign.co",
        space: "1,800 sqft",
        rate: "$35/sqft",
        quarter: "Q3 2023",
        status: "Initial Inquiry",
    },
]

const existingTenants = [
    {
        id: "Q",
        name: "Quantum Enterprises",
        suite: "1000",
        lease: { end: "Dec 2025", term: "5 years", rate: "10.2k avg" },
        rating: 4.8,
    },
    {
        id: "P",
        name: "Pinnacle Financial",
        suite: "800",
        lease: { end: "Mar 2024", term: "3 years", rate: "14.5k avg" },
        rating: 4.2,
    },
    {
        id: "N",
        name: "Nexus Technologies",
        suite: "1200",
        lease: { end: "Aug 2023", term: "7 years", rate: "12.1k avg" },
        rating: 4.5,
    },
    {
        id: "M",
        name: "Meridian Consulting",
        suite: "600",
        lease: { end: "May 2024", term: "2 years", rate: "18.3k avg" },
        rating: 3.9,
    },
]

function ProgressBar({ value, className }: { value: number; className?: string }) {
    return (
        <div className={cn("h-2 w-full overflow-hidden rounded-full bg-gray-100", className)}>
            <div
                className="h-full bg-primary transition-all"
                style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
            />
        </div>
    )
}

function RatingBar({ label, rating }: { label: string; rating: number }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{label}</span>
                <span className="text-sm font-medium">{rating}/5</span>
            </div>
            <ProgressBar value={rating * 20} />
        </div>
    )
}

function TenantSatisfactionCard() {
    return (
        <Card className="col-span-1 p-6">
            <h3 className="text-lg font-semibold">Tenant Satisfaction</h3>
            <p className="text-sm text-gray-500">Overall satisfaction score: 4.2/5</p>
            <div className="mt-6 space-y-4">
                {satisfactionMetrics.map((metric) => (
                    <RatingBar key={metric.label} {...metric} />
                ))}
            </div>
        </Card>
    )
}

function TenantSatisfactionLeaseTerms() {
    return (
        <Card className="col-span-1 p-6">
            <h3 className="text-lg font-semibold">Tenant Satisfaction vs. Lease Terms</h3>
            <p className="text-sm text-gray-500">Correlation between lease duration and tenant satisfaction</p>
            <div className="mt-6 space-y-4">
                {leaseTermMetrics.map((metric) => (
                    <div key={metric.term} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{metric.term}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{metric.satisfaction}/5</span>
                            <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "h-1.5 w-4 first:rounded-l-full last:rounded-r-full",
                                            i < Math.floor(metric.satisfaction)
                                                ? "bg-primary"
                                                : i === Math.floor(metric.satisfaction) && metric.satisfaction % 1 > 0
                                                    ? "bg-primary/50"
                                                    : "bg-gray-200"
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

function MetricCard({ metric }: { metric: typeof metrics[0] }) {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <metric.icon className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-500">{metric.title}</span>
                </div>
            </div>
            <div className="mt-4">
                <div className="text-2xl font-semibold">{metric.value}</div>
                <div className="mt-1 flex items-center gap-2">
                    <span className={cn(
                        "flex items-center text-sm",
                        metric.trend === "up" ? "text-green-600" : "text-red-600"
                    )}>
                        {metric.trend === "up" ? (
                            <ArrowUpIcon className="h-4 w-4" />
                        ) : (
                            <ArrowDownIcon className="h-4 w-4" />
                        )}
                        {metric.change}
                    </span>
                    <span className="text-sm text-gray-500">
                        {metric.period}
                    </span>
                </div>
            </div>
        </Card>
    )
}

function RequestResolutionRates() {
    return (
        <Card className="col-span-1 p-6">
            <h3 className="text-lg font-semibold">Request Resolution vs. Rental Rates</h3>
            <p className="text-sm text-gray-500">Average resolution time compared to rental rates</p>
            <div className="mt-6 space-y-6">
                {resolutionRateMetrics.map((metric) => (
                    <div key={metric.type} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{metric.type}</span>
                            <span className="text-sm text-gray-500">{metric.rate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ClockIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{metric.resolution}</span>
                        </div>
                        <ProgressBar
                            value={100 - (parseFloat(metric.resolution) / 24.8 * 100)}
                            className="h-1.5"
                        />
                    </div>
                ))}
            </div>
        </Card>
    )
}

function LeasingSalesCycleTimes() {
    const maxDays = Math.max(...leasingCycleMetrics.map(m => m.days))

    return (
        <Card className="col-span-1 p-6">
            <h3 className="text-lg font-semibold">Leasing Sales Cycle Times</h3>
            <p className="text-sm text-gray-500">Average days from inquiry to signed lease</p>
            <div className="mt-6 space-y-4">
                {leasingCycleMetrics.map((metric) => (
                    <div key={metric.type} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{metric.type}</span>
                            <span className="text-sm font-medium">{metric.days} days avg.</span>
                        </div>
                        <ProgressBar
                            value={(metric.days / maxDays) * 100}
                            className="h-1.5"
                        />
                    </div>
                ))}
            </div>
        </Card>
    )
}

function TenantRetentionOccupancy() {
    return (
        <Card className="col-span-1 p-6">
            <h3 className="text-lg font-semibold">Tenant Retention & Occupancy</h3>
            <p className="text-sm text-gray-500">Retention rates and building occupancy</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
                {retentionOccupancyMetrics.map((metric) => (
                    <div key={metric.label} className="space-y-1">
                        <div className="text-2xl font-semibold">{metric.value}</div>
                        <div className="text-sm text-gray-500">{metric.label}</div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

function ProspectiveTenants() {
    return (
        <Card className="col-span-1 p-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Prospective Tenants</h3>
                <Link href="/portfolio/overview/prospects" className="text-sm text-primary hover:underline">
                    View All
                </Link>
            </div>
            <p className="text-sm text-gray-500">Recent inquiries and lease status</p>
            <div className="mt-6 space-y-4">
                {prospectiveTenants.map((tenant) => (
                    <div key={tenant.id} className="flex items-start gap-3 rounded-lg border p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                            {tenant.id}
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <div className="font-medium">{tenant.name}</div>
                                {tenant.status && (
                                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                        {tenant.status}
                                    </span>
                                )}
                            </div>
                            <div className="text-sm text-gray-500">{tenant.email}</div>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span>{tenant.space}</span>
                                <span>•</span>
                                <span>{tenant.rate}</span>
                                <span>•</span>
                                <span>{tenant.quarter}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

function ExistingTenants() {
    return (
        <Card className="col-span-1 p-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Existing Tenants</h3>
                <button className="text-sm text-primary hover:underline">View All</button>
            </div>
            <p className="text-sm text-gray-500">Current tenants and lease information</p>
            <div className="mt-6 space-y-4">
                {existingTenants.map((tenant) => (
                    <div key={tenant.id} className="flex items-start gap-3 rounded-lg border p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                            {tenant.id}
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <div className="font-medium">{tenant.name}</div>
                                <div className="flex items-center gap-1">
                                    <span className="text-sm">★</span>
                                    <span className="text-sm text-gray-600">{tenant.rating}</span>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">Suite {tenant.suite}</div>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span>Ends: {tenant.lease.end}</span>
                                <span>•</span>
                                <span>{tenant.lease.term}</span>
                                <span>•</span>
                                <span>${tenant.lease.rate}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default function PortfolioOverview() {
    return (
        <PageTemplate
            title="Portfolio Overview"
            tabs={tabs}
        >
            {/* Metrics */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric) => (
                    <MetricCard key={metric.title} metric={metric} />
                ))}
            </div>

            {/* Main content grid */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Performance Overview */}
                <Card className="col-span-1 p-6">
                    <h3 className="text-lg font-semibold">Performance Overview</h3>
                    <div className="mt-4 h-[300px]">
                        {/* Chart will go here */}
                    </div>
                </Card>

                {/* Tenant Satisfaction */}
                <TenantSatisfactionCard />

                {/* Tenant Satisfaction vs. Lease Terms */}
                <TenantSatisfactionLeaseTerms />

                {/* Request Resolution vs. Rental Rates */}
                <RequestResolutionRates />

                {/* Leasing Sales Cycle Times */}
                <LeasingSalesCycleTimes />

                {/* Tenant Retention & Occupancy */}
                <TenantRetentionOccupancy />

                {/* Prospective Tenants */}
                <ProspectiveTenants />

                {/* Existing Tenants */}
                <ExistingTenants />
            </div>
        </PageTemplate>
    )
} 