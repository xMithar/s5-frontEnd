import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PublicNavbar } from "@/components/public-navbar"
import { PublicFooter } from "@/components/public-footer"

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "Up to 50 QR codes",
        "Basic analytics",
        "Static QR codes",
        "Standard support",
        "No branding",
      ],
      cta: "Get Started",
      ctaUrl: "/register",
      popular: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "For growing businesses",
      features: [
        "Up to 1,000 QR codes",
        "Advanced analytics",
        "Dynamic QR codes",
        "Custom branding",
        "Logo customization",
        "Priority support",
        "Team collaboration",
      ],
      cta: "Start Free Trial",
      ctaUrl: "/register",
      popular: true,
    },
    {
      name: "Business",
      price: "$99",
      period: "/month",
      description: "For enterprises",
      features: [
        "Unlimited QR codes",
        "Enterprise analytics",
        "Dynamic & static QR",
        "Full customization",
        "API access",
        "24/7 premium support",
        "Team management",
        "Security & compliance",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      ctaUrl: "/contact",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-balance text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Simple, Transparent Pricing
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Choose the perfect plan for your needs. Always flexible, no hidden fees.
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="mb-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border shadow-sm transition-all h-full flex flex-col ${
                  plan.popular
                    ? "border-primary bg-primary/5 lg:scale-105"
                    : "border-border bg-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>

                  <div className="mt-6">
                    <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                    {plan.period && (
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    )}
                  </div>

                  <div className="mt-8 space-y-4 flex-1">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={plan.ctaUrl}
                    className={`mt-8 w-full rounded-lg px-6 py-3 text-center text-sm font-medium transition-all inline-flex items-center justify-center gap-2 ${
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "border border-border text-foreground hover:bg-accent"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-center text-3xl font-bold text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I change my plan anytime?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "Do you offer discounts for annual billing?",
                a: "Yes! Save 20% when you choose annual billing for Pro and Business plans.",
              },
              {
                q: "Is there a free trial for Pro?",
                a: "Absolutely. Get 14 days free access to all Pro features. No credit card required.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, Apple Pay, Google Pay, and bank transfers for annual plans.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-foreground">{faq.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
