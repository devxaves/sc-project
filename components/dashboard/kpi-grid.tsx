"use client"
import useSWR from "swr"
import { fetcher } from "@/lib/swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { KPISparkline } from "@/components/dashboard/kpi-sparkline"
import { TrendingUp, TrendingDown, DollarSign, Clock, Package, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { KPICardSkeleton } from "@/components/ui/skeleton-loaders"

type KPI = {
  label: string
  value: string
  delta?: string
  icon?: string
  color?: string
}

const iconMap = {
  dollar: DollarSign,
  clock: Clock,
  package: Package,
  alert: AlertTriangle,
}

export function KPIGrid() {
  const { data, isLoading } = useSWR<{ kpis: KPI[] }>("/api/kpis", fetcher, { refreshInterval: 5000 })
  const kpis = data?.kpis ?? [
    { label: "Cost per ton-km", value: "₹1.92", delta: "-3.1%", icon: "dollar", color: "chart-1" },
    { label: "On-time delivery", value: "96.2%", delta: "+0.8%", icon: "clock", color: "chart-2" },
    { label: "Wagon utilization", value: "87.4%", delta: "+1.2%", icon: "package", color: "chart-3" },
    { label: "Demurrage cost", value: "1.6%", delta: "-0.3%", icon: "alert", color: "chart-4" },
  ]

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <KPICardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((k) => {
        const isDeltaNegative = k.delta?.startsWith("-")
        const Icon = k.icon ? iconMap[k.icon as keyof typeof iconMap] : null
        const isGoodDelta = 
          (k.label.toLowerCase().includes("cost") || k.label.toLowerCase().includes("demurrage")) 
            ? isDeltaNegative 
            : !isDeltaNegative

        return (
          <Card 
            key={k.label} 
            className="card-hover cursor-pointer group animate-in-up"
            role="button"
            tabIndex={0}
            aria-label={`${k.label}: ${k.value}, ${k.delta || 'no change'}`}
          >
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {k.label}
              </CardTitle>
              {Icon && (
                <div className={cn(
                  "p-2 rounded-lg bg-opacity-10 transition-colors",
                  k.color === "chart-1" && "bg-chart-1/10 text-chart-1",
                  k.color === "chart-2" && "bg-chart-2/10 text-chart-2",
                  k.color === "chart-3" && "bg-chart-3/10 text-chart-3",
                  k.color === "chart-4" && "bg-chart-4/10 text-chart-4",
                )}>
                  <Icon className="h-4 w-4" />
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-end justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {k.value}
                  </div>
                  {k.delta && (
                    <div className="flex items-center gap-1">
                      {isGoodDelta ? (
                        <TrendingUp className="h-3.5 w-3.5 text-success" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                      )}
                      <span className={cn(
                        "text-sm font-semibold",
                        isGoodDelta ? "text-success" : "text-destructive"
                      )}>
                        {k.delta.replace("-", "")}
                      </span>
                      <span className="text-xs text-muted-foreground">vs last period</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="h-12 w-full">
                <KPISparkline color={k.color} />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
