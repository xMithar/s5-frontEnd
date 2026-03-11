"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { AdminShell } from "@/components/admin-shell"
import { EditQRContent } from "@/components/edit-qr-content"
import { toast } from "sonner"

// Mock data - in a real app, this would be fetched from the server
const mockQRCodes = [
  {
    id: 1,
    name: "Summer Campaign",
    type: "dynamic",
    contentType: "url",
    url: "https://example.com/summer",
    fgColor: "#4338ca",
    bgColor: "#ffffff",
    roundedCorners: false,
  },
  {
    id: 2,
    name: "WiFi QR Code",
    type: "static",
    contentType: "text",
    textContent: "WIFI_NETWORK_DATA",
    fgColor: "#111827",
    bgColor: "#ffffff",
    roundedCorners: true,
  },
]

interface EditQRPageProps {
  params: Promise<{ id: string }>
}

export default function EditQRPage({ params }: EditQRPageProps) {
  const router = useRouter()
  const resolvedParams = use(params)
  const qrId = parseInt(resolvedParams.id)
  const qrCode = mockQRCodes.find((qr) => qr.id === qrId)

  if (!qrCode) {
    return (
      <AdminShell title="Edit QR Code">
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-lg font-semibold text-foreground">QR Code not found</p>
          <p className="mt-2 text-sm text-muted-foreground">The QR code you're looking for doesn't exist.</p>
          <button
            onClick={() => router.back()}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Go Back
          </button>
        </div>
      </AdminShell>
    )
  }

  const handleSave = (updatedQR: any) => {
    toast.success(`QR Code "${updatedQR.name}" has been updated`)
    router.push("/admin/qr-codes")
  }

  const handleCancel = () => {
    router.push("/admin/qr-codes")
  }

  return (
    <AdminShell title={`Edit "${qrCode.name}"`}>
      <EditQRContent qrCode={qrCode} onSave={handleSave} onCancel={handleCancel} />
    </AdminShell>
  )
}
