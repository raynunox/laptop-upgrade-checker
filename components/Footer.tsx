import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-16">
      <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Laptop Upgrade Checker. All rights reserved.</p>
        <nav className="flex gap-6">
          <Link href="/about" className="hover:text-slate-800 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-slate-800 transition-colors">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-slate-800 transition-colors">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
