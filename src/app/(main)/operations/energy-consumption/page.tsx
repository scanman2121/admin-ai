"use client"

import { PageTemplate } from "@/components/PageTemplate"

// Define tabs for the Energy Consumption page
const tabs = [
    { name: "Overview", href: "/operations/energy-consumption" },
    { name: "Electricity", href: "/operations/energy-consumption/electricity" },
    { name: "Water", href: "/operations/energy-consumption/water" },
    { name: "Gas", href: "/operations/energy-consumption/gas" },
    { name: "Reports", href: "/operations/energy-consumption/reports" },
]

export default function EnergyConsumption() {
    return (
        <PageTemplate
            title="Energy Consumption"
            primaryCta="Generate Report"
            tabs={tabs}
        />
    )
} 