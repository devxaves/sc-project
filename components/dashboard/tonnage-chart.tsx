"use client"
import useSWR from "swr"
import { fetcher } from "@/lib/swr"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type Point = { day: string; actual: number; plan: number }

export function TonnageChart() {
  const { data } = useSWR<{ series: Point[] }>("/api/kpis/tonnage", fetcher, { refreshInterval: 10000 })
  const series =
    data?.series ??
    Array.from({ length: 14 }).map((_, i) => {
      const plan = 2400 + Math.round(400 * Math.sin(i / 2))
      const actual = plan + Math.round((Math.random() - 0.4) * 300)
      return { day: `D-${14 - i}`, actual, plan }
    })

  return (
    <div className="h-64">
      <ChartContainer
        className="h-full w-full"
        config={{
          actual: { label: "Actual", color: "var(--color-chart-1)" },
          plan: { label: "Plan", color: "var(--color-chart-2)" },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="actual" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
            <Line
              type="monotone"
              dataKey="plan"
              stroke="var(--color-chart-2)"
              strokeWidth={2}
              dot={false}
              strokeDasharray="4 4"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
