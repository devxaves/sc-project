"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { AppSidebar } from "@/components/app-sidebar"
import { Topbar } from "@/components/topbar"
import { LanguageContext } from "@/app/providers"
import { Suspense } from "react"
import { Spinner } from "@/components/ui/spinner"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { lang, setLang } = React.useContext(LanguageContext)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleLanguageToggle = () => {
    setLang(lang === "en" ? "hi" : "en")
  }

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="relative min-h-screen bg-background">
      <AppSidebar lang={lang} />
      <div className="md:pl-[var(--sidebar-width)] transition-all duration-300">
        <Topbar
          lang={lang}
          theme={theme as "light" | "dark"}
          onLanguageChange={handleLanguageToggle}
          onThemeChange={handleThemeToggle}
        />
        <main className="pt-[var(--header-height)] min-h-screen">
          <div className="container mx-auto px-6 py-8 max-w-[1600px]">
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-[400px]">
                  <Spinner className="h-8 w-8" />
                </div>
              }
            >
              {children}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}
