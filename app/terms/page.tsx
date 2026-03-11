import { PublicNavbar } from "@/components/public-navbar"
import { PublicFooter } from "@/components/public-footer"

export default function Terms() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />

      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Terms of Service</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: January 2026</p>
        </div>

        <div className="space-y-6">
          {/* Section 1 */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using the ScanDz platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          {/* Section 2 */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on ScanDz for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li className="list-disc">Modify or copy the materials</li>
              <li className="list-disc">Use the materials for any commercial purpose or for any public display</li>
              <li className="list-disc">Attempt to decompile or reverse engineer any software on ScanDz</li>
              <li className="list-disc">Transfer the materials to another person or mirror the materials on any other server</li>
              <li className="list-disc">Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The materials on ScanDz are provided on an 'as is' basis. ScanDz makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </div>

          {/* Section 4 */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitations</h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall ScanDz or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ScanDz, even if ScanDz or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-foreground">5. Accuracy of Materials</h2>
            <p className="text-muted-foreground">
              The materials appearing on ScanDz could include technical, typographical, or photographic errors. ScanDz does not warrant that any of the materials on the website are accurate, complete, or current. ScanDz may make changes to the materials contained on the website at any time without notice.
            </p>
          </section>

          {/* Section 5 */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Accuracy of Materials</h2>
            <p className="text-muted-foreground leading-relaxed">
              The materials appearing on ScanDz could include technical, typographical, or photographic errors. ScanDz does not warrant that any of the materials on its platform are accurate, complete, or current. ScanDz may make changes to the materials contained on its platform at any time without notice.
            </p>
          </div>

          {/* Section 6 */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Modifications</h2>
            <p className="text-muted-foreground leading-relaxed">
              ScanDz may revise these terms of service for its platform at any time without notice. By using this platform, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </div>

          {/* Section 7 */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
