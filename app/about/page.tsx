import Link from "next/link"
import { PublicNavbar } from "@/components/public-navbar"
import { PublicFooter } from "@/components/public-footer"

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />

      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-balance text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            About ScanDz
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            We're on a mission to make QR codes smarter, more trackable, and more powerful for businesses everywhere.
          </p>
        </section>

        {/* Story */}
        <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
          <p>
            ScanDz was founded in 2024 with a simple belief: QR codes could be more than static links.
            They could be dynamic, trackable, and integrated deeply into modern marketing strategies.
          </p>
          <p>
            What started as a small team of developers frustrated with existing QR code solutions has
            grown into a platform trusted by thousands of businesses worldwide. We're obsessed with
            making QR code management intuitive, powerful, and accessible to everyone.
          </p>
          <p>
            Today, ScanDz powers millions of scans every month, helping businesses understand their
            customers better and make data-driven marketing decisions.
          </p>
        </div>
        </section>

        {/* Mission & Values */}
        <section className="mb-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
            <p className="text-muted-foreground">
              To empower businesses with intelligent QR code technology that drives engagement,
              provides actionable insights, and simplifies marketing workflows.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Values</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>Innovation:</strong> We constantly push boundaries</li>
              <li>• <strong>Simplicity:</strong> We make complex things easy</li>
              <li>• <strong>Reliability:</strong> Our platform is always available</li>
              <li>• <strong>Security:</strong> Your data is protected</li>
            </ul>
          </div>
        </div>
      </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-12">Leadership Team</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { name: "Sarah Chen", title: "CEO & Founder", bio: "10+ years in marketing tech" },
              { name: "Marcus Johnson", title: "CTO & Founder", bio: "Full-stack engineer passionate about UX" },
              { name: "Elena Rodriguez", title: "Head of Product", bio: "Former product lead at a major tech company" },
            ].map((member) => (
              <div key={member.name} className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
                <div className="h-20 w-20 mx-auto rounded-full bg-primary/10 mb-4" />
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm font-medium text-primary">{member.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">By The Numbers</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Active Users", value: "50K+" },
              { label: "QR Codes Created", value: "2.5M+" },
              { label: "Monthly Scans", value: "100M+" },
              { label: "Countries Served", value: "150+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center rounded-2xl border border-border bg-primary/5 p-12 shadow-sm">
          <h2 className="text-3xl font-bold text-foreground">Join Thousands of Happy Users</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Start creating powerful QR codes today and experience the difference intelligent tracking can make.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Get Started Free
          </Link>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
