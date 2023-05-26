import { useEffect } from 'react';
import Navbar from '../components/navbar';
import { useState } from 'react';

//dont mind me, just testing out use of effects and stuff...

let id = 0;

export default function Main(){
  const [style,setStyle] = useState({});
  useEffect( () => {
    const timer = setTimeout( () => { setStyle({"color": "red"}); console.log("I run") } , 1000);
    return () => clearTimeout(timer);
    } 
  , [])
  return (
    <div>
      <Navbar openPage="About"/>
      <h1 style={style}> TEST</h1>
      <h1>{id++}</h1>
    </div>
  )  
    
}