"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface FABAction {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  variant?: "default" | "destructive" | "outline"
}

interface FloatingActionButtonProps {
  actions: FABAction[]
  label?: string
  className?: string
}

export function FloatingActionButton({ actions, label = "Quick Actions", className }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  if (actions.length === 1) {
    const action = actions[0]
    return (
      <Button
        size="lg"
        onClick={action.onClick}
        className={cn(
          "fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110",
          "md:h-auto md:w-auto md:rounded-lg md:px-6",
          className
        )}
        aria-label={action.label}
      >
        {action.icon || <Plus className="h-6 w-6 md:mr-2" />}
        <span className="hidden md:inline">{action.label}</span>
      </Button>
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          className={cn(
            "fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200",
            isOpen && "rotate-45",
            className
          )}
          aria-label={label}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 mb-2">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => {
              action.onClick()
              setIsOpen(false)
            }}
            className="cursor-pointer"
          >
            {action.icon && <span className="mr-2">{action.icon}</span>}
            <span>{action.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
