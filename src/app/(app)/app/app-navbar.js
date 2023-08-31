// Navbar for App Pages

import Link from "next/link";

import AppNavbarDropdown from "./app-navbar-dropdown";

export default function AppNav() {
  return (
    <header className="z-50 sticky top-0 bg-lime-700 py-2 px-4 flex justify-between items-center">
      <h1 className="text-2xl md:text-3xl font-bold">Quick-R-Build</h1>
      <nav className="flex gap-10 items-center">
        <AppNavbarDropdown />

        {/* full menu otherwise */}
        <Link href="/" className="hidden md:block text-lg text-yellow-500">To Info (Resets App!)</Link>
        <Link href="/app" className="hidden md:block text-lg bi bi-house-fill" />
        <Link href="/app/master-editor" className="hidden md:block text-lg">Master</Link>
        <Link href="/app/variant-editor" className="hidden md:block text-lg">
          Variant
        </Link>
        <Link href="/app/compile-editor" className="hidden md:block text-lg">
          Compile
        </Link>
      </nav>
    </header>
  );
}
