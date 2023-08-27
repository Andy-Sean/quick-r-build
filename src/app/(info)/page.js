import Link from "next/link";

export default function Home() {
  const introDelayStyle = (delay) =>
    `group-hover:delay-[${delay}ms] transition-all h-0 duration-0 delay-0 group-hover:h-full group-hover:duration-100`;

  const InfoCard = ({ children }) => {
    return (
      <div className="bg-slate-300 text-black min-w-xs max-w-sm p-4 rounded-md flex flex-col gap-3 items-center text-center">
        {children}
      </div>
    );
  };

  return (
    <main>
      {/* Main Intro */}
      <div className="relative group m-2">
        {/* Funny Decoration Things that appear/disappear */}
        <div className="-z-10 flex absolute top-0 left-0 h-full w-full">
          <div
            className={`${introDelayStyle(
              100
            )} bg-lime-400 flex-1 rounded-l-xl`}
          />
          <div
            className={`${introDelayStyle(150)} self-end bg-blue-400 flex-1`}
          />
          <div className={`${introDelayStyle(200)} bg-pink-400 flex-1`} />
          <div
            className={`${introDelayStyle(250)} self-end bg-fuchsia-400 flex-1`}
          />
          <div className={`${introDelayStyle(300)} bg-red-400 flex-1`} />
          <div
            className={`${introDelayStyle(350)} self-end bg-lime-400 flex-1`}
          />
          <div className={`${introDelayStyle(400)} bg-blue-400 flex-1`} />
          <div
            className={`${introDelayStyle(450)} self-end bg-pink-400 flex-1`}
          />
          <div className={`${introDelayStyle(500)} bg-fuchsia-400 flex-1`} />
          <div
            className={`${introDelayStyle(
              550
            )} self-end bg-red-400 flex-1 rounded-r-xl`}
          />
        </div>

        <div className="transition-all rounded-xl text-center p-2 bg-teal-50 text-black group-hover:bg-teal-50/40 border-2">
          <h1 className="font-semibold text-4xl">Quick-R-Build</h1>
          <h2 className="text-xl">Drag and Drop Resume Assembly</h2>
        </div>
      </div>

      {/* Cards About Benefits or Steps or something? */}
      <div className="m-2 flex flex-wrap gap-x-10 gap-y-3 justify-center">
        <InfoCard>
          <h5 className="text-xl font-bold">Build Your Master Resume Once</h5>
          <span className="text-7xl bi bi-database-fill-check" />
          <p>
            Build Up a Master Resume and have it stored in JSON (download or on
            your browser) ((we do not store any personal data on servers))
          </p>
        </InfoCard>
        <InfoCard>
          <h5 className="text-xl font-bold">Recombinate for Quick Variants</h5>
          <span className="text-7xl bi bi-bezier2" />
          <p>
            Pick & Choose parts from the Master Resume to assemble a personalized variant of your resume
          </p>
        </InfoCard>
        <InfoCard>
          <h5 className="text-xl font-bold">Quick Conversion to PDF Formats</h5>
          <span className="text-7xl bi bi-file-pdf-fill" />
          <p>
            Our compiler will turn the formatted JSON into a beautiful resume using LaTeX, with different styles to choose from
          </p>
        </InfoCard>
      </div>

      <div className="flex justify-center">
        <Link href="/app" className="bg-green-600 px-5 py-3 m-5 rounded-xl text-3xl">Get Started</Link>
      </div>
    </main>
  );
}
