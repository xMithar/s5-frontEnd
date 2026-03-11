"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  QrCode,
  PlusCircle,
  BarChart3,
  User,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "My QR Codes", href: "/admin/qr-codes", icon: QrCode },
  { label: "Create QR Code", href: "/admin/create", icon: PlusCircle },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Profile", href: "/admin/profile", icon: User },
]

export function AdminSidebar({
  mobileOpen,
  onMobileClose,
}: {
  mobileOpen: boolean
  onMobileClose: () => void
}) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
          collapsed ? "w-[72px]" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:relative lg:translate-x-0"
        )}
      >
        {/* Logo area */}
        <div className="flex h-16 items-center justify-between px-4">
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-2.5">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ScanDz%20logo-7J1ybfWOdR79DjGOswyhMbITWPE8Q3.png"
                alt="ScanDz"
                className="h-8 w-8"
              />
              <span className="text-lg font-semibold tracking-tight text-sidebar-foreground">
                ScanDz
              </span>
            </Link>
          )}
          {collapsed && (
            <Link href="/admin" className="mx-auto flex items-center justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ScanDz%20logo-7J1ybfWOdR79DjGOswyhMbITWPE8Q3.png"
                alt="ScanDz"
                className="h-8 w-8"
              />
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden rounded-md p-1 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground lg:block"
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform duration-300",
                collapsed && "rotate-180"
              )}
            />
          </button>
          <button
            onClick={onMobileClose}
            className="rounded-md p-1 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground lg:hidden"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Role badge */}
        {!collapsed && (
          <div className="mx-3 mb-2 rounded-lg border border-sidebar-border bg-sidebar-accent/60 px-3 py-2">
            <p className="text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/50">
              Role
            </p>
            <p className="text-sm font-semibold text-sidebar-primary">Admin</p>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-sidebar-border px-3 py-4">
          <button
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  )
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:hidden"
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Open menu</span>
    </button>
  )
}
