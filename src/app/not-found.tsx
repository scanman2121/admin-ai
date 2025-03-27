import { Button } from "@/components/Button"
import { siteConfig } from "@/app/siteConfig"
import Link from "next/link"
import { RiArrowRightLine } from "@remixicon/react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-gray-900">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          404
        </h1>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white sm:text-xl">
          Page not found
        </h2>
      </div>
      <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Button asChild className="group mt-8" variant="secondary">
        <Link href={siteConfig.baseLinks.home} className="flex items-center gap-2">
          Go to the home page
          <RiArrowRightLine className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  )
}
