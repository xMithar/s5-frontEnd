"use client"

import { useState, useMemo, useEffect } from "react"
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Mail,
  Shield,
  AlertTriangle,
  Loader,
} from "lucide-react"
import { toast } from "sonner"
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
import { getUsers } from "@/lib/api/auth"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type AdminStatus = "Active" | "Suspended"

interface AdminAccount {
  id: number
  name: string
  email: string
  status: AdminStatus
  canCreateQR: boolean
  createdAt: string
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const mockAdmins: AdminAccount[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@company.com",
    status: "Active",
    canCreateQR: true,
    createdAt: "Jan 15, 2025",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@company.com",
    status: "Active",
    canCreateQR: true,
    createdAt: "Feb 1, 2025",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@company.com",
    status: "Active",
    canCreateQR: false,
    createdAt: "Feb 10, 2025",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@company.com",
    status: "Suspended",
    canCreateQR: false,
    createdAt: "Jan 20, 2025",
  },
  {
    id: 5,
    name: "Emma Brown",
    email: "emma.brown@company.com",
    status: "Active",
    canCreateQR: true,
    createdAt: "Feb 20, 2025",
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank.miller@company.com",
    status: "Active",
    canCreateQR: true,
    createdAt: "Feb 15, 2025",
  },
  {
    id: 7,
    name: "Grace Lee",
    email: "grace.lee@company.com",
    status: "Active",
    canCreateQR: false,
    createdAt: "Mar 1, 2025",
  },
  {
    id: 8,
    name: "Henry Martinez",
    email: "henry.martinez@company.com",
    status: "Suspended",
    canCreateQR: false,
    createdAt: "Feb 5, 2025",
  },
]

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: AdminStatus }) {
  const isActive = status === "Active"
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isActive
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
          : "bg-red-50 text-red-700 ring-1 ring-red-600/20"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-emerald-500" : "bg-red-500"
        }`}
      />
      {status}
    </span>
  )
}

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        checked ? "bg-emerald-500" : "bg-muted"
      } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  )
}

function AddAdminModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    canCreateQR: true,
  })

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-border bg-card shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold text-foreground">Add New Admin</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4 px-6 py-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Permission toggle */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Can Create QR Codes
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Allow this admin to create new QR codes
                </p>
              </div>
              <Toggle
                checked={formData.canCreateQR}
                onChange={(checked) =>
                  setFormData({ ...formData, canCreateQR: checked })
                }
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 border-t border-border px-6 py-4">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setFormData({ name: "", email: "", canCreateQR: true })
                onClose()
              }}
              className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:opacity-90"
            >
              Add Admin
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function EditAdminModal({
  isOpen,
  onClose,
  admin,
  onSave,
}: {
  isOpen: boolean
  onClose: () => void
  admin: AdminAccount | null
  onSave: (updatedAdmin: AdminAccount) => void
}) {
  const [formData, setFormData] = useState<AdminAccount | null>(admin)

  useEffect(() => {
    if (admin) {
      setFormData(admin)
    }
  }, [admin, isOpen])

  if (!isOpen || !formData) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-border bg-card shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold text-foreground">Edit Admin</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4 px-6 py-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as AdminStatus,
                  })
                }
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            {/* Permission toggle */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Can Create QR Codes
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Allow this admin to create new QR codes
                </p>
              </div>
              <Toggle
                checked={formData.canCreateQR}
                onChange={(checked) =>
                  setFormData({ ...formData, canCreateQR: checked })
                }
                disabled={formData.status === "Suspended"}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 border-t border-border px-6 py-4">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave(formData)
                onClose()
              }}
              className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:opacity-90"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function ManageAdminsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState<AdminAccount | null>(null)
  const [admins, setAdmins] = useState<AdminAccount[]>(mockAdmins)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [adminToDelete, setAdminToDelete] = useState<AdminAccount | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load admins from API
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setIsLoading(true)
        const users = await getUsers()
        // Map API response to component format
        const mapped = users.map((user: any, index: number) => ({
          id: user.id,
          name: user.email.split("@")[0] || `Admin ${index + 1}`,
          email: user.email,
          status: user.is_active ? "Active" : "Suspended",
          canCreateQR: user.role === "admin",
          createdAt: new Date(user.created_at || Date.now()).toLocaleDateString("en-US", { 
            month: "short", 
            day: "numeric", 
            year: "numeric" 
          }),
        }))
        setAdmins(mapped)
        setError(null)
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load admins"
        setError(message)
        // Keep mock data as fallback
        setAdmins(mockAdmins)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAdmins()
  }, [])

  const filteredAdmins = useMemo(() => {
    return admins.filter((admin) =>
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [admins, searchQuery])

  const handleTogglePermission = (id: number) => {
    setAdmins((prev) =>
      prev.map((admin) =>
        admin.id === id ? { ...admin, canCreateQR: !admin.canCreateQR } : admin
      )
    )
  }

  const handleEditAdmin = (admin: AdminAccount) => {
    setEditingAdmin(admin)
    setIsEditModalOpen(true)
  }

  const handleSaveAdmin = (updatedAdmin: AdminAccount) => {
    setAdmins((prev) =>
      prev.map((admin) =>
        admin.id === updatedAdmin.id ? updatedAdmin : admin
      )
    )
  }

  const handleDeleteAdmin = (id: number) => {
    setAdmins((prev) => prev.filter((admin) => admin.id !== id))
  }

  const openDeleteDialog = (admin: AdminAccount) => {
    setAdminToDelete(admin)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (adminToDelete) {
      handleDeleteAdmin(adminToDelete.id)
      setAdminToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-sm text-muted-foreground">Loading admin accounts...</p>
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
      {/* Header with search and actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Admins</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filteredAdmins.length} admin account{
              filteredAdmins.length !== 1 ? "s" : ""
            }
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Add button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:opacity-90 sm:justify-start"
        >
          <Plus className="h-5 w-5" />
          Add Admin
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            {/* Header */}
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Name
                </th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Email
                </th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Can Create QR
                </th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin) => (
                  <tr
                    key={admin.id}
                    className="border-b border-border transition-colors last:border-0 hover:bg-muted/30"
                  >
                    {/* Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                          <Shield className="h-4.5 w-4.5 text-primary" />
                        </div>
                        <p className="font-medium text-foreground">{admin.name}</p>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-3.5 w-3.5" />
                        {admin.email}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <StatusBadge status={admin.status} />
                    </td>

                    {/* Can Create QR toggle */}
                    <td className="px-6 py-4">
                      <Toggle
                        checked={admin.canCreateQR}
                        onChange={() => handleTogglePermission(admin.id)}
                        disabled={admin.status === "Suspended"}
                      />
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditAdmin(admin)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          aria-label={`Edit ${admin.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
<button
                                          onClick={() => openDeleteDialog(admin)}
                                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                                          aria-label={`Delete ${admin.name}`}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Shield className="h-12 w-12 text-muted-foreground/30" />
                      <p className="text-sm font-medium text-muted-foreground">
                        No admins found
                      </p>
                      <p className="text-xs text-muted-foreground/60">
                        Try adjusting your search query
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AddAdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditAdminModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingAdmin(null)
        }}
        admin={editingAdmin}
        onSave={handleSaveAdmin}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-7 w-7 text-destructive" />
            </div>
            <AlertDialogTitle className="text-center">
              Delete Admin Account
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {adminToDelete?.name}
              </span>
              ? This action cannot be undone and will permanently remove their
              access to the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 sm:justify-center gap-3">
            <AlertDialogCancel className="flex-1 sm:flex-none sm:min-w-[120px]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="flex-1 sm:flex-none sm:min-w-[120px] bg-destructive text-white hover:bg-destructive/90"
            >
              Delete Admin
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
