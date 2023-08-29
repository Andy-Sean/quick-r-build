"use client";
// Small Screen Navbar Dropdown Component

import { useState } from "react";
import Link from "next/link";

export default function NavbarDropdown() {
  const [menuOn, setMenu] = useState(false);
  return (
    <>
      <button className="block sm:hidden text-lg bi bi-grid-3x3-gap-fill" onClick={() => setMenu((s) => !s)} />
      {menuOn ? (
        <div className="absolute top-full right-0 bg-teal-950 py-2 px-4 flex flex-col gap-2 sm:hidden">
          <Link href="/" onClick={() => setMenu(false)}>
            Home
          </Link>
          <Link href="/app" onClick={() => setMenu(false)}>
            To App
          </Link>
          <Link href="/attributions" onClick={() => setMenu(false)}>
            Attributions
          </Link>
        </div>
      ) : null}
    </>
  );
}
