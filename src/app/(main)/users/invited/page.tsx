"use client"

import { Button } from "@/components/Button"
import { Tooltip } from "@/components/Tooltip"
import { invitedUsers } from "@/data/data"
import { showError } from "@/lib/toast"
import { useEffect, useState } from "react"

export default function InvitedUsers() {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [invitedUserData, setInvitedUserData] = useState(invitedUsers)

    // Simulate data loading
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true)
                // In a real app, you would fetch data from an API
                // For now, we'll just use the imported data with a delay
                await new Promise(resolve => setTimeout(resolve, 500))

                setInvitedUserData(invitedUsers)
                setError(null)
            } catch (err) {
                console.error("Error loading invited user data:", err)
                setError("Failed to load invited user data. Please refresh the page.")
                showError("Failed to load invited user data. Please refresh the page.")
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [])

    const handleResendInvitation = (email: string) => {
        try {
            // In a real app, you would call an API to resend the invitation
            console.log("Resending invitation to:", email)
            showError("This feature is not implemented yet.")
        } catch (err) {
            console.error("Error resending invitation:", err)
            showError("Failed to resend invitation. Please try again.")
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 my-4 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
                <p>{error}</p>
                <Button
                    className="mt-2"
                    onClick={() => window.location.reload()}
                >
                    Refresh Page
                </Button>
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <div className="flex items-center justify-between bg-gray-50 px-4 py-3.5 dark:bg-gray-900">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium uppercase text-gray-500">
                            {invitedUserData.length} invited
                        </span>
                    </div>
                </div>
                <div className="p-0">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-left text-xs font-medium uppercase text-gray-500"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-left text-xs font-medium uppercase text-gray-500"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-left text-xs font-medium uppercase text-gray-500"
                                >
                                    Role
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-left text-xs font-medium uppercase text-gray-500"
                                >
                                    Invited
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-950">
                            {invitedUserData.map((user) => (
                                <tr key={user.email} className="hover:bg-gray-50 hover:dark:bg-gray-800">
                                    <td className="whitespace-nowrap px-4 py-4 text-sm">
                                        <div className="font-medium text-gray-900 dark:text-gray-50">
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4">
                                        <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-500 dark:ring-yellow-500/20">
                                            Pending
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                        {user.role}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                        {`${user.expires} days ago`}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                                        <Tooltip content="Resend invitation">
                                            <Button
                                                variant="ghost"
                                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-500 dark:hover:text-indigo-400"
                                                onClick={() => handleResendInvitation(user.email)}
                                            >
                                                Resend
                                            </Button>
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
} 