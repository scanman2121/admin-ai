"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function TenantsProspectsPage() {
    const router = useRouter()

    useEffect(() => {
        router.replace("/tenants/prospects")
    }, [router])

    return null
} 