
const API_URL = "https://front-test-api.herokuapp.com/api"

export const addTelfToCarrito = async (bodyObj) => {

    try {       
           
        const res = await fetch(`${API_URL}/cart`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',               
            },
            body: JSON.stringify(bodyObj)
            
        })            
        const rawData = await res.json()              
        return(rawData)              
    } catch (error) {
        throw new Error("Something failed")
    }   
    
};


