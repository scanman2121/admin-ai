"use client"

import { Button } from "@/components/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ApplyToCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  categoryName: string
  settingType: string // e.g., "approval requirement", "approver"
  onApply: () => void
  onCancel: () => void
}

export function ApplyToCategoryModal({
  isOpen,
  onClose,
  categoryName,
  settingType,
  onApply,
  onCancel
}: ApplyToCategoryModalProps) {
  const handleApply = () => {
    onApply()
    onClose()
  }

  const handleCancel = () => {
    onCancel()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Apply to Category</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Do you want to apply this {settingType} to all {categoryName} request types?
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="ghost" onClick={handleCancel}>
            No, just this type
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Yes, apply to all
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

