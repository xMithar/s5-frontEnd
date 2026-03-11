import { SuperAdminShell } from "@/components/super-admin-shell"
import { ManageAdminsContent } from "@/components/manage-admins-content"

export default function ManageAdminsPage() {
  return (
    <SuperAdminShell title="Manage Admins">
      <ManageAdminsContent />
    </SuperAdminShell>
  )
}
