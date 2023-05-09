import Link from 'next/link';

export default function Navbar() {
  return (
    <div>
      <p>Quick-R-Build</p>
      <nav>
        <ul>
          <Link href="/">Resume/CV</Link>
          <Link href="/">Job Description</Link>
          <Link href="/">Result</Link>
        </ul>
        <ul>
        <Link href="/">About</Link>
        <Link href="/">Attributions</Link>
        </ul>
      </nav> 
    </div>
  )

}