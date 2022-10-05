
function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,flags,capital,population,languages`)
        .then(responce => responce.json());
        
};

export default {fetchCountries};
