"use client";
// Small Screen App Navbar Dropdown

import { useState } from "react";
import Link from "next/link";

export default function AppNavbarDropdown() {
  const [menuOn, setMenu] = useState(false);
  return (
    <>
      <button className="block sm:hidden text-lg bi bi-grid-3x3-gap-fill" onClick={() => setMenu((s) => !s)} />
      {menuOn ? (
        <div className="absolute top-full right-0 bg-lime-700 py-2 px-4 flex flex-col gap-2 sm:hidden">
          <Link href="/app" onClick={() => setMenu(false)}>
            App Home
          </Link>
          <Link href="/" onClick={() => setMenu(false)}>
            To Info
          </Link>
          <Link href="/app/master-editor" onClick={() => setMenu(false)}>
            Master
          </Link>
          <Link href="/app/variant-editor" onClick={() => setMenu(false)}>
            Variant
          </Link>
          <Link href="/app/compile-editor" onClick={() => setMenu(false)}>
            Compile
          </Link>
        </div>
      ) : null}
    </>
  );
}
