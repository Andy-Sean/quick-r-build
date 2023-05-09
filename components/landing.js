import Image from "next/image"

export default function Landing(){
    return (
        <div> 
        <Image alt="the image on the left"/>
            <div className=""> 
                <p> Build & Rebuild your Resume with <b> Quick-R-Build! </b> </p>
                <p> Optimize your Resume by picking only the most <b> relevant </b> of experiences </p>
            </div>
        </div>
    )
}

