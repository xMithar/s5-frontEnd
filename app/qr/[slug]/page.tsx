import { DynamicQRDisplayContent } from '@/components/dynamic-qr-display-content'

export default function QRDisplayPage({
  params,
}: {
  params: { slug: string }
}) {
  return (
    <div className="min-h-screen bg-background">
      <DynamicQRDisplayContent slug={params.slug} />
    </div>
  )
}
