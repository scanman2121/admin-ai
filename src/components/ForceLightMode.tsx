"use client"

import { useEffect } from "react"

export function ForceLightMode() {
  useEffect(() => {
    // Remove dark class immediately and continuously
    const removeDark = () => {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark')
      }
    }
    
    // Run immediately
    removeDark()
    
    // Set up interval to check periodically (every 100ms)
    const interval = setInterval(removeDark, 100)
    
    // Watch for class changes
    const observer = new MutationObserver(removeDark)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    
    // Cleanup on unmount
    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
  }, [])

  return null
}
