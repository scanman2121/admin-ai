"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { RiAddLine, RiCheckboxCircleLine, RiCheckboxBlankCircleLine } from "@remixicon/react"
import { Category } from "../types"

interface Step2CategoriesProps {
  categories: Category[]
  onCategoriesChange: (categories: Category[]) => void
  onAddCustomCategory: () => void
}

// Default categories data - matches service-types-categories page
const defaultCategories: Category[] = [
  {
    id: 1,
    name: "Cleaning & Waste",
    description: "Need something cleaned, picked up, or removed — like trash, recycling, or windows?",
    status: true,
    assignedTo: "Housekeeping Team",
    assignedToType: "team",
  },
  {
    id: 2,
    name: "Temperature & Air",
    description: "Too hot, too cold, or something off with the air? Let us know.",
    status: true,
    assignedTo: "Maintenance Team",
    assignedToType: "team",
  },
  {
    id: 3,
    name: "Repairs & Maintenance",
    description: "Something broken, leaking, or not working right? We'll take care of it.",
    status: true,
    assignedTo: "Maintenance Team",
    assignedToType: "team",
  },
  {
    id: 4,
    name: "Access & Security",
    description: "Need help with a key, badge, lock, or getting into a space?",
    status: true,
    assignedTo: "Security Team",
    assignedToType: "team",
  },
  {
    id: 5,
    name: "Hospitality & Concierge",
    description: "Need a hand around the building — deliveries, event setup, or general help?",
    status: true,
    assignedTo: "Concierge Team",
    assignedToType: "team",
  },
  {
    id: 6,
    name: "Signage & Facilities",
    description: "Need an update to signage, directories, or parking info?",
    status: true,
    assignedTo: "Facilities Team",
    assignedToType: "team",
  },
  {
    id: 7,
    name: "Other",
    description: "Miscellaneous service requests and general inquiries",
    status: true,
    assignedTo: "",
    assignedToType: "user",
  }
]

export function Step2Categories({
  categories,
  onCategoriesChange,
  onAddCustomCategory
}: Step2CategoriesProps) {
  // Use categories from props (wizard manages the state)
  // Merge with defaults if categories is empty
  const allCategories = categories.length > 0 
    ? categories 
    : defaultCategories

  const handleToggleCategory = (categoryId: number) => {
    onCategoriesChange(
      allCategories.map(cat =>
        cat.id === categoryId ? { ...cat, status: !cat.status } : cat
      )
    )
  }

  const handleEnableAll = () => {
    onCategoriesChange(
      allCategories.map(cat => ({ ...cat, status: true }))
    )
  }

  const handleDisableAll = () => {
    onCategoriesChange(
      allCategories.map(cat => ({ ...cat, status: false }))
    )
  }

  const selectedCount = allCategories.filter(c => c.status).length

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
          Select Service Categories
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose the categories of services you provide
        </p>
      </div>

      {/* Bulk Actions */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {selectedCount} of {allCategories.length} categories selected
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleEnableAll}>
            Enable All
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDisableAll}>
            Disable All
          </Button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allCategories.map((category) => (
          <Card
            key={category.id}
            className={`p-4 cursor-pointer transition-all ${
              category.status
                ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => handleToggleCategory(category.id)}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {category.status ? (
                  <RiCheckboxCircleLine className="size-5 text-blue-600 dark:text-blue-400" />
                ) : (
                  <RiCheckboxBlankCircleLine className="size-5 text-gray-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-medium text-gray-900 dark:text-gray-50 mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
                {category.assignedTo && (
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Assigned to: {category.assignedTo}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Custom Category */}
      <div className="flex justify-end">
        <Button variant="ghost" onClick={onAddCustomCategory}>
          <RiAddLine className="size-4 mr-2" />
          Add Custom Category
        </Button>
      </div>
    </div>
  )
}

