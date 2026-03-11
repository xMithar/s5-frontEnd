"use client"

import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts"

const stats = [
  {
    label: "Total Scans",
    value: "12,847",
    change: "+23.5%",
    trend: "up" as const,
  },
  {
    label: "Active QR Codes",
    value: "847",
    change: "+12.3%",
    trend: "up" as const,
  },
  {
    label: "Top Performing",
    value: "3,241 scans",
    change: "+45.2%",
    trend: "up" as const,
  },
  {
    label: "Scans This Month",
    value: "4,592",
    change: "+8.1%",
    trend: "up" as const,
  },
]

const scansData = [
  { week: "Week 1", scans: 2100 },
  { week: "Week 2", scans: 2800 },
  { week: "Week 3", scans: 2400 },
  { week: "Week 4", scans: 3200 },
  { week: "Week 5", scans: 2900 },
]

const deviceData = [
  { name: "Mobile", scans: 8900 },
  { name: "Desktop", scans: 2400 },
  { name: "Tablet", scans: 1547 },
]

const browserData = [
  { name: "Safari", scans: 4200 },
  { name: "Chrome", scans: 3800 },
  { name: "Firefox", scans: 2400 },
  { name: "Other", scans: 1447 },
]

const countryData = [
  { country: "United States", scans: 5200, pct: 40 },
  { country: "United Kingdom", scans: 2100, pct: 16 },
  { country: "Canada", scans: 1800, pct: 14 },
  { country: "Australia", scans: 1400, pct: 11 },
  { country: "Other", scans: 1347, pct: 19 },
]

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

export function AdminAnalyticsContent() {
  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
              {stat.value}
            </p>
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
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Scans over time */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">Scans Over Time</h2>
          <p className="text-sm text-muted-foreground">Weekly scans trend</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scansData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey="week"
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
                <Area
                  type="monotone"
                  dataKey="scans"
                  stroke="oklch(0.48 0.2 265)"
                  strokeWidth={2.5}
                  fill="url(#scanGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device breakdown */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">Scans by Device</h2>
          <p className="text-sm text-muted-foreground">Device type distribution</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deviceData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
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
                <Bar dataKey="scans" fill="oklch(0.48 0.2 265)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom row charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Browser breakdown */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">Scans by Browser</h2>
          <p className="text-sm text-muted-foreground">Browser type breakdown</p>
          <div className="mt-4 space-y-3">
            {browserData.map((item) => {
              const total = browserData.reduce((sum, d) => sum + d.scans, 0)
              const pct = (item.scans / total) * 100
              return (
                <div key={item.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{item.name}</span>
                    <span className="text-muted-foreground">{item.scans.toLocaleString()}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Country breakdown */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">Scans by Country</h2>
          <p className="text-sm text-muted-foreground">Top regions by scan volume</p>
          <div className="mt-4 space-y-3">
            {countryData.map((item) => (
              <div key={item.country}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{item.country}</span>
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
    </div>
  )
}
