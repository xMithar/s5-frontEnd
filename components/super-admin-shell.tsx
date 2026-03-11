"use client"

import { useState } from "react"
import { SuperAdminSidebar } from "@/components/super-admin-sidebar"
import { SuperAdminHeader } from "@/components/super-admin-header"

export function SuperAdminShell({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SuperAdminSidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <SuperAdminHeader
          title={title}
          onMobileMenuClick={() => setMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
