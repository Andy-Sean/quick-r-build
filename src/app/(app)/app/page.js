import Link from "next/link";

export default function AppHome() {
  return (
    <>
      <p>App Home Page (WIP rn)</p>
      <p>
        <Link href="/app/master-editor">Edit Master Resume</Link>
      </p>
      <p>
        <Link href="/app/variant-editor">Create/Edit Variant Resume</Link>
      </p>
      <p>
        <Link href="/app/compile-editor">Edit Compilation Styles</Link>
      </p>
    </>
  );
}
