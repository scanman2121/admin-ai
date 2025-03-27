"use client"

import { PageHeader } from "@/components/PageHeader"
import { ChartCard } from "@/components/ui/overview/DashboardChartCard"
import { Filterbar } from "@/components/ui/overview/DashboardFilterbar"
import { OverviewData } from "@/data/schema"
import { cn } from "@/lib/utils"
import { subDays } from "date-fns"
import React from "react"
import { DateRange } from "react-day-picker"

export type PeriodValue = "previous-period" | "last-year" | "no-comparison"

const categories: {
    title: keyof OverviewData
    type: "currency" | "unit"
}[] = [
        {
            title: "Rows read",
            type: "unit",
        },
        {
            title: "Rows written",
            type: "unit",
        },
        {
            title: "Queries",
            type: "unit",
        },
        {
            title: "Payments completed",
            type: "currency",
        },
        {
            title: "Sign ups",
            type: "unit",
        },
        {
            title: "Logins",
            type: "unit",
        },
        {
            title: "Sign outs",
            type: "unit",
        },
        {
            title: "Support calls",
            type: "unit",
        },
    ]

export default function Analytics() {
    const [selectedDates, setSelectedDates] = React.useState<DateRange | undefined>({
        from: subDays(new Date(), 30),
        to: new Date(),
    })
    const [selectedPeriod, setSelectedPeriod] = React.useState<PeriodValue>("last-year")
    const [selectedCategories, setSelectedCategories] = React.useState<(keyof OverviewData)[]>(
        categories.map((category) => category.title)
    )

    return (
        <div>
            <PageHeader title="Analytics" />

            <section aria-labelledby="usage-overview" className="mt-4">
                <h2
                    id="usage-overview"
                    className="text-base font-medium text-gray-900 dark:text-gray-50"
                >
                    Overview
                </h2>
                <div className="sticky top-6 z-20 flex items-center justify-between border-b border-gray-200 bg-white pb-4 pt-4 dark:border-gray-800 dark:bg-gray-950">
                    <Filterbar
                        maxDate={new Date()}
                        minDate={new Date(2024, 0, 1)}
                        selectedDates={selectedDates}
                        onDatesChange={(dates) => setSelectedDates(dates)}
                        selectedPeriod={selectedPeriod}
                        onPeriodChange={(period) => setSelectedPeriod(period)}
                        categories={categories}
                        setSelectedCategories={setSelectedCategories}
                        selectedCategories={selectedCategories}
                    />
                </div>
                <dl
                    className={cn(
                        "mt-6 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
                    )}
                >
                    {categories
                        .filter((category) => selectedCategories.includes(category.title))
                        .map((category) => {
                            return (
                                <ChartCard
                                    key={category.title}
                                    title={category.title}
                                    type={category.type}
                                    selectedDates={selectedDates}
                                    selectedPeriod={selectedPeriod}
                                />
                            )
                        })}
                </dl>
            </section>
        </div>
    )
} 