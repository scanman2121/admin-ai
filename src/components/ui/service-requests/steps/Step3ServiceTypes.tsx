"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Checkbox } from "@/components/Checkbox"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Switch } from "@/components/Switch"
import { RiAddLine, RiCheckboxCircleLine, RiCheckboxBlankCircleLine } from "@remixicon/react"
import { useState } from "react"
import { ApplyToCategoryModal } from "../components/ApplyToCategoryModal"
import { Category, ServiceType } from "../types"

interface Step3ServiceTypesProps {
  categories: Category[]
  serviceTypes: ServiceType[]
  onServiceTypesChange: (serviceTypes: ServiceType[]) => void
  onAddServiceType: () => void
}

export function Step3ServiceTypes({
  categories,
  serviceTypes,
  onServiceTypesChange,
  onAddServiceType
}: Step3ServiceTypesProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [applyModalOpen, setApplyModalOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<{
    type: 'approval' | 'approver'
    categoryName: string
    serviceTypeId: number
    value: any
  } | null>(null)

  // Get selected categories
  const selectedCategories = categories.filter(c => c.status)

  // Group service types by category
  const serviceTypesByCategory = selectedCategories.reduce((acc, category) => {
    acc[category.name] = serviceTypes.filter(st => st.category === category.name)
    return acc
  }, {} as Record<string, ServiceType[]>)

  const handleToggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName)
      } else {
        newSet.add(categoryName)
      }
      return newSet
    })
  }

  const handleToggleServiceType = (serviceTypeId: number) => {
    onServiceTypesChange(
      serviceTypes.map(st =>
        st.id === serviceTypeId ? { ...st, status: !st.status } : st
      )
    )
  }

  const handleEnableAllInCategory = (categoryName: string) => {
    onServiceTypesChange(
      serviceTypes.map(st =>
        st.category === categoryName ? { ...st, status: true } : st
      )
    )
  }

  const handleDisableAllInCategory = (categoryName: string) => {
    onServiceTypesChange(
      serviceTypes.map(st =>
        st.category === categoryName ? { ...st, status: false } : st
      )
    )
  }

  const handleApprovalChange = (serviceTypeId: number, needsApproval: boolean, categoryName: string) => {
    const serviceType = serviceTypes.find(st => st.id === serviceTypeId)
    if (!serviceType) return

    if (needsApproval && !serviceType.needsApproval) {
      // Show modal when enabling approval
      setPendingAction({
        type: 'approval',
        categoryName,
        serviceTypeId,
        value: needsApproval
      })
      setApplyModalOpen(true)
    } else {
      // Direct update when disabling or already enabled
      onServiceTypesChange(
        serviceTypes.map(st =>
          st.id === serviceTypeId
            ? {
                ...st,
                needsApproval,
                approval: needsApproval ? (st.approvalType === "tenant-admin" ? "Tenant POC" : "Building Manager") : "None"
              }
            : st
        )
      )
    }
  }

  const handleApproverChange = (serviceTypeId: number, approver: string, categoryName: string) => {
    setPendingAction({
      type: 'approver',
      categoryName,
      serviceTypeId,
      value: approver
    })
    setApplyModalOpen(true)
  }

  const handleApplyToCategory = () => {
    if (!pendingAction) return

    const { type, categoryName, serviceTypeId, value } = pendingAction

    if (type === 'approval') {
      // Apply approval requirement to all service types in category
      onServiceTypesChange(
        serviceTypes.map(st =>
          st.category === categoryName
            ? {
                ...st,
                needsApproval: value,
                approval: value ? (st.approvalType === "tenant-admin" ? "Tenant POC" : "Building Manager") : "None"
              }
            : st
        )
      )
    } else if (type === 'approver') {
      // Apply approver to all service types in category that require approval
      onServiceTypesChange(
        serviceTypes.map(st =>
          st.category === categoryName && st.needsApproval
            ? { ...st, assignedTo: value }
            : st
        )
      )
    }

    setPendingAction(null)
    setApplyModalOpen(false)
  }

  const handleCancelApply = () => {
    if (!pendingAction) return

    const { type, serviceTypeId, value } = pendingAction

    // Apply only to the current service type
    if (type === 'approval') {
      onServiceTypesChange(
        serviceTypes.map(st =>
          st.id === serviceTypeId
            ? {
                ...st,
                needsApproval: value,
                approval: value ? (st.approvalType === "tenant-admin" ? "Tenant POC" : "Building Manager") : "None"
              }
            : st
        )
      )
    } else if (type === 'approver') {
      onServiceTypesChange(
        serviceTypes.map(st =>
          st.id === serviceTypeId
            ? { ...st, assignedTo: value }
            : st
        )
      )
    }

    setPendingAction(null)
    setApplyModalOpen(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
          Configure Service Types
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Configure request types for your selected categories
        </p>
      </div>

      {/* Service Types by Category */}
      <div className="space-y-6">
        {selectedCategories.map((category) => {
          const categoryServiceTypes = serviceTypesByCategory[category.name] || []
          const isExpanded = expandedCategories.has(category.name)
          const enabledCount = categoryServiceTypes.filter(st => st.status).length

          return (
            <Card key={category.id} className="p-4">
              <div className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleCategory(category.name)}
                      className="text-left"
                    >
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {categoryServiceTypes.length} service types • {enabledCount} enabled
                      </p>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEnableAllInCategory(category.name)}>
                      Enable All
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDisableAllInCategory(category.name)}>
                      Disable All
                    </Button>
                  </div>
                </div>

                {/* Service Types List */}
                {isExpanded && (
                  <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
                    {categoryServiceTypes.length > 0 ? (
                      categoryServiceTypes.map((serviceType) => (
                        <div
                          key={serviceType.id}
                          className="flex items-start justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <button
                                onClick={() => handleToggleServiceType(serviceType.id)}
                                className="flex-shrink-0"
                              >
                                {serviceType.status ? (
                                  <RiCheckboxCircleLine className="size-5 text-blue-600 dark:text-blue-400" />
                                ) : (
                                  <RiCheckboxBlankCircleLine className="size-5 text-gray-400" />
                                )}
                              </button>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-gray-50">
                                  {serviceType.requestType}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {serviceType.description}
                                </p>
                              </div>
                            </div>
                            {serviceType.status && (
                              <div className="ml-8 space-y-2">
                                <div className="flex items-center gap-4">
                                  <Label className="text-sm">Requires approval</Label>
                                  <Switch
                                    checked={serviceType.needsApproval}
                                    onCheckedChange={(checked) =>
                                      handleApprovalChange(serviceType.id, checked, category.name)
                                    }
                                  />
                                </div>
                                {serviceType.needsApproval && (
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Approval: {serviceType.approval}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                        No service types configured for this category
                      </p>
                    )}
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Add Service Type */}
      <div className="flex justify-end">
        <Button variant="ghost" onClick={onAddServiceType}>
          <RiAddLine className="size-4 mr-2" />
          Add Service Type
        </Button>
      </div>

      {/* Apply to Category Modal */}
      {pendingAction && (
        <ApplyToCategoryModal
          isOpen={applyModalOpen}
          onClose={() => {
            setApplyModalOpen(false)
            setPendingAction(null)
          }}
          categoryName={pendingAction.categoryName}
          settingType={pendingAction.type === 'approval' ? 'approval requirement' : 'approver'}
          onApply={handleApplyToCategory}
          onCancel={handleCancelApply}
        />
      )}
    </div>
  )
}

