import Navbar from '../components/navbar';
import Landing from '../components/landing';
import { sampleResume } from '../salvagables/resume-format';

import Link from 'next/link';
import Head from 'next/head';

import { useState, useEffect, useRef } from 'react';

//console.log(sampleResume);
export default function Main() {
  return (
    <>
      <Navbar openPage="Quick-R-Build"/>
      <Landing />
      <a href="/input-resume">Build that thing</a>
      <p>Testing 123</p>
      <p>{ sampleResume["Personals"]["Name"] }</p>
   </>
  )
}

 
