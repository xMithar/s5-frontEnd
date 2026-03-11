"use client"

import { TrendingUp } from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts"

/* ============================================================================ */
/*  Mock data                                                                   */
/* ============================================================================ */

const scansOverTimeData = [
  { month: "Jan", scans: 324000 },
  { month: "Feb", scans: 421000 },
  { month: "Mar", scans: 389000 },
  { month: "Apr", scans: 512000 },
  { month: "May", scans: 687000 },
  { month: "Jun", scans: 743000 },
  { month: "Jul", scans: 921000 },
  { month: "Aug", scans: 1087000 },
  { month: "Sep", scans: 1243000 },
  { month: "Oct", scans: 1456000 },
  { month: "Nov", scans: 1789000 },
  { month: "Dec", scans: 2401000 },
]

const scansByCountry = [
  { country: "United States", scans: 1121400, pct: 46.8 },
  { country: "United Kingdom", scans: 389200, pct: 16.2 },
  { country: "Canada", scans: 234100, pct: 9.8 },
  { country: "Australia", scans: 156800, pct: 6.5 },
  { country: "Germany", scans: 134600, pct: 5.6 },
  { country: "Other", scans: 265900, pct: 15.1 },
]

const scansByDevice = [
  { device: "iOS", scans: 1089400, pct: 45.4 },
  { device: "Android", scans: 1023600, pct: 42.7 },
  { device: "Desktop", scans: 289100, pct: 12.1 },
]

const scansByBrowser = [
  { name: "Safari", scans: 987200, color: "#007AFF" },
  { name: "Chrome", scans: 876400, color: "#4285F4" },
  { name: "Firefox", scans: 234500, color: "#FF7139" },
  { name: "Samsung Internet", scans: 156300, color: "#1428A0" },
  { name: "Other", scans: 98200, color: "#9CA3AF" },
]

/* ============================================================================ */
/*  Helper components                                                           */
/* ============================================================================ */

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { value: number }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">
        {payload[0].value.toLocaleString()} scans
      </p>
    </div>
  )
}

/* ============================================================================ */
/*  Main component                                                              */
/* ============================================================================ */

export function PlatformAnalyticsContent() {
  return (
    <div className="space-y-6">
      {/* Scans over time - Full width */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground">Scans Over Time</h2>
            <p className="text-sm text-muted-foreground">Monthly platform scans trend</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <TrendingUp className="h-3.5 w-3.5" />
            +640%
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={scansOverTimeData}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="scansGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.48 0.2 265)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="oklch(0.48 0.2 265)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.915 0.01 260)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "oklch(0.50 0.02 260)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "oklch(0.50 0.02 260)" }}
                axisLine={false}
                tickLine={false}
                label={{ value: "Scans", angle: -90, position: "insideLeft" }}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="scans"
                stroke="oklch(0.48 0.2 265)"
                strokeWidth={2.5}
                fill="url(#scansGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two-column charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Scans by Country */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-foreground">Scans by Country</h2>
            <p className="text-sm text-muted-foreground">Top regions by scan volume</p>
          </div>
          <div className="space-y-3">
            {scansByCountry.map((item) => (
              <div key={item.country}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{item.country}</span>
                  <span className="text-muted-foreground">{item.scans.toLocaleString()}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scans by Device */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-foreground">Scans by Device (OS)</h2>
            <p className="text-sm text-muted-foreground">Operating system breakdown</p>
          </div>
          <div className="space-y-3">
            {scansByDevice.map((item) => (
              <div key={item.device}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{item.device}</span>
                  <span className="text-muted-foreground">{item.scans.toLocaleString()}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-chart-2 transition-all"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scans by Browser */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-foreground">Scans by Browser</h2>
          <p className="text-sm text-muted-foreground">User agent distribution</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={scansByBrowser}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.915 0.01 260)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "oklch(0.50 0.02 260)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "oklch(0.50 0.02 260)" }}
                axisLine={false}
                tickLine={false}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Bar dataKey="scans" radius={[6, 6, 0, 0]}>
                {scansByBrowser.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
