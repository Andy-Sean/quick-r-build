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


export default function Main(){
  return (
    <div>
      <Navbar openPage="Job Description"/>
      <JobDescription/>
    </div>
  )  
    
}