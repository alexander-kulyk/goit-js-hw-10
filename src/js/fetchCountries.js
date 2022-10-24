
async function fetchCountries(inputValue) {
    
    const response = await fetch(`https://restcountries.com/v3.1/name/${inputValue}?fields=name,flags,capital,population,languages`);
    
    if (!response.ok) {
        throw new Error(response.status);
    };

    const data = await response.json();
    return data;
    
};


export {fetchCountries};


//--------then------------------------

// function fetchCountries(name) {
//     return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,flags,capital,population,languages`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.status);
//             }
//             return response.json()});
        
// };
