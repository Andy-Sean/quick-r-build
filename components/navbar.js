import styles from '../styles/navbar-styles.module.css';
import Link from 'next/link';
import { fira } from '../utils/fonts'; //font input

export default function Navbar( { openPage }) {

  //this jank allows for link to be highlighted
  const pageNames = [ "Resume/CV", "Job Description", "Result", "About", "Attributions"];
  const linkify = pageNames.map(
    (str)=> {if (openPage && openPage === str) { return <Link href="/" key={str} className={`${styles.onPage} ${fira.className} ${styles.link}`}>{str}</Link> }
            else {return <Link href="/" key={str} className={`${fira.className} ${styles.link}`}>{str}</Link>}}
  );
  console.log(linkify);

  const leftLinks = linkify.slice(0,3);
  const rightLinks = linkify.slice(3,5);

  return (
    <div id={styles.Navbar}> {/*this will be flexxed */}
      <div id={styles.title} className={fira.className}><Link href="/" className={styles.link}>Quick-R-Build</Link></div>
      <div id={styles.links}>
        <ul className={styles.navUl}>
          {leftLinks}
        </ul>
        
        <div className={styles.divider}></div>

        <ul className={styles.navUl}>
          {rightLinks}
        </ul>
      </div>
    </div>
  )

}