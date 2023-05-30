import Navbar from '../components/navbar';
import Link from 'next/link';
import { DescFactory, EntryFactory, Entry } from '../components/entry';
import styles from "../styles/input-resume-main.module.css"

import { useState } from 'react';



function Sidebar({ addHandle }) { 
  return (
    <div id={styles.Sidebar}>
      <div>
        <button onClick={addHandle}><span></span>Add Entry</button>
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

//Popup that appears when you want to add an entry. (not done yet...)
function AddEntryForm({ toggleOff }) {
  return (
  <>
  <form id={styles.AddEntryPopup}>
    <p>*Required</p>
    <label for="title">Title:</label> <input type="text" id="title" name="title" placeholder="Ex. Junior Intern"/>
    <label for="subtitle">Subtitle:</label> <input type="text" id="subtitle" name="subtitle" placeholder="Ex. FAANG Corp."/>
    <label for="section">Section (make this an option later lol)*:</label> <input type="text" id="section" name="section" placeholder="Ex. Work Experience" required/>

    <fieldset>
      <legend>Date:</legend>
      <label for="startDate">Starting Date:</label> <input type="date" id="startDate" name="startDate"/>
      <label for="endDate">End Date:</label> <input type="date" id="endDate" name="endDate"/>
      <input type="radio" id="default" name="date_tweak" value=""/><label for="default" checked="true">Default / No Date</label>
      <input type="radio" id="present" name="date_tweak" value=""/><label for="present">This entry continues to the present.</label>
      <input type="radio" id="one" name="date_tweak" value=""/><label for="one" >Only show 1 date instead of 2.</label>
    </fieldset>

    <fieldset>
      <legend>Descriptions</legend>

    </fieldset>
    <input type="submit" />
    <button onClick={toggleOff}>Close</button>
  </form>
  <div id={styles.PageBlock}></div>
  </>
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
        : <p>OOPS this hasnt been implemented yet sorry</p> 
        }
    </div>
  )
}

function Resume( { categoryArray = [] }) {
  const noResume = categoryArray.length === 0;
  return (
    <div id={styles.Resume}>
      {noResume?
        <p>Here is where your resume would display when there are items in it.
          To get started, either create new sections, add new entries, or load them in from the pool.
          You can also swap around the order, and of course remove entries as well.</p> 
        : categoryArray.map( (e, ind) => { return <Entry key={ind} title={e.title} subtitle={e.subtitle} startDate={e.startDate}
          endDate={e.endDate} link={e.link} section={e.section} desc={e.desc} id={e.id}/>;})
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
        <button>Direct Build</button>
        <button>Continue {'>'}</button>
      </div>
    </div>
  )
}

const resProto = [ EntryFactory("Experience", "First Admiral of US Navy", "Marine Division", "2018", "", "https://www.google.com", 
                      [ DescFactory(true,"Increased Efficency by 1500%"), DescFactory(true, "Military stuff idk")]), //all

                     EntryFactory("Internship", "Junior Software Dev","Google", "", "May 1914", "",
                      [ DescFactory(true,"Increased Efficency by 15,000%"), DescFactory(true, "Optimized User Data Collection"),
                      DescFactory(true, "Commited multiple war crimes including impersonation of medical staff and unauthorized collection of user data, demonstating unwavering loyalty to Google Corp")]), //no link

                      EntryFactory("Education", "Waterloo of Laurier","BCS", "", "", "",
                      [ DescFactory(true,"Scholarships: None lol"), DescFactory(true, "Known in school as the \"destroyer\"")]), //no date

                      EntryFactory("Education", "Port Fortquitlamterloo High School","", "2018", "2022", "",
                      []), //no desc
                      EntryFactory("Awards", "","hehe", "", "", "",
                      [ DescFactory(true,"2019 Euclid Zone 5"), DescFactory(true, "2020 Euclid Zone 5"), DescFactory(false, "2021 CCC Bottom 5%")]), //no title
                      EntryFactory("Awards", "hehe","", "", "", "",
                      [ DescFactory(true,"2019 Euclid Zone 5"), DescFactory(true, "2020 Euclid Zone 5"), DescFactory(false, "2021 CCC Bottom 5%")]), //no subtitle
                      EntryFactory("Awards", "","", "", "", "",
                      [ DescFactory(true,"2019 Euclid Zone 5"), DescFactory(true, "2020 Euclid Zone 5"), DescFactory(false, "2021 CCC Bottom 5%")]), //no subtitle
];

export default function Main(){
  const [resumeData, setResumeData] = useState(resProto); 
  const [addingEntry, setAddingEntry] = useState(false);
  function addResumeEntry() {
    setResumeData([ ...resumeData, EntryFactory("Generic", "", "", "", "", "", [])]);
  }
  function toggleAddingEntry() { setAddingEntry(p=> !p)};

  return (
      <>
      <div className={styles.body}>
        {addingEntry? <AddEntryForm toggleOff={toggleAddingEntry}/> : null}
        <Navbar openPage="Resume/CV"/>
        <div className={styles.stealFlexboxHeight}>
          <div className={styles.gridBody}>
            <Sidebar addHandle={toggleAddingEntry}/>
            <Resume categoryArray={resumeData}/>
            <Pool entryArray={[]}/> 
            <ResumeFooter />
          </div>
        </div>
      </div>
      </>
  )  
}