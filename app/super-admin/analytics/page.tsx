import { SuperAdminShell } from "@/components/super-admin-shell"
import { PlatformAnalyticsContent } from "@/components/platform-analytics-content"

export default function PlatformAnalyticsPage() {
  return (
    <SuperAdminShell title="Platform Analytics">
      <PlatformAnalyticsContent />
    </SuperAdminShell>
  )
}
