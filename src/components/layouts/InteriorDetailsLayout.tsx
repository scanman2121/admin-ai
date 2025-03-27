"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { RiArrowLeftLine } from "@remixicon/react"
import Link from "next/link"
import React, { ReactNode, useState } from "react"

interface Breadcrumb {
  name: string
  href: string
}

interface InteriorDetailsLayoutProps {
  title: string
  breadcrumbs: Breadcrumb[]
  ctaLabel?: string
  onCtaClick?: () => void
  children: ReactNode
  status?: {
    label: string
    variant: 'active' | 'inactive'
  }
  previewContent?: ReactNode
}

export function InteriorDetailsLayout({
  title,
  breadcrumbs,
  ctaLabel,
  onCtaClick,
  children,
  status,
  previewContent,
}: InteriorDetailsLayoutProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // Create a wrapped preview content that includes the state
  const wrappedPreviewContent = previewContent && isPreviewOpen ? (
    <div className="fixed inset-0 z-50">
      {React.cloneElement(previewContent as React.ReactElement, {
        onClose: () => setIsPreviewOpen(false)
      })}
    </div>
  ) : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-4 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Link
            href={breadcrumbs[breadcrumbs.length - 2]?.href || "/"}
            className="flex items-center hover:text-gray-700 dark:hover:text-gray-300"
          >
            <RiArrowLeftLine className="mr-1 size-4" />
            Back
          </Link>
          <span className="text-gray-400">/</span>
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={breadcrumb.href} className="flex items-center">
              <Link
                href={breadcrumb.href}
                className={cn(
                  "hover:text-gray-700 dark:hover:text-gray-300",
                  index === breadcrumbs.length - 1 && "text-gray-900 dark:text-white font-medium"
                )}
              >
                {breadcrumb.name}
              </Link>
              {index < breadcrumbs.length - 1 && (
                <span className="mx-2 text-gray-400">/</span>
              )}
            </div>
          ))}
        </nav>

        {/* Page Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h1>
          </div>

          {/* Status and CTA Button */}
          <div className="flex items-center gap-3">
            {status && (
              <div className={cn(
                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                status.variant === 'active'
                  ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20"
                  : "bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20"
              )}>
                <span className={cn(
                  "mr-1 size-1.5 rounded-full",
                  status.variant === 'active'
                    ? "bg-green-600 dark:bg-green-400"
                    : "bg-gray-400 dark:bg-gray-400"
                )} />
                {status.label}
              </div>
            )}
            <Button variant="ghost" onClick={() => setIsPreviewOpen(true)}>
              Preview
            </Button>
            {ctaLabel && (
              <Button variant="default" onClick={onCtaClick}>
                {ctaLabel}
              </Button>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="space-y-8">
          {children}
        </div>
      </div>

      {/* Preview Modal */}
      {wrappedPreviewContent}
    </div>
  )
} 