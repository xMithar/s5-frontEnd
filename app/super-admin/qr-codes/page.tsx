import { SuperAdminShell } from "@/components/super-admin-shell"
import { SuperAdminQRCodesContent } from "@/components/super-admin-qr-codes-content"

export default function SuperAdminQRCodesPage() {
  return (
    <SuperAdminShell title="All QR Codes">
      <SuperAdminQRCodesContent />
    </SuperAdminShell>
  )
}
