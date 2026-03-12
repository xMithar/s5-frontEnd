"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import QRCode from "react-qr-code"
import { listQRCodes, deleteQRCode } from "@/lib/api/qrcodes"
import {
  QrCode,
  Search,
  ChevronDown,
  Pencil,
  Trash2,
  Link as LinkIcon,
  FileText,
  Type,
  UtensilsCrossed,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Download,
  ScanLine,
  Filter,
  Palette,
  RotateCcw,
  Upload,
  Image,
  X,
  ToggleLeft,
  ToggleRight,
  SquareRoundCorner,
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
  type: QRType
  contentType: ContentType
  color: string
  scans: number
  status: Status
  createdAt: string
  description?: string
  url?: string
  fgColor?: string
  bgColor?: string
  roundedCorners?: boolean
  logoFile?: { name: string; url: string } | null
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const mockQRCodes: QRCodeItem[] = [
  { id: 1, name: "Summer Sale 2026", type: "Dynamic", contentType: "URL", color: "#4F46E5", scans: 1243, status: "Active", createdAt: "Feb 28, 2026" },
  { id: 2, name: "Product Brochure", type: "Static", contentType: "File", color: "#059669", scans: 892, status: "Active", createdAt: "Feb 25, 2026", fileName: "brochure.pdf" },
  { id: 3, name: "Event Description", type: "Dynamic", contentType: "Text", color: "#D97706", scans: 567, status: "Active", createdAt: "Feb 22, 2026" },
  { id: 4, name: "Restaurant Menu", type: "Dynamic", contentType: "Menu", color: "#DC2626", scans: 2341, status: "Active", createdAt: "Feb 18, 2026" },
  { id: 5, name: "Feedback Form", type: "Static", contentType: "Form", color: "#7C3AED", scans: 198, status: "Disabled", createdAt: "Feb 15, 2026" },
  { id: 6, name: "WiFi Login Page", type: "Dynamic", contentType: "URL", color: "#0891B2", scans: 4521, status: "Active", createdAt: "Feb 12, 2026" },
  { id: 7, name: "Employee Handbook", type: "Static", contentType: "File", color: "#4F46E5", scans: 312, status: "Active", createdAt: "Feb 10, 2026", fileName: "handbook.pdf" },
  { id: 8, name: "Welcome Message", type: "Static", contentType: "Text", color: "#059669", scans: 145, status: "Disabled", createdAt: "Feb 8, 2026" },
  { id: 9, name: "Dinner Specials", type: "Dynamic", contentType: "Menu", color: "#DC2626", scans: 1876, status: "Active", createdAt: "Feb 5, 2026" },
  { id: 10, name: "Survey 2026", type: "Dynamic", contentType: "Form", color: "#7C3AED", scans: 723, status: "Active", createdAt: "Feb 3, 2026" },
  { id: 11, name: "Landing Page", type: "Dynamic", contentType: "URL", color: "#4F46E5", scans: 3210, status: "Active", createdAt: "Jan 28, 2026" },
  { id: 12, name: "Price List PDF", type: "Static", contentType: "File", color: "#D97706", scans: 456, status: "Active", createdAt: "Jan 25, 2026", fileName: "prices.pdf" },
  { id: 13, name: "Terms & Conditions", type: "Static", contentType: "Text", color: "#0891B2", scans: 89, status: "Disabled", createdAt: "Jan 22, 2026" },
  { id: 14, name: "Lunch Menu", type: "Dynamic", contentType: "Menu", color: "#DC2626", scans: 1567, status: "Active", createdAt: "Jan 18, 2026" },
  { id: 15, name: "Contact Form", type: "Static", contentType: "Form", color: "#7C3AED", scans: 634, status: "Active", createdAt: "Jan 15, 2026" },
  { id: 16, name: "Blog Post Link", type: "Dynamic", contentType: "URL", color: "#059669", scans: 912, status: "Active", createdAt: "Jan 12, 2026" },
  { id: 17, name: "Catalog 2026", type: "Static", contentType: "File", color: "#4F46E5", scans: 278, status: "Disabled", createdAt: "Jan 10, 2026", fileName: "catalog.pdf" },
  { id: 18, name: "Promo Code Text", type: "Static", contentType: "Text", color: "#D97706", scans: 543, status: "Active", createdAt: "Jan 8, 2026" },
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

function ColorSwatch({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-5 w-5 shrink-0 rounded-md ring-1 ring-border"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs font-mono text-muted-foreground uppercase">
        {color}
      </span>
    </div>
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

export function QRCodesContent() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All")
  const [contentFilter, setContentFilter] = useState<ContentFilter>("All")
  const [page, setPage] = useState(1)
  const [qrCodes, setQrCodes] = useState<QRCodeItem[]>(mockQRCodes)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load QR codes from API
  useEffect(() => {
    const fetchQRCodes = async () => {
      try {
        setIsLoading(true)
        const data = await listQRCodes()
        // Map API response to component format
        const mapped = data.map((qr, index) => ({
          id: qr.id,
          name: qr.short_code || `QR Code ${index + 1}`,
          type: qr.is_dynamic ? "Dynamic" : "Static",
          contentType: "URL" as ContentType,
          color: qr.color || "#4F46E5",
          scans: qr.total_scans || 0,
          status: qr.is_dynamic ? "Active" : "Disabled",
          createdAt: new Date(qr.created_at || Date.now()).toLocaleDateString("en-US", { 
            month: "short", 
            day: "numeric", 
            year: "numeric" 
          }),
          url: qr.destination_url,
        }))
        setQrCodes(mapped)
        setError(null)
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load QR codes"
        setError(message)
        // Keep mock data as fallback
        setQrCodes(mockQRCodes)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQRCodes()
  }, [])

  const handleEditClick = (qr: QRCodeItem) => {
    router.push(`/admin/qr-codes/${qr.id}`)
  }

  const handleDeleteClick = (id: number) => {
    setDeleteId(id)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        await deleteQRCode(deleteId)
        const deletedQR = qrCodes.find(q => q.id === deleteId)
        setQrCodes(qrCodes.filter(q => q.id !== deleteId))
        toast.success(`QR Code "${deletedQR?.name}" deleted`)
        setShowDeleteModal(false)
        setDeleteId(null)
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to delete QR code"
        toast.error(message)
      }
    }
  }

  /* Filter + search logic */
  const filteredData = useMemo(() => {
    let data = qrCodes

    if (search.trim()) {
      const q = search.toLowerCase()
      data = data.filter(
        (qr) =>
          qr.name.toLowerCase().includes(q) ||
          qr.contentType.toLowerCase().includes(q) ||
          qr.type.toLowerCase().includes(q)
      )
    }

    if (typeFilter !== "All") {
      data = data.filter((qr) => qr.type === typeFilter)
    }

    if (contentFilter !== "All") {
      data = data.filter((qr) => qr.contentType === contentFilter)
    }

    return data
  }, [search, typeFilter, contentFilter, qrCodes])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginatedData = filteredData.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  )

  const totalScans = filteredData.reduce((sum, qr) => sum + qr.scans, 0)
  const activeCount = filteredData.filter((qr) => qr.status === "Active").length

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-sm text-muted-foreground">Loading QR codes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive border border-destructive/20">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* ---------- Summary row ---------- */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
            <PlusCircle className="h-5 w-5 text-amber-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active Codes</p>
            <p className="text-xl font-bold text-foreground">{activeCount}</p>
          </div>
        </div>
      </div>

      {/* ---------- Toolbar ---------- */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search QR codes..."
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

          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                const csvData = filteredData.map(qr => ({
                  Name: qr.name,
                  Type: qr.type,
                  Content: qr.contentType,
                  Color: qr.color,
                  Scans: qr.scans,
                  Status: qr.status,
                  Created: qr.createdAt
                }))
                const headers = Object.keys(csvData[0] || {}).join(",")
                const rows = csvData.map(row => Object.values(row).join(",")).join("\n")
                const csv = `${headers}\n${rows}`
                const blob = new Blob([csv], { type: "text/csv" })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = "qr-codes-export.csv"
                a.click()
                URL.revokeObjectURL(url)
                toast.success("QR codes exported successfully")
              }}
              className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <a
              href="/create"
              className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90"
            >
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">New QR Code</span>
            </a>
          </div>
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
                  Type
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Content
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Color
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Scans
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                        <QrCode className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="font-medium text-foreground">No QR codes found</p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filter.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((qr) => (
                  <tr
                    key={qr.id}
                    className="border-b border-border transition-colors last:border-0 hover:bg-muted/30"
                  >
                    {/* Name */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                          style={{ backgroundColor: qr.color + "18" }}
                        >
                          {qr.contentType === "File" ? (
                            <FileText className="h-4 w-4" style={{ color: qr.color }} />
                          ) : (
                            <QrCode className="h-4 w-4" style={{ color: qr.color }} />
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

                    {/* Type */}
                    <td className="px-5 py-3.5">
                      <TypeBadge type={qr.type} />
                    </td>

                    {/* Content type */}
                    <td className="px-5 py-3.5">
                      <ContentTypeBadge type={qr.contentType} />
                    </td>

                    {/* Color */}
                    <td className="px-5 py-3.5">
                      <ColorSwatch color={qr.color} />
                    </td>

                    {/* Scans */}
                    <td className="px-5 py-3.5">
                      <span className="font-semibold text-foreground tabular-nums">
                        {qr.scans.toLocaleString()}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <StatusBadge status={qr.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditClick(qr)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          aria-label={`Edit ${qr.name}`}
                          title="Edit QR Code"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(qr.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
                          aria-label={`Delete ${qr.name}`}
                          title="Delete QR Code"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
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
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border px-5 py-3.5 sm:flex-row">
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
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  p === safePage
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete QR Code?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this QR code? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
