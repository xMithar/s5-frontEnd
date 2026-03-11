import { SuperAdminShell } from "@/components/super-admin-shell"
import { SuperAdminDashboardContent } from "@/components/super-admin-dashboard-content"

export default function SuperAdminPage() {
  return (
    <SuperAdminShell title="Global Dashboard">
      <SuperAdminDashboardContent />
    </SuperAdminShell>
  )
}
