import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Providers } from "./providers"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "SAIL Rake Formation System",
  description: "Enterprise Decision Support System for Rake Formation and Operations Management",
  generator: "SAIL DSS",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
          <Toaster richColors position="top-right" />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
