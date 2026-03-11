'use client'

import { useState } from 'react'
import { ArrowLeft, Download, Share2, Copy, Check } from 'lucide-react'

type ContentType = 'menu' | 'document' | 'form' | 'contact' | 'text'

interface QRContent {
  id: string
  title: string
  contentType: ContentType
  description?: string
  data: Record<string, string | number>
}

const mockQRContent: QRContent = {
  id: 'qr-12345',
  title: 'Restaurant Menu',
  contentType: 'menu',
  description: 'View our latest menu and specials',
  data: {
    restaurant: 'The Grill House',
    address: '123 Main St, Downtown',
    phone: '(555) 123-4567',
  },
}

function ContentPreview({
  contentType,
  data,
}: {
  contentType: ContentType
  data: Record<string, string | number>
}) {
  switch (contentType) {
    case 'menu':
      return (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-muted p-4">
            <h3 className="font-semibold text-foreground mb-2">
              {data.restaurant || 'Menu Item'}
            </h3>
            <p className="text-sm text-muted-foreground">{data.address}</p>
            <p className="text-sm text-muted-foreground mt-1">{data.phone}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-accent/50 p-3 text-center">
              <p className="text-xs text-muted-foreground">Appetizers</p>
            </div>
            <div className="rounded-lg bg-accent/50 p-3 text-center">
              <p className="text-xs text-muted-foreground">Main Courses</p>
            </div>
            <div className="rounded-lg bg-accent/50 p-3 text-center">
              <p className="text-xs text-muted-foreground">Desserts</p>
            </div>
            <div className="rounded-lg bg-accent/50 p-3 text-center">
              <p className="text-xs text-muted-foreground">Beverages</p>
            </div>
          </div>
        </div>
      )

    case 'document':
      return (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-lg font-bold text-primary">PDF</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">Sample Document</p>
                <p className="text-sm text-muted-foreground">2.4 MB</p>
              </div>
            </div>
          </div>
          <button className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
            Download Document
          </button>
        </div>
      )

    case 'form':
      return (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Message
            </label>
            <textarea
              placeholder="Your message..."
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              rows={3}
              disabled
            />
          </div>
          <button className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
            Submit Form
          </button>
        </div>
      )

    case 'contact':
      return (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-card p-4 text-center">
            <p className="font-semibold text-foreground">John Smith</p>
            <p className="text-sm text-muted-foreground">Founder & CEO</p>
          </div>
          <a
            href="tel:+15551234567"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary/10 px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
          >
            <span>Call</span>
          </a>
          <a
            href="mailto:john@example.com"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            <span>Email</span>
          </a>
        </div>
      )

    case 'text':
    default:
      return (
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm leading-relaxed text-foreground">
            This is a QR code that contains text content. You can add any information here and scan
            it with your phone camera or a QR code reader app. This content is displayed instantly
            without requiring users to download anything or visit a website.
          </p>
        </div>
      )
  }
}

export function PublicQRDisplayContent() {
  const [copied, setCopied] = useState(false)

  const contentTypeLabels: Record<ContentType, string> = {
    menu: 'Menu',
    document: 'Document',
    form: 'Form',
    contact: 'Contact',
    text: 'Text',
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - minimal */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <button className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <p className="text-sm font-medium text-muted-foreground">
            {contentTypeLabels[mockQRContent.contentType]}
          </p>
          <div className="w-9" />
        </div>
      </div>

      {/* Main content - centered and mobile-optimized */}
      <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">
          {/* Title section */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {mockQRContent.title}
            </h1>
            {mockQRContent.description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {mockQRContent.description}
              </p>
            )}
          </div>

          {/* Content area */}
          <div className="mb-8">
            <ContentPreview
              contentType={mockQRContent.contentType}
              data={mockQRContent.data}
            />
          </div>

          {/* Action buttons - minimal but functional */}
          <div className="space-y-2">
            <button
              onClick={handleCopy}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Link
                </>
              )}
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent">
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>

          {/* Footer - minimal branding */}
          <div className="mt-8 border-t border-border pt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Created with <span className="font-semibold text-primary">QRFlow</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
