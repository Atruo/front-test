import React, { useEffect, useState } from "react";
import "./home.css"
import { Link } from "react-router-dom";
import { getTelfData } from "../Util/getData";

export default function HomePage () {

    const [data, setData] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {    
       
        getTelfData()
        .then(info => setData(info))
        .catch(e => setError(e))
        
        
    }, [])
    
    

    return(
        <>
            {
                error !== "" &&
                <h2>{error}</h2>
            }
            {
                data.length > 0 &&
                <div className="telf-container">                
                    {
                        data.map((telf => (
                            <Link id={telf.id} key={telf.id} className="telf-card" to={telf.id} >
                                <img src={telf.imgUrl} /> 
                                <aside>
                                    <h3>{telf.model}</h3>                                    
                                    <p>{telf.brand} <small className="telf-price">{telf.price}€</small> </p>
                                    
                                </aside>                       
                            </Link>
                        )))
                    }
                </div>
            }
        </>
    )

}