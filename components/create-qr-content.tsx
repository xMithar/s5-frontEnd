"use client"

import { useState, useRef, type ChangeEvent, type DragEvent } from "react"
import { useRouter } from "next/navigation"
import QRCode from "react-qr-code"
import { toast } from "sonner"
import { createQRCode } from "@/lib/api/qrcodes"
import {
  QrCode,
  Link2,
  Type,
  Palette,
  Download,
  Copy,
  Check,
  Sparkles,
  RotateCcw,
  Upload,
  FileText,
  FileIcon,
  ClipboardList,
  X,
  ToggleLeft,
  ToggleRight,
  Image,
  SquareRoundCorner,
  Loader,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const presetColors = [
  { label: "Indigo", value: "#4338ca" },
  { label: "Black", value: "#111827" },
  { label: "Blue", value: "#2563eb" },
  { label: "Emerald", value: "#059669" },
  { label: "Rose", value: "#e11d48" },
  { label: "Orange", value: "#ea580c" },
  { label: "Violet", value: "#7c3aed" },
  { label: "Slate", value: "#475569" },
]

const bgPresetColors = [
  { label: "White", value: "#ffffff" },
  { label: "Light Gray", value: "#f3f4f6" },
  { label: "Warm", value: "#fffbeb" },
  { label: "Cool", value: "#eff6ff" },
  { label: "Mint", value: "#ecfdf5" },
  { label: "Blush", value: "#fef2f2" },
]

type ContentType = "url" | "file" | "text" | "menu" | "form"

interface MockFile {
  name: string
  size: string
  type: string
}

const contentTypeTabs: { id: ContentType; label: string; icon: typeof Link2 }[] = [
  { id: "url", label: "URL", icon: Link2 },
  { id: "file", label: "File Upload", icon: Upload },
  { id: "text", label: "Text Content", icon: FileText },
  { id: "menu", label: "Menu / Doc", icon: FileIcon },
  { id: "form", label: "Form", icon: ClipboardList },
]

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function CreateQRContent() {
  const router = useRouter()
  
  /* --- form state --- */
  const [qrName, setQrName] = useState("")
  const [qrType, setQrType] = useState<"static" | "dynamic">("dynamic")
  const [contentType, setContentType] = useState<ContentType>("url")

  /* content states */
  const [url, setUrl] = useState("https://example.com")
  const [textContent, setTextContent] = useState("")
  const [menuContent, setMenuContent] = useState("")
  const [formContent, setFormContent] = useState("")
  const [uploadedFile, setUploadedFile] = useState<MockFile | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  /* customization */
  const [fgColor, setFgColor] = useState("#4338ca")
  const [bgColor, setBgColor] = useState("#ffffff")
  const [roundedCorners, setRoundedCorners] = useState(false)
  const [addLogo, setAddLogo] = useState(false)
  const [logoFile, setLogoFile] = useState<{ name: string; url: string } | null>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)

  /* ui */
  const [copied, setCopied] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  /* --- derived --- */
  const qrValue = (() => {
    switch (contentType) {
      case "url":
        return url || "https://example.com"
      case "text":
        return textContent || "Hello from QRFlow"
      case "menu":
        return menuContent || "Menu placeholder"
      case "form":
        return formContent || "Form placeholder"
      case "file":
        return uploadedFile
          ? `file://${uploadedFile.name}`
          : "https://example.com/file"
      default:
        return "https://example.com"
    }
  })()

  /* --- handlers --- */
  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCreateQRCode = async () => {
    // Validate required fields
    if (!url && contentType === "url") {
      toast.error("Please enter a destination URL")
      return
    }

    setIsCreating(true)
    try {
      const response = await createQRCode({
        destination_url: url || "https://example.com",
        color: fgColor,
        shape: roundedCorners ? "rounded" : "square",
        is_dynamic: qrType === "dynamic",
      })

      toast.success("QR Code created successfully!")
      // Redirect to QR codes list
      router.push("/admin/qr-codes")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create QR code"
      toast.error(message)
    } finally {
      setIsCreating(false)
    }
  }

  const handleReset = () => {
    setQrName("")
    setQrType("dynamic")
    setContentType("url")
    setUrl("https://example.com")
    setTextContent("")
    setMenuContent("")
    setFormContent("")
    setUploadedFile(null)
    setFgColor("#4338ca")
    setBgColor("#ffffff")
    setRoundedCorners(false)
    setAddLogo(false)
    setLogoFile(null)
  }

  const handleLogoSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setLogoFile({ name: file.name, url })
    }
  }

  const handleRemoveLogo = () => {
    if (logoFile?.url) {
      URL.revokeObjectURL(logoFile.url)
    }
    setLogoFile(null)
  }

  const handleFileDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      setUploadedFile({
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
      })
    }
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile({
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
      })
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
      {/* ========== Left: Form ========== */}
      <div className="flex flex-col gap-6 xl:col-span-3">
        {/* ---- Section 1: Basic Information ---- */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-base font-semibold text-foreground">
              Basic Information
            </h2>
            <p className="text-sm text-muted-foreground">
              Name your QR code and choose its type
            </p>
          </div>

          <div className="space-y-6 px-6 py-6">
            {/* QR Name */}
            <div className="space-y-2">
              <label
                htmlFor="qr-name"
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <Type className="h-4 w-4 text-muted-foreground" />
                QR Code Name
              </label>
              <input
                id="qr-name"
                type="text"
                placeholder="e.g. Summer Campaign 2026"
                value={qrName}
                onChange={(e) => setQrName(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>

            {/* Type selector */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Sparkles className="h-4 w-4 text-muted-foreground" />
                QR Code Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setQrType("static")}
                  className={`flex flex-col items-center gap-1.5 rounded-lg border px-4 py-4 text-sm font-medium transition-all ${
                    qrType === "static"
                      ? "border-primary bg-primary/5 text-primary ring-2 ring-ring/20"
                      : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-accent"
                  }`}
                >
                  <QrCode className="h-5 w-5" />
                  <span>Static</span>
                  <span
                    className={`text-xs font-normal ${qrType === "static" ? "text-primary/70" : "text-muted-foreground"}`}
                  >
                    Fixed content
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setQrType("dynamic")}
                  className={`flex flex-col items-center gap-1.5 rounded-lg border px-4 py-4 text-sm font-medium transition-all ${
                    qrType === "dynamic"
                      ? "border-primary bg-primary/5 text-primary ring-2 ring-ring/20"
                      : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-accent"
                  }`}
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Dynamic</span>
                  <span
                    className={`text-xs font-normal ${qrType === "dynamic" ? "text-primary/70" : "text-muted-foreground"}`}
                  >
                    Editable later
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Section 2: Content Type ---- */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-base font-semibold text-foreground">
              Content Type
            </h2>
            <p className="text-sm text-muted-foreground">
              Choose what your QR code links to
            </p>
          </div>

          <div className="px-6 py-6">
            {/* Tabs */}
            <div className="mb-6 flex flex-wrap gap-1.5 rounded-lg border border-border bg-muted/40 p-1">
              {contentTypeTabs.map((tab) => {
                const Icon = tab.icon
                const isActive = contentType === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setContentType(tab.id)}
                    className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Tab panels */}
            <div className="space-y-4">
              {/* URL */}
              {contentType === "url" && (
                <div className="space-y-2">
                  <label
                    htmlFor="qr-url"
                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <Link2 className="h-4 w-4 text-muted-foreground" />
                    Destination URL
                  </label>
                  <div className="relative">
                    <input
                      id="qr-url"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                    />
                    {url.length > 0 && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Check className="h-4 w-4 text-emerald-500" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {qrType === "dynamic"
                      ? "This URL can be changed anytime after creation."
                      : "This URL is permanent once the QR code is generated."}
                  </p>
                </div>
              )}

              {/* File Upload */}
              {contentType === "file" && (
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    Upload File
                  </label>

                  {!uploadedFile ? (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault()
                        setIsDragOver(true)
                      }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={handleFileDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors ${
                        isDragOver
                          ? "border-primary bg-primary/5"
                          : "border-border bg-muted/30 hover:border-primary/40 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Drag and drop your file here
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          or click to browse. Accepts PDF, DOC, PNG, JPG
                        </p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <FileIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {uploadedFile.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {uploadedFile.size}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        aria-label="Remove file"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Text Content */}
              {contentType === "text" && (
                <div className="space-y-2">
                  <label
                    htmlFor="qr-text"
                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Text Content
                  </label>
                  <textarea
                    id="qr-text"
                    rows={5}
                    placeholder="Enter the text content you want to encode..."
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    className="w-full resize-none rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                  <p className="text-xs text-muted-foreground">
                    {textContent.length} / 300 characters
                  </p>
                </div>
              )}

              {/* Menu / Document */}
              {contentType === "menu" && (
                <div className="space-y-2">
                  <label
                    htmlFor="qr-menu"
                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <FileIcon className="h-4 w-4 text-muted-foreground" />
                    Menu / Document URL
                  </label>
                  <input
                    id="qr-menu"
                    type="url"
                    placeholder="https://yourdomain.com/menu.pdf"
                    value={menuContent}
                    onChange={(e) => setMenuContent(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                  <p className="text-xs text-muted-foreground">
                    Link to a hosted menu, PDF, or document page.
                  </p>
                </div>
              )}

              {/* Form */}
              {contentType === "form" && (
                <div className="space-y-2">
                  <label
                    htmlFor="qr-form"
                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    Form URL
                  </label>
                  <input
                    id="qr-form"
                    type="url"
                    placeholder="https://forms.google.com/..."
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                  <p className="text-xs text-muted-foreground">
                    Link to a Google Form, Typeform, or any other hosted form.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ---- Section 3: QR Customization ---- */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-base font-semibold text-foreground">
              QR Customization
            </h2>
            <p className="text-sm text-muted-foreground">
              Personalize the look of your QR code
            </p>
          </div>

          <div className="space-y-6 px-6 py-6">
            {/* Foreground Color */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Palette className="h-4 w-4 text-muted-foreground" />
                Foreground Color
              </label>
              <div className="flex flex-wrap items-center gap-2.5">
                {presetColors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setFgColor(color.value)}
                    className={`group relative flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-110 ${
                      fgColor === color.value
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-card"
                        : ""
                    }`}
                    aria-label={`Select ${color.label} color`}
                  >
                    <span
                      className="h-7 w-7 rounded-full border border-border/50"
                      style={{ backgroundColor: color.value }}
                    />
                  </button>
                ))}
                <div className="relative">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="absolute inset-0 h-9 w-9 cursor-pointer opacity-0"
                    aria-label="Pick a custom foreground color"
                  />
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                    <Palette className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-5 w-5 rounded border border-border/50"
                  style={{ backgroundColor: fgColor }}
                />
                <span className="font-mono text-xs uppercase text-muted-foreground">
                  {fgColor}
                </span>
              </div>
            </div>

            {/* Background Color */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Palette className="h-4 w-4 text-muted-foreground" />
                Background Color
              </label>
              <div className="flex flex-wrap items-center gap-2.5">
                {bgPresetColors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setBgColor(color.value)}
                    className={`group relative flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-110 ${
                      bgColor === color.value
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-card"
                        : ""
                    }`}
                    aria-label={`Select ${color.label} background`}
                  >
                    <span
                      className="h-7 w-7 rounded-full border border-border/50"
                      style={{ backgroundColor: color.value }}
                    />
                  </button>
                ))}
                <div className="relative">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="absolute inset-0 h-9 w-9 cursor-pointer opacity-0"
                    aria-label="Pick a custom background color"
                  />
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                    <Palette className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-5 w-5 rounded border border-border/50"
                  style={{ backgroundColor: bgColor }}
                />
                <span className="font-mono text-xs uppercase text-muted-foreground">
                  {bgColor}
                </span>
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-4 border-t border-border pt-6">
              {/* Rounded corners toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <SquareRoundCorner className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Rounded Corners
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Apply rounded style to QR modules
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setRoundedCorners(!roundedCorners)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                    roundedCorners ? "bg-primary" : "bg-muted"
                  }`}
                  role="switch"
                  aria-checked={roundedCorners}
                  aria-label="Toggle rounded corners"
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-card shadow-sm transition-transform ${
                      roundedCorners ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Add logo toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Image className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Add Logo
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Place your brand logo in the center
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAddLogo(!addLogo)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                    addLogo ? "bg-primary" : "bg-muted"
                  }`}
                  role="switch"
                  aria-checked={addLogo}
                  aria-label="Toggle add logo"
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-card shadow-sm transition-transform ${
                      addLogo ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Logo upload */}
              {addLogo && (
                <div className="ml-12 space-y-3">
                  {logoFile ? (
                    <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Image className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {logoFile.name}
                          </p>
                          <p className="text-xs text-muted-foreground">Logo ready</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        aria-label="Remove logo"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer rounded-lg border border-dashed border-border bg-muted/30 px-4 py-5 text-center transition-colors hover:border-primary hover:bg-primary/5"
                      onClick={() => logoInputRef.current?.click()}
                    >
                      <Image className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm font-medium text-foreground">
                        Click to upload logo
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG or SVG (max 2MB)
                      </p>
                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoSelect}
                        className="hidden"
                        aria-label="Upload logo file"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Form
          </button>
          <button
            type="button"
            onClick={handleCreateQRCode}
            disabled={isCreating || !url}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <QrCode className="h-4 w-4" />
                Save QR Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* ========== Right: Preview ========== */}
      <div className="flex flex-col gap-6 xl:col-span-2">
        {/* Live preview card */}
        <div className="sticky top-6 rounded-xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-base font-semibold text-foreground">
              Live Preview
            </h2>
            <p className="text-sm text-muted-foreground">
              Your QR code updates in real time
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 px-6 py-8">
            {/* QR code */}
            <div
              className="rounded-2xl border border-border p-6 shadow-inner"
              style={{ backgroundColor: bgColor }}
            >
              <div className="relative">
                <QRCode
                  value={qrValue}
                  size={180}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  level="M"
                  style={
                    roundedCorners
                      ? { borderRadius: "12px", overflow: "hidden" }
                      : undefined
                  }
                />
                {/* Logo placeholder overlay */}
                {addLogo && (
                  <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-border shadow-sm" style={{ backgroundColor: bgColor }}>
                    <QrCode className="h-5 w-5" style={{ color: fgColor }} />
                  </div>
                )}
              </div>
            </div>

            {/* Meta info */}
            <div className="w-full space-y-3">
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  {qrName || "Untitled QR Code"}
                </p>
                <div className="mt-1 flex items-center justify-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      qrType === "dynamic"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {qrType === "dynamic" ? "Dynamic" : "Static"}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                    {contentTypeTabs.find((t) => t.id === contentType)?.label}
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-muted/50 px-3 py-2">
                <p className="truncate text-center font-mono text-xs text-muted-foreground">
                  {qrValue}
                </p>
              </div>

              {/* Color swatches */}
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span
                    className="inline-block h-4 w-4 rounded border border-border/50"
                    style={{ backgroundColor: fgColor }}
                  />
                  <span className="font-mono text-xs uppercase text-muted-foreground">
                    {fgColor}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="inline-block h-4 w-4 rounded border border-border/50"
                    style={{ backgroundColor: bgColor }}
                  />
                  <span className="font-mono text-xs uppercase text-muted-foreground">
                    {bgColor}
                  </span>
                </div>
              </div>
            </div>

            {/* Preview actions */}
            <div className="flex w-full gap-3">
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tips card */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground">Tips</h3>
          <ul className="mt-3 space-y-2.5">
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-sm text-muted-foreground">
                Dynamic QR codes let you update the target without reprinting.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-sm text-muted-foreground">
                Use high-contrast colors for better scannability.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-sm text-muted-foreground">
                Always test your QR code before printing or sharing.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
