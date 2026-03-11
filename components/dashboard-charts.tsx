"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { TrendingUp } from "lucide-react"

const scanTrendData = [
  { month: "Sep", scans: 4000 },
  { month: "Oct", scans: 5200 },
  { month: "Nov", scans: 4800 },
  { month: "Dec", scans: 7200 },
  { month: "Jan", scans: 8900 },
  { month: "Feb", scans: 10800 },
  { month: "Mar", scans: 13200 },
]

const contentTypeData = [
  { type: "URL", count: 5200 },
  { type: "Text", count: 2800 },
  { type: "WiFi", count: 2100 },
  { type: "Contact", count: 1900 },
  { type: "Menu", count: 1200 },
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

export function DashboardCharts() {
  return (
    <>
      {/* Area chart -- scan trend */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-3">
        <div className="mb-1 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground">Scan Trends</h2>
            <p className="text-sm text-muted-foreground">
              Monthly scans over the last 7 months
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <TrendingUp className="h-3.5 w-3.5" />
            +18.4%
          </div>
        </div>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={scanTrendData}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
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
                dataKey="month"
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

      {/* Bar chart -- content types */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
        <div>
          <h2 className="text-base font-semibold text-foreground">Content Types</h2>
          <p className="text-sm text-muted-foreground">
            Distribution of QR code types
          </p>
        </div>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={contentTypeData}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.915 0.01 260)"
                vertical={false}
              />
              <XAxis
                dataKey="type"
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
              <Bar
                dataKey="count"
                fill="oklch(0.48 0.2 265)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}
