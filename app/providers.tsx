"use client"
import React from "react"
import { ThemeProvider as NextThemeProvider } from "next-themes"

type Lang = "en" | "hi"
type LangContext = { lang: Lang; setLang: (l: Lang) => void }

export const LanguageContext = React.createContext<LangContext>({
  lang: "en",
  setLang: () => {},
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = React.useState<Lang>("en")

  React.useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("lang") : null
    if (saved === "en" || saved === "hi") setLang(saved)
  }, [])
  React.useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem("lang", lang)
  }, [lang])

  return (
    <NextThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <LanguageContext.Provider value={{ lang, setLang }}>
        {children}
      </LanguageContext.Provider>
    </NextThemeProvider>
  )
}
