"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Badge } from "@/components/Badge"
import { Switch } from "@/components/Switch"
import { RiAddLine, RiCheckboxCircleLine, RiCheckboxBlankCircleLine } from "@remixicon/react"
import { Status } from "../types"

interface Step4StatusesProps {
  statuses: Status[]
  onStatusesChange: (statuses: Status[]) => void
  onAddCustomStatus: () => void
}

const getColorClasses = (color: string) => {
  const colorMap: Record<string, { bg: string; text: string }> = {
    blue: { bg: "bg-blue-400", text: "text-blue-800" },
    green: { bg: "bg-green-400", text: "text-green-800" },
    yellow: { bg: "bg-yellow-400", text: "text-yellow-800" },
    orange: { bg: "bg-orange-400", text: "text-orange-800" },
    red: { bg: "bg-red-400", text: "text-red-800" },
    purple: { bg: "bg-purple-400", text: "text-purple-800" },
    gray: { bg: "bg-gray-400", text: "text-gray-800" },
    pink: { bg: "bg-pink-400", text: "text-pink-800" },
    indigo: { bg: "bg-indigo-400", text: "text-indigo-800" },
    teal: { bg: "bg-teal-400", text: "text-teal-800" },
  }
  return colorMap[color] || colorMap.blue
}

export function Step4Statuses({
  statuses,
  onStatusesChange,
  onAddCustomStatus
}: Step4StatusesProps) {
  // Use provided statuses (should include defaults from wizard)
  const allStatuses = statuses

  const handleToggleStatus = (statusId: number) => {
    onStatusesChange(
      allStatuses.map(st =>
        st.id === statusId ? { ...st, status: !st.status } : st
      )
    )
  }

  const handleEnableAll = () => {
    onStatusesChange(
      allStatuses.map(st => ({ ...st, status: true }))
    )
  }

  const handleDisableAll = () => {
    onStatusesChange(
      allStatuses.map(st => ({ ...st, status: false }))
    )
  }

  const enabledCount = allStatuses.filter(s => s.status).length

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
          Configure Statuses
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Set up statuses to track service requests through their lifecycle
        </p>
      </div>

      {/* Bulk Actions */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {enabledCount} of {allStatuses.length} statuses enabled
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

      {/* Statuses List */}
      <div className="space-y-3">
        {allStatuses.map((status) => {
          const colorClasses = getColorClasses(status.color)
          return (
            <Card key={status.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <button
                    onClick={() => handleToggleStatus(status.id)}
                    className="flex-shrink-0"
                  >
                    {status.status ? (
                      <RiCheckboxCircleLine className="size-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <RiCheckboxBlankCircleLine className="size-5 text-gray-400" />
                    )}
                  </button>
                  <div className="flex items-center gap-3 flex-1">
                    <Badge
                      variant="default"
                      className={`${colorClasses.bg} ${colorClasses.text} border-0`}
                    >
                      {status.name}
                    </Badge>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {status.description}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={status.status}
                  onCheckedChange={() => handleToggleStatus(status.id)}
                />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Add Custom Status */}
      <div className="flex justify-end">
        <Button variant="ghost" onClick={onAddCustomStatus}>
          <RiAddLine className="size-4 mr-2" />
          Add Custom Status
        </Button>
      </div>
    </div>
  )
}

