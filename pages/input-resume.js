import Navbar from '../components/navbar';
import Link from 'next/link';
import { DescFactory, EntryFactory, EntryRender } from '../components/entry';
import styles from "../styles/input-resume-main.module.css"



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
    <div id={styles.Sidebar}>
      <div>
        <button><span></span>Add Entry</button>
        <button><span></span>Remove Entry</button>  
      </div>
      <div>
        <button><span></span>Export CV</button>
        <button><span></span>Load CV</button>
        <button><span></span>Load Sample</button>
      </div>
    </div>
  )
}

function Pool( {entryArray = []} ) {
  const emptyPool = entryArray.length === 0;
  return (
    <div id={styles.Pool}>
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
    <div id={styles.Resume}>
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
    <div id={styles.ResumeFooter}>
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
  const resProto = [ EntryFactory("Experience", "First Admiral of US Navy", "Marine Division", "2018", "", "https://www.google.com", 
                      [ DescFactory(true,"Increased Efficency by 1500%"), DescFactory(true, "Military stuff idk")]),

                     EntryFactory("Internship", "Junior Software Dev","Google", "", "May 1914", "",
                      [ DescFactory(true,"Increased Efficency by 15,000%"), DescFactory(true, "Optimized User Data Collection")]),

                      EntryFactory("Education", "High School","", "2018", "2022", "",
                      []),
                      EntryFactory("Awards", "","", "", "", "",
                      [ DescFactory(true,"2019 Euclid Zone 5"), DescFactory(true, "2020 Euclid Zone 5"), DescFactory(false, "2021 CCC Bottom 5%")]),
                    ];

  return (
      <>
      <div className={styles.body}>
        <Navbar openPage="Resume/CV"/>
        <div className={styles.stealFlexboxHeight}>
          <div className={styles.gridBody}>
            <Sidebar />
            <Resume categoryArray={resProto}/>
            <Pool entryArray={[]}/> 
            <ResumeFooter />
          </div>
        </div>
      </div>
      </>
  )  
}
