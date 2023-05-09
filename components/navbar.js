import styles from '../styles/navbar-styles.module.css';
import Link from 'next/link';
import { Fira_Sans } from 'next/font/google';

//import fira sans font, then we can pass it down so css knows.
export const fira = Fira_Sans({
  subsets: ['latin'],
  weight: ['400','700','900'],
  style: ['italic', 'normal']
});


export default function Navbar() {
  return (
    <div id={styles.Navbar}> {/*this will be flexxed */}
      <div id={styles.title} className={fira.className}>Quick-R-Build</div>

      <div id={styles.links}>
        <ul className={styles.navUl}>
          <Link href="/" className={`${fira.className} ${styles.link}`}>Resume/CV</Link>
          <Link href="/" className={`${fira.className} ${styles.link}`}>Job Description</Link>
          <Link href="/" className={`${fira.className} ${styles.link}`}>Result</Link>
        </ul>
        
        <div className={styles.divider}></div>

        <ul className={styles.navUl}>
          <Link href="/" className={`${fira.className} ${styles.link}`}>About</Link> 
          <Link href="/" className={`${fira.className} ${styles.link}`}>Attributions</Link>
        </ul>
      </div>
    </div>
  )

}