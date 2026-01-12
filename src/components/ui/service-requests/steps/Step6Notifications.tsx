"use client"

import { Card } from "@/components/Card"
import { Label } from "@/components/Label"
import { Switch } from "@/components/Switch"
import { NotificationSettings } from "../types"

interface Step6NotificationsProps {
  notifications: NotificationSettings
  onNotificationsChange: (notifications: NotificationSettings) => void
}

export function Step6Notifications({
  notifications,
  onNotificationsChange
}: Step6NotificationsProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
          Notification Preferences
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Configure when and who receives notifications for service requests
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Label className="text-base font-medium text-gray-900 dark:text-gray-50 mb-1">
              Notify Requestor
            </Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Send notifications to the person who submitted the request
            </p>
          </div>
          <Switch
            checked={notifications.notifyRequestor}
            onCheckedChange={(checked) =>
              onNotificationsChange({ ...notifications, notifyRequestor: checked })
            }
          />
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label className="text-base font-medium text-gray-900 dark:text-gray-50 mb-1">
                Notify Assigned Team
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Send notifications to the team assigned to handle the request
              </p>
            </div>
            <Switch
              checked={notifications.notifyAssignedTeam}
              onCheckedChange={(checked) =>
                onNotificationsChange({ ...notifications, notifyAssignedTeam: checked })
              }
            />
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label className="text-base font-medium text-gray-900 dark:text-gray-50 mb-1">
                Notify on Status Changes
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Send notifications when the status of a request changes
              </p>
            </div>
            <Switch
              checked={notifications.notifyOnStatusChanges}
              onCheckedChange={(checked) =>
                onNotificationsChange({ ...notifications, notifyOnStatusChanges: checked })
              }
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

