import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950",
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

export { Card } 