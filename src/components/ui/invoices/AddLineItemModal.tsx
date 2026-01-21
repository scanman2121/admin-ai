"use client"

import { Button } from "@/components/Button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { serviceInventory } from "@/data/data"
import { InvoiceLineItem } from "@/data/schema"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

interface AddLineItemModalProps {
  open: boolean
  onClose: () => void
  onAdd: (lineItem: InvoiceLineItem) => void
}

export function AddLineItemModal({ open, onClose, onAdd }: AddLineItemModalProps) {
  const [selectedService, setSelectedService] = useState<string>("")
  const [isCustom, setIsCustom] = useState(false)
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [unitPrice, setUnitPrice] = useState(0)

  const activeServices = serviceInventory.filter((s) => s.status === "active")

  const handleServiceChange = (value: string) => {
    if (value === "custom") {
      setIsCustom(true)
      setSelectedService("")
      setDescription("")
      setUnitPrice(0)
    } else {
      setIsCustom(false)
      setSelectedService(value)
      const service = serviceInventory.find((s) => s.serviceId === value)
      if (service) {
        setDescription(service.serviceName)
        setUnitPrice(service.basePrice || 0)
      }
    }
  }

  const handleAdd = () => {
    const lineItem: InvoiceLineItem = {
      id: `li-${Date.now()}`,
      serviceId: isCustom ? undefined : selectedService,
      description,
      quantity,
      unitPrice,
      total: quantity * unitPrice,
    }
    onAdd(lineItem)
    handleClose()
  }

  const handleClose = () => {
    setSelectedService("")
    setIsCustom(false)
    setDescription("")
    setQuantity(1)
    setUnitPrice(0)
    onClose()
  }

  const isValid = description.trim() !== "" && quantity > 0 && unitPrice >= 0

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Line Item</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Select from Inventory</Label>
            <Select
              value={isCustom ? "custom" : selectedService}
              onValueChange={handleServiceChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a service or custom item" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">Custom Item</SelectItem>
                {activeServices.map((service) => (
                  <SelectItem key={service.serviceId} value={service.serviceId}>
                    {service.serviceName}{" "}
                    {service.basePrice !== null && `($${service.basePrice.toFixed(2)})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Item description"
              disabled={!isCustom && selectedService !== ""}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unitPrice">Unit Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  id="unitPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(parseFloat(e.target.value) || 0)}
                  className="pl-7"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total:</span>
              <span className="font-medium">${(quantity * unitPrice).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={!isValid}>
            Add Item
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
