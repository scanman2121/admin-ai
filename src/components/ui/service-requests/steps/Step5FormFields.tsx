"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Label } from "@/components/Label"
import { Switch } from "@/components/Switch"
import { RiAddLine } from "@remixicon/react"
import { FormField } from "../types"

interface Step5FormFieldsProps {
  formFields: FormField[]
  onFormFieldsChange: (fields: FormField[]) => void
  onAddCustomField: () => void
}

export function Step5FormFields({
  formFields,
  onFormFieldsChange,
  onAddCustomField
}: Step5FormFieldsProps) {
  const handleToggleField = (fieldId: string) => {
    onFormFieldsChange(
      formFields.map(field =>
        field.id === fieldId ? { ...field, enabled: !field.enabled } : field
      )
    )
  }

  const handleToggleRequired = (fieldId: string) => {
    onFormFieldsChange(
      formFields.map(field =>
        field.id === fieldId ? { ...field, required: !field.required } : field
      )
    )
  }

  const coreFields = formFields.filter(f => f.isCore)
  const customFields = formFields.filter(f => !f.isCore)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
          Configure Form Fields
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Customize the fields that appear on service request forms
        </p>
      </div>

      {/* Core Fields */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
          Core Fields
        </h3>
        {coreFields.map((field) => (
          <Card key={field.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-50">
                    {field.name}
                  </h4>
                  <Badge variant="default" className="text-xs">
                    {field.type}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {field.description}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={field.enabled}
                      onCheckedChange={() => handleToggleField(field.id)}
                    />
                    <Label className="text-sm">Enabled</Label>
                  </div>
                  {field.enabled && (
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={field.required}
                        onCheckedChange={() => handleToggleRequired(field.id)}
                      />
                      <Label className="text-sm">Required</Label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Custom Fields */}
      {customFields.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
            Custom Fields
          </h3>
          {customFields.map((field) => (
            <Card key={field.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-50">
                      {field.name}
                    </h4>
                    <Badge variant="default" className="text-xs">
                      {field.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {field.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={field.enabled}
                        onCheckedChange={() => handleToggleField(field.id)}
                      />
                      <Label className="text-sm">Enabled</Label>
                    </div>
                    {field.enabled && (
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={field.required}
                          onCheckedChange={() => handleToggleRequired(field.id)}
                        />
                        <Label className="text-sm">Required</Label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Custom Field */}
      <div className="flex justify-end">
        <Button variant="ghost" onClick={onAddCustomField}>
          <RiAddLine className="size-4 mr-2" />
          Add Custom Field
        </Button>
      </div>
    </div>
  )
}

