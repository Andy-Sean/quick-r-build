import styles from '../styles/navbar-styles.module.css';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div id={styles.Navbar}>

      <div id={styles.title}> Quick-R-Build</div>
      <div id={styles.links}>
        <ul className={styles.navUl}>
          <Link href="/" className={styles.link} >Resume/CV </Link>
          <Link href="/" className={styles.link}>Job Description</Link>
          <Link href="/" className={styles.link}>Result</Link>
        </ul>
        
        <div className={styles.divider}></div>

        <ul className={styles.navUl}>
          <Link href="/" className={styles.link}>About</Link> 
          <Link href="/" className={styles.link}>Attributions</Link>
        </ul>
      </div>
    </div>
  )

}