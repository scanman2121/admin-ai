"use client"

import { Button } from "@/components/Button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MultiSelect, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ServiceCategory, ServiceInventory } from "@/data/schema"
import { buildings } from "@/data/data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const categories: { value: ServiceCategory; label: string }[] = [
  { value: "Electrical", label: "Electrical" },
  { value: "Plumbing", label: "Plumbing" },
  { value: "HVAC", label: "HVAC" },
  { value: "Maintenance", label: "Maintenance" },
  { value: "Security", label: "Security" },
  { value: "Cleaning", label: "Cleaning" },
  { value: "Other", label: "Other" },
]

const serviceTypeOptions = [
  "Badge Request",
  "New Employee Setup",
  "Contractor Access",
  "Floor Cleaning",
  "Deep Clean",
  "Window Cleaning",
  "Parking Request",
  "Key Request",
  "Access Request",
  "Room Setup",
  "Catering",
  "IT Support",
  "General Maintenance",
  "Emergency Repair",
]

const propertyOptions = [
  { value: "All Properties", label: "All Properties" },
  ...buildings,
]

interface ServiceFormProps {
  initialData?: ServiceInventory
  isEditing?: boolean
}

export function ServiceForm({ initialData, isEditing = false }: ServiceFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState<Partial<ServiceInventory>>({
    serviceId: initialData?.serviceId || "",
    serviceName: initialData?.serviceName || "",
    category: initialData?.category || undefined,
    priceType: initialData?.priceType || "fixed",
    basePrice: initialData?.basePrice ?? null,
    property: initialData?.property || "All Properties",
    status: initialData?.status || "active",
    description: initialData?.description || "",
    serviceTypes: initialData?.serviceTypes || [],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, this would save to an API
    // For now, just simulate and navigate back
    await new Promise((resolve) => setTimeout(resolve, 500))

    router.push("/inventory")
  }

  const handleCancel = () => {
    router.push("/inventory")
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/inventory"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Inventory
        </Link>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Service"}
          </Button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {isEditing ? "Edit Service" : "Add New Service"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEditing
              ? "Update the service details below"
              : "Fill in the details to create a new service in the catalog"}
          </p>
        </div>

        {/* Service Details Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
            Service Details
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serviceName">
                Service Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="serviceName"
                placeholder="Enter service name"
                value={formData.serviceName}
                onChange={(e) =>
                  setFormData({ ...formData, serviceName: e.target.value })
                }
                required
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceId">Service ID</Label>
              <Input
                id="serviceId"
                value={formData.serviceId || (isEditing ? "" : "Auto-generated")}
                disabled
                className="bg-gray-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter a description for this service"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>
        </div>

        {/* Classification Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
            Classification
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value as ServiceCategory })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="property">
                Property <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.property}
                onValueChange={(value) =>
                  setFormData({ ...formData, property: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a property" />
                </SelectTrigger>
                <SelectContent>
                  {propertyOptions.map((prop) => (
                    <SelectItem key={prop.value} value={prop.value}>
                      {prop.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Service Types (for work order linking)</Label>
            <p className="text-xs text-gray-500 mb-2">
              Select work order types that this service should create when requested
            </p>
            <MultiSelect
              value={formData.serviceTypes || []}
              onValueChange={(value) =>
                setFormData({ ...formData, serviceTypes: value })
              }
              options={serviceTypeOptions}
              placeholder="Select service types"
            />
          </div>
        </div>

        {/* Pricing Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
            Pricing
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Price Type <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                value={formData.priceType}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    priceType: value as "fixed" | "quote" | "free",
                    basePrice: value !== "fixed" ? null : formData.basePrice,
                  })
                }
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fixed" id="fixed" />
                  <Label htmlFor="fixed" className="font-normal cursor-pointer">
                    Fixed
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="quote" id="quote" />
                  <Label htmlFor="quote" className="font-normal cursor-pointer">
                    Quote
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="free" id="free" />
                  <Label htmlFor="free" className="font-normal cursor-pointer">
                    Free
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {formData.priceType === "fixed" && (
              <div className="space-y-2">
                <Label htmlFor="basePrice">
                  Base Price <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    id="basePrice"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.basePrice ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        basePrice: e.target.value ? parseFloat(e.target.value) : null,
                      })
                    }
                    className="pl-7"
                    required={formData.priceType === "fixed"}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
            Status
          </h2>

          <div className="space-y-2">
            <Label>
              Status <span className="text-red-500">*</span>
            </Label>
            <RadioGroup
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value as "active" | "inactive" })
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="active" id="active" />
                <Label htmlFor="active" className="font-normal cursor-pointer">
                  Active
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inactive" id="inactive" />
                <Label htmlFor="inactive" className="font-normal cursor-pointer">
                  Inactive
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </form>
    </div>
  )
}
