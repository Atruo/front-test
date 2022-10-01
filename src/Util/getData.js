
const API_URL = "https://front-test-api.herokuapp.com/api"

export const getTelfData = async () => {

    try {            
        const res = await fetch(`${API_URL}/product`)            
        const rawData = await res.json()              
        return(rawData)              
    } catch (error) {
        throw ("Something failed")
    }   
    
};

export const getTelfDetails= async (id) => {

    try {            
        const res = await fetch(`${API_URL}/product/${id}`)            
        const rawData = await res.json()              
        return(rawData)              
    } catch (error) {
        throw ("Something failed")
    }   
    
};