import { useState } from 'react';
import Link from 'next/link';
import styles from "../styles/entry-styles.module.css";
import { fira } from '../utils/fonts';

import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

let nextEntryId = 0;
let nextDescId = 0;
//Descriptions only exist in an Entry
function DescFactory( active, text ) { 
  return { active, text, id: "d" + nextDescId++ }
}

function EntryFactory( section, title, subtitle, startDate, endDate, link, desc ) {
  return { section, title, subtitle, startDate, endDate, link, desc, id: nextEntryId++ }
}

function Desc({ active, text, id }) {
  const [check,setCheck] = useState(active);
  function handleCheck(e) {
    setCheck(!check);
  }
  const onStyle = check? "" : styles.DescOff;
  return (
  <div onClick={handleCheck} className={styles.Desc}>
    {id}
    <input className={styles.DescCheck} type="checkbox" onChange={handleCheck} checked={check}></input>
    <span className={`${styles.DescText} ${onStyle}`}>{text}</span>
  </div>
  )
}

function Entry({ section, title, subtitle, startDate, endDate, link, desc, id }) {
  function determineTitle(title, link) {
      if (link && title) return <> <h2 className={styles.Title}><a href={link}>{title} <FontAwesomeIcon className={styles.LinkIcon} icon={faLink} /></a></h2> </>
      else if (link) return <> <h2 className={styles.Title}><a href={link}>{link} <FontAwesomeIcon className={styles.LinkIcon} icon={faLink} /></a> </h2> </>
      else if (title) return <h2 className={styles.Title}>{title}</h2>
      else return null;
  };   

  function determineDate(start,end) {
    if (start && end) return <span className={styles.Date}>{`${start} - ${end}`}</span>
    else if (start) return <span className={styles.Date}>{`${start} - Present`}</span>
    else if (end) return <span className={styles.Date}>{`${end}`}</span>
    else return null;
  };
  return (
    <div className={`${styles.Entry} ${fira.className}`}>
      <div className={styles.Section}>{section}</div>
      {id}{determineTitle(title, link)}
      <div className={styles.Row2}>
        {subtitle? <span className={styles.Subtitle}>{subtitle}</span> : null}
        {determineDate(startDate, endDate)}
      </div> 
      {desc.map( (d, ind)=> <Desc key={ind} active={d.active} text={d.text} id={d.id}/> )}
    </div>
  )
}

export { DescFactory, EntryFactory, Entry }