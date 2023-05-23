import Navbar from '../components/navbar';
import Link from 'next/link';
import { useState } from 'react';

function EntryFactory(title, subtitle, date, link, descriptions) { return {title, subtitle, date, link, descriptions}; };
function DescFactory(on, text) { return {on, text}};

function DescRender( {on, text} ) {
  const [ checked,setChecked] = useState(on);
  const onChange = () => { setChecked(prev => !prev) };
  return (
    <div><input type="checkbox" onChange={onChange} checked={checked} name={text} key={text}></input>{text}</div>
  )
}

function EntryRender({ title, subtitle, date, link, descriptions }) {
  const labelFunc = ( link, title ) => {
    if (link && title) return <div><strong><a href={link}>{title}</a></strong></div>
    else if (link) return <div><strong><a href={link}>{link}</a></strong></div>
    else if (title) return <div><strong>{title}</strong></div>
    else return null;
  };   
  return (
    <div>
      {labelFunc(link, title)}
      {subtitle? <span>{subtitle}</span> : null }<span> | </span>
      {date? <span>{date}</span> : null }
      <div>{descriptions.map( (d) => {return DescRender(d); })}</div>
    </div>
  )
}

function EntryPoolRender({ title, subtitle, date, link, descriptions }) {
  if (title) return <div>{title}</div>
  else if (subtitle) return <div>{subtitle}</div>
  else if (link) return <div>Link to {link}</div>
  else if (date) return <div>Entry dated {date}</div>
  else if (descriptions.length !== 0) return <div>List with "{descriptions[0].text}"</div>
  else return <div>?? Empty Entry ??</div>
}

function Sidebar() { 
  return (
    <div>
      <div>
        <button><span></span>Add New Entry</button>
        <button><span></span>Remove Entry</button>  
      </div>
      <div>
        <button><span></span>Export CV Settings</button>
        <button><span></span>Load CV from ...</button>
        <button><span></span>Load Sample CV</button>
      </div>
    </div>
  )
}

function Pool( {entryArray = []} ) {
  const emptyPool = entryArray.length === 0;
  return (
    <div>
      {emptyPool? 
        <p>Your pool is currently empty.
           It would hold everything that is not on the final CV. 
           It won't be ignored by the algorithm, fortunately.</p> 
        : entryArray.map( (e) => {return EntryPoolRender(e)} )
        }
    </div>
  )
}

function Resume( {categoryArray = []}) {
  const noResume = categoryArray.length === 0;
  return (
    <div>
      {noResume?
        <p>Here is where your resume would display when there are items in it.
          To get started, either create new sections, add new entries, or load them in from the pool.
          You can also swap around the order, and of course remove entries as well.</p> 
        : categoryArray.map( (e) => {return EntryRender(e)})
    }
    </div>
  )
}

function ResumeFooter () {
  return (
    <div>
      <div>
        <button>+ New Section</button>
      </div>
      <div>
        <button>?</button>
        <button>Continue {'>'}</button>
      </div>
    </div>
  )
}

export default function Main(){
  const resProto = [ EntryFactory("First Admiral of US Navy", "Marine Division", "2018-2022", "https://www.google.com", 
                      [ DescFactory(true,"Increased Efficency by 1500%"), DescFactory(true, "Military stuff idk")]),
                     EntryFactory("Junior Software Dev","Google", "NEVER", "", 
                      [ DescFactory(true,"Increased Efficency by 15,000%"), DescFactory(true, "Optimized User Data Collection")]),
                    ];
  const resExtra = [  EntryFactory("","Google", "NEVER", "", 
                      [ DescFactory(true,"Increased Efficency by 15,000%"), DescFactory(true, "Optimized User Data Collection")]),
                      EntryFactory("", "", "2018-2022", "https://www.google.com", 
                      [ DescFactory(true,"Increased Efficency by 1500%"), DescFactory(true, "Military stuff idk")]),
                     EntryFactory("","", "NEVER", "", 
                      [ DescFactory(true,"Increased Efficency by 15,000%"), DescFactory(true, "Optimized User Data Collection")]),
                      EntryFactory("","", "", "", 
                      [ DescFactory(true,"Increased Efficency by 15,000%"), DescFactory(true, "Optimized User Data Collection")])];

  return (
      <>
        <Navbar openPage="Resume/CV"/>
        <Sidebar />
        <Pool entryArray={resProto.concat(resExtra)}/> 
        <Resume categoryArray={resProto}/>
        <ResumeFooter />
      </>
  )  
}
