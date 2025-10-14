"use client"

import { Area, AreaChart, ResponsiveContainer } from "recharts"
import React from "react"

function genSeries(n = 12) {
  return Array.from({ length: n }).map((_, i) => ({
    x: i,
    y: 50 + Math.round(15 * Math.sin(i / 2) + Math.random() * 8),
  }))
}

interface KPISparklineProps {
  color?: string
}

export function KPISparkline({ color = "chart-1" }: KPISparklineProps) {
  const [data, setData] = React.useState(genSeries())
  const gradientId = `kpiSpark-${color}`
  const colorVar = `var(--color-${color})`

  React.useEffect(() => {
    const id = setInterval(() => setData(genSeries()), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colorVar} stopOpacity={0.4} />
              <stop offset="100%" stopColor={colorVar} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            dataKey="y"
            type="monotone"
            stroke={colorVar}
            fill={`url(#${gradientId})`}
            strokeWidth={2}
            dot={false}
            isAnimationActive
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
