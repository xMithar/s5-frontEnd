"use client"

import { useState, useMemo } from "react"
import { toast } from "sonner"
import {
  QrCode,
  Search,
  ChevronDown,
  Trash2,
  Ban,
  Link as LinkIcon,
  FileText,
  Type,
  UtensilsCrossed,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Download,
  ScanLine,
  Filter,
  AlertTriangle,
  Users,
  Flag,
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type QRType = "Static" | "Dynamic"
type ContentType = "URL" | "File" | "Text" | "Menu" | "Form"
type Status = "Active" | "Disabled"

interface QRCodeItem {
  id: number
  name: string
  owner: string
  ownerEmail: string
  type: QRType
  contentType: ContentType
  scans: number
  status: Status
  reported: boolean
  createdAt: string
  fileName?: string
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const mockQRCodes: QRCodeItem[] = [
  { id: 1, name: "Summer Sale 2026", owner: "Acme Corp", ownerEmail: "admin@acme.com", type: "Dynamic", contentType: "URL", scans: 1243, status: "Active", reported: false, createdAt: "Feb 28, 2026" },
  { id: 2, name: "Product Brochure", owner: "TechStart Inc", ownerEmail: "admin@techstart.io", type: "Static", contentType: "File", scans: 892, status: "Active", reported: false, createdAt: "Feb 25, 2026", fileName: "brochure.pdf" },
  { id: 3, name: "Event Description", owner: "Acme Corp", ownerEmail: "admin@acme.com", type: "Dynamic", contentType: "Text", scans: 567, status: "Active", reported: true, createdAt: "Feb 22, 2026" },
  { id: 4, name: "Restaurant Menu", owner: "FoodChain HQ", ownerEmail: "ops@foodchain.com", type: "Dynamic", contentType: "Menu", scans: 2341, status: "Active", reported: false, createdAt: "Feb 18, 2026" },
  { id: 5, name: "Feedback Form", owner: "RetailMax", ownerEmail: "digital@retailmax.com", type: "Static", contentType: "Form", scans: 198, status: "Disabled", reported: false, createdAt: "Feb 15, 2026" },
  { id: 6, name: "WiFi Login Page", owner: "EventPro", ownerEmail: "admin@eventpro.co", type: "Dynamic", contentType: "URL", scans: 4521, status: "Active", reported: true, createdAt: "Feb 12, 2026" },
  { id: 7, name: "Employee Handbook", owner: "HealthPlus", ownerEmail: "it@healthplus.org", type: "Static", contentType: "File", scans: 312, status: "Active", reported: false, createdAt: "Feb 10, 2026", fileName: "handbook.pdf" },
  { id: 8, name: "Welcome Message", owner: "TechStart Inc", ownerEmail: "admin@techstart.io", type: "Static", contentType: "Text", scans: 145, status: "Disabled", reported: false, createdAt: "Feb 8, 2026" },
  { id: 9, name: "Dinner Specials", owner: "FoodChain HQ", ownerEmail: "ops@foodchain.com", type: "Dynamic", contentType: "Menu", scans: 1876, status: "Active", reported: false, createdAt: "Feb 5, 2026" },
  { id: 10, name: "Survey 2026", owner: "Acme Corp", ownerEmail: "admin@acme.com", type: "Dynamic", contentType: "Form", scans: 723, status: "Active", reported: false, createdAt: "Feb 3, 2026" },
  { id: 11, name: "Landing Page", owner: "RetailMax", ownerEmail: "digital@retailmax.com", type: "Dynamic", contentType: "URL", scans: 3210, status: "Active", reported: true, createdAt: "Jan 28, 2026" },
  { id: 12, name: "Price List PDF", owner: "EventPro", ownerEmail: "admin@eventpro.co", type: "Static", contentType: "File", scans: 456, status: "Active", reported: false, createdAt: "Jan 25, 2026", fileName: "prices.pdf" },
  { id: 13, name: "Terms & Conditions", owner: "HealthPlus", ownerEmail: "it@healthplus.org", type: "Static", contentType: "Text", scans: 89, status: "Disabled", reported: false, createdAt: "Jan 22, 2026" },
  { id: 14, name: "Lunch Menu", owner: "FoodChain HQ", ownerEmail: "ops@foodchain.com", type: "Dynamic", contentType: "Menu", scans: 1567, status: "Active", reported: false, createdAt: "Jan 18, 2026" },
  { id: 15, name: "Contact Form", owner: "TechStart Inc", ownerEmail: "admin@techstart.io", type: "Static", contentType: "Form", scans: 634, status: "Active", reported: false, createdAt: "Jan 15, 2026" },
  { id: 16, name: "Blog Post Link", owner: "Acme Corp", ownerEmail: "admin@acme.com", type: "Dynamic", contentType: "URL", scans: 912, status: "Active", reported: false, createdAt: "Jan 12, 2026" },
  { id: 17, name: "Catalog 2026", owner: "RetailMax", ownerEmail: "digital@retailmax.com", type: "Static", contentType: "File", scans: 278, status: "Disabled", reported: true, createdAt: "Jan 10, 2026", fileName: "catalog.pdf" },
  { id: 18, name: "Promo Code Text", owner: "EventPro", ownerEmail: "admin@eventpro.co", type: "Static", contentType: "Text", scans: 543, status: "Active", reported: false, createdAt: "Jan 8, 2026" },
  { id: 19, name: "Catering Menu", owner: "FoodChain HQ", ownerEmail: "ops@foodchain.com", type: "Dynamic", contentType: "Menu", scans: 2105, status: "Active", reported: false, createdAt: "Jan 5, 2026" },
  { id: 20, name: "Registration Form", owner: "HealthPlus", ownerEmail: "it@healthplus.org", type: "Dynamic", contentType: "Form", scans: 1890, status: "Active", reported: true, createdAt: "Jan 3, 2026" },
]

const ITEMS_PER_PAGE = 8

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const contentTypeIconMap: Record<ContentType, typeof LinkIcon> = {
  URL: LinkIcon,
  File: FileText,
  Text: Type,
  Menu: UtensilsCrossed,
  Form: ClipboardList,
}

function ContentTypeIcon({ type }: { type: ContentType }) {
  const Icon = contentTypeIconMap[type]
  return <Icon className="h-3.5 w-3.5" />
}

function StatusBadge({ status }: { status: Status }) {
  const isActive = status === "Active"
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isActive
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
          : "bg-muted text-muted-foreground ring-1 ring-border"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-emerald-500" : "bg-muted-foreground"
        }`}
      />
      {status}
    </span>
  )
}

function TypeBadge({ type }: { type: QRType }) {
  const isDynamic = type === "Dynamic"
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ${
        isDynamic
          ? "bg-primary/8 text-primary ring-primary/15"
          : "bg-secondary text-secondary-foreground ring-border"
      }`}
    >
      {type}
    </span>
  )
}

function ContentTypeBadge({ type }: { type: ContentType }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground ring-1 ring-border">
      <ContentTypeIcon type={type} />
      {type}
    </span>
  )
}

function ReportedBadge({ reported }: { reported: boolean }) {
  if (reported) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-red-600/20">
        <Flag className="h-3 w-3" />
        Yes
      </span>
    )
  }
  return (
    <span className="text-xs text-muted-foreground">No</span>
  )
}

/* ------------------------------------------------------------------ */
/*  Filter dropdowns                                                   */
/* ------------------------------------------------------------------ */

type TypeFilter = "All" | "Static" | "Dynamic"
type ContentFilter = "All" | "URL" | "File" | "Text" | "Menu" | "Form"

function TypeFilterDropdown({
  value,
  onChange,
}: {
  value: TypeFilter
  onChange: (v: TypeFilter) => void
}) {
  const [open, setOpen] = useState(false)
  const options: TypeFilter[] = ["All", "Static", "Dynamic"]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span>Type: {value}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 z-20 mt-1.5 w-40 rounded-xl border border-border bg-card p-1.5 shadow-lg">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt)
                  setOpen(false)
                }}
                className={`flex w-full items-center rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  value === opt
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {opt === "All" ? "All Types" : opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function ContentFilterDropdown({
  value,
  onChange,
}: {
  value: ContentFilter
  onChange: (v: ContentFilter) => void
}) {
  const [open, setOpen] = useState(false)
  const options: ContentFilter[] = ["All", "URL", "File", "Text", "Menu", "Form"]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <ContentTypeIcon type="URL" />
        <span>Content: {value}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 z-20 mt-1.5 w-40 rounded-xl border border-border bg-card p-1.5 shadow-lg">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  value === opt
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {opt !== "All" && <ContentTypeIcon type={opt as ContentType} />}
                {opt === "All" ? "All Content" : opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function SuperAdminQRCodesContent() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All")
  const [contentFilter, setContentFilter] = useState<ContentFilter>("All")
  const [page, setPage] = useState(1)
  const [qrData, setQrData] = useState<QRCodeItem[]>(mockQRCodes)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [qrToDelete, setQrToDelete] = useState<QRCodeItem | null>(null)

  const handleToggleStatus = (id: number) => {
    const updatedData = qrData.map(qr => {
      if (qr.id === id) {
        const newStatus: Status = qr.status === "Active" ? "Disabled" : "Active"
        toast(qr.status === "Active" ? "QR Code disabled" : "QR Code enabled")
        return { ...qr, status: newStatus }
      }
      return qr
    })
    setQrData(updatedData)
  }

  const handleDeleteClick = (qr: QRCodeItem) => {
    setQrToDelete(qr)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (qrToDelete) {
      setQrData(qrData.filter(q => q.id !== qrToDelete.id))
      toast("QR Code deleted")
      setDeleteModalOpen(false)
      setQrToDelete(null)
    }
  }

  const filteredData = useMemo(() => {
    let data = qrData

    if (search.trim()) {
      const q = search.toLowerCase()
      data = data.filter(
        (qr) =>
          qr.name.toLowerCase().includes(q) ||
          qr.owner.toLowerCase().includes(q) ||
          qr.ownerEmail.toLowerCase().includes(q) ||
          qr.contentType.toLowerCase().includes(q)
      )
    }

    if (typeFilter !== "All") {
      data = data.filter((qr) => qr.type === typeFilter)
    }

    if (contentFilter !== "All") {
      data = data.filter((qr) => qr.contentType === contentFilter)
    }

    return data
  }, [search, typeFilter, contentFilter, qrData])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginatedData = filteredData.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  )

  const totalScans = filteredData.reduce((sum, qr) => sum + qr.scans, 0)
  const reportedCount = filteredData.filter((qr) => qr.reported).length
  const uniqueOwners = new Set(filteredData.map((qr) => qr.owner)).size

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="space-y-6">
      {/* ---------- Summary row ---------- */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <QrCode className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Codes</p>
            <p className="text-xl font-bold text-foreground">{filteredData.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
            <ScanLine className="h-5 w-5 text-emerald-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Scans</p>
            <p className="text-xl font-bold text-foreground">
              {totalScans.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-2/15">
            <Users className="h-5 w-5 text-chart-2" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Unique Owners</p>
            <p className="text-xl font-bold text-foreground">{uniqueOwners}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Reported</p>
            <p className="text-xl font-bold text-foreground">{reportedCount}</p>
          </div>
        </div>
      </div>

      {/* ---------- Toolbar + Table card ---------- */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or owner..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 focus:outline-none"
              />
            </div>

            {/* Type filter */}
            <TypeFilterDropdown
              value={typeFilter}
              onChange={(v) => {
                setTypeFilter(v)
                setPage(1)
              }}
            />

            {/* Content filter */}
            <ContentFilterDropdown
              value={contentFilter}
              onChange={(v) => {
                setContentFilter(v)
                setPage(1)
              }}
            />
          </div>

          <button 
            onClick={() => {
              const csvData = filteredData.map(qr => ({
                Name: qr.name,
                Owner: qr.owner,
                Email: qr.ownerEmail,
                Type: qr.type,
                Content: qr.contentType,
                Scans: qr.scans,
                Status: qr.status,
                Reported: qr.reported ? "Yes" : "No",
                Created: qr.createdAt
              }))
              const headers = Object.keys(csvData[0] || {}).join(",")
              const rows = csvData.map(row => Object.values(row).join(",")).join("\n")
              const csv = `${headers}\n${rows}`
              const blob = new Blob([csv], { type: "text/csv" })
              const url = URL.createObjectURL(blob)
              const a = document.createElement("a")
              a.href = url
              a.download = "all-qr-codes-export.csv"
              a.click()
              URL.revokeObjectURL(url)
              toast.success("QR codes exported successfully")
            }}
            className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>

        {/* ---------- Table ---------- */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  QR Name
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Owner
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Type
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Content
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Scans
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Reported
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                        <QrCode className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="font-medium text-foreground">No QR codes found</p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((qr) => (
                  <tr
                    key={qr.id}
                    className={`border-b border-border transition-colors last:border-0 hover:bg-muted/30 ${
                      qr.reported ? "bg-red-50/40" : ""
                    }`}
                  >
                    {/* Name */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          {qr.contentType === "File" ? (
                            <FileText className="h-4 w-4 text-primary" />
                          ) : (
                            <QrCode className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-foreground">
                            {qr.name}
                          </p>
                          {qr.fileName && (
                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                              <FileText className="h-3 w-3" />
                              {qr.fileName}
                            </p>
                          )}
                          {!qr.fileName && (
                            <p className="text-xs text-muted-foreground">
                              {qr.createdAt}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Owner */}
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="font-medium text-foreground">{qr.owner}</p>
                        <p className="text-xs text-muted-foreground">{qr.ownerEmail}</p>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-5 py-3.5">
                      <TypeBadge type={qr.type} />
                    </td>

                    {/* Content type */}
                    <td className="px-5 py-3.5">
                      <ContentTypeBadge type={qr.contentType} />
                    </td>

                    {/* Scans */}
                    <td className="px-5 py-3.5">
                      <span className="font-semibold tabular-nums text-foreground">
                        {qr.scans.toLocaleString()}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <StatusBadge status={qr.status} />
                    </td>

                    {/* Reported */}
                    <td className="px-5 py-3.5">
                      <ReportedBadge reported={qr.reported} />
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleToggleStatus(qr.id)}
                          className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-amber-50 hover:text-amber-700"
                          aria-label={`${qr.status === "Active" ? "Disable" : "Enable"} ${qr.name}`}
                          title={`${qr.status === "Active" ? "Disable" : "Enable"} QR Code`}
                        >
                          <Ban className="h-3.5 w-3.5" />
                          <span className="hidden lg:inline">
                            {qr.status === "Active" ? "Disable" : "Enable"}
                          </span>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(qr)}
                          className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
                          aria-label={`Delete ${qr.name}`}
                          title="Delete QR Code"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="hidden lg:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ---------- Pagination ---------- */}
        {filteredData.length > ITEMS_PER_PAGE && (
          <div className="flex flex-col items-center justify-between gap-3 border-t border-border px-5 py-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {(safePage - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium text-foreground">
                {Math.min(safePage * ITEMS_PER_PAGE, filteredData.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">{filteredData.length}</span>{" "}
              results
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(Math.max(1, safePage - 1))}
                disabled={safePage === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {pageNumbers.map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    num === safePage
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => setPage(Math.min(totalPages, safePage + 1))}
                disabled={safePage === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete QR Code?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-semibold text-foreground">"{qrToDelete?.name}"</span>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
