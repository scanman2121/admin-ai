"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/Dialog"
import { Button } from "@/components/Button"
import { useCallback, useEffect, useState } from "react"

interface QRScannerModalProps {
    isOpen: boolean
    onClose: () => void
    onScan: (url: string) => void
}

export function QRScannerModal({ isOpen, onClose, onScan }: QRScannerModalProps) {
    const [scannedUrl, setScannedUrl] = useState<string | null>(null)

    // Reset scanned URL when modal closes
    useEffect(() => {
        if (!isOpen) {
            setScannedUrl(null)
        }
    }, [isOpen])

    // Simulate QR code detection
    const simulateQrDetection = useCallback(() => {
        const mockUrls = [
            'https://example.com/qr/123',
            'https://example.com/qr/456',
            'https://example.com/qr/789'
        ]
        const randomUrl = mockUrls[Math.floor(Math.random() * mockUrls.length)]
        setScannedUrl(randomUrl)
    }, [])

    // Start scanning when modal opens
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(simulateQrDetection, 2000)
            return () => clearTimeout(timer)
        }
    }, [isOpen, simulateQrDetection])

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Scan QR Code</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center gap-4 p-4">
                    {/* QR Scanner Viewport */}
                    <div className="relative aspect-square w-full max-w-sm rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                        <div className="absolute inset-0 flex items-center justify-center">
                            {scannedUrl ? (
                                <p className="text-sm text-gray-500">QR Code detected!</p>
                            ) : (
                                <p className="text-sm text-gray-500">Scanning for QR code...</p>
                            )}
                        </div>
                    </div>

                    {/* Status Message */}
                    <p className="text-sm text-gray-500">
                        {scannedUrl
                            ? 'QR code detected! Click "Confirm" to proceed.'
                            : 'Position the QR code within the frame to scan.'}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex w-full justify-end gap-2">
                        <Button
                            variant="ghost"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => scannedUrl && onScan(scannedUrl)}
                            disabled={!scannedUrl}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 