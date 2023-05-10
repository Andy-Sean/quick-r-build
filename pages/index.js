import Navbar from '../components/navbar';
import Landing from '../components/landing';

import { dancingScript } from '../utils/fonts';

import Link from 'next/link';
import Head from 'next/head';

import { useState } from 'react';


export default function Main() {
  return (
    <>
      <Navbar />
      <Landing />
      <a href="/input-resume">Build that thing</a>
    </>
  )
}


