"use client"

import { Suspense, useContext } from "react"
import { KPIGrid } from "@/components/dashboard/kpi-grid"
import { TonnageChart } from "@/components/dashboard/tonnage-chart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, RefreshCw, Download, TrendingUp, Activity, AlertCircle } from "lucide-react"
import { DashboardSkeleton } from "@/components/ui/skeleton-loaders"
import { LanguageContext } from "@/app/providers"
import { FloatingActionButton } from "@/components/ui/fab"
import { Plus, FileText, Truck } from "lucide-react"

export default function Page() {
  const { lang } = useContext(LanguageContext)
  const title = lang === "en" ? "Executive Dashboard" : "कार्यकारी डैशबोर्ड"

  const fabActions = [
    {
      label: lang === "en" ? "Create Order" : "आदेश बनाएं",
      icon: <Plus className="h-4 w-4" />,
      onClick: () => console.log("Create order"),
    },
    {
      label: lang === "en" ? "Generate Report" : "रिपोर्ट बनाएं",
      icon: <FileText className="h-4 w-4" />,
      onClick: () => console.log("Generate report"),
    },
    {
      label: lang === "en" ? "Track Rake" : "रेक ट्रैक करें",
      icon: <Truck className="h-4 w-4" />,
      onClick: () => console.log("Track rake"),
    },
  ]

  return (
    <div className="space-y-6 animate-in-fade">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">{title}</h1>
          <p className="text-muted-foreground mt-1">
            {lang === "en" 
              ? "Real-time insights and operational metrics" 
              : "वास्तविक समय अंतर्दृष्टि और परिचालन मेट्रिक्स"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            {lang === "en" ? "Export" : "निर्यात"}
          </Button>
          <Button size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {lang === "en" ? "Refresh" : "रिफ़्रेश"}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <Suspense fallback={<DashboardSkeleton />}>
        <KPIGrid />
      </Suspense>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Dispatch Tonnage Chart - Takes 4 columns */}
        <Card className="lg:col-span-4 card-hover">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {lang === "en" ? "Dispatch Tonnage Trends" : "प्रेषण टन रुझान"}
                </CardTitle>
                <CardDescription className="mt-1">
                  {lang === "en" ? "Last 30 days performance" : "पिछले 30 दिनों का प्रदर्शन"}
                </CardDescription>
              </div>
              <Badge variant="outline" className="gap-1">
                <Activity className="h-3 w-3" />
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tonnage" className="w-full">
              <TabsList className="grid w-full max-w-[400px] grid-cols-3">
                <TabsTrigger value="tonnage">Tonnage</TabsTrigger>
                <TabsTrigger value="cost">Cost</TabsTrigger>
                <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
              </TabsList>
              <TabsContent value="tonnage" className="mt-6">
                <TonnageChart />
              </TabsContent>
              <TabsContent value="cost" className="mt-6">
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Cost analysis chart coming soon
                </div>
              </TabsContent>
              <TabsContent value="efficiency" className="mt-6">
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Efficiency metrics chart coming soon
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Live Rake Map - Takes 3 columns */}
        <Card className="lg:col-span-3 card-hover">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {lang === "en" ? "Live Rake Tracking" : "लाइव रेक ट्रैकिंग"}
                </CardTitle>
                <CardDescription className="mt-1">
                  {lang === "en" ? "Real-time rake locations" : "वास्तविक समय रेक स्थान"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-muted relative">
              <img 
                src="/india-map-with-rail-rakes.jpg" 
                alt="Live map placeholder" 
                className="h-full w-full object-cover" 
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge className="bg-success text-success-foreground">
                  12 Active
                </Badge>
                <Badge variant="outline" className="bg-background/95">
                  <AlertCircle className="h-3 w-3 mr-1 text-warning" />
                  2 Delayed
                </Badge>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-success" />
                <span className="text-muted-foreground">In Transit: 12</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-3" />
                <span className="text-muted-foreground">Loading: 5</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-warning" />
                <span className="text-muted-foreground">Delayed: 2</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-muted" />
                <span className="text-muted-foreground">Idle: 3</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-warning" />
            {lang === "en" ? "Recent Alerts & Events" : "हाल की अलर्ट और घटनाएं"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                title: "Weather Alert",
                desc: "Heavy rainfall expected at Bokaro loading point",
                time: "5 min ago",
                severity: "high",
              },
              {
                title: "Rake R-2401 Delayed",
                desc: "Technical issue resolved, resuming operations",
                time: "15 min ago",
                severity: "medium",
              },
              {
                title: "Optimization Complete",
                desc: "New rake formation suggestions available",
                time: "1 hour ago",
                severity: "low",
              },
            ].map((alert, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div
                  className={`mt-0.5 h-2 w-2 rounded-full ${
                    alert.severity === "high"
                      ? "bg-destructive"
                      : alert.severity === "medium"
                      ? "bg-warning"
                      : "bg-info"
                  }`}
                />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-foreground">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.desc}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Floating Action Button */}
      <FloatingActionButton actions={fabActions} label={lang === "en" ? "Quick Actions" : "त्वरित क्रियाएं"} />
    </div>
  )
}
