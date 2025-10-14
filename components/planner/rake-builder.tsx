"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/swr"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Package, 
  Trash2, 
  Sparkles, 
  Calendar,
  Weight,
  MapPin,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Filter,
  Search,
  GripVertical
} from "lucide-react"
import { cn } from "@/lib/utils"
import { EmptyState } from "@/components/ui/empty-state"
import { toast } from "sonner"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type Order = { 
  id: string
  customer: string
  material: string
  tons: number
  due: string
  priority?: "high" | "medium" | "low"
  origin?: string
}

export function RakeBuilder() {
  const { data, isLoading } = useSWR<{ orders: Order[] }>("/api/orders", fetcher)
  const [rake, setRake] = React.useState<Order[]>([])
  const [algorithm, setAlgorithm] = React.useState<"greedy" | "ga" | "monteCarlo">("greedy")
  const [explanation, setExplanation] = React.useState<string[] | null>(null)
  const [score, setScore] = React.useState<number | null>(null)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterPriority, setFilterPriority] = React.useState<string>("all")
  const [draggedOver, setDraggedOver] = React.useState(false)
  const [optimizing, setOptimizing] = React.useState(false)
  
  const orders = data?.orders ?? [
    { id: "ORD-1001", customer: "JSW Steel", material: "Iron Ore", tons: 250, due: "2024-11-15", priority: "high", origin: "Bokaro" },
    { id: "ORD-1002", customer: "Tata Steel", material: "Coal", tons: 180, due: "2024-11-18", priority: "medium", origin: "Dhanbad" },
    { id: "ORD-1003", customer: "RINL", material: "Iron Ore", tons: 320, due: "2024-11-20", priority: "low", origin: "Rourkela" },
  ]

  const filteredOrders = orders
    .filter(o => !rake.find(r => r.id === o.id))
    .filter(o => {
      const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           o.material.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPriority = filterPriority === "all" || o.priority === filterPriority
      return matchesSearch && matchesPriority
    })

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDraggedOver(false)
    const id = e.dataTransfer.getData("text/plain")
    const order = orders.find((o) => o.id === id)
    if (order && !rake.find((r) => r.id === id)) {
      setRake((prev) => [...prev, order])
      toast.success(`${order.id} added to rake`)
    }
  }

  async function handleOptimize() {
    if (rake.length === 0) {
      toast.error("Add orders to the rake before optimizing")
      return
    }

    setOptimizing(true)
    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orders: rake, algorithm }),
      }).then((r) => r.json())

      if (Array.isArray(res?.suggested)) {
        setRake(res.suggested)
        setExplanation(res.explanation || null)
        setScore(typeof res.score === "number" ? res.score : null)
        toast.success("Rake optimized successfully")
      }
    } catch (error) {
      toast.error("Optimization failed")
    } finally {
      setOptimizing(false)
    }
  }

  const totalTons = rake.reduce((sum, r) => sum + r.tons, 0)
  const maxCapacity = 2000 // Example max capacity
  const utilizationPercent = Math.min((totalTons / maxCapacity) * 100, 100)
  const isOverCapacity = totalTons > maxCapacity
  const isUnderUtilized = utilizationPercent < 70

  const priorityColors = {
    high: "text-destructive bg-destructive/10 border-destructive/20",
    medium: "text-warning bg-warning/10 border-warning/20",
    low: "text-info bg-info/10 border-info/20",
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Left Panel - Unassigned Orders */}
      <Card className="lg:col-span-2 card-hover">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Unassigned Orders
              </CardTitle>
              <CardDescription className="mt-1">
                {filteredOrders.length} available for assignment
              </CardDescription>
            </div>
          </div>
          <div className="space-y-2 pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          ) : filteredOrders.length === 0 ? (
            <EmptyState
              icon="package"
              title="No orders found"
              description="All orders are assigned or try adjusting filters"
            />
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {filteredOrders.map((o, idx) => (
                <div
                  key={o.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("text/plain", o.id)}
                  className={cn(
                    "group cursor-grab active:cursor-grabbing rounded-lg border-2 border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md animate-in-up",
                    "hover:scale-[1.02]"
                  )}
                  style={{ animationDelay: `${idx * 30}ms` }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="font-mono text-sm font-semibold">{o.id}</span>
                    </div>
                    {o.priority && (
                      <Badge variant="outline" className={cn("status-pill border", priorityColors[o.priority])}>
                        {o.priority}
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1.5 ml-6">
                    <p className="font-medium text-foreground">{o.customer}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        {o.material}
                      </span>
                      <span className="flex items-center gap-1">
                        <Weight className="h-3 w-3" />
                        {o.tons} tons
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {o.due}
                      </span>
                      {o.origin && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {o.origin}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Right Panel - Rake Assembly */}
      <Card className="lg:col-span-3 card-hover">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Rake Formation #1
              </CardTitle>
              <CardDescription className="mt-1">
                Drag orders to build optimized rake formation
              </CardDescription>
            </div>
            <Select value={algorithm} onValueChange={(v) => setAlgorithm(v as any)}>
              <SelectTrigger className="w-[180px]">
                <Sparkles className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="greedy">Greedy (Fast)</SelectItem>
                <SelectItem value="ga">Genetic Algorithm</SelectItem>
                <SelectItem value="monteCarlo">Monte Carlo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Capacity Indicator */}
          <div className="p-4 rounded-lg border border-border bg-muted/50 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Capacity Utilization</span>
              <span className={cn(
                "font-semibold",
                isOverCapacity ? "text-destructive" : isUnderUtilized ? "text-warning" : "text-success"
              )}>
                {totalTons} / {maxCapacity} tons ({utilizationPercent.toFixed(1)}%)
              </span>
            </div>
            <Progress 
              value={utilizationPercent} 
              className={cn(
                "h-3",
                isOverCapacity && "[&>div]:bg-destructive",
                isUnderUtilized && "[&>div]:bg-warning"
              )}
            />
            {isOverCapacity && (
              <div className="flex items-center gap-2 text-xs text-destructive">
                <AlertCircle className="h-3 w-3" />
                Over capacity! Remove {totalTons - maxCapacity} tons
              </div>
            )}
            {isUnderUtilized && rake.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-warning">
                <AlertCircle className="h-3 w-3" />
                Under-utilized. Consider adding more orders
              </div>
            )}
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDraggedOver(true)
            }}
            onDragLeave={() => setDraggedOver(false)}
            onDrop={handleDrop}
            className={cn(
              "min-h-[400px] rounded-lg border-2 border-dashed p-4 transition-all",
              draggedOver 
                ? "border-primary bg-primary/5 shadow-lg" 
                : "border-border bg-muted/30",
              rake.length === 0 && "flex items-center justify-center"
            )}
            aria-label="Drop orders here to build rake"
          >
            {rake.length === 0 ? (
              <div className="text-center space-y-2">
                <Package className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                <p className="text-sm text-muted-foreground">
                  Drag orders here to start building your rake
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {rake.map((o, idx) => (
                  <div
                    key={o.id}
                    className="group relative rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition-all animate-in-up"
                    style={{ animationDelay: `${idx * 30}ms` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold">{o.id}</span>
                          {o.priority && (
                            <Badge variant="outline" className={cn("status-pill border text-xs", priorityColors[o.priority])}>
                              {o.priority}
                            </Badge>
                          )}
                        </div>
                        <p className="font-medium text-foreground">{o.customer} — {o.material}</p>
                        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Weight className="h-3 w-3" />
                            {o.tons} tons
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Due {o.due}
                          </span>
                          {o.origin && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {o.origin}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          setRake((prev) => prev.filter((x) => x.id !== o.id))
                          toast.info(`${o.id} removed from rake`)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="text-sm space-y-1">
              <p className="text-muted-foreground">
                Orders: <span className="font-semibold text-foreground">{rake.length}</span>
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setRake([])
                  setExplanation(null)
                  setScore(null)
                  toast.info("Rake cleared")
                }}
                disabled={rake.length === 0}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
              <Button 
                onClick={handleOptimize}
                disabled={rake.length === 0 || optimizing}
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                {optimizing ? "Optimizing..." : "Optimize"}
              </Button>
            </div>
          </div>

          {/* Optimization Results */}
          {explanation && (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="optimization" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="font-medium">Optimization Results</span>
                    {typeof score === "number" && (
                      <Badge variant="outline" className="ml-2">
                        Score: {score.toLocaleString()}
                      </Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {explanation.map((e, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
