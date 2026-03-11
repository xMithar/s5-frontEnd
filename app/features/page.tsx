import { Zap, BarChart3, Palette, Lock, Users, Clock, FileText, Share2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PublicNavbar } from "@/components/public-navbar"
import { PublicFooter } from "@/components/public-footer"

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: "Dynamic QR Codes",
      description: "Update QR code destinations anytime without reprinting. Perfect for campaigns and time-sensitive content.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track every scan with detailed insights about location, device, browser, and time.",
    },
    {
      icon: Palette,
      title: "Custom Design",
      description: "Add your logo, customize colors, and match your brand identity perfectly.",
    },
    {
      icon: FileText,
      title: "Multiple Content Types",
      description: "URLs, files, text, menus, forms, contact cards, WiFi credentials, and more.",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Password protection, expiration dates, and access controls for sensitive QR codes.",
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Collaborate with team members and manage permissions with role-based access.",
    },
    {
      icon: Clock,
      title: "Scheduled Content",
      description: "Set activation dates and schedules for your QR codes.",
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share QR codes via email, social media, or embed in websites.",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-balance text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Powerful Features for QR Code Success
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Everything you need to create, customize, and track QR codes that drive results.
          </p>
        </section>

        {/* Features grid */}
        <section className="mb-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-border bg-card p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center rounded-2xl border border-border bg-primary/5 p-12 shadow-sm">
          <h2 className="text-3xl font-bold text-foreground">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Create your first QR code today and unlock powerful tracking and customization.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Get Started Free
            <ArrowRight className="h-5 w-5" />
          </Link>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
