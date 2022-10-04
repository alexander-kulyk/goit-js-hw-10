// import debounce from "lodash.debounce";
import './css/styles.css';
import API from "./js/fetchCountries";


const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', onInput);

function onInput(evt) {
    const inputValue = evt.currentTarget.value.toLowerCase();
    
    API.fetchCountries(inputValue).then(data =>{
        const countriesData = data;
        
        renderCountriesCard(countriesData);
       
    });
    
};



function renderCountriesCard(countriesData) {

    const country = countriesData.map(countryItem =>{
        return `
         <h1>${countryItem.name.official}</h1>
         <img src="${countryItem.flags.svg}" alt="flag" width='100px'>
         <p>capital: ${countryItem.capital.join('')}</p>
         <p> population: ${countryItem.population}</p>
         <p>languages: ${Object.values(countryItem.languages).join('')}</p>
        `
    }).join('');

    const countriesList = countriesData.map(countryItem =>{
        return `
            <li>
                <h1>${countryItem.name.official}</h1>
                <img src="${countryItem.flags.svg}" alt="flag" width='100px'>
            </li>
        `
    }).join('');
    
    if (countriesData.length === 1) {
        countryInfo.innerHTML = country;
    } else {
        countryList.innerHTML = countriesList;
    }

    

};



     



//const country = countriesData.map(country =>{
    //     `
    //         <h1>${country.name.official}</h1>
    //         <img src="${country.flags.svg}" alt="flag" width='100px'>
    //         <p>capital: ${country.capital.join('')}</p>
    //         <p> population: ${country.population}</p>
    //         <p>languages: ${Object.values(country.languages).join('')}</p>
    //     `


// markup = `
    //     <h1>${country.name.official}</h1>
    //     <img src="${country.flags.svg}" alt="flag" width='100px'>
    //     <p>capital: ${country.capital.join('')}</p>
    //     <p> population: ${country.population}</p>
    //     <p>languages: ${Object.values(country.languages).join('')}</p>
    // `

    // console.log(Object.values(languages).join(''));
    // {name, capital, population, flags, languages}
    //