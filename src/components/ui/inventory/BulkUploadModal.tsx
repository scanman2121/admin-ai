"use client"

import { Button } from "@/components/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ServiceCategory } from "@/data/schema"
import { Download, Upload } from "lucide-react"
import { useRef, useState } from "react"

interface BulkUploadModalProps {
  open: boolean
  onClose: () => void
}

const CSV_TEMPLATE_HEADERS = [
  "Name",
  "Description",
  "Category",
  "Price Type",
  "Base Price",
  "Property",
  "Status",
  "Service Types",
]

const CSV_TEMPLATE_EXAMPLE = [
  "HVAC Maintenance",
  "Regular maintenance and filter replacement",
  "HVAC",
  "fixed",
  "150.00",
  "All Properties",
  "active",
  "General Maintenance",
]

const VALID_CATEGORIES: ServiceCategory[] = [
  "Electrical",
  "Plumbing",
  "HVAC",
  "Maintenance",
  "Security",
  "Cleaning",
  "Other",
]

export function BulkUploadModal({ open, onClose }: BulkUploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<{
    success: number
    errors: string[]
  } | null>(null)

  const handleDownloadTemplate = () => {
    const csvContent = [
      CSV_TEMPLATE_HEADERS.join(","),
      CSV_TEMPLATE_EXAMPLE.map((cell) => `"${cell}"`).join(","),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "inventory-template.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setUploadResult(null)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file && file.type === "text/csv") {
      setSelectedFile(file)
      setUploadResult(null)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const validateRow = (
    row: string[],
    rowIndex: number
  ): { valid: boolean; error?: string } => {
    const [name, , category, priceType, basePrice, , status] = row

    if (!name?.trim()) {
      return { valid: false, error: `Row ${rowIndex}: Name is required` }
    }

    if (category && !VALID_CATEGORIES.includes(category as ServiceCategory)) {
      return {
        valid: false,
        error: `Row ${rowIndex}: Invalid category "${category}"`,
      }
    }

    if (priceType && !["fixed", "quote", "free"].includes(priceType)) {
      return {
        valid: false,
        error: `Row ${rowIndex}: Invalid price type "${priceType}"`,
      }
    }

    if (priceType === "fixed" && (!basePrice || isNaN(parseFloat(basePrice)))) {
      return {
        valid: false,
        error: `Row ${rowIndex}: Base price required for fixed price type`,
      }
    }

    if (status && !["active", "inactive"].includes(status)) {
      return {
        valid: false,
        error: `Row ${rowIndex}: Invalid status "${status}"`,
      }
    }

    return { valid: true }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    const errors: string[] = []
    let successCount = 0

    try {
      const text = await selectedFile.text()
      const lines = text.split("\n").filter((line) => line.trim())

      // Skip header row
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(",").map((cell) =>
          cell.replace(/^"|"$/g, "").trim()
        )

        const validation = validateRow(row, i + 1)
        if (!validation.valid) {
          errors.push(validation.error!)
        } else {
          // In a real app, this would call an API to create the inventory item
          successCount++
        }
      }

      setUploadResult({ success: successCount, errors })

      if (errors.length === 0 && successCount > 0) {
        // Auto-close after successful upload
        setTimeout(() => {
          handleClose()
        }, 2000)
      }
    } catch {
      errors.push("Failed to parse CSV file")
      setUploadResult({ success: 0, errors })
    } finally {
      setIsUploading(false)
    }
  }

  const handleClose = () => {
    setSelectedFile(null)
    setUploadResult(null)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Bulk Upload Inventory</DialogTitle>
          <DialogDescription>
            Upload a CSV file to create multiple inventory items at once.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 px-6">
          {/* Step 1: Download Template */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-900">
              Step 1: Download Template
            </h3>
            <p className="text-sm text-gray-500">
              Download our CSV template to ensure your data is formatted correctly.
            </p>
            <Button
              variant="outline"
              onClick={handleDownloadTemplate}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download Template
            </Button>
          </div>

          {/* Step 2: Upload File */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-900">
              Step 2: Upload Your File
            </h3>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              {selectedFile ? (
                <p className="text-sm text-gray-900 font-medium">
                  {selectedFile.name}
                </p>
              ) : (
                <>
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">CSV files only</p>
                </>
              )}
            </div>
          </div>

          {/* Upload Result */}
          {uploadResult && (
            <div
              className={`p-4 rounded-lg ${
                uploadResult.errors.length > 0
                  ? "bg-red-50 border border-red-200"
                  : "bg-green-50 border border-green-200"
              }`}
            >
              {uploadResult.success > 0 && (
                <p className="text-sm text-green-700 font-medium">
                  Successfully imported {uploadResult.success} item
                  {uploadResult.success !== 1 ? "s" : ""}
                </p>
              )}
              {uploadResult.errors.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-red-700 font-medium">
                    {uploadResult.errors.length} error
                    {uploadResult.errors.length !== 1 ? "s" : ""} found:
                  </p>
                  <ul className="text-sm text-red-600 mt-1 list-disc list-inside">
                    {uploadResult.errors.slice(0, 5).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                    {uploadResult.errors.length > 5 && (
                      <li>...and {uploadResult.errors.length - 5} more</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
