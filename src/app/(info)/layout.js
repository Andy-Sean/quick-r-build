// Layout for Info Pages
// Will contain Header and Footer and that's really it
"use client";

import Link from "next/link";
import { useState } from "react";

export default function InfoLayout({ children }) {
  const [menuOn, setMenu] = useState(false);

  return (
    <>
      {/* wrapper class to keep the footer to the bottom of the page */}
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 bg-teal-950 py-2 px-4 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold">Quick-R-Build</h1>
          <nav className="flex gap-10 items-center">
            {/* collapsing menu if too small */}
            <button
              className="block sm:hidden text-lg bi bi-grid-3x3-gap-fill"
              onClick={() => setMenu((s) => !s)}
            />
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

            {/* full menu otherwise */}
            <Link
              href="/"
              className="hidden sm:block text-lg bi bi-house-fill"
            />
            <Link href="/app" className="hidden sm:block text-lg">
              To App
            </Link>
            <Link href="/attributions" className="hidden sm:block text-lg">
              Attributions
            </Link>
          </nav>
        </header>

        <div className="flex-auto">{children}</div>

        <footer className="sticky bottom-0 flex flex-col items-center p-2 bg-teal-950">
          <p className="text-sm text-center w-2/3">
            Made by Andoiii (Andy Chang) and Sean Yan with a significant amount
            of headbanging
          </p>
          <a
            className="bi bi-github"
            href="https://github.com/Andy-Sean/quick-r-build"
            target="_blank"
          />
        </footer>
      </div>
    </>
  );
}
