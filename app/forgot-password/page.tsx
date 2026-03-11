"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import { PublicFooter } from "@/components/public-footer"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email address is required")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateEmail()) {
      setIsSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
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

      {/* Forgot Password Form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm">
          {!isSubmitted ? (
            <>
              <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError("")
                    }}
                    className={`mt-2 w-full rounded-lg border ${
                      error ? "border-destructive" : "border-input"
                    } bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors`}
                  />
                  {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!email}
                  className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                    email
                      ? "bg-primary text-primary-foreground hover:opacity-90 cursor-pointer"
                      : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                  }`}
                >
                  <Mail className="h-4 w-4" />
                  Send Reset Link
                </button>
              </form>

              {/* Back to Login */}
              <Link
                href="/login"
                className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Sign In
              </Link>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h1 className="mt-4 text-2xl font-bold text-foreground">Check Your Email</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                We've sent a password reset link to <strong className="text-foreground">{email}</strong>
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="font-medium text-primary hover:underline"
                >
                  try another email
                </button>
              </p>

              {/* Back to Login */}
              <Link
                href="/login"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>

      <PublicFooter />
    </div>
  )
}
