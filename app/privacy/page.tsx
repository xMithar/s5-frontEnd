import { PublicNavbar } from "@/components/public-navbar"
import { PublicFooter } from "@/components/public-footer"

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />

      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Privacy Policy</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: January 2026</p>
        </div>

        <div className="space-y-6">
          {/* Section 1 */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              ScanDz ("we" or "us" or "our") operates the ScanDz website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>
          </div>

          {/* Section 2 */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Information Collection and Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We collect several different types of information for various purposes to provide and improve our Service to you.
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-4">Types of Data Collected:</h3>
            <ul className="space-y-3 text-muted-foreground ml-6">
              <li className="list-disc"><strong className="text-foreground">Personal Data:</strong> Email address, name, phone number</li>
              <li className="list-disc"><strong className="text-foreground">Usage Data:</strong> Browser type, pages visited, time spent, IP address</li>
              <li className="list-disc"><strong className="text-foreground">QR Code Data:</strong> QR code content, scan statistics, user interactions</li>
              <li className="list-disc"><strong className="text-foreground">Cookies:</strong> We use cookies to track user preferences and session information</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Use of Data</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ScanDz uses the collected data for various purposes:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li className="list-disc">To provide and maintain the Service</li>
              <li className="list-disc">To notify you about changes to our Service</li>
              <li className="list-disc">To allow you to participate in interactive features of our Service</li>
              <li className="list-disc">To provide customer support</li>
              <li className="list-disc">To gather analysis or valuable information so that we can improve the Service</li>
              <li className="list-disc">To monitor the usage of the Service</li>
              <li className="list-disc">To detect, prevent and address technical issues</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Security of Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </div>

          {/* Section 5 */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Your Data Protection Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding your personal data:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li className="list-disc">The right to access your personal data</li>
              <li className="list-disc">The right to correct inaccurate personal data</li>
              <li className="list-disc">The right to delete your personal data</li>
              <li className="list-disc">The right to restrict processing of your personal data</li>
              <li className="list-disc">The right to data portability</li>
              <li className="list-disc">The right to object to processing of your personal data</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third-party sites or services.
            </p>
          </div>

          {/* Section 7 */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
          </div>

          {/* Section 8 */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at: support@scandz.com
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
