export const metadata = {
  title: "Contact | Laptop Upgrade Checker",
  description:
    "Get in touch with the Laptop Upgrade Checker team for questions, corrections, or suggestions.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4 mt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contact Us
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Questions, feedback, or found an error in our data? We'd love to hear
            from you.
          </p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
              Email
            </h2>
            <a
              href="mailto:contact@laptopupgradechecker.com"
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              contact@laptopupgradechecker.com
            </a>
            <p className="text-sm text-slate-500 mt-1">
              We usually reply within a few business days.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
              What to include
            </h2>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>The exact laptop brand and model you're asking about</li>
              <li>A link or source if you're reporting incorrect specs</li>
              <li>Any suggestions for laptops you'd like us to add</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
