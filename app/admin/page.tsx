import { AdminShell } from "@/components/admin-shell"
import { DashboardContent } from "@/components/dashboard-content"

export default function AdminDashboard() {
  return (
    <AdminShell title="Dashboard">
      <DashboardContent />
    </AdminShell>
  )
}
