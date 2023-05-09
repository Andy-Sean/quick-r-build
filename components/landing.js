import Image from "next/image"
import { fira } from '../utils/fonts'; //font input
import styles from '../styles/landing-styles.module.css';

export default function Landing(){
    return (
        <div className={fira.className}> 
            <div className={styles.main}>
                <Image 
                    src="/../public/images/resume-portfolio-svgrepo-com.png"
                    alt="the image on the left"
                    width={500}
                    height={500}
                />
                <div className=""> 
                    <p> Build & Rebuild your Resume with <b> Quick-R-Build! </b> </p>
                    <p> Optimize your Resume by picking only the most <b> relevant </b> of experiences </p>
                </div>
            </div>
        </div>
    )
}

