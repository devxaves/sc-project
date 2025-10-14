"use client"

import { useContext } from "react"
import { RakeTable } from "@/components/operations/rake-table"
import { EventFeed } from "@/components/operations/event-feed"
import { LanguageContext } from "@/app/providers"
import { FloatingActionButton } from "@/components/ui/fab"
import { Plus, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Page() {
  const { lang } = useContext(LanguageContext)
  const title = lang === "en" ? "Operations Control Center" : "ऑपरेशन नियंत्रण केंद्र"

  const fabActions = [
    {
      label: lang === "en" ? "Report Incident" : "घटना रिपोर्ट करें",
      icon: <AlertCircle className="h-4 w-4" />,
      onClick: () => console.log("Report incident"),
    },
    {
      label: lang === "en" ? "Update Status" : "स्थिति अपडेट करें",
      icon: <RefreshCw className="h-4 w-4" />,
      onClick: () => console.log("Update status"),
    },
    {
      label: lang === "en" ? "Create Alert" : "अलर्ट बनाएं",
      icon: <Plus className="h-4 w-4" />,
      onClick: () => console.log("Create alert"),
    },
  ]

  return (
    <div className="space-y-6 animate-in-fade">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">{title}</h1>
          <p className="text-muted-foreground mt-1">
            {lang === "en" 
              ? "Monitor and manage active rake operations" 
              : "सक्रिय रेक संचालन की निगरानी और प्रबंधन करें"}
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="gap-1 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            {lang === "en" ? "Live" : "लाइव"}
          </Badge>
        </div>
      </div>

      {/* Rake Table */}
      <RakeTable />

      {/* Event Feed */}
      <EventFeed />

      {/* Floating Action Button */}
      <FloatingActionButton 
        actions={fabActions} 
        label={lang === "en" ? "Quick Actions" : "त्वरित क्रियाएं"} 
      />
    </div>
  )
}
