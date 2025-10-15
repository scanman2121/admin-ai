"use client"

import { createContext, useContext, useEffect, useState } from "react"

export type ViewType = "landlord" | "tenant"

type ViewContextType = {
  view: ViewType
  setView: (view: ViewType) => void
}

const ViewContext = createContext<ViewContextType>({
  view: "landlord",
  setView: () => {},
})

export const useView = () => useContext(ViewContext)

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setViewState] = useState<ViewType>("landlord")

  // Load view from localStorage on mount
  useEffect(() => {
    const savedView = localStorage.getItem("userView") as ViewType
    if (savedView === "landlord" || savedView === "tenant") {
      setViewState(savedView)
    }
  }, [])

  // Save view to localStorage when it changes
  const setView = (newView: ViewType) => {
    setViewState(newView)
    localStorage.setItem("userView", newView)
  }

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  )
}

