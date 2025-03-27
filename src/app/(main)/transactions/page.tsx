import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { transactionsColumns } from "@/components/ui/data-table/transactions-columns"
import { usage } from "@/data/data"

export default function Transactions() {
  // Filter data to only include transactions
  const transactionsData = usage.filter(item => item.transactionId)

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageHeader
        title="Transactions"
        primaryCta="Add new transaction"
      />
      <DataTable data={transactionsData} columns={transactionsColumns} />
    </div>
  )
}
