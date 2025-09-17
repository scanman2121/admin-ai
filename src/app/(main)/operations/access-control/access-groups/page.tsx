"use client"

import { Button } from "@/components/Button"
import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Access Control Access Groups page
const tabs = [
    { name: "Overview", href: "/operations/access-control" },
    { name: "Activity", href: "/operations/access-control/activity" },
    { name: "Access groups", href: "/operations/access-control/access-groups" },
    { name: "User access", href: "/operations/access-control/user-access" },
]

// Mock data for tenant access group mapping
const tenantMappingData = [
    {
        id: "1",
        tenant: "Total Network Development",
        floors: [2, 3],
        suites: [["3002", "3003"], ["3010"]],
        accessGroups: ["Access group X", "Access group Y"],
    },
    {
        id: "2", 
        tenant: "Cala Foods",
        floors: [13],
        suites: [["3002", "3003"]],
        accessGroups: ["Access group Z"],
    },
    {
        id: "3",
        tenant: "Cut Rite Lawn Care", 
        floors: [9],
        suites: [["3002", "3003"]],
        accessGroups: ["Access group A"],
    },
    {
        id: "4",
        tenant: "Magna Architectural Design",
        floors: [33],
        suites: [["3002", "3003"]],
        accessGroups: ["Access group B"],
    },
    {
        id: "5",
        tenant: "Finast",
        floors: [43],
        suites: [["3002", "3003"]],
        accessGroups: ["Access group C"],
    },
    {
        id: "6",
        tenant: "Electronic Geek",
        floors: [32],
        suites: [["3002", "3003"]],
        accessGroups: ["Access group D"],
    },
    {
        id: "7",
        tenant: "Auto Works",
        floors: [5],
        suites: [["3002", "3003"]],
        accessGroups: ["Access group E"],
    },
    {
        id: "8",
        tenant: "Specialty Restaurant Group",
        floors: [17],
        suites: [["3002", "3003"]],
        accessGroups: ["Access group F"],
    },
    {
        id: "9",
        tenant: "Mostow Co.",
        floors: [12],
        suites: [["3002", "3003"]],
        accessGroups: ["Access group G"],
    },
]

// Available access groups for dropdown
const accessGroupOptions = [
    "Access group A", "Access group B", "Access group C", "Access group D",
    "Access group E", "Access group F", "Access group G", "Access group X", 
    "Access group Y", "Access group Z"
]

// Floor selector component
const FloorSelector = ({ floors, onSelect }: { floors: number[], onSelect: (floors: string[]) => void }) => {
    const [selectedFloors, setSelectedFloors] = useState<string[]>(floors.map(f => f.toString()));
    
    const handleFloorToggle = (floor: string) => {
        const newSelected = selectedFloors.includes(floor)
            ? selectedFloors.filter(f => f !== floor)
            : [...selectedFloors, floor];
        setSelectedFloors(newSelected);
        onSelect(newSelected);
    };
    
    return (
        <div className="space-y-1">
            {floors.map((floor) => (
                <label key={floor} className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={selectedFloors.includes(floor.toString())}
                        onChange={() => handleFloorToggle(floor.toString())}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Floor {floor}</span>
                </label>
            ))}
        </div>
    );
};

// Suite selector component  
const SuiteSelector = ({ suites, onSelect }: { suites: string[][], onSelect: (suites: string[]) => void }) => {
    const flatSuites = suites.flat();
    const [selectedSuites, setSelectedSuites] = useState<string[]>(flatSuites);
    
    const handleSuiteToggle = (suite: string) => {
        const newSelected = selectedSuites.includes(suite)
            ? selectedSuites.filter(s => s !== suite)
            : [...selectedSuites, suite];
        setSelectedSuites(newSelected);
        onSelect(newSelected);
    };
    
    return (
        <div className="space-y-1">
            {flatSuites.map((suite) => (
                <label key={suite} className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={selectedSuites.includes(suite)}
                        onChange={() => handleSuiteToggle(suite)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Suite {suite}</span>
                </label>
            ))}
        </div>
    );
};

// Access group selector component
const AccessGroupSelector = ({ accessGroups, onSelect }: { accessGroups: string[], onSelect: (groups: string[]) => void }) => {
    const [selectedGroups, setSelectedGroups] = useState<string[]>(accessGroups);
    
    const handleGroupToggle = (group: string) => {
        const newSelected = selectedGroups.includes(group)
            ? selectedGroups.filter(g => g !== group)
            : [...selectedGroups, group];
        setSelectedGroups(newSelected);
        onSelect(newSelected);
    };
    
    return (
        <div className="space-y-1 max-h-32 overflow-y-auto">
            {accessGroupOptions.map((group) => (
                <label key={group} className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={selectedGroups.includes(group)}
                        onChange={() => handleGroupToggle(group)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{group}</span>
                </label>
            ))}
        </div>
    );
};

// Define columns for the tenant mapping table
const createTenantMappingColumns = (onFloorSelect: any, onSuiteSelect: any, onGroupSelect: any) => [
    {
        accessorKey: "tenant",
        header: "Tenant",
        cell: ({ row }: { row: any }) => {
            const tenant = row.getValue("tenant") as string;
            return (
                <Link 
                    href={`/tenants/${row.original.id}`}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 font-medium"
                >
                    {tenant}
                </Link>
            );
        },
    },
    {
        accessorKey: "floors",
        header: "Floors",
        cell: ({ row }: { row: any }) => {
            const floors = row.getValue("floors") as number[];
            return (
                <FloorSelector 
                    floors={floors} 
                    onSelect={(floors) => onFloorSelect(row.original.id, floors)}
                />
            );
        },
    },
    {
        accessorKey: "suites",
        header: "Suites",
        cell: ({ row }: { row: any }) => {
            const suites = row.getValue("suites") as string[][];
            return (
                <SuiteSelector 
                    suites={suites} 
                    onSelect={(suites) => onSuiteSelect(row.original.id, suites)}
                />
            );
        },
    },
    {
        accessorKey: "accessGroups",
        header: "Access groups",
        cell: ({ row }: { row: any }) => {
            const accessGroups = row.getValue("accessGroups") as string[];
            return (
                <AccessGroupSelector 
                    accessGroups={accessGroups} 
                    onSelect={(groups) => onGroupSelect(row.original.id, groups)}
                />
            );
        },
    },
]

export default function AccessControlGroups() {
    const pathname = usePathname()
    const [data] = useState(tenantMappingData)

    // Handlers for dropdown changes
    const handleFloorSelect = (tenantId: string, floors: string[]) => {
        console.log(`Tenant ${tenantId} selected floors:`, floors);
        // In a real app, this would update the backend
    };

    const handleSuiteSelect = (tenantId: string, suites: string[]) => {
        console.log(`Tenant ${tenantId} selected suites:`, suites);
        // In a real app, this would update the backend
    };

    const handleGroupSelect = (tenantId: string, groups: string[]) => {
        console.log(`Tenant ${tenantId} selected access groups:`, groups);
        // In a real app, this would update the backend
    };

    const tenantMappingColumns = createTenantMappingColumns(
        handleFloorSelect,
        handleSuiteSelect,
        handleGroupSelect
    );

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <PageHeader 
                title="Access Control" 
                customButtons={
                    <Button variant="primary">
                        Create Access Group
                    </Button>
                }
            />

            {/* Tab Navigation */}
            <TabNavigation>
                {tabs.map((tab) => (
                    <TabNavigationLink
                        key={tab.name}
                        asChild
                        active={pathname === tab.href}
                    >
                        <Link href={tab.href}>
                            {tab.name}
                        </Link>
                    </TabNavigationLink>
                ))}
            </TabNavigation>

            {/* Data Table */}
            <DataTable
                columns={tenantMappingColumns}
                data={data}
                searchKey="tenant"
            />
        </div>
    )
}
