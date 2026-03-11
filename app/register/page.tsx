"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, X } from "lucide-react"
import { PublicFooter } from "@/components/public-footer"

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.terms) {
      newErrors.terms = "You must accept the Terms of Service"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("[v0] Form is valid, would submit:", formData)
    }
  }

  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword
  const isFormValid = formData.name && formData.email && formData.password && formData.confirmPassword && passwordsMatch && formData.terms

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ScanDz%20logo-7J1ybfWOdR79DjGOswyhMbITWPE8Q3.png"
                alt="ScanDz"
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-primary">ScanDz</span>
            </Link>
            <Link href="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Register Form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-foreground">Create Your Account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Join ScanDz and start creating powerful QR codes in minutes.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value })
                  if (errors.name) setErrors({ ...errors, name: "" })
                }}
                className={`mt-2 w-full rounded-lg border ${
                  errors.name ? "border-destructive" : "border-input"
                } bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors`}
              />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value })
                  if (errors.email) setErrors({ ...errors, email: "" })
                }}
                className={`mt-2 w-full rounded-lg border ${
                  errors.email ? "border-destructive" : "border-input"
                } bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors`}
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value })
                  if (errors.password) setErrors({ ...errors, password: "" })
                }}
                className={`mt-2 w-full rounded-lg border ${
                  errors.password ? "border-destructive" : "border-input"
                } bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors`}
              />
              {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
              {!errors.password && (
                <p className="mt-1 text-xs text-muted-foreground">
                  At least 8 characters recommended
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value })
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" })
                  }}
                  className={`mt-2 w-full rounded-lg border ${
                    errors.confirmPassword ? "border-destructive" : "border-input"
                  } bg-background px-4 py-2 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors`}
                />
                {formData.confirmPassword && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {passwordsMatch ? (
                      <Check className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <X className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                )}
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-destructive">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 pt-2">
              <input
                id="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={(e) => {
                  setFormData({ ...formData, terms: e.target.checked })
                  if (errors.terms) setErrors({ ...errors, terms: "" })
                }}
                className="mt-1 h-4 w-4 rounded border border-input cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer">
                I agree to the{" "}
                <Link href="/terms" className="font-medium text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-medium text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && <p className="text-xs text-destructive">{errors.terms}</p>}

            {/* Register Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                isFormValid
                  ? "bg-primary text-primary-foreground hover:opacity-90 cursor-pointer"
                  : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
              }`}
            >
              Create Account
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <PublicFooter />
    </div>
  )
}
