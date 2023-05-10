import styles from '../styles/navbar-styles.module.css';
import Link from 'next/link';
import { fira } from '../utils/fonts'; //font input

export default function Navbar( { openPage, currentPage }) {

  //this jank allows for link to be highlighted - a bit janky but it works so...?
  const pageNames = [ ["Quick-R-Build","/"], ["Resume/CV","/input-resume"], ["Job Description","/job-desc"], ["Result","/result"], ["About","/about"], ["Attributions","/attributions"] ];
  const linkify = pageNames.map(
    (str)=> {if (openPage && openPage === str[0]) 
              { return <Link href={str[1]} key={str[0]} className={`${styles.onPage} ${fira.className} ${styles.link}`}>{str[0]}</Link> }
            else 
              {return <Link href={str[1]} key={str[0]} className={`${fira.className} ${styles.link}`}>{str[0]}</Link>}}
  );

  const leftLinks = linkify.slice(1,4);
  const rightLinks = linkify.slice(4,6);

  return (
    <div id={styles.Navbar}> {/*this will be flexxed */}
      <div id={styles.title}>{linkify[0]}</div>
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
