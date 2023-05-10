import Navbar from '../components/navbar';

export default function Main(){
  return (
    <div>
      <Navbar openPage="Resume/CV"/>
      <form action="/api/form-resume" method="post">
        <label for="jobDescription">Job Description: </label>
        <input name="jobDescription" type="text"/>
        <button type="submit"> Submit! </button>
      </form>
    </div>
  )  
    
}
