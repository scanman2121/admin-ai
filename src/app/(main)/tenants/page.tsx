"use client"

import { Button } from "@/components/Button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import { getPageInsights } from "@/lib/insights"
import { cn } from "@/lib/utils"
import { RiCloseLine, RiSparklingLine } from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

// Define tabs for the Tenants page
const tabs = [
    { name: "All Tenants", href: "/tenants" },
    { name: "Active", href: "/tenants/active" },
    { name: "Inactive", href: "/tenants/inactive" },
    { name: "Prospects", href: "/tenants/prospects" },
] as const

// Mock data for tenants
const tenantsData = [
    {
        id: "1",
        name: "Acme Corporation",
        logoUrl: "https://cdn-icons-png.flaticon.com/512/5969/5969043.png",
        building: "125 Highland Ave",
        industry: "Technology",
        employees: 120,
        leaseStart: "2022-01-15",
        leaseEnd: "2025-01-14",
        status: "Active",
        healthScore: 87,
        lifetimeValue: 1250000,
    },
    {
        id: "2",
        name: "Global Enterprises",
        logoUrl: "https://cdn-icons-png.flaticon.com/512/5969/5969184.png",
        building: "400 Market Street",
        industry: "Finance",
        employees: 85,
        leaseStart: "2021-06-01",
        leaseEnd: "2024-05-31",
        status: "Active",
        healthScore: 72,
        lifetimeValue: 890000,
    },
    {
        id: "3",
        name: "Retail Solutions",
        logoUrl: "https://cdn-icons-png.flaticon.com/512/5969/5969007.png",
        building: "75 State Street",
        industry: "Retail",
        employees: 45,
        leaseStart: "2020-03-15",
        leaseEnd: "2023-03-14",
        status: "Inactive",
        healthScore: 34,
        lifetimeValue: 450000,
    },
    {
        id: "4",
        name: "Tech Innovators",
        logoUrl: "https://cdn-icons-png.flaticon.com/512/5969/5969085.png",
        building: "200 Congress Ave",
        industry: "Technology",
        employees: 150,
        leaseStart: "2023-02-01",
        leaseEnd: "2026-01-31",
        status: "Active",
        healthScore: 95,
        lifetimeValue: 2100000,
    },
    {
        id: "5",
        name: "Financial Services Inc",
        logoUrl: "https://cdn-icons-png.flaticon.com/512/5969/5969113.png",
        building: "500 Boylston Street",
        industry: "Finance",
        employees: 95,
        leaseStart: "2022-09-01",
        leaseEnd: "2025-08-31",
        status: "Active",
        healthScore: 58,
        lifetimeValue: 980000,
    },
]

// Mock data for critical tenant health scores (12 tenants with THS < 50)
const criticalTHSData = [
    { name: "Retail Solutions", building: "75 State Street", healthScore: 34, trend: -8 },
    { name: "Metro Consulting", building: "200 Congress Ave", healthScore: 28, trend: -12 },
    { name: "Urban Designs", building: "125 Highland Ave", healthScore: 31, trend: -5 },
    { name: "Quick Services LLC", building: "400 Market Street", healthScore: 42, trend: -3 },
    { name: "DataStream Inc", building: "500 Boylston Street", healthScore: 38, trend: -7 },
    { name: "CloudNet Systems", building: "75 State Street", healthScore: 45, trend: -2 },
    { name: "Bright Ideas Co", building: "125 Highland Ave", healthScore: 29, trend: -15 },
    { name: "Summit Partners", building: "200 Congress Ave", healthScore: 47, trend: -4 },
    { name: "Harbor Tech", building: "400 Market Street", healthScore: 33, trend: -9 },
    { name: "Pinnacle Group", building: "500 Boylston Street", healthScore: 41, trend: -6 },
    { name: "Atlas Industries", building: "75 State Street", healthScore: 36, trend: -11 },
    { name: "Vertex Solutions", building: "125 Highland Ave", healthScore: 44, trend: -1 },
]

// Mock data for upcoming renewals (4 tenants)
const upcomingRenewalsData = [
    { name: "Global Enterprises", building: "400 Market Street", leaseEnd: "2024-05-31", daysRemaining: 45, ltv: "$890K" },
    { name: "Tech Innovators", building: "200 Congress Ave", leaseEnd: "2026-01-31", daysRemaining: 90, ltv: "$2.1M" },
    { name: "Acme Corporation", building: "125 Highland Ave", leaseEnd: "2025-01-14", daysRemaining: 120, ltv: "$1.25M" },
    { name: "Financial Services Inc", building: "500 Boylston Street", leaseEnd: "2025-08-31", daysRemaining: 180, ltv: "$980K" },
]

// Define columns for the tenants table
const tenantsColumns = [
    {
        accessorKey: "name",
        header: "Tenant Name",
        cell: ({ row }: { row: any }) => {
            const name = row.getValue("name") as string;
            const logoUrl = row.original.logoUrl as string;

            return (
                <div className="flex items-center gap-3">
                    <div className="relative size-8 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">
                        <Image
                            src={logoUrl}
                            alt={name}
                            width={24}
                            height={24}
                            className="object-contain"
                        />
                    </div>
                    <span>{name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "building",
        header: "Building",
    },
    {
        accessorKey: "industry",
        header: "Industry",
    },
    {
        accessorKey: "employees",
        header: "Employees",
    },
    {
        accessorKey: "healthScore",
        header: "THS",
        cell: ({ row }: { row: any }) => {
            const score = row.getValue("healthScore") as number
            let colorClass = "text-green-600 dark:text-green-400"
            if (score < 50) {
                colorClass = "text-red-600 dark:text-red-400"
            } else if (score < 75) {
                colorClass = "text-yellow-600 dark:text-yellow-400"
            }
            return (
                <span className={`font-medium ${colorClass}`}>
                    {score}
                </span>
            )
        },
    },
    {
        accessorKey: "lifetimeValue",
        header: "LTV",
        cell: ({ row }: { row: any }) => {
            const value = row.getValue("lifetimeValue") as number
            return (
                <span className="font-medium text-gray-900 dark:text-gray-50">
                    ${value.toLocaleString()}
                </span>
            )
        },
    },
    {
        accessorKey: "leaseStart",
        header: "Lease Start",
    },
    {
        accessorKey: "leaseEnd",
        header: "Lease End",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("status") as string
            return (
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status === "Active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}>
                    {status}
                </span>
            )
        },
    },
]

// Define the Tenant type
interface Tenant {
    id: string;
    [key: string]: any;
}

// AI Report Modal Component
interface AIReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    reportType: 'critical-ths' | 'upcoming-renewals' | null;
}

function AIReportModal({ isOpen, onClose, reportType }: AIReportModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen || !mounted) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className={cn(
                "relative z-10 w-[500px] max-h-[600px] bg-white dark:bg-gray-950 rounded-xl shadow-2xl",
                "border border-gray-200 dark:border-gray-800",
                "flex flex-col overflow-hidden"
            )}>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4 py-3">
                    <div className="flex items-center gap-2">
                        <RiSparklingLine className="size-5 text-primary" />
                        <h2 className="text-base font-medium text-gray-900 dark:text-gray-50">
                            {reportType === 'critical-ths' ? 'Critical Tenant Health Scores' : 'Upcoming Renewals'}
                        </h2>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 p-1.5 h-8 w-8"
                    >
                        <RiCloseLine className="size-5" aria-hidden="true" />
                        <span className="sr-only">Close</span>
                    </Button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {/* AI message */}
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            {reportType === 'critical-ths'
                                ? "I've identified 12 tenants with critical health scores below 50. These tenants may need immediate attention to improve engagement and retention."
                                : "Here are 4 tenants with upcoming lease renewals. Consider reaching out to discuss renewal terms and address any concerns."}
                        </p>
                    </div>

                    {/* Table */}
                    {reportType === 'critical-ths' ? (
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-900">
                                    <tr>
                                        <th className="text-left px-3 py-2 font-medium text-gray-700 dark:text-gray-300">Tenant</th>
                                        <th className="text-left px-3 py-2 font-medium text-gray-700 dark:text-gray-300">Building</th>
                                        <th className="text-center px-3 py-2 font-medium text-gray-700 dark:text-gray-300">THS</th>
                                        <th className="text-center px-3 py-2 font-medium text-gray-700 dark:text-gray-300">Trend</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {criticalTHSData.map((tenant, index) => (
                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                            <td className="px-3 py-2 text-gray-900 dark:text-gray-100">{tenant.name}</td>
                                            <td className="px-3 py-2 text-gray-600 dark:text-gray-400">{tenant.building}</td>
                                            <td className="px-3 py-2 text-center">
                                                <span className="font-medium text-red-600 dark:text-red-400">{tenant.healthScore}</span>
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                <span className="text-red-600 dark:text-red-400">{tenant.trend}%</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-900">
                                    <tr>
                                        <th className="text-left px-3 py-2 font-medium text-gray-700 dark:text-gray-300">Tenant</th>
                                        <th className="text-left px-3 py-2 font-medium text-gray-700 dark:text-gray-300">Lease End</th>
                                        <th className="text-center px-3 py-2 font-medium text-gray-700 dark:text-gray-300">Days</th>
                                        <th className="text-right px-3 py-2 font-medium text-gray-700 dark:text-gray-300">LTV</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {upcomingRenewalsData.map((tenant, index) => (
                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                            <td className="px-3 py-2 text-gray-900 dark:text-gray-100">{tenant.name}</td>
                                            <td className="px-3 py-2 text-gray-600 dark:text-gray-400">{tenant.leaseEnd}</td>
                                            <td className="px-3 py-2 text-center">
                                                <span className={cn(
                                                    "font-medium",
                                                    tenant.daysRemaining <= 60 ? "text-red-600 dark:text-red-400" :
                                                    tenant.daysRemaining <= 120 ? "text-yellow-600 dark:text-yellow-400" :
                                                    "text-green-600 dark:text-green-400"
                                                )}>{tenant.daysRemaining}</span>
                                            </td>
                                            <td className="px-3 py-2 text-right font-medium text-gray-900 dark:text-gray-100">{tenant.ltv}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function TenantsPage() {
    const pathname = usePathname()
    const router = useRouter()
    const [data] = useState(tenantsData)
    const insights = getPageInsights("tenants")
    const [reportModalOpen, setReportModalOpen] = useState(false)
    const [reportType, setReportType] = useState<'critical-ths' | 'upcoming-renewals' | null>(null)

    const handleOpenCriticalTHS = () => {
        setReportType('critical-ths')
        setReportModalOpen(true)
    }

    const handleOpenUpcomingRenewals = () => {
        setReportType('upcoming-renewals')
        setReportModalOpen(true)
    }

    const actionButtons = [
        { label: '12 Critical Tenant Health Scores', onClick: handleOpenCriticalTHS },
        { label: '4 Upcoming Renewals', onClick: handleOpenUpcomingRenewals },
    ]

    return (
        <div className="flex h-full w-full flex-col space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">Tenants</h1>
                <Button onClick={() => router.push("/tenants/new")}>
                    Add tenant
                </Button>
            </div>

            <AIInsights insights={insights} actionButtons={actionButtons} />

            <div className="flex flex-col gap-4 w-full">
                <TabNavigation>
                    {tabs.map((tab) => (
                        <TabNavigationLink
                            key={tab.name}
                            asChild
                            active={pathname === tab.href}
                        >
                            <Link href={tab.href}>{tab.name}</Link>
                        </TabNavigationLink>
                    ))}
                </TabNavigation>

                <DataTable
                    columns={tenantsColumns}
                    data={data}
                    onRowClick={(row: Tenant) => router.push(`/tenants/${row.id}`)}
                />
            </div>

            {/* AI Report Modal */}
            <AIReportModal
                isOpen={reportModalOpen}
                onClose={() => setReportModalOpen(false)}
                reportType={reportType}
            />
        </div>
    )
} 