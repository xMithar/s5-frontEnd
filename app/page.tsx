import { ArrowRight, QrCode, BarChart3, Palette, CheckCircle, Zap, Lock, Users } from "lucide-react"
import Link from "next/link"
import { PublicNavbar } from "@/components/public-navbar"
import { PublicFooter } from "@/components/public-footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-balance text-5xl sm:text-6xl font-bold tracking-tight text-foreground">
            Create & Track QR Codes That Convert
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            ScanDz makes it effortless to generate, customize, and analyze QR codes. From dynamic links to files, menus, and forms — manage everything in one platform.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-base font-medium text-foreground hover:bg-accent transition-colors"
            >
              Login
            </Link>
          </div>
        </section>

        {/* Feature Preview Cards */}
        <section className="mb-20">
          <h2 className="text-center text-3xl font-bold text-foreground mb-12">
            Why Choose ScanDz?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <Link href="/features">
              <div className="h-full rounded-xl border border-border bg-card p-8 shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">
                  Dynamic QR Codes
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Update destination URLs anytime without printing new codes.
                </p>
                <p className="mt-4 text-sm font-medium text-primary">
                  Learn more →
                </p>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/features">
              <div className="h-full rounded-xl border border-border bg-card p-8 shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">
                  Real-Time Analytics
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Track scans by location, device, and browser instantly.
                </p>
                <p className="mt-4 text-sm font-medium text-primary">
                  Learn more →
                </p>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/features">
              <div className="h-full rounded-xl border border-border bg-card p-8 shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">
                  Enterprise Security
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Bank-level encryption and compliance for your data.
                </p>
                <p className="mt-4 text-sm font-medium text-primary">
                  Learn more →
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 p-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
            <div>
              <div className="text-4xl font-bold text-primary">50K+</div>
              <p className="mt-2 text-sm text-muted-foreground">Active Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">2.5M+</div>
              <p className="mt-2 text-sm text-muted-foreground">QR Codes Created</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">100M+</div>
              <p className="mt-2 text-sm text-muted-foreground">Total Scans</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center rounded-2xl border border-border bg-card p-12 shadow-sm">
          <h2 className="text-4xl font-bold text-foreground">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Join thousands of businesses using ScanDz. No credit card required.
          </p>
          <div className="mt-8 flex justify-center items-center gap-4 flex-wrap">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
            >
              Create Free Account
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-base font-medium text-foreground hover:bg-accent transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
