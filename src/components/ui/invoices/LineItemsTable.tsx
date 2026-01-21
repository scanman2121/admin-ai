"use client"

import { Button } from "@/components/Button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { serviceInventory } from "@/data/data"
import { InvoiceLineItem } from "@/data/schema"
import { formatters } from "@/lib/utils"
import { Check, Plus, Trash2, X } from "lucide-react"
import { useState } from "react"

interface LineItemsTableProps {
  lineItems: InvoiceLineItem[]
  onLineItemsChange: (lineItems: InvoiceLineItem[]) => void
  isEditing: boolean
}

export function LineItemsTable({
  lineItems,
  onLineItemsChange,
  isEditing,
}: LineItemsTableProps) {
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [newItemServiceId, setNewItemServiceId] = useState<string>("")
  const [newItemDescription, setNewItemDescription] = useState("")
  const [newItemQuantity, setNewItemQuantity] = useState(1)
  const [newItemUnitPrice, setNewItemUnitPrice] = useState(0)

  const activeServices = serviceInventory.filter((s) => s.status === "active")

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

  const handleServiceSelect = (value: string) => {
    if (value === "custom") {
      setNewItemServiceId("custom")
      setNewItemDescription("")
      setNewItemUnitPrice(0)
    } else {
      setNewItemServiceId(value)
      const service = serviceInventory.find((s) => s.serviceId === value)
      if (service) {
        setNewItemDescription(service.serviceName)
        setNewItemUnitPrice(service.basePrice || 0)
      }
    }
  }

  const handleAddItem = () => {
    setIsAddingItem(true)
    setNewItemServiceId("")
    setNewItemDescription("")
    setNewItemQuantity(1)
    setNewItemUnitPrice(0)
  }

  const handleConfirmAdd = () => {
    if (!newItemDescription.trim()) return

    const newLineItem: InvoiceLineItem = {
      id: `li-${Date.now()}`,
      serviceId: newItemServiceId === "custom" ? undefined : newItemServiceId || undefined,
      description: newItemDescription,
      quantity: newItemQuantity,
      unitPrice: newItemUnitPrice,
      total: newItemQuantity * newItemUnitPrice,
    }

    onLineItemsChange([...lineItems, newLineItem])
    setIsAddingItem(false)
    setNewItemServiceId("")
    setNewItemDescription("")
    setNewItemQuantity(1)
    setNewItemUnitPrice(0)
  }

  const handleCancelAdd = () => {
    setIsAddingItem(false)
    setNewItemServiceId("")
    setNewItemDescription("")
    setNewItemQuantity(1)
    setNewItemUnitPrice(0)
  }

  const isNewItemValid = newItemDescription.trim() !== ""

  return (
    <div className="space-y-4">
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
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-20">
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y">
            {lineItems.length === 0 && !isAddingItem ? (
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

            {/* New Item Row */}
            {isAddingItem && (
              <tr className="bg-blue-50">
                <td className="px-4 py-3">
                  <div className="space-y-2">
                    <Select
                      value={newItemServiceId}
                      onValueChange={handleServiceSelect}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select from inventory..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="custom">Custom Item</SelectItem>
                        {activeServices.map((service) => (
                          <SelectItem key={service.serviceId} value={service.serviceId}>
                            {service.serviceName}
                            {service.basePrice !== null && ` ($${service.basePrice.toFixed(2)})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {newItemServiceId === "custom" && (
                      <Input
                        placeholder="Enter custom description"
                        value={newItemDescription}
                        onChange={(e) => setNewItemDescription(e.target.value)}
                        className="bg-white"
                        autoFocus
                      />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <Input
                    type="number"
                    min="1"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 text-center mx-auto bg-white"
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="relative inline-block">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      $
                    </span>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={newItemUnitPrice}
                      onChange={(e) => setNewItemUnitPrice(parseFloat(e.target.value) || 0)}
                      className="w-24 pl-5 text-right bg-white"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-medium text-gray-900">
                    {formatters.currency(newItemQuantity * newItemUnitPrice)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={handleConfirmAdd}
                      disabled={!isNewItemValid}
                      className="text-green-600 hover:text-green-700 disabled:text-gray-300 transition-colors"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelAdd}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Item Button */}
      {isEditing && !isAddingItem && (
        <Button variant="secondary" onClick={handleAddItem} className="gap-1">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      )}
    </div>
  )
}
