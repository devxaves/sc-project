"use client"
import Link from "next/link"
import { useContext } from "react"
import { LanguageContext } from "@/app/providers"
import { Button } from "@/components/ui/button"

export function Nav() {
  const { lang, setLang } = useContext(LanguageContext)
  const toggleLabel = lang === "en" ? "हिंदी" : "English"

  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-sm font-medium text-foreground hover:opacity-80">
          {lang === "en" ? "Executive Dashboard" : "कार्यकारी डैशबोर्ड"}
        </Link>
        <Link href="/operations" className="text-sm font-medium text-foreground hover:opacity-80">
          {lang === "en" ? "Operations" : "ऑपरेशन्स"}
        </Link>
        <Link href="/planner" className="text-sm font-medium text-foreground hover:opacity-80">
          {lang === "en" ? "Planner" : "प्लानर"}
        </Link>
        <Link href="/scenarios" className="text-sm font-medium text-foreground hover:opacity-80">
          {lang === "en" ? "Scenarios" : "परिदृश्य"}
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground text-xs">{lang === "en" ? "Language" : "भाषा"}</span>
        <Button variant="outline" onClick={() => setLang(lang === "en" ? "hi" : "en")} className="h-8">
          {toggleLabel}
        </Button>
      </div>
    </nav>
  )
}
