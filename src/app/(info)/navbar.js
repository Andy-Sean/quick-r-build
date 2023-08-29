// Main Navbar for Info Pages

import Link from "next/link";

import NavbarDropdown from "./navbar-dropdown";

export default function Navbar() {
  return (
    <header className="z-50 sticky top-0 bg-teal-950 py-2 px-4 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold">Quick-R-Build</h1>
          <nav className="flex gap-10 items-center">
            <NavbarDropdown />
            {/* full menu otherwise */}
            <Link href="/" className="hidden sm:block text-lg bi bi-house-fill" />
            <Link href="/app" className="hidden sm:block text-lg">
              To App
            </Link>
            <Link href="/attributions" className="hidden sm:block text-lg">
              Attributions
            </Link>
          </nav>
        </header>
  )

}