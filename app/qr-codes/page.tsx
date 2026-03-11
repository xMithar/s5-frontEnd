import { AdminShell } from "@/components/admin-shell"
import { QRCodesContent } from "@/components/qr-codes-content"

export default function QRCodesPage() {
  return (
    <AdminShell title="My QR Codes">
      <QRCodesContent />
    </AdminShell>
  )
}
