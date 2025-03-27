import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { discountsColumns } from "@/components/ui/data-table/discounts-columns"
import { usage } from "@/data/data"

export default function Discounts() {
    // Filter data to only include discounts
    const discountsData = usage.filter(item => item.discountId)

    return (
        <div className="flex flex-col gap-5 w-full">
            <PageHeader
                title="Discounts"
                primaryCta="Add new discount"
            />
            <DataTable data={discountsData} columns={discountsColumns} />
        </div>
    )
} 