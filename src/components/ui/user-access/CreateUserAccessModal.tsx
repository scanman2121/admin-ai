"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/Button"
import { CheckCircle, Users, User } from "lucide-react"

type UserData = {
    id: string
    name: string
    email: string
    company: string
    floorSuite: string
    serviceRequest: string
    serviceRequestType: string | null
    serviceRequestStatus: string | null
    acsStatus: string | null
    hasNotes: boolean
    badgeId?: string | null
}

interface CreateUserAccessModalProps {
    isOpen: boolean
    onClose: () => void
    users: UserData[] | null  // Changed to array to support bulk operations
}

export function CreateUserAccessModal({ isOpen, onClose, users }: CreateUserAccessModalProps) {
    if (!users || users.length === 0) return null

    const userCount = users.length
    const isMultipleUsers = userCount > 1
    
    const handleCreateAccess = () => {
        // In a real app, this would call an API to create user access for all users
        console.log('Creating user access for:', users.map(u => u.name).join(', '))
        onClose()
    }

    // For single user, extract floor and suite details
    const firstUser = users[0]
    const floorSuiteMatch = firstUser.floorSuite.match(/Floor (\d+) \/ Suite (\d+)/)
    const floor = floorSuiteMatch ? floorSuiteMatch[1] : '-'
    const suite = floorSuiteMatch ? floorSuiteMatch[2] : '-'

    // Get unique companies for bulk operations
    const uniqueCompanies = Array.from(new Set(users.map(u => u.company)))

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={`w-full p-0 overflow-hidden ${isMultipleUsers ? 'max-w-2xl' : 'max-w-lg'}`}>
                <DialogHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isMultipleUsers ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-gray-100 dark:bg-gray-800'}`}>
                            {isMultipleUsers ? (
                                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            ) : (
                                <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            )}
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-50 text-left">
                                {isMultipleUsers ? `Create access for ${userCount} users` : 'Create user access'}
                            </DialogTitle>
                            {isMultipleUsers && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Bulk access creation for multiple users
                                </p>
                            )}
                        </div>
                    </div>
                </DialogHeader>

                <div className="px-6 py-4 space-y-6">
                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {isMultipleUsers 
                            ? `You are about to create access for ${userCount} users. This will automatically create their user accounts in the Access Control System (ACS).`
                            : `You are about to create access for ${firstUser.name}. This will automatically create their user account in the Access Control System (ACS).`
                        }
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
                                    <li>• {isMultipleUsers ? 'Users will' : 'User will'} be automatically created in ACS</li>
                                    <li>• Basic user information will be populated</li>
                                    <li>• You will still need to go to LENEL to configure access levels</li>
                                    <li>• Service {isMultipleUsers ? 'requests will' : 'request will'} be updated with approval status</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* User Details */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-3">
                            {isMultipleUsers ? 'User Summary:' : 'User Details:'}
                        </h3>
                        
                        {isMultipleUsers ? (
                            /* Bulk mode - show summary */
                            <div className="space-y-4">
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Selected Users:</span>
                                        <span className="text-sm text-gray-900 dark:text-gray-50">{userCount} users</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Companies:</span>
                                        <span className="text-sm text-gray-900 dark:text-gray-50">{uniqueCompanies.join(', ')}</span>
                                    </div>
                                </div>
                                
                                {/* User list for bulk operations */}
                                <div className="max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {users.map((user, index) => (
                                            <div key={user.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {user.email} • {user.company}
                                                        </div>
                                                    </div>
                                                    <div className="text-xs text-gray-400 dark:text-gray-500">
                                                        #{index + 1}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Single mode - show detailed information */
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Name:</span>
                                    <span className="text-sm text-gray-900 dark:text-gray-50">{firstUser.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email:</span>
                                    <span className="text-sm text-gray-900 dark:text-gray-50">{firstUser.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Company:</span>
                                    <span className="text-sm text-gray-900 dark:text-gray-50">{firstUser.company}</span>
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
                        )}
                    </div>
                </div>

                {/* Footer with buttons */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleCreateAccess}>
                        {isMultipleUsers ? `Create ${userCount} users & add to ACS` : 'Create & add to ACS'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
