//a basic entry consists of the following:
//1. an unique id, identifying it for React
//2. OPTIONALLY, a title
//3. OPTIONALLY, a subtitle that can signify place, or other minor info
//4. OPTIONALLY, a date construct - There are 2 variables - start Date and end Date
  //a. If both are empty, there is no date
  //b. If Start is empty but Empty isn't, its a thing to the present 
  //c. If End is empty but Start isn't, its a 1-entry date
  //d. Otherwise, both start and end date defined and we good
//5. OPTIONALLY, a Link
  //a. The link augments the title, if there is one
  //b. If there is no title, the link is the title.
//5. OPTIONALLY, a description array. Each description needs:
  //a. a unique id, so sorting and stuff exists...
  //b. a boolean check, to represent if it is to be used or not
  //c. the text itseslf
//6. A Section identifier, for the pool. so it knows what sections to place it in. "" = default.

import { useState } from 'react';
import Link from 'next/link';

//Unique assignment ID for each item
let entryId = 0;
let descId = 0;

//Descriptions only exist in an Entry
function DescFactory( active, text ) { 
  return { id: descId++, active, text}
}

function EntryFactory( section, title, subtitle, startDate, endDate, link, desc ) {
  return { id: entryId++, section, title, subtitle, startDate, endDate, link, desc }
}

function DescRender({ id, active, text }) {
  const [check,setCheck] = useState(active);
  function handleCheck(e) {
    setCheck(e.target.checked);
  }
  return (
  <div>
    <input type="checkbox" key={id} onChange={handleCheck} checked={check}></input><span>{text}</span>
  </div>
  )
}

function EntryRender({ id, section, title, subtitle, startDate, endDate, link, desc}) {
  function determineTitle(title, link) {
      if (link && title) return <h2><a href={link}>{title}</a></h2>
      else if (link) return <h2><a href={link}>{link}</a></h2>
      else if (title) return <h2>{title}</h2>
      else return null;
  };   

  function determineDate(start,end) {
    if (start && end) return <span>{`${start} - ${end}`}</span>
    else if (start) return <span>{`${start} - Present`}</span>
    else if (end) return <span>{`${end}`}</span>
    else return null;
  };

  return (
    <div key={id}>
      <small>{section}</small>
      {determineTitle(title, link)}
      <h3>{subtitle}</h3> {determineDate(startDate, endDate)}
      {desc.map( (d)=>DescRender(d) )}
      <hr />
    </div>
  )
}

export { DescFactory, EntryFactory, EntryRender }