"use client"

import { createContext, useContext, useEffect, useState } from "react"

export type DemoType = "generic" | "hiffman"

type DemoContextType = {
  demo: DemoType
  setDemo: (demo: DemoType) => void
}

const DemoContext = createContext<DemoContextType>({
  demo: "generic",
  setDemo: () => {},
})

export const useDemo = () => useContext(DemoContext)

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [demo, setDemoState] = useState<DemoType>("generic")

  // Load demo from localStorage on mount
  useEffect(() => {
    const savedDemo = localStorage.getItem("selectedDemo") as DemoType
    if (savedDemo === "generic" || savedDemo === "hiffman") {
      setDemoState(savedDemo)
    }
  }, [])

  // Save demo to localStorage when it changes
  const setDemo = (newDemo: DemoType) => {
    setDemoState(newDemo)
    localStorage.setItem("selectedDemo", newDemo)
    
    // Apply theme if needed
    if (newDemo === "hiffman") {
      // Apply Hiffman theme
      document.documentElement.setAttribute("data-demo", "hiffman")
    } else {
      document.documentElement.setAttribute("data-demo", "generic")
    }
  }

  // Apply theme on mount
  useEffect(() => {
    if (demo === "hiffman") {
      document.documentElement.setAttribute("data-demo", "hiffman")
    } else {
      document.documentElement.setAttribute("data-demo", "generic")
    }
  }, [demo])

  return (
    <DemoContext.Provider value={{ demo, setDemo }}>
      {children}
    </DemoContext.Provider>
  )
}

