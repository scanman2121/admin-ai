import { Button, ButtonProps } from "@/components/Button"
import { ReactNode } from "react"

export interface PageHeaderProps {
    /**
     * The title of the page
     */
    title: string

    /**
     * Primary CTA button text (optional)
     */
    primaryCta?: string

    /**
     * Secondary CTA button text (optional)
     */
    secondaryCta?: string

    /**
     * Handler for primary CTA button click
     */
    onPrimaryClick?: () => void

    /**
     * Handler for secondary CTA button click
     */
    onSecondaryClick?: () => void

    /**
     * Additional props for the primary button
     */
    primaryButtonProps?: Omit<ButtonProps, "children">

    /**
     * Additional props for the secondary button
     */
    secondaryButtonProps?: Omit<ButtonProps, "children">

    /**
     * Optional custom buttons instead of using the built-in CTA options
     */
    customButtons?: ReactNode
}

/**
 * PageHeader component for consistent page headers with optional CTA buttons
 */
export function PageHeader({
    title,
    primaryCta,
    secondaryCta,
    onPrimaryClick,
    onSecondaryClick,
    primaryButtonProps,
    secondaryButtonProps,
    customButtons,
}: PageHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-4">
            <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                {title}
            </h1>

            <div className="flex gap-3 min-h-[40px] items-center">
                {(primaryCta || secondaryCta || customButtons) && (
                    <>
                        {customButtons ? (
                            customButtons
                        ) : (
                            <>
                                {secondaryCta && (
                                    <Button
                                        variant="ghost"
                                        className="border border-primary text-primary hover:bg-gray-50 hover:bg-opacity-30"
                                        onClick={onSecondaryClick}
                                        {...secondaryButtonProps}
                                    >
                                        {secondaryCta}
                                    </Button>
                                )}

                                {primaryCta && (
                                    <Button
                                        onClick={onPrimaryClick}
                                        {...primaryButtonProps}
                                    >
                                        {primaryCta}
                                    </Button>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
} 