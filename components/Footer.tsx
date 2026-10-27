import Link from "next/link";

export default function Footer() {
  return (
    <footer className="vista-footer mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-600 dark:text-slate-300 md:flex-row">
        <p>© {new Date().getFullYear()} Laptop Upgrade Checker. All rights reserved.</p>
        <nav aria-label="Footer navigation" className="flex gap-6">
          <Link href="/about" className="transition-colors hover:text-blue-800 dark:hover:text-white">
            About
          </Link>
          <Link href="/contact" className="transition-colors hover:text-blue-800 dark:hover:text-white">
            Contact
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-blue-800 dark:hover:text-white">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
