import { useEffect, useState } from "react"
import { getTelfDetails } from "../Util/getData"
import CarritoBtn from "./carrito"
import "./details.css"
import { useNavigate} from "react-router-dom";

export default function DetailsPage () {

    let navigate = useNavigate();
    const [data, setData] = useState(null)
    const [colorCode, setColorCode] = useState(null)
    const [storageCode, setStorageCode] = useState(null)

    useEffect(() => {
        checkData()          
        //Comrpobamos cada 10s si ha caducado la información
        setInterval(() => {
            checkData()       
        }, 10000);                
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const setDefaultCodes = (telf)=> {        
        setColorCode(telf.options ? telf.options.colors[0].code : "")
        setStorageCode(telf.options ? telf.options.storages[0].code : "")
        return
    }
    const checkData = async () =>{
        let url = window.location.href;
        url = url.split("/")[url.split("/").length-1] 

        //Revisar si existe almacenamiento previo de este teléfono en memoria
        if(!localStorage.getItem(url)) {            
            //Si no existe, hace la petición y lo almacena       
            getTelfDetails(url)
            .then(data => {
                setData(data)
                setDefaultCodes(data)
                localStorage.setItem(url, JSON.stringify([data, new Date()]))
            })
            .catch(e => console.log(e))             
        }else{
            //Si existe, comprueba que los datos no sean más antiguos de una hora
            let oneHour = 60 * 60 * 1000;
            if(((new Date()) - (new Date(JSON.parse(localStorage.getItem(url))[1]))) < oneHour ) {
                setData(JSON.parse(localStorage.getItem(url))[0]) 
                setDefaultCodes(JSON.parse(localStorage.getItem(url))[0])               
            }else{                
                //Si son mas antiguos realiza la petición al servidor y los actualiza
                getTelfDetails(url)
                .then(data => {
                    setData(data)
                    setDefaultCodes(data)    
                    localStorage.setItem(url, JSON.stringify([data, new Date()]))
                })
                .catch(e => console.log(e))     
            }
        }                   
    }
    
       
    return(
        <>
            {
                data !== null &&
                <section className="telf-details">                            
                    <img src={data.imgUrl} alt={data.model} className={"grid-area-1"}/>
                    <aside>
                        <div className="telf-desc grid-area-2" >
                            <h3>{data.model} {data.brand} {data.ram} </h3>  
                            <h3>{data.price ? `${data.price}` : "- "}€</h3>                                                                    
                            <span>CPU</span>
                            <p>{data.cpu || "Sin información"}</p>                            
                            <span>OS</span>
                            <p>{data.os || "Sin información"}</p>
                            <span>Resolución</span>
                            <p>{data.displayResolution || "Sin información"}</p>
                            <span>Batería</span>
                            <p>{data.battery || "Sin información"}</p>
                            <span>Cámaras</span>
                            <p><span className="camara-txt">Cámara Trasera</span>: {data.primaryCamera[0] || "Sin información"}, <span className="camara-txt">Cámara Frontal</span>: {data.secondaryCmera[0] || "Sin información"} </p>                            
                            <span>Tamaño</span>
                            <p>{data.displaySize || "Sin información"}</p>
                            <span>Peso</span>
                            <p>{data.weight ? `${data.weight}g.` : "Sin información"}</p>
                             
                            
                        </div>
                        <div className="telf-actions grid-area-3">
                            <span>Memoria: </span>
                            <select onChange={(e)=> setStorageCode(e.target.value)}>
                                {data.options.storages.map(mem => (
                                    <option key={mem.code} value={mem.code}>{mem.name}</option>
                                ))}                                                             
                            </select>
                            <span> Color: </span>
                             <select onChange={(e)=> setColorCode(e.target.value)}>
                                {data.options.colors.map(col => (
                                    <option key={col.code} value={col.code}>{col.name}</option>
                                ))}                                                             
                            </select>
                            <p>
                                {
                                    colorCode && storageCode &&
                                    <CarritoBtn telf= {data} colorCode= {colorCode} storageCode={storageCode}/>
                                }
                                <button className="volver-btn" onClick={()=>navigate(-1)}>Volver atrás</button>
                                
                            </p>
                           
                        </div>
                    </aside>
                </section>
            }
        </>
    )
}