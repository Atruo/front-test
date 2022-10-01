import { useEffect, useState } from "react"
import { getTelfDetails } from "../Util/getData"
import "./details.css"

export default function DetailsPage () {

    const [data, setData] = useState(null)
    useEffect(() => {
        let url = window.location.href;
        url = url.split("/")[url.split("/").length-1]        
        getTelfDetails(url)
        .then(data => setData(data))
        .catch(e => console.log(e))
    }, [])
    

    return(
        <>
            {
                data !== null &&
                <section className="telf-details">                    
                    <img src={data.imgUrl} className={"grid-area-1"}/>
                    <aside>
                        <div className="telf-desc grid-area-2" >
                            <p>{data.networkTechnology}</p>
                            <p>{data.networkSpeed}</p>
                            <p>{data.announced}</p>
                        </div>
                        <div className="telf-actiones grid-area-3">
                            <button>Uno</button>
                            <button>Dos</button>
                            <button>Tres</button>
                        </div>
                    </aside>
                </section>
            }
        </>
    )
}