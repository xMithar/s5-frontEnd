import { AdminShell } from "@/components/admin-shell"
import { CreateQRContent } from "@/components/create-qr-content"

export default function AdminCreateQR() {
  return (
    <AdminShell title="Create QR Code">
      <CreateQRContent />
    </AdminShell>
  )
}
