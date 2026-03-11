"use client"

import { Bell, Search, ShieldCheck } from "lucide-react"
import { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SuperAdminMobileMenuButton } from "@/components/super-admin-sidebar"

export function SuperAdminHeader({
  title,
  onMobileMenuClick,
}: {
  title: string
  onMobileMenuClick: () => void
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-4 sm:px-6" suppressHydrationWarning>
      <div className="flex items-center gap-3">
        <SuperAdminMobileMenuButton onClick={onMobileMenuClick} />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-foreground sm:text-xl">{title}</h1>
          <span className="hidden items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary sm:inline-flex">
            <ShieldCheck className="h-3 w-3" />
            Super Admin
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search platform..."
            className="h-9 w-56 rounded-lg border border-input bg-background py-2 pr-4 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>

        {/* Notifications */}
        <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
          <span className="sr-only">Notifications</span>
        </button>

        {/* User dropdown */}
        {mounted && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 rounded-lg p-1.5 h-auto hover:bg-accent">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                    SA
                  </AvatarFallback>
                </Avatar>
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-medium leading-none text-foreground">Super Admin</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">superadmin@qrflow.com</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Super Admin Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>System Settings</DropdownMenuItem>
              <DropdownMenuItem>Audit Log</DropdownMenuItem>
              <DropdownMenuItem>API Keys</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}
