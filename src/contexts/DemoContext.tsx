"use client"

import { createContext, useContext, useEffect, useState } from "react"

export type DemoType = "generic"

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
    if (savedDemo === "generic") {
      setDemoState(savedDemo)
    }
  }, [])

  // Save demo to localStorage when it changes
  const setDemo = (newDemo: DemoType) => {
    setDemoState(newDemo)
    localStorage.setItem("selectedDemo", newDemo)
    document.documentElement.setAttribute("data-demo", "generic")
  }

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-demo", "generic")
  }, [demo])

  return (
    <DemoContext.Provider value={{ demo, setDemo }}>
      {children}
    </DemoContext.Provider>
  )
}

