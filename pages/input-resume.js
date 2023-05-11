import Navbar from '../components/navbar';

function JobDescription(){
  return (
    <>
      <form action="/api/form-resume" method="post">
        <label for="jobDescription">Job Description: </label>
        <input name="jobDescription" type="text"/>
        <button type="submit"> Submit! </button>
      </form>
    </>
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

export default function Main(){
  return (
      <>
        <Navbar openPage="Resume/CV"/>
        <JobDescription/>
        <ResumeContent/>
      </>
  )  
    
}
