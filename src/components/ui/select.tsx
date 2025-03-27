import * as React from "react"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import { RiArrowDownSLine, RiCheckLine } from "@remixicon/react"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        className={cn(
          "block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:focus:border-primary dark:focus:ring-primary",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Select.displayName = "Select"

export interface MultiSelectProps {
  value: string[]
  onChange: (value: string[]) => void
  options: string[]
  className?: string
}

const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  ({ value, onChange, options, className }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)

    const toggleOption = (option: string) => {
      const newValue = value.includes(option)
        ? value.filter(v => v !== option)
        : [...value, option]
      onChange(newValue)
    }

    return (
      <div ref={ref} className="relative">
        <div
          className={cn(
            "flex min-h-[38px] w-full cursor-pointer items-center rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:focus:border-primary dark:focus:ring-primary",
            className
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-1 flex-wrap gap-1">
            {value.length === 0 ? (
              <span className="text-gray-500">Select options...</span>
            ) : (
              value.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                >
                  {item}
                </span>
              ))
            )}
          </div>
          <RiArrowDownSLine
            className={cn(
              "ml-2 size-4 shrink-0 text-gray-400 transition-transform dark:text-gray-600",
              isOpen && "rotate-180"
            )}
          />
        </div>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950">
            <div className="max-h-60 overflow-auto py-1">
              {options.map((option) => (
                <div
                  key={option}
                  className={cn(
                    "flex cursor-pointer items-center px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800",
                    value.includes(option) && "bg-gray-100 dark:bg-gray-800"
                  )}
                  onClick={() => toggleOption(option)}
                >
                  <div className="mr-2 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-gray-300 dark:border-gray-700">
                    {value.includes(option) && (
                      <RiCheckLine className="size-3 text-primary" />
                    )}
                  </div>
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
)
MultiSelect.displayName = "MultiSelect"

export { Select, MultiSelect } 