import { useState } from "react"
import { addTelfToCarrito } from "../Util/addCarrito"


export default function CarritoBtn ({ telf, colorCode, storageCode }) {

    const [success, setSuccess] = useState(false)
    const addCarrito = () => {        
        let bodyObj = {
            id: telf.id,
            colorCode: colorCode,
            storageCode: storageCode
        }  
        
        addTelfToCarrito(bodyObj)
        .then(e => {         
            let newCount = localStorage.getItem("carrito") ?  e.count + parseInt(localStorage.getItem("carrito")) : e.count              
            const event = new CustomEvent('addCart', { detail: { count: newCount } });
            document.dispatchEvent(event)
            localStorage.setItem("carrito", newCount)
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 3000);
        })
        .catch(e => console.log(e))
    }

    return(
        <>
            {
                success &&
                 <span className="alert">                
                    <strong> ¡Enhorabuena!</strong> Su artículo ha sido añadido al carrito 
                    <span className="closebtn" onClick={(e)=>e.target.parentElement.style.display='none'}> &times;</span> 
                </span>
            }
           
            <button className="add-carrito-btn" onClick={()=> addCarrito() }>Añadir al Carrito</button>
        </>
    )
}