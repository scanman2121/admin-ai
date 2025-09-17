"use client"

import { useState } from "react"
import { Button } from "@/components/Button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Input } from "@/components/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import { PageHeader } from "@/components/PageHeader"
import { Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
const FloorSelector = ({ floors, onSelect }: { floors: number[], onSelect: (floor: string) => void }) => {
    const [selectedFloor, setSelectedFloor] = useState(floors[0]?.toString() || "");
    
    const handleChange = (value: string) => {
        setSelectedFloor(value);
        onSelect(value);
    };
    
    return (
        <Select value={selectedFloor} onValueChange={handleChange}>
            <SelectTrigger className="w-20 h-8">
                <SelectValue>
                    {floors.length === 1 ? floors[0] : `${floors[0]}${floors.length > 1 ? '...' : ''}`}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {floors.map((floor) => (
                    <SelectItem key={floor} value={floor.toString()}>
                        {floor}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

// Suite selector component
const SuiteSelector = ({ suites, onSelect }: { suites: string[][], onSelect: (suite: string) => void }) => {
    const flatSuites = suites.flat();
    const [selectedSuite, setSelectedSuite] = useState(flatSuites[0] || "");
    
    const handleChange = (value: string) => {
        setSelectedSuite(value);
        onSelect(value);
    };
    
    return (
        <Select value={selectedSuite} onValueChange={handleChange}>
            <SelectTrigger className="w-24 h-8">
                <SelectValue>
                    {flatSuites.length <= 2 
                        ? flatSuites.join(", ")
                        : `${flatSuites.slice(0, 2).join(", ")}...`
                    }
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {flatSuites.map((suite) => (
                    <SelectItem key={suite} value={suite}>
                        {suite}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

// Access group selector component
const AccessGroupSelector = ({ accessGroups, onSelect }: { accessGroups: string[], onSelect: (group: string) => void }) => {
    const [selectedGroup, setSelectedGroup] = useState(accessGroups[0] || "");
    
    const handleChange = (value: string) => {
        setSelectedGroup(value);
        onSelect(value);
    };
    
    return (
        <Select value={selectedGroup} onValueChange={handleChange}>
            <SelectTrigger className="w-40 h-8">
                <SelectValue>
                    {selectedGroup}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {accessGroupOptions.map((group) => (
                    <SelectItem key={group} value={group}>
                        {group}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
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
                    onSelect={(floor) => onFloorSelect(row.original.id, floor)}
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
                    onSelect={(suite) => onSuiteSelect(row.original.id, suite)}
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
                    onSelect={(group) => onGroupSelect(row.original.id, group)}
                />
            );
        },
    },
]

export default function AccessControlGroups() {
    const pathname = usePathname()
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedTenant, setSelectedTenant] = useState("")
    const [selectedAccessGroup, setSelectedAccessGroup] = useState("")
    const [data] = useState(tenantMappingData)

    // Handlers for dropdown changes
    const handleFloorSelect = (tenantId: string, floor: string) => {
        console.log(`Tenant ${tenantId} selected floor ${floor}`);
        // In a real app, this would update the backend
    };

    const handleSuiteSelect = (tenantId: string, suite: string) => {
        console.log(`Tenant ${tenantId} selected suite ${suite}`);
        // In a real app, this would update the backend
    };

    const handleGroupSelect = (tenantId: string, group: string) => {
        console.log(`Tenant ${tenantId} selected access group ${group}`);
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

            {/* Content */}
            <div className="space-y-6">
                {/* Title and Description */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                        Tenant to Access Group Mapping
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Map tenants and their floors/suites to access control groups. This ensures tenant users can access the correct spaces.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    
                    <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Tenant" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All Tenants</SelectItem>
                            {data.map((item) => (
                                <SelectItem key={item.id} value={item.tenant}>
                                    {item.tenant}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={selectedAccessGroup} onValueChange={setSelectedAccessGroup}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Access group" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All Access Groups</SelectItem>
                            {accessGroupOptions.map((group) => (
                                <SelectItem key={group} value={group}>
                                    {group}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Data Table */}
                <DataTable
                    columns={tenantMappingColumns}
                    data={data}
                    searchKey="tenant"
                />
            </div>
        </div>
    )
}
