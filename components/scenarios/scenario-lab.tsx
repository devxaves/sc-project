"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SankeySimple, type SankeyLink } from "@/components/charts/sankey-simple"
import useSWR from "swr"
import { fetcher } from "@/lib/swr"

type Order = { id: string; customer: string; material: string; tons: number; due: string }

export function ScenarioLab() {
  const { data } = useSWR<{ orders: Order[] }>("/api/orders", fetcher, { refreshInterval: 0 })
  const orders = data?.orders ?? []

  const [demand, setDemand] = React.useState(100) // %
  const [wagons, setWagons] = React.useState(100) // %
  const [links, setLinks] = React.useState<SankeyLink[] | null>(null)
  const [running, setRunning] = React.useState(false)

  async function runScenario() {
    setRunning(true)
    try {
      const payload = scaleOrders(orders, demand)
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orders: payload, algorithm: "monteCarlo" }),
      }).then((r) => r.json())
      const suggested: Order[] = res?.suggested ?? payload
      setLinks(aggregateSankey(suggested, wagons))
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-5">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Scenario Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <div className="mb-2 text-sm text-muted-foreground">Demand growth: {demand}%</div>
            <Slider value={[demand]} min={60} max={140} step={5} onValueChange={(v) => setDemand(v[0] || 100)} />
          </div>
          <div>
            <div className="mb-2 text-sm text-muted-foreground">Wagon availability: {wagons}%</div>
            <Slider value={[wagons]} min={60} max={120} step={5} onValueChange={(v) => setWagons(v[0] || 100)} />
          </div>
          <Button onClick={runScenario} disabled={running}>
            {running ? "Running…" : "Run Scenario"}
          </Button>
          <div className="text-xs text-muted-foreground">
            Uses Monte Carlo optimizer and visualizes material-to-destination flow.
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Flow Sankey</CardTitle>
        </CardHeader>
        <CardContent>
          {links ? (
            <SankeySimple links={links} />
          ) : (
            <div className="text-sm text-muted-foreground">Run a scenario to view flows.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function scaleOrders(orders: Order[], demandPct: number): Order[] {
  const factor = demandPct / 100
  return orders.map((o) => ({ ...o, tons: Math.max(10, Math.round(o.tons * factor)) }))
}

function aggregateSankey(orders: Order[], wagonsPct: number): SankeyLink[] {
  const wagonFactor = wagonsPct / 100
  const map = new Map<string, number>()
  for (const o of orders) {
    const key = `${o.material}__${o.customer}`
    map.set(key, (map.get(key) || 0) + o.tons * wagonFactor)
  }
  return Array.from(map.entries()).map(([k, v]) => {
    const [source, target] = k.split("__")
    return { source, target, value: Math.round(v) }
  })
}
