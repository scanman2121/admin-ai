"use client"

import { Button } from "@/components/Button"
import { Input } from "@/components/ui/input"
import { InvoiceLineItem } from "@/data/schema"
import { formatters } from "@/lib/utils"
import { Plus, Trash2 } from "lucide-react"

interface LineItemsTableProps {
  lineItems: InvoiceLineItem[]
  onLineItemsChange: (lineItems: InvoiceLineItem[]) => void
  onAddItem: () => void
  isEditing: boolean
}

export function LineItemsTable({
  lineItems,
  onLineItemsChange,
  onAddItem,
  isEditing,
}: LineItemsTableProps) {
  const handleQuantityChange = (id: string, quantity: number) => {
    const updated = lineItems.map((item) =>
      item.id === id
        ? { ...item, quantity, total: quantity * item.unitPrice }
        : item
    )
    onLineItemsChange(updated)
  }

  const handleUnitPriceChange = (id: string, unitPrice: number) => {
    const updated = lineItems.map((item) =>
      item.id === id
        ? { ...item, unitPrice, total: item.quantity * unitPrice }
        : item
    )
    onLineItemsChange(updated)
  }

  const handleDelete = (id: string) => {
    const updated = lineItems.filter((item) => item.id !== id)
    onLineItemsChange(updated)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Line Items</h3>
        {isEditing && (
          <Button variant="secondary" onClick={onAddItem} className="gap-1">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        )}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                Description
              </th>
              <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-24">
                Qty
              </th>
              <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-32">
                Unit Price
              </th>
              <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-32">
                Total
              </th>
              {isEditing && (
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-16">

                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y">
            {lineItems.length === 0 ? (
              <tr>
                <td
                  colSpan={isEditing ? 5 : 4}
                  className="text-center py-8 text-gray-500"
                >
                  No line items yet. Click "Add Item" to add one.
                </td>
              </tr>
            ) : (
              lineItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-900">
                      {item.description}
                    </span>
                    {item.serviceId && (
                      <span className="block text-xs text-gray-500">
                        {item.serviceId}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {isEditing ? (
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                        }
                        className="w-16 text-center mx-auto"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{item.quantity}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {isEditing ? (
                      <div className="relative inline-block">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                          $
                        </span>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) =>
                            handleUnitPriceChange(
                              item.id,
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-24 pl-5 text-right"
                        />
                      </div>
                    ) : (
                      <span className="text-sm text-gray-900">
                        {formatters.currency(item.unitPrice)}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm font-medium text-gray-900">
                      {formatters.currency(item.total)}
                    </span>
                  </td>
                  {isEditing && (
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
