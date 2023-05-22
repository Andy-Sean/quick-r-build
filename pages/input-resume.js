import Navbar from '../components/navbar';
import Link from 'next/link';


function Sidebar() { //options user has access to
  return (
    <nav>
      <ul>
        <li><img/><Link href="#">New Entry</Link></li>
        <li><img/><Link href="#">Import from JSON</Link></li>
        <li><img/><Link href="#">Export to JSON</Link></li>
      </ul>
    </nav>
  )
}


function ResumeContent(){
    return (
        <>
          <form action="" method="post"> 
            <label for="name"> Name: </label>
            <input name="name" type="text"/>

            <label for="experience"> Experience: </label>
            <input name="experience" type="text"/>

            <label for="skill"> Skills: </label>
            <input name="skill" type="text"/>

            <button type="submit"> Submit! </button>

          </form>
        </>
    )
}

// function ResumeItemDisplay(resumeObject) { 
//   let output = [];
//   for (const [category,entries] in Object.entries(resumeObject)){
//     output.push(<div key={category}>
//       {entries.map( (entry) => { <p>{entry}</p>})}
//     </div>)
//   }
//   return output;
// }

//this is what the json object is HOPEFULLY gonna look like at the end...
let sampleResumeBAD = { //replace each thing in the array with an object eventually
  "Education": [ "Waterloo", "Laurier", "High School" ],
  "Skills": [ "React", "JS", "Racket" ],
  "Experience": [],
  "Projects": [ "Single Trig Expression Reducer", "Quick-R-Build", "Death"],
}

function RenderResume( { resumeObject }) {
  return (
    <ul>
    {Object.entries(resumeObject).map(([k,v]) => { console.log(v);
      return <li key={k}>Category: {k}
        <ul>
          {v.map( (val,ind) => {console.log(k+ind); return <li key={k+ind}>{val}</li> })}
        </ul>
      </li>}
      )}
     </ul>
  )
}


export default function Main(){
  return (
      <>
        <Navbar openPage="Resume/CV"/>
        <Sidebar/>
        {/*<JobDescription/> moved this to other page 
        <ResumeContent/> not sure if i need this right now...?*/}
        <RenderResume resumeObject={sampleResumeBAD}/>
      </>
  )  
    
}
