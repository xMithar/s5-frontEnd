"use client"

import { useState } from "react"
import { AdminShell } from "@/components/admin-shell"
import { Mail, Phone, MapPin, Calendar, Edit2, Lock, Shield, X, AlertTriangle, Eye, EyeOff, Check } from "lucide-react"
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

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@qrflow.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA, USA",
  })
  const [editData, setEditData] = useState(profileData)
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false)
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const handleSaveChanges = () => {
    setProfileData(editData)
    setIsEditing(false)
    toast("Profile updated successfully")
  }

  const handleCancel = () => {
    setEditData(profileData)
    setIsEditing(false)
  }

  const handleChangePassword = () => {
    if (!passwordData.current) {
      toast.error("Please enter your current password")
      return
    }
    if (!passwordData.new) {
      toast.error("Please enter a new password")
      return
    }
    if (passwordData.new.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }
    if (passwordData.new !== passwordData.confirm) {
      toast.error("Passwords do not match")
      return
    }
    toast.success("Password changed successfully")
    setChangePasswordOpen(false)
    setPasswordData({ current: "", new: "", confirm: "" })
  }

  const handleDeleteAccount = () => {
    toast.success("Account deleted successfully")
    setDeleteAccountOpen(false)
    // In a real app, this would redirect to login or home page
  }

  return (
    <AdminShell title="Profile">
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-primary/10">
                <span className="text-2xl font-bold text-primary">AD</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{profileData.name}</h1>
                <p className="mt-1 text-sm text-muted-foreground">Role: Admin</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <Edit2 className="h-4 w-4" />
              {isEditing ? "Done" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditing && (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Edit Profile</h2>
              <button
                onClick={handleCancel}
                className="rounded-lg p-1 text-muted-foreground hover:bg-accent"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm font-medium text-foreground">Name</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-foreground">Location</label>
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveChanges}
                  className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
                >
                  Save changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Account Information */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-foreground">Account Information</h2>
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Email Address</p>
                <p className="text-base font-medium text-foreground">{profileData.email}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="text-base font-medium text-foreground">{profileData.phone}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-base font-medium text-foreground">{profileData.location}</p>
              </div>
            </div>

            {/* Join Date */}
            <div className="flex items-center gap-4">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="text-base font-medium text-foreground">January 15, 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Plan */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-foreground">Subscription Plan</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div>
                <h3 className="font-semibold text-foreground">Professional Plan</h3>
                <p className="text-sm text-muted-foreground">$29/month</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Active
              </span>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Up to 1,000 QR codes
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Advanced analytics
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Custom branding
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Priority support
              </li>
            </ul>
          </div>
        </div>

        {/* Security Settings */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-foreground">Security Settings</h2>
          <div className="space-y-4">
            {/* Password */}
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Password</p>
                  <p className="text-sm text-muted-foreground">Last changed 2 months ago</p>
                </div>
              </div>
              <button 
                onClick={() => setChangePasswordOpen(true)}
                className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Change
              </button>
            </div>

            {/* Two-Factor Authentication */}
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Not enabled</p>
                </div>
              </div>
              <button className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent">
                Enable
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-red-600/30 bg-red-50/50 p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-red-700">Danger Zone</h2>
          <p className="mb-4 text-sm text-red-700/80">
            Deleting your account is permanent and cannot be undone. All your QR codes and data will be permanently deleted.
          </p>
          <button 
            onClick={() => setDeleteAccountOpen(true)}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>

        {/* Change Password Dialog */}
        <AlertDialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Lock className="h-7 w-7 text-primary" />
              </div>
              <AlertDialogTitle className="text-center">
                Change Password
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Enter your current password and choose a new one
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="text-sm font-medium text-foreground">Current Password</label>
                <div className="relative mt-1">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 pr-10 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Enter current password"
                  />
                  <button
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    type="button"
                  >
                    {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="text-sm font-medium text-foreground">New Password</label>
                <div className="relative mt-1">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 pr-10 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Enter new password (min 8 chars)"
                  />
                  <button
                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    type="button"
                  >
                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm font-medium text-foreground">Confirm Password</label>
                <div className="relative mt-1">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 pr-10 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Confirm new password"
                  />
                  <button
                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    type="button"
                  >
                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
            <AlertDialogFooter className="mt-4 sm:justify-center gap-3">
              <AlertDialogCancel className="flex-1 sm:flex-none sm:min-w-[120px]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleChangePassword}
                className="flex-1 sm:flex-none sm:min-w-[120px] bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Update Password
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Account Dialog */}
        <AlertDialog open={deleteAccountOpen} onOpenChange={setDeleteAccountOpen}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-7 w-7 text-destructive" />
              </div>
              <AlertDialogTitle className="text-center">
                Delete Account
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                This action is permanent and cannot be undone. All your QR codes, analytics, and data will be permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4 sm:justify-center gap-3">
              <AlertDialogCancel className="flex-1 sm:flex-none sm:min-w-[120px]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                className="flex-1 sm:flex-none sm:min-w-[120px] bg-destructive text-white hover:bg-destructive/90"
              >
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminShell>
  )
}
