"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Bell, Moon, Sun, User, ChevronRight, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface TopbarProps {
  lang?: "en" | "hi"
  onLanguageChange?: () => void
  onThemeChange?: () => void
  theme?: "light" | "dark"
}

const routeLabels: Record<string, { en: string; hi: string }> = {
  "/": { en: "Executive Dashboard", hi: "कार्यकारी डैशबोर्ड" },
  "/operations": { en: "Operations", hi: "ऑपरेशन्स" },
  "/planner": { en: "Planner", hi: "प्लानर" },
  "/scenarios": { en: "Scenarios", hi: "परिदृश्य" },
  "/settings": { en: "Settings", hi: "सेटिंग्स" },
}

export function Topbar({ lang = "en", onLanguageChange, onThemeChange, theme = "light" }: TopbarProps) {
  const pathname = usePathname()
  const [notificationCount] = React.useState(3)

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean)
    const crumbs = [{ label: routeLabels["/"][lang], href: "/" }]

    if (segments.length > 0) {
      const currentPath = `/${segments[0]}`
      const label = routeLabels[currentPath]
      if (label) {
        crumbs.push({ label: label[lang], href: currentPath })
      }
    }

    return crumbs
  }

  const breadcrumbs = getBreadcrumbs()
  const currentLabel = breadcrumbs[breadcrumbs.length - 1]?.label || "Dashboard"

  return (
    <header className="fixed top-0 right-0 left-0 md:left-[var(--sidebar-width)] z-30 h-[var(--header-height)] border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 transition-all duration-300">
      <div className="flex h-full items-center justify-between px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-foreground">{currentLabel}</h1>
          {breadcrumbs.length > 1 && (
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <ChevronRight className="h-4 w-4" />
              <nav aria-label="Breadcrumb" className="flex items-center gap-2">
                {breadcrumbs.slice(0, -1).map((crumb, index) => (
                  <React.Fragment key={crumb.href}>
                    {index > 0 && <ChevronRight className="h-3 w-3" />}
                    <span className="text-xs">{crumb.label}</span>
                  </React.Fragment>
                ))}
              </nav>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onLanguageChange}
            className="hidden md:flex h-9 gap-2 text-xs font-medium"
            aria-label={lang === "en" ? "Switch to Hindi" : "Switch to English"}
          >
            <span className="text-muted-foreground">{lang === "en" ? "EN" : "हि"}</span>
            <span className="text-foreground">{lang === "en" ? "हिंदी" : "English"}</span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onThemeChange}
            className="h-9 w-9"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-9 w-9" aria-label="Notifications">
                <Bell className="h-4 w-4" />
                {notificationCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="font-semibold">
                {lang === "en" ? "Notifications" : "सूचनाएं"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="flex items-start gap-2 w-full">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Rake R-2401 delayed</p>
                      <p className="text-xs text-muted-foreground">Weather conditions at loading point</p>
                      <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="flex items-start gap-2 w-full">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">New order assigned</p>
                      <p className="text-xs text-muted-foreground">Order #ORD-1245 - 500 tons</p>
                      <p className="text-xs text-muted-foreground mt-1">15 minutes ago</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="flex items-start gap-2 w-full">
                    <div className="h-2 w-2 rounded-full bg-muted mt-1.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Optimization complete</p>
                      <p className="text-xs text-muted-foreground">Monte Carlo scenario processed</p>
                      <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-xs text-primary font-medium">
                {lang === "en" ? "View all notifications" : "सभी सूचनाएं देखें"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full" aria-label="User menu">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatar-placeholder.png" alt="User avatar" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@sail.in</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>{lang === "en" ? "Profile" : "प्रोफ़ाइल"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>{lang === "en" ? "Settings" : "सेटिंग्स"}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>{lang === "en" ? "Log out" : "लॉग आउट"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
