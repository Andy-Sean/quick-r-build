import Link from "next/link";

export default function Home() {
  return (
    <main>
      <p>Customize your resume to meet any need!</p>
      <div>
        <Link href="/app/master-editor">Edit Resume Master</Link>
      </div>
      <div>
        <Link href="/app/variant-editor">Create/Edit Resume Variant</Link>
      </div>
      <div>
        <Link href="/app/compile-editor">Compilation Settings</Link>
      </div>
    </main>
  );
}
