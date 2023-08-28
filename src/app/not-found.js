import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center m-2">
      <h1 className="w-full text-5xl text-red-600 font-bold bg-slate-800 p-10 rounded-t-xl">
        404 :(
      </h1>
      
      <div className="bg-slate-600 rounded-b-xl p-8 w-full text-center">
        <p>
          Uh oh, it looks like the page you were looking for doesn&apos;t exist. Either
          this page hasn&apos;t been made yet, or you aren&apos;t supposed to be here.
        </p>
        <p>
          Click <Link className="text-blue-400 underline" href="/">HERE</Link> to return to the home page, or just go
          back on the browser.
        </p>
      </div>
    </main>
  );
}
