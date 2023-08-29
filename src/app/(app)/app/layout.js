"use client";
// Shared Layout for all App Pages - use the Context & Navbar

import AppNav from "./app-navbar";
import { ContextsProvider } from "@/redux/ContextsProvider";

export default function AppLayout({ children }) {
  return (
    <>
      <AppNav />
      <ContextsProvider>{children}</ContextsProvider>
    </>
  );
}
