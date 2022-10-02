import { addTelfToCarrito } from "../Util/addCarrito"


export default function CarritoBtn ({ telf, colorCode, storageCode }) {

    const addCarrito = () => {        
        let bodyObj = {
            id: telf.id,
            colorCode: colorCode,
            storageCode: storageCode
        }  
        
        addTelfToCarrito(bodyObj)
        .then(e => {         
            let newCount = localStorage.getItem("carrito") ?  e.count + parseInt(localStorage.getItem("carrito")) : e.count  
            console.log(newCount);
            const event = new CustomEvent('addCart', { detail: { count: newCount } });
            document.dispatchEvent(event)
            localStorage.setItem("carrito", newCount)
        })
        .catch(e => console.log(e))
    }

    return(
        <button className="add-carrito-btn" onClick={()=> addCarrito() }>Añadir al Carrito</button>
    )
}