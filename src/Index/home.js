import React, { useEffect, useState } from "react";
import "./home.css"
import { Link } from "react-router-dom";
import { getTelfData } from "../Util/getData";

export default function HomePage () {

    const [data, setData] = useState([])    
    const [filter, setFilter] = useState("")

    useEffect(() => {     
        checkData()     
        //Comrpobamos cada 10s si ha caducado la información
        setInterval(() => {
            checkData()       
        }, 10000);                
    }, [])
    
    const filterData = (compare) => {
        return (compare.brand.toLowerCase().includes(filter) || compare.model.toLowerCase().includes(filter))
    }

    const checkData = async ()=> {              
        //Revisar si existe almacenamiento previo en memoria
        if(!localStorage.getItem("data")) {            
            //Si no existe, hace la petición y lo almacena       
            getTelfData()
            .then(data => {
                setData(data)                
                localStorage.setItem("data", JSON.stringify([data, new Date()]))
            })
            .catch(e => console.log(e))             
        }else{
            //Si existe, comprueba que los datos no sean más antiguos de una hora
            let oneHour = 60 * 60 * 1000;
            if( ((new Date) - new Date(JSON.parse(localStorage.getItem("data"))[1])) < oneHour ) {
                setData(JSON.parse(localStorage.getItem("data"))[0])                           
            }else{                
                //Si son mas antiguos realiza la petición al servidor y los actualiza
                getTelfData("data")
                .then(data => {
                    setData(data)                    
                    localStorage.setItem("data", JSON.stringify([data, new Date()]))
                })
                .catch(e => console.log(e))     
            }
                
        }
    }

    return(
        <div className="container">                      
           
            {
                data.length > 0 &&
                <div className="home-container">     
                    <input type="text" className="search" placeholder="Buscar.." onChange={(e)=> setFilter(e.target.value.toLowerCase())}></input> 
                    <div className="telf-container">              
                    {
                        data.map((telf => (                                                   
                            (filter !== "" ? filterData(telf) : true) &&
                            <Link id={telf.id} key={telf.id} className="telf-card" to={telf.id} >
                                <img src={telf.imgUrl} alt={telf.model} className="telf-img"/> 
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