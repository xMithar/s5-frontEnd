"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function PublicNavbar() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ScanDz%20logo-7J1ybfWOdR79DjGOswyhMbITWPE8Q3.png"
              alt="ScanDz"
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-primary">ScanDz</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              href="/features"
              className={`text-sm font-medium transition-colors ${
                isActive("/features")
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className={`text-sm font-medium transition-colors ${
                isActive("/pricing")
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors ${
                isActive("/about")
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors ${
                isActive("/contact")
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Auth Links */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
