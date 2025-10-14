"use client"
import { useState } from "react"
import useSWR from "swr"
import { fetcher } from "@/lib/swr"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { 
  ArrowUpDown, 
  Search, 
  MapPin, 
  Package, 
  Clock,
  ChevronRight,
  MoreVertical 
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { TableSkeleton } from "@/components/ui/skeleton-loaders"
import { EmptyState } from "@/components/ui/empty-state"

type Rake = {
  id: string
  status: "LOADING" | "IN_TRANSIT" | "ARRIVED" | "DELAYED"
  material: string
  wagonCount: number
  origin: string
  destination: string
  eta: string
  progress?: number
}

const statusConfig = {
  LOADING: { 
    label: "Loading", 
    color: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    icon: Package 
  },
  IN_TRANSIT: { 
    label: "In Transit", 
    color: "bg-info/10 text-info border-info/20",
    icon: MapPin 
  },
  ARRIVED: { 
    label: "Arrived", 
    color: "bg-success/10 text-success border-success/20",
    icon: Clock 
  },
  DELAYED: { 
    label: "Delayed", 
    color: "bg-destructive/10 text-destructive border-destructive/20",
    icon: Clock 
  },
}

export function RakeTable() {
  const { data, isLoading } = useSWR<{ rakes: Rake[] }>("/api/rakes", fetcher, { refreshInterval: 5000 })
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<keyof Rake | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const rakes = data?.rakes ?? []

  const filteredRakes = rakes
    .filter(r => 
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.destination.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0
      const aVal = a[sortField]
      const bVal = b[sortField]
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc" 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal)
      }
      return 0
    })

  const handleSort = (field: keyof Rake) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Rake Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <TableSkeleton rows={5} />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="card-hover">
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-xl">Active Rake Operations</CardTitle>
            <CardDescription className="mt-1">
              Real-time tracking of {rakes.length} active rakes
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search rakes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredRakes.length === 0 ? (
          <EmptyState
            icon="package"
            title="No rakes found"
            description="Try adjusting your search or check back later for updates."
          />
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-muted/50 backdrop-blur z-10">
                  <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <th className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-auto p-0 hover:bg-transparent font-medium"
                        onClick={() => handleSort("id")}
                      >
                        Rake ID
                        <ArrowUpDown className="ml-2 h-3 w-3" />
                      </Button>
                    </th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Progress</th>
                    <th className="py-3 px-4">Material</th>
                    <th className="py-3 px-4">Wagons</th>
                    <th className="py-3 px-4">Route</th>
                    <th className="py-3 px-4">ETA</th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRakes.map((r, idx) => {
                    const statusInfo = statusConfig[r.status]
                    const StatusIcon = statusInfo.icon
                    const progress = r.progress ?? (r.status === "ARRIVED" ? 100 : r.status === "IN_TRANSIT" ? 60 : 30)

                    return (
                      <tr 
                        key={r.id} 
                        className="border-b border-border hover:bg-accent/50 transition-colors group animate-in-up"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <td className="py-4 px-4">
                          <span className="font-mono font-semibold text-foreground">{r.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className={cn("status-pill border", statusInfo.color)}>
                            <StatusIcon className="h-3 w-3" />
                            {statusInfo.label}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 min-w-[120px]">
                            <Progress value={progress} className="h-2 flex-1" />
                            <span className="text-xs text-muted-foreground w-10 text-right">{progress}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-foreground">{r.material}</span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="secondary">{r.wagonCount}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">{r.origin}</span>
                            <ChevronRight className="h-3 w-3 text-muted-foreground" />
                            <span className="text-foreground font-medium">{r.destination}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-muted-foreground">{r.eta}</span>
                        </td>
                        <td className="py-4 px-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Track on Map</DropdownMenuItem>
                              <DropdownMenuItem>Update Status</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {filteredRakes.map((r, idx) => {
                const statusInfo = statusConfig[r.status]
                const StatusIcon = statusInfo.icon
                const progress = r.progress ?? (r.status === "ARRIVED" ? 100 : r.status === "IN_TRANSIT" ? 60 : 30)

                return (
                  <Card 
                    key={r.id} 
                    className="card-hover animate-in-up"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-semibold text-foreground">{r.id}</span>
                        <Badge variant="outline" className={cn("status-pill border", statusInfo.color)}>
                          <StatusIcon className="h-3 w-3" />
                          {statusInfo.label}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{r.origin}</span>
                          <span className="text-foreground font-medium">{r.destination}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">Material</p>
                          <p className="font-medium">{r.material}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Wagons</p>
                          <p className="font-medium">{r.wagonCount}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">ETA</p>
                          <p className="font-medium">{r.eta}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
