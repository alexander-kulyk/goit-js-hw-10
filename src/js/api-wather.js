
 
const base_url = 'http://api.weatherapi.com/v1/forecast.json';
const KEY = 'e472e5f6b15249c88fe141327222510';

 
const fetchWatherCapital = async capital =>{
    const responce = await fetch(`${base_url}?key=${KEY}&q=${capital}&days=7`);
    const data = await responce.json();
    
    if (!responce.ok) {
        throw new Error(responce.status);
    };
    return data;
    
};


export {fetchWatherCapital};