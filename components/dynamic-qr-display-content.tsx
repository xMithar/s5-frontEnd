'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Download, Share2, Copy, Check, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { QRData } from '@/app/api/qr/[slug]/route'

interface DynamicQRDisplayContentProps {
  slug: string
}

export function DynamicQRDisplayContent({ slug }: DynamicQRDisplayContentProps) {
  const router = useRouter()
  const [qrData, setQRData] = useState<QRData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function fetchQRData() {
      try {
        setLoading(true)
        const response = await fetch(`/api/qr/${slug}`)
        if (!response.ok) {
          throw new Error('QR code not found')
        }
        const data = await response.json()
        setQRData(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load QR code')
        setQRData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchQRData()
  }, [slug])

  const handleCopyLink = () => {
    const url = `${window.location.origin}/qr/${slug}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/qr/${slug}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: qrData?.title,
          text: qrData?.description,
          url: url,
        })
      } catch (err) {
        console.log('[v0] Share cancelled or failed')
      }
    } else {
      handleCopyLink()
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (error || !qrData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-foreground">QR Not Found</h1>
          <p className="mb-6 text-muted-foreground">{error || 'This QR code does not exist.'}</p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="flex-1 px-4 text-center text-sm font-semibold text-foreground truncate">
            {qrData.title}
          </h1>
          <div className="h-10 w-10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6">
          {/* Title and Description */}
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl text-pretty">
              {qrData.title}
            </h2>
            {qrData.description && (
              <p className="text-base text-muted-foreground sm:text-lg">
                {qrData.description}
              </p>
            )}
          </div>

          {/* Content Area */}
          <div className="mb-8">
            <ContentRenderer
              contentType={qrData.contentType}
              data={qrData.data}
            />
          </div>

          {/* Owner Info */}
          <div className="mb-8 rounded-lg bg-muted/40 px-4 py-3 text-center">
            <p className="text-xs text-muted-foreground">
              Created by <span className="font-medium text-foreground">{qrData.ownerName}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-border bg-card/95 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-2xl px-4 py-4 sm:px-6">
          <div className="flex gap-2">
            <button
              onClick={handleCopyLink}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span className="hidden sm:inline">Copy Link</span>
                </>
              )}
            </button>
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContentRenderer({
  contentType,
  data,
}: {
  contentType: QRData['contentType']
  data: Record<string, any>
}) {
  switch (contentType) {
    case 'url':
      return (
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Website Link
            </p>
            <h3 className="mb-1 text-lg font-semibold text-foreground">
              {data.title}
            </h3>
            <p className="text-sm text-primary">{data.displayUrl}</p>
          </div>
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Visit Website
          </a>
        </div>
      )

    case 'file':
      return (
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-sm font-bold text-primary">
                  {data.fileType || 'FILE'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {data.fileName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {data.fileSize}
                </p>
              </div>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
            <Download className="h-4 w-4" />
            Download File
          </button>
        </div>
      )

    case 'text':
      return (
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
            <div className="space-y-3 text-foreground">
              {data.eventName && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">
                    Event
                  </p>
                  <p className="font-semibold text-lg">{data.eventName}</p>
                </div>
              )}
              {data.date && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">
                    Date
                  </p>
                  <p>{data.date}</p>
                </div>
              )}
              {data.time && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">
                    Time
                  </p>
                  <p>{data.time}</p>
                </div>
              )}
              {data.location && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">
                    Location
                  </p>
                  <p>{data.location}</p>
                </div>
              )}
              {data.speakers && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">
                    Speakers
                  </p>
                  <p>{data.speakers}</p>
                </div>
              )}
              {data.content && (
                <div className="border-t border-border pt-4 mt-4">
                  <p className="text-base leading-relaxed">{data.content}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )

    case 'menu':
      return (
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
            <h3 className="mb-1 font-semibold text-foreground text-lg">
              {data.restaurant}
            </h3>
            <p className="text-sm text-muted-foreground">{data.address}</p>
            <p className="text-sm text-muted-foreground">{data.phone}</p>
          </div>
          {data.categories && Array.isArray(data.categories) && (
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Menu Categories
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {data.categories.map((category: string) => (
                  <button
                    key={category}
                    className="rounded-lg border border-border bg-accent px-3 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )

    case 'form':
      return (
        <div className="space-y-4">
          <form className="space-y-4">
            {data.fields &&
              Array.isArray(data.fields) &&
              data.fields.map(
                (field: {
                  name: string
                  label: string
                  type: string
                  options?: string[]
                  required?: boolean
                }) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      {field.label}
                      {field.required && <span className="text-destructive">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        rows={4}
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        name={field.name}
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((option: string) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    )}
                  </div>
                )
              )}
          </form>
          <button className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
            Submit Form
          </button>
        </div>
      )

    default:
      return (
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <p className="text-muted-foreground">Unknown content type</p>
        </div>
      )
  }
}
