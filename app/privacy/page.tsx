export const metadata = {
  title: "Privacy Policy | Laptop Upgrade Checker",
  description:
    "Privacy policy for Laptop Upgrade Checker, including how we use cookies and third-party advertising.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4 mt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400">Last updated: September 2026</p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6 text-slate-700 leading-relaxed">
          <p>
            This Privacy Policy explains how Laptop Upgrade Checker
            ("we", "us", or "our") collects, uses, and protects information when
            you use our website.
          </p>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              1. Information We Collect
            </h2>
            <p>
              Laptop Upgrade Checker does not require an account and does not
              collect personal information such as your name or address. When
              you use the search feature, your search query is sent to our
              database to return matching results. We do not store search
              queries in a way that identifies you personally.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              2. Cookies and Advertising
            </h2>
            <p>
              We use third-party advertising companies, including Google, to
              serve ads when you visit our site. These companies may use
              cookies or similar technologies to serve ads based on your prior
              visits to this website or other websites.
            </p>
            <p>
              Google's use of advertising cookies enables it and its partners
              to serve ads based on your visit to this site and/or other sites
              on the Internet. You may opt out of personalized advertising by
              visiting{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google's Ads Settings
              </a>
              . You may also visit{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                www.aboutads.info
              </a>{" "}
              to opt out of third-party vendor cookies used for personalized
              advertising more broadly.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              3. Analytics
            </h2>
            <p>
              We may use analytics services to understand how visitors use our
              site (for example, which pages are viewed and for how long).
              This data is aggregated and does not identify you personally.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              4. Third-Party Links
            </h2>
            <p>
              Our site may link to external sources (such as manufacturer
              documentation or teardown guides) used to verify laptop
              specifications. We are not responsible for the privacy practices
              of these external sites.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              5. Children's Privacy
            </h2>
            <p>
              Our site is not directed at children under 13, and we do not
              knowingly collect personal information from children.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              6. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes
              will be posted on this page with an updated revision date.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              7. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, please visit our{" "}
              <a href="/contact" className="text-blue-600 hover:underline">
                Contact page
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
