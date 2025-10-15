"use client"

import { Check } from "lucide-react"

export default function TenantHomePage() {
  const checklistItems = [
    {
      id: 1,
      title: "Add your contact information",
      description: "Your contact information has been added, you can always manage this in your profile in the top right",
      completed: true,
    },
    {
      id: 2,
      title: "Confirm your company information",
      description: "Basic information like number of employees, domains, logo, etc.",
      completed: true,
    },
    {
      id: 3,
      title: "Configure your apps",
      description: "What features should your employees have access to.",
      completed: true,
    },
  ]

  const completedCount = checklistItems.filter(item => item.completed).length
  const totalCount = checklistItems.length
  const progressPercentage = (completedCount / totalCount) * 100

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
          Welcome back, Oscar
        </h1>
      </div>

      {/* Onboarding Checklist Card */}
      <div className="relative rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8">
        {/* Company Logo */}
        <div className="absolute top-8 right-8 hidden md:block">
          <div className="w-32 h-32 rounded-full bg-gray-900 dark:bg-gray-800 flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-lg">
            <span className="text-white font-bold text-2xl">ERIKA</span>
          </div>
        </div>

        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
            Welcome to Erika's Empire
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Here's a checklist to get you started
          </p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-6 mb-8">
            {checklistItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  item.completed 
                    ? "bg-teal-500" 
                    : "border-2 border-gray-300 dark:border-gray-600"
                }`}>
                  {item.completed && (
                    <Check className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Let's Go Button */}
          <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Let's go
          </button>
        </div>
      </div>

      {/* Work Orders Card */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            Work Orders
          </h3>
        </div>
      </div>
    </div>
  )
}

