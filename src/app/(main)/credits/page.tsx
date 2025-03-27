import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { creditsColumns } from "@/components/ui/data-table/credits-columns"
import { usage } from "@/data/data"

export default function Credits() {
    // Filter data to only include credits
    const creditsData = usage.filter(item => item.creditId)

    return (
        <div className="flex flex-col gap-5 w-full">
            <PageHeader
                title="Credits"
                primaryCta="Add new credit"
            />
            <DataTable data={creditsData} columns={creditsColumns} />
        </div>
    )
} 