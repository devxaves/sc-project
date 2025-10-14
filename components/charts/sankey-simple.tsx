"use client"

import { ResponsiveContainer, Sankey, Tooltip } from "recharts"

export type SankeyLink = { source: string; target: string; value: number }

export function SankeySimple({ links }: { links: SankeyLink[] }) {
  // Build nodes list from links
  const nodeNames = Array.from(new Set(links.flatMap((l) => [l.source, l.target])))
  const nodes = nodeNames.map((name) => ({ name }))
  const data = {
    nodes,
    links: links.map((l) => ({
      source: nodeNames.indexOf(l.source),
      target: nodeNames.indexOf(l.target),
      value: l.value,
    })),
  }
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <Sankey
          data={data}
          nodePadding={18}
          nodeWidth={12}
          linkCurvature={0.5}
          margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
          link={{ stroke: "var(--color-chart-3)", strokeOpacity: 0.5 }}
          node={{ fill: "var(--color-chart-4)" }}
        >
          <Tooltip
            contentStyle={{
              background: "oklch(var(--popover))",
              border: "1px solid oklch(var(--border))",
              color: "oklch(var(--foreground))",
            }}
          />
        </Sankey>
      </ResponsiveContainer>
    </div>
  )
}
