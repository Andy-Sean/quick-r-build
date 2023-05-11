import styles from '../styles/navbar-styles.module.css';
import Link from 'next/link';
import { fira } from '../utils/fonts'; //font input

//Refactoring idea courtesy of Hans Sun the almighty
function HighlightableLink( { highlight, href, display }) {
  if (highlight) { return <Link href={href} className={`${styles.onPage} ${fira.className} ${styles.link}`}>{display}</Link> }
  else { return <Link href={href} className={`${fira.className} ${styles.link}`}>{display}</Link> }

}
export default function Navbar( { openPage }) { 
  return (
    <div id={styles.Navbar}> {/*this will be flexxed */}
      <div id={styles.title}><HighlightableLink highlight={openPage==="Quick-R-Build"} href="/" display="Quick-R-Build" /></div>
      <div id={styles.links}>
        <ul className={styles.navUl}>
          <HighlightableLink highlight={openPage==="Resume/CV"} href="/input-resume" display="Resume/CV" />
          <HighlightableLink highlight={openPage==="Job Description"} href="/job-desc" display="Job Description" />
          <HighlightableLink highlight={openPage==="Result"} href="/result" display="Result" />
        </ul>
        
        <div className={styles.divider}></div>

        <ul className={styles.navUl}>
          <HighlightableLink highlight={openPage==="About"} href="/about" display="About" />
          <HighlightableLink highlight={openPage==="Attributions"} href="/attributions" display="Attributions" />
        </ul>
      </div>
    </div>
  )

}
