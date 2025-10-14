"use client"

import dynamic from "next/dynamic"

export default function Page() {
  const ScenarioLab = dynamic(
    () => import("@/components/scenarios/scenario-lab").then((mod) => mod.ScenarioLab),
    { ssr: false }
  )

  return (
    <div className="space-y-6">
      <h1 className="text-balance text-2xl font-semibold text-foreground">Scenario Lab</h1>
      {/* We inline import here to keep page small on initial load */}
      {/* dynamic import can be added if needed */}
      <ScenarioLab />
    </div>
  )
}
