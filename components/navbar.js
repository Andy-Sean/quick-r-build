import styles from '../styles/navbar-styles.module.css';
import Link from 'next/link';
import { fira } from '../utils/fonts'; //font input
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { useState } from 'react';

//Refactoring idea courtesy of Hans Sun the almighty
function HighlightableLink( { highlight, href, display, clickHandler = () => {} }) {
  if (highlight) { return <Link href={href} className={`${styles.onPage} ${fira.className} ${styles.link}`}>{display}</Link> }
  else { return <Link href={href} className={`${fira.className} ${styles.link}`} onClick={clickHandler}>{display}</Link> }

}
export default function Navbar( { openPage }) { 
  const [dropDownOn, setDropDownOn] = useState(false);
  const handleMenuOn = () => setDropDownOn(prev=>!prev);
  const handleSwitchPage = () => setDropDownOn(false);
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
      <div id={styles.DropDown}>
        <button id={styles.menuButton} onClick={handleMenuOn}><FontAwesomeIcon icon={faBars} id={styles.inner} /></button>
        { dropDownOn?
        <div id={styles.ddLinks}>
          <HighlightableLink highlight={openPage==="Resume/CV"} href="/input-resume" display="Resume/CV" clickHandler={handleSwitchPage}/>
          <HighlightableLink highlight={openPage==="Job Description"} href="/job-desc" display="Job Description" clickHandler={handleSwitchPage}/>
          <HighlightableLink highlight={openPage==="Result"} href="/result" display="Result" clickHandler={handleSwitchPage}/>
          <HighlightableLink highlight={openPage==="About"} href="/about" display="About" clickHandler={handleSwitchPage}/>
          <HighlightableLink highlight={openPage==="Attributions"} href="/attributions" display="Attributions" clickHandler={handleSwitchPage}/>
        </div>
      : null }
      </div>
    </div>
  )

}
