"use client"

import { useContext } from "react"
import { RakeBuilder } from "@/components/planner/rake-builder"
import { LanguageContext } from "@/app/providers"
import { FloatingActionButton } from "@/components/ui/fab"
import { Save, Undo2, Redo2, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Page() {
  const { lang } = useContext(LanguageContext)
  const title = lang === "en" ? "Planner Workstation" : "प्लानर वर्कस्टेशन"

  const fabActions = [
    {
      label: lang === "en" ? "Save Draft" : "ड्राफ्ट सेव करें",
      icon: <Save className="h-4 w-4" />,
      onClick: () => console.log("Save draft"),
    },
    {
      label: lang === "en" ? "AI Suggest" : "AI सुझाव",
      icon: <Sparkles className="h-4 w-4" />,
      onClick: () => console.log("AI suggest"),
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
              ? "Design and optimize rake formations for maximum efficiency" 
              : "अधिकतम दक्षता के लिए रेक संरचनाओं को डिज़ाइन और अनुकूलित करें"}
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="gap-1 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-chart-1" />
            {lang === "en" ? "Drafting" : "ड्राफ्टिंग"}
          </Badge>
        </div>
      </div>

      {/* Rake Builder */}
      <RakeBuilder />

      {/* Floating Action Button */}
      <FloatingActionButton 
        actions={fabActions} 
        label={lang === "en" ? "Quick Actions" : "त्वरित क्रियाएं"} 
      />
    </div>
  )
}
