import Image from "next/image"
import { fira } from '../utils/fonts'; //font input
import styles from '../styles/landing-styles.module.css';

export default function Landing(){
    return (
        <div className={`${fira.className} ${styles.outerwrap}`}> 
            <div className={styles.main}>
                <Image 
                    priority //causes image to preload
                    src="/images/resume-icon.svg" //starts path from public directory
                    alt="the image on the left"
                    width={185}
                    height={185}
                />
                <div id={styles.landingtext}> 
                    <p> Build & Rebuild your Resume with <b> Quick-R-Build! </b> </p>
                    <p> Optimize your Resume by picking only the most <b> relevant </b> of experiences </p>
                </div>
            </div>
        </div>
    )
}

