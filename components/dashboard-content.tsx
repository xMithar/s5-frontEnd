"use client"

import Link from "next/link"
import { useState } from "react"
import {
  QrCode,
  ScanLine,
  CheckCircle2,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Copy,
  MoreHorizontal,
  TrendingUp,
  Check,
} from "lucide-react"
import { DashboardCharts } from "./dashboard-charts"

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const stats = [
  {
    label: "Total QR Codes",
    value: "1,284",
    change: "+12.5%",
    trend: "up" as const,
    icon: QrCode,
    description: "All time",
  },
  {
    label: "Total Scans",
    value: "48,392",
    change: "+8.2%",
    trend: "up" as const,
    icon: ScanLine,
    description: "All time",
  },
  {
    label: "Active QR Codes",
    value: "967",
    change: "+4.1%",
    trend: "up" as const,
    icon: CheckCircle2,
    description: "Currently live",
  },
  {
    label: "This Month Scans",
    value: "6,847",
    change: "-3.2%",
    trend: "down" as const,
    icon: CalendarDays,
    description: "March 2026",
  },
]

const recentQRCodes = [
  {
    id: "qr-001",
    name: "Summer Sale 2026",
    type: "URL",
    scans: 1243,
    status: "Active",
    date: "Feb 28, 2026",
    url: "qrflow.io/s/summer26",
  },
  {
    id: "qr-002",
    name: "Product Launch",
    type: "URL",
    scans: 892,
    status: "Active",
    date: "Feb 25, 2026",
    url: "qrflow.io/s/launch",
  },
  {
    id: "qr-003",
    name: "Event Registration",
    type: "vCard",
    scans: 567,
    status: "Paused",
    date: "Feb 20, 2026",
    url: "qrflow.io/s/event-reg",
  },
  {
    id: "qr-004",
    name: "Restaurant Menu",
    type: "URL",
    scans: 2341,
    status: "Active",
    date: "Feb 15, 2026",
    url: "qrflow.io/s/menu",
  },
  {
    id: "qr-005",
    name: "WiFi Access",
    type: "WiFi",
    scans: 198,
    status: "Active",
    date: "Feb 10, 2026",
    url: "qrflow.io/s/wifi",
  },
  {
    id: "qr-006",
    name: "Contact Card",
    type: "vCard",
    scans: 421,
    status: "Draft",
    date: "Feb 5, 2026",
    url: "qrflow.io/s/contact",
  },
]

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Active"
      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
      : status === "Paused"
        ? "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"
        : "bg-muted text-muted-foreground ring-1 ring-border"

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles}`}
    >
      <span
        className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
          status === "Active"
            ? "bg-emerald-500"
            : status === "Paused"
              ? "bg-amber-500"
              : "bg-muted-foreground"
        }`}
      />
      {status}
    </span>
  )
}

function TypeBadge({ type }: { type: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-primary/8 px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-primary/15">
      {type}
    </span>
  )
}

function CopyButton({ url, name }: { url: string; name: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${url}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = `https://${url}`
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
        copied
          ? "bg-emerald-100 text-emerald-600"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      }`}
      aria-label={copied ? "Copied!" : `Copy link for ${name}`}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  )
}



/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* ---------- Stats cards ---------- */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </span>
                  <p className="text-2xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                {stat.trend === "up" ? (
                  <span className="flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                    <ArrowUpRight className="h-3 w-3" />
                    {stat.change}
                  </span>
                ) : (
                  <span className="flex items-center gap-0.5 rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600">
                    <ArrowDownRight className="h-3 w-3" />
                    {stat.change}
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  {stat.description}
                </span>
              </div>
              {/* Decorative accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary/0 transition-colors group-hover:bg-primary/40" />
            </div>
          )
        })}
      </div>

      {/* ---------- Charts row ---------- */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <DashboardCharts />
      </div>

      {/* ---------- Table + sidebar ---------- */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent QR Codes table */}
        <div className="rounded-xl border border-border bg-card shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Recent QR Codes
              </h2>
              <p className="text-sm text-muted-foreground">
                Your latest created codes
              </p>
            </div>
            <Link
              href="/admin/qr-codes"
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Name
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Type
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Scans
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Created
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentQRCodes.map((qr) => (
                  <tr
                    key={qr.id}
                    className="border-b border-border transition-colors last:border-0 hover:bg-muted/30"
                  >
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/admin/qr-codes/${qr.id}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <QrCode className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">{qr.name}</p>
                          <p className="text-xs text-muted-foreground">{qr.url}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-5 py-3.5">
                      <TypeBadge type={qr.type} />
                    </td>
                    <td className="px-5 py-3.5 font-medium text-foreground">
                      {qr.scans.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={qr.status} />
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">{qr.date}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <CopyButton url={qr.url} name={qr.name} />
                        <a
                          href={`https://${qr.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          aria-label={`Open ${qr.name} in new tab`}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                        <Link
                          href={`/admin/qr-codes/${qr.id}`}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          aria-label={`View details for ${qr.name}`}
                        >
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions + usage panel */}
        <div className="flex flex-col gap-6">
          {/* Quick Actions */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-foreground">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                href="/admin/create"
                className="flex w-full items-center gap-3 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90"
              >
                <QrCode className="h-5 w-5" />
                Create New QR Code
              </Link>
              <Link
                href="/admin/analytics"
                className="flex w-full items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <ScanLine className="h-5 w-5" />
                Scan Analytics
              </Link>
              <Link
                href="/admin/analytics"
                className="flex w-full items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <TrendingUp className="h-5 w-5" />
                View Reports
              </Link>
            </div>
          </div>

          {/* Plan usage */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-foreground">
              Plan Usage
            </h2>
            <div className="space-y-4">
              {/* QR Codes limit */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">QR Codes</span>
                  <span className="text-sm font-medium text-foreground">
                    1,284 / 2,000
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: "64%" }}
                  />
                </div>
              </div>
              {/* Scans limit */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Monthly Scans</span>
                  <span className="text-sm font-medium text-foreground">
                    6,847 / 10,000
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-chart-2 transition-all"
                    style={{ width: "68%" }}
                  />
                </div>
              </div>
              {/* Storage */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Storage</span>
                  <span className="text-sm font-medium text-foreground">
                    1.2 GB / 5 GB
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-chart-3 transition-all"
                    style={{ width: "24%" }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-primary/5 p-3">
              <p className="text-xs text-muted-foreground">
                You are on the <span className="font-semibold text-primary">Pro Plan</span>. Upgrade for higher limits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
