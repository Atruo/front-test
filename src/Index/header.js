import { useEffect, useState } from "react";
import Carrito from "../IMG/carrito.png";

export default function HeaderComponent () {

    const [carritoCount, setCarritoCount] = useState(0)
    const [path, setPath] = useState("")

    useEffect(() => {
       
        //Path      
        setPath(window.location.pathname);      
        
        //Inicializa el contador del carrito
        setCarritoCount(localStorage.getItem("carrito") ?  parseInt(localStorage.getItem("carrito")) : 0)
        if(!localStorage.getItem("carrito")) localStorage.setItem("carrito", 0)

        //Escuchamos el evento si se añade un nuevo producto al carrito
        document.addEventListener("addCart", function(event) {            
           setCarritoCount(event.detail.count)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.pathname])
    

    return(
        <header>
            <a href="./"><h1>Front Test</h1></a>
            <small className="breadcrumbs"><a href="./">Home</a> <a href={path}>{path !== "/" ? `/ ${path.split("/")[1]} ` : ""} </a></small>
            <aside>
               <img src={Carrito} alt="carrito logo" className="carrito-logo" /> 
               <span id="carrito"> {carritoCount} </span>
            </aside>
            
        </header>
    )

}