"use client"

import {
  Users,
  QrCode,
  ScanLine,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Server,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts"

const platformStats = [
  {
    label: "Total Admins",
    value: "342",
    change: "+18",
    trend: "up" as const,
    icon: Users,
    description: "Active admin accounts",
  },
  {
    label: "Total QR Codes",
    value: "127,849",
    change: "+3,241",
    trend: "up" as const,
    icon: QrCode,
    description: "Across all accounts",
  },
  {
    label: "Platform Scans",
    value: "2.4M",
    change: "+12.8%",
    trend: "up" as const,
    icon: ScanLine,
    description: "Last 30 days",
  },
  {
    label: "Monthly Revenue",
    value: "$48,290",
    change: "+6.3%",
    trend: "up" as const,
    icon: DollarSign,
    description: "Recurring revenue",
  },
]

const systemHealth = [
  { label: "API Uptime", value: "99.98%", status: "healthy" },
  { label: "Avg Response Time", value: "142ms", status: "healthy" },
  { label: "Error Rate", value: "0.03%", status: "healthy" },
  { label: "Queue Backlog", value: "12", status: "warning" },
]

const topAdmins = [
  { name: "Acme Corp", email: "admin@acme.com", qrCodes: 4521, scans: 182340, plan: "Enterprise", status: "Active" },
  { name: "TechStart Inc", email: "admin@techstart.io", qrCodes: 2893, scans: 98412, plan: "Pro", status: "Active" },
  { name: "FoodChain HQ", email: "ops@foodchain.com", qrCodes: 1847, scans: 67293, plan: "Pro", status: "Active" },
  { name: "RetailMax", email: "digital@retailmax.com", qrCodes: 1204, scans: 45102, plan: "Business", status: "Active" },
  { name: "EventPro", email: "admin@eventpro.co", qrCodes: 983, scans: 34891, plan: "Business", status: "Suspended" },
  { name: "HealthPlus", email: "it@healthplus.org", qrCodes: 756, scans: 28103, plan: "Pro", status: "Active" },
]

const recentActivity = [
  { action: "New admin registered", detail: "GreenTech Solutions", time: "2 min ago", type: "info" },
  { action: "Plan upgraded", detail: "RetailMax: Business to Enterprise", time: "15 min ago", type: "success" },
  { action: "Account flagged", detail: "SpamBot LLC - suspicious activity", time: "32 min ago", type: "warning" },
  { action: "Bulk QR generation", detail: "Acme Corp: 500 codes", time: "1 hr ago", type: "info" },
  { action: "Payment failed", detail: "EventPro - card declined", time: "2 hrs ago", type: "error" },
  { action: "New admin registered", detail: "CloudSync Media", time: "3 hrs ago", type: "info" },
]

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

function PlanBadge({ plan }: { plan: string }) {
  const styles =
    plan === "Enterprise"
      ? "bg-primary/10 text-primary"
      : plan === "Pro"
        ? "bg-chart-3/15 text-chart-3"
        : "bg-muted text-muted-foreground"
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${styles}`}>
      {plan}
    </span>
  )
}

function StatusDot({ status }: { status: string }) {
  const color =
    status === "Active"
      ? "bg-emerald-500"
      : status === "Suspended"
        ? "bg-destructive"
        : "bg-muted-foreground"
  return (
    <span className="flex items-center gap-1.5">
      <span className={`inline-block h-2 w-2 rounded-full ${color}`} />
      <span className="text-sm text-muted-foreground">{status}</span>
    </span>
  )
}

function ActivityIcon({ type }: { type: string }) {
  const base = "flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
  switch (type) {
    case "success":
      return (
        <div className={`${base} bg-emerald-500/10`}>
          <TrendingUp className="h-4 w-4 text-emerald-600" />
        </div>
      )
    case "warning":
      return (
        <div className={`${base} bg-amber-500/10`}>
          <AlertTriangle className="h-4 w-4 text-amber-600" />
        </div>
      )
    case "error":
      return (
        <div className={`${base} bg-destructive/10`}>
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </div>
      )
    default:
      return (
        <div className={`${base} bg-primary/10`}>
          <ShieldCheck className="h-4 w-4 text-primary" />
        </div>
      )
  }
}

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

export function SuperAdminDashboardContent() {
  return (
    <div className="space-y-6">
      {/* Platform stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {platformStats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4.5 w-4.5 text-primary" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
              <div className="mt-1 flex items-center gap-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />
                )}
                <span
                  className={`text-xs font-medium ${stat.trend === "up" ? "text-emerald-600" : "text-destructive"}`}
                >
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">{stat.description}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* System health bar */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Server className="h-4.5 w-4.5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">System Health</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {systemHealth.map((item) => (
            <div key={item.label} className="rounded-lg bg-background p-3">
              <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
              <div className="mt-1 flex items-center gap-2">
                <p className="text-lg font-bold text-foreground">{item.value}</p>
                <span
                  className={`h-2 w-2 rounded-full ${
                    item.status === "healthy" ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Top admins table */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">Top Admin Accounts</h2>
            <button className="text-sm font-medium text-primary hover:underline">
              Manage all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 font-medium text-muted-foreground">Account</th>
                  <th className="pb-3 font-medium text-muted-foreground">QR Codes</th>
                  <th className="pb-3 font-medium text-muted-foreground">Total Scans</th>
                  <th className="hidden pb-3 font-medium text-muted-foreground md:table-cell">Plan</th>
                  <th className="hidden pb-3 font-medium text-muted-foreground sm:table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {topAdmins.map((admin) => (
                  <tr
                    key={admin.email}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-3.5">
                      <div>
                        <p className="font-medium text-foreground">{admin.name}</p>
                        <p className="text-xs text-muted-foreground">{admin.email}</p>
                      </div>
                    </td>
                    <td className="py-3.5 text-muted-foreground">
                      {admin.qrCodes.toLocaleString()}
                    </td>
                    <td className="py-3.5 text-muted-foreground">
                      {admin.scans.toLocaleString()}
                    </td>
                    <td className="hidden py-3.5 md:table-cell">
                      <PlanBadge plan={admin.plan} />
                    </td>
                    <td className="hidden py-3.5 sm:table-cell">
                      <StatusDot status={admin.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-foreground">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <ActivityIcon type={item.type} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{item.action}</p>
                  <p className="truncate text-xs text-muted-foreground">{item.detail}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground/70">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full rounded-lg border border-border bg-background py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
            View All Activity
          </button>
        </div>
      </div>

      {/* Platform distribution */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Accounts by Plan</p>
          <div className="mt-4 space-y-3">
            {[
              { plan: "Enterprise", count: 28, pct: 8 },
              { plan: "Pro", count: 156, pct: 46 },
              { plan: "Business", count: 104, pct: 30 },
              { plan: "Free", count: 54, pct: 16 },
            ].map((tier) => (
              <div key={tier.plan}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{tier.plan}</span>
                  <span className="text-muted-foreground">{tier.count}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${tier.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">QR Code Types</p>
          <div className="mt-4 space-y-3">
            {[
              { type: "URL", count: "68,421", pct: 54 },
              { type: "vCard", count: "28,104", pct: 22 },
              { type: "WiFi", count: "15,892", pct: 12 },
              { type: "Other", count: "15,432", pct: 12 },
            ].map((item) => (
              <div key={item.type}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{item.type}</span>
                  <span className="text-muted-foreground">{item.count}</span>
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

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Scans by Region</p>
          <div className="mt-4 space-y-3">
            {[
              { region: "North America", count: "1.1M", pct: 46 },
              { region: "Europe", count: "624K", pct: 26 },
              { region: "Asia Pacific", count: "432K", pct: 18 },
              { region: "Other", count: "240K", pct: 10 },
            ].map((item) => (
              <div key={item.region}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{item.region}</span>
                  <span className="text-muted-foreground">{item.count}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-chart-5 transition-all"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics charts */}
      <div className="space-y-6">
        {/* Scans over time - Full width */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-foreground">Scans Over Time</h2>
            <p className="text-sm text-muted-foreground">Monthly platform scans trend</p>
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
    </div>
  )
}
