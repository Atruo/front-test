import React, { useEffect, useState } from "react";
import "./home.css"
import { Link } from "react-router-dom";
import { getTelfData } from "../Util/getData";

export default function HomePage () {

    const [data, setData] = useState([])
    const [error, setError] = useState("")
    const [filter, setFilter] = useState("")

    useEffect(() => {     
        getTelfData()
        .then(info => setData(info))
        .catch(e => setError(e))               
    }, [])
    
    

    return(
        <div className="container">
            {
                error !== "" &&
                <h2>{error}</h2>
            }            
           
            {
                data.length > 0 &&
                <div className="home-container">     
                    <input type="text" className="search" placeholder="Buscar.." onChange={(e)=> setFilter(e.target.value.toLowerCase())}></input> 
                    <div className="telf-container">              
                    {
                        data.map((telf => (                                                   
                            (filter !== "" ? telf.model.toLowerCase().includes(filter) : true) &&
                            <Link id={telf.id} key={telf.id} className="telf-card" to={telf.id} >
                                <img src={telf.imgUrl} className="telf-img"/> 
                                <aside>
                                    <h3>{telf.model}</h3>                                    
                                    <p>{telf.brand} <small className="telf-price">{telf.price ? `${telf.price}€` : "No disponible"}</small> </p>                                    
                                </aside>                       
                            </Link>
                        )))
                    }
                    </div>
                </div>
            }
        </div>
    )

}