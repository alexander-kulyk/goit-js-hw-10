
function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then(responce => responce.json());
        
};

export default {fetchCountries};
