"use client";

// Use all of them Contexts!

import { ContextsProvider } from "@/redux/ContextsProvider";

export default function AppLayout({ children }) {
  return (
    <>
      <p>Within the App</p>
      <ContextsProvider>{children}</ContextsProvider>
    </>
  );
}
