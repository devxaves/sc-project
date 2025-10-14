"use client"
import { useState } from "react"
import useSWR from "swr"
import { fetcher } from "@/lib/swr"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  AlertCircle, 
  Info, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Filter
} from "lucide-react"
import { cn } from "@/lib/utils"
import { EmptyState } from "@/components/ui/empty-state"
import { toast } from "sonner"

type Event = { 
  id: string
  time: string
  kind: "ALERT" | "INFO" | "WARNING" | "TECHNICAL"
  message: string
  severity?: "high" | "medium" | "low"
  status?: "pending" | "resolved" | "acknowledged"
  location?: string
}

const eventConfig = {
  ALERT: { 
    icon: AlertCircle, 
    color: "text-destructive", 
    bgColor: "bg-destructive/10 border-destructive/20" 
  },
  WARNING: { 
    icon: AlertTriangle, 
    color: "text-warning", 
    bgColor: "bg-warning/10 border-warning/20" 
  },
  INFO: { 
    icon: Info, 
    color: "text-info", 
    bgColor: "bg-info/10 border-info/20" 
  },
  TECHNICAL: { 
    icon: AlertTriangle, 
    color: "text-chart-4", 
    bgColor: "bg-chart-4/10 border-chart-4/20" 
  },
}

const severityDot = {
  high: "bg-destructive",
  medium: "bg-warning",
  low: "bg-info",
}

export function EventFeed() {
  const { data, isLoading } = useSWR<{ events: Event[] }>("/api/operations/events", fetcher, { refreshInterval: 4000 })
  const [filter, setFilter] = useState<"all" | "pending" | "resolved">("all")
  
  const allEvents: Event[] = data?.events ?? [
    {
      id: "1",
      time: "5 min ago",
      kind: "ALERT",
      message: "Weather alert: Heavy rainfall at Bokaro loading point",
      severity: "high",
      status: "pending",
      location: "Bokaro",
    },
    {
      id: "2",
      time: "15 min ago",
      kind: "WARNING",
      message: "Rake R-2401 delayed due to technical issue",
      severity: "medium",
      status: "acknowledged",
      location: "Dhanbad Junction",
    },
    {
      id: "3",
      time: "32 min ago",
      kind: "INFO",
      message: "Rake R-2398 successfully arrived at destination",
      severity: "low",
      status: "resolved",
      location: "Mumbai Port",
    },
    {
      id: "4",
      time: "1 hour ago",
      kind: "TECHNICAL",
      message: "Wagon maintenance scheduled for R-2405",
      severity: "low",
      status: "pending",
      location: "Rourkela",
    },
  ]

  const filteredEvents = allEvents.filter(e => {
    if (filter === "all") return true
    return e.status === filter
  })

  const handleAcknowledge = (eventId: string) => {
    toast.success("Event acknowledged successfully")
  }

  const handleEscalate = (eventId: string) => {
    toast.info("Event escalated to supervisor")
  }

  const handleResolve = (eventId: string) => {
    toast.success("Event marked as resolved")
  }

  return (
    <Card className="card-hover">
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Live Event Timeline
            </CardTitle>
            <CardDescription className="mt-1">
              Real-time operational events and alerts
            </CardDescription>
          </div>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="w-full md:w-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">
                Pending
                <Badge variant="secondary" className="ml-1.5 h-4 px-1.5 text-[10px]">
                  {allEvents.filter(e => e.status === "pending").length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {filteredEvents.length === 0 ? (
          <EmptyState
            icon="inbox"
            title="No events found"
            description="All systems operating normally. New events will appear here."
          />
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[17px] top-6 bottom-6 w-0.5 bg-border" />
            
            {/* Events */}
            <div className="space-y-4">
              {filteredEvents.map((e, idx) => {
                const config = eventConfig[e.kind]
                const Icon = config.icon
                const severity = e.severity || "low"

                return (
                  <div 
                    key={e.id} 
                    className="relative pl-12 animate-in-up"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-2 flex items-center justify-center">
                      <div className={cn(
                        "h-9 w-9 rounded-full border-2 border-background flex items-center justify-center",
                        config.bgColor
                      )}>
                        <Icon className={cn("h-4 w-4", config.color)} />
                      </div>
                    </div>

                    {/* Event card */}
                    <Card className={cn(
                      "border transition-all hover:shadow-md",
                      e.status === "resolved" && "opacity-60"
                    )}>
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-3">
                          {/* Header */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className={cn("h-2 w-2 rounded-full animate-pulse", severityDot[severity])} />
                              <Badge variant="outline" className={cn("status-pill border", config.bgColor)}>
                                {e.kind}
                              </Badge>
                              {e.location && (
                                <Badge variant="secondary" className="text-xs">
                                  {e.location}
                                </Badge>
                              )}
                              {e.status === "resolved" && (
                                <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/20">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Resolved
                                </Badge>
                              )}
                              {e.status === "acknowledged" && (
                                <Badge variant="secondary">
                                  Acknowledged
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{e.time}</span>
                          </div>

                          {/* Message */}
                          <p className="text-sm text-foreground leading-relaxed">{e.message}</p>

                          {/* Actions */}
                          {e.status === "pending" && (
                            <div className="flex gap-2 pt-2 border-t border-border">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleAcknowledge(e.id)}
                                className="h-8 text-xs"
                              >
                                Acknowledge
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEscalate(e.id)}
                                className="h-8 text-xs gap-1"
                              >
                                Escalate
                                <ArrowUpRight className="h-3 w-3" />
                              </Button>
                              {severity === "low" && (
                                <Button 
                                  size="sm" 
                                  onClick={() => handleResolve(e.id)}
                                  className="h-8 text-xs ml-auto"
                                >
                                  Resolve
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
