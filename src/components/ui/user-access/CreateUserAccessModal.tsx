"use client"

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/Button"
import { X, CheckCircle } from "lucide-react"

interface CreateUserAccessModalProps {
    isOpen: boolean
    onClose: () => void
    user: {
        id: string
        name: string
        email: string
        company: string
        floorSuite: string
        serviceRequest: string
        serviceRequestType: string | null
        serviceRequestStatus: string | null
        acsStatus: string
        hasNotes: boolean
        badgeId?: string
    } | null
}

export function CreateUserAccessModal({ isOpen, onClose, user }: CreateUserAccessModalProps) {
    if (!user) return null

    const handleCreateAccess = () => {
        // In a real app, this would call an API to create the user access
        console.log('Creating user access for:', user.name)
        onClose()
    }

    // Extract floor and suite from floorSuite (e.g., "Floor 12 / Suite 1205")
    const floorSuiteMatch = user.floorSuite.match(/Floor (\d+) \/ Suite (\d+)/)
    const floor = floorSuiteMatch ? floorSuiteMatch[1] : '-'
    const suite = floorSuiteMatch ? floorSuiteMatch[2] : '-'

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg w-full p-0 overflow-hidden">
                <DialogHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                            Create User Access
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-400" />
                        </button>
                    </div>
                </DialogHeader>

                <div className="px-6 py-4 space-y-6">
                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        You are about to create access for {user.name}. This will automatically 
                        create their user account in the Access Control System (ACS).
                    </p>

                    {/* What happens next section */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                                    What happens next:
                                </h3>
                                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                                    <li>• User will be automatically created in ACS</li>
                                    <li>• Basic user information will be populated</li>
                                    <li>• You will still need to go to LENEL to configure access levels</li>
                                    <li>• Service request will be updated with approval status</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* User Details */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-3">
                            User Details:
                        </h3>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Name:</span>
                                <span className="text-sm text-gray-900 dark:text-gray-50">{user.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email:</span>
                                <span className="text-sm text-gray-900 dark:text-gray-50">{user.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Company:</span>
                                <span className="text-sm text-gray-900 dark:text-gray-50">{user.company}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Service Request:</span>
                                <span className="text-sm text-gray-900 dark:text-gray-50">SR-2024-001</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Floor:</span>
                                <span className="text-sm text-gray-900 dark:text-gray-50">{floor}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Suite:</span>
                                <span className="text-sm text-gray-900 dark:text-gray-50">{suite}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer with buttons */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleCreateAccess}>
                        Create & Add to ACS
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
