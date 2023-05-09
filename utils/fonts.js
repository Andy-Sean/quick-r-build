import { Fira_Sans } from 'next/font/google';

//import fira sans font, then we can pass it down so css knows.
export const fira = Fira_Sans({
  subsets: ['latin'],
  weight: ['400','700','900'],
  style: ['italic', 'normal']
});