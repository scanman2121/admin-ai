"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Cross2Icon } from "@radix-ui/react-icons"
import { FacetedFilter } from "./FacetedFilter"
import { Contact, Tenant } from "./KanbanBoard"

interface KanbanToolbarProps {
    tenants: Tenant[]
    searchQuery: string
    onSearchChange: (value: string) => void
    selectedBrokers: string[]
    onBrokersChange: (values: string[]) => void
    selectedCompanies: string[]
    onCompaniesChange: (values: string[]) => void
    selectedSpaces: string[]
    onSpacesChange: (values: string[]) => void
}

export function KanbanToolbar({
    tenants,
    searchQuery,
    onSearchChange,
    selectedBrokers,
    onBrokersChange,
    selectedCompanies,
    onCompaniesChange,
    selectedSpaces,
    onSpacesChange,
}: KanbanToolbarProps) {
    // Get unique brokers
    const brokers = Array.from(
        new Set(
            tenants
                .map(t => t.broker)
                .filter((b): b is Contact => b !== undefined)
                .map(b => ({ label: b.name, value: b.id }))
        )
    )

    // Get unique companies
    const companies = Array.from(
        new Set(
            tenants.map(t => ({ label: t.name, value: t.id }))
        )
    )

    // Get unique spaces
    const spaces = Array.from(
        new Set(
            tenants.flatMap(t => t.spaces.map(s => ({ label: `${s.name} (${s.floor})`, value: s.id })))
        )
    )

    const isFiltered = selectedBrokers.length > 0 || selectedCompanies.length > 0 || selectedSpaces.length > 0

    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search tenants..."
                    value={searchQuery}
                    onChange={(event) => onSearchChange(event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                <FacetedFilter
                    title="Broker"
                    options={brokers}
                    value={selectedBrokers}
                    onValueChange={onBrokersChange}
                />
                <FacetedFilter
                    title="Company"
                    options={companies}
                    value={selectedCompanies}
                    onValueChange={onCompaniesChange}
                />
                <FacetedFilter
                    title="Space"
                    options={spaces}
                    value={selectedSpaces}
                    onValueChange={onSpacesChange}
                />
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => {
                            onBrokersChange([])
                            onCompaniesChange([])
                            onSpacesChange([])
                        }}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    )
} 