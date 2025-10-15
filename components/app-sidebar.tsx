"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Settings, 
  Activity, 
  Layout,
  FlaskConical,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface NavItem {
  title: string
  titleHi: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

const navItems: NavItem[] = [
  {
    title: "Executive Dashboard",
    titleHi: "कार्यकारी डैशबोर्ड",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Operations",
    titleHi: "ऑपरेशन्स",
    href: "/operations",
    icon: Activity,
  },
  {
    title: "Planner",
    titleHi: "प्लानर",
    href: "/planner",
    icon: Layout,
  },
  {
    title: "Scenarios",
    titleHi: "परिदृश्य",
    href: "/scenarios",
    icon: FlaskConical,
  },
  {
    title: "Settings",
    titleHi: "सेटिंग्स",
    href: "/settings",
    icon: Settings,
  },
]

interface AppSidebarProps {
  lang?: "en" | "hi"
}

export function AppSidebar({ lang = "en" }: AppSidebarProps) {
  const [collapsed, setCollapsed] = React.useState(false)
  const pathname = usePathname()

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out",
          collapsed ? "w-[var(--sidebar-width-collapsed)]" : "w-[var(--sidebar-width)]"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-[var(--header-height)] items-center justify-between border-b border-sidebar-border px-4">
          {!collapsed && (
            <div className="flex items-center gap-3 animate-in-fade">
              {/* <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                S
              </div> */}
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-orange-400">Steel<span className="text-green-600">link</span></span>
                <span className="text-xs text-muted-foreground">Rake Formation</span>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg mx-auto">
              RS
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            const title = lang === "en" ? item.title : item.titleHi

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-lg transition-colors",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{title}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    {title}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1">{title}</span>
                {item.badge && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Collapse Toggle */}
        <div className="absolute bottom-4 left-0 right-0 px-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "w-full justify-center text-muted-foreground hover:text-foreground",
              collapsed && "px-0"
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span className="text-xs">Collapse</span>
              </>
            )}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  )
}
