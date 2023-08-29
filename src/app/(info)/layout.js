"use client";
// Shared Layout for Info Pages - Header & Footer

import Link from "next/link";

import Navbar from "./navbar";

export default function InfoLayout({ children }) {
  return (
    <>
      {/* wrapper class to keep the footer to the bottom of the page */}
      <div className="flex flex-col min-h-screen">
        <Navbar />

        {/* Ensures the footer stays down using flexbox */}
        <div className="flex-auto">{children}</div>

        <footer className="sticky bottom-0 flex flex-col items-center p-2 bg-teal-950">
          <p className="text-sm text-center w-2/3">Made by Andoiii (Andy Chang) and Sean Yan with a significant amount of headbanging</p>
          <a className="bi bi-github" href="https://github.com/Andy-Sean/quick-r-build" target="_blank" />
        </footer>
      </div>
    </>
  );
}
