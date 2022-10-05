
import './css/styles.css';
import debounce from 'lodash.debounce';
import API from "./js/fetchCountries";
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;
let inputValue  = '';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', onInput);

function onInput(evt) {
    inputValue = evt.currentTarget.value.toLowerCase().trim();
    clearContainer();
    Notiflix.Loading.dots();
    
    API.fetchCountries(inputValue).then(data =>{
        const countriesData = data;
        Notiflix.Loading.remove();
        
        renderCountriesCard(countriesData); 
    }).catch(error =>{
        return Notiflix.Notify.failure('Oops, there is no country with that name');
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
                <h1>${countryItem.name.official} 
                <img src="${countryItem.flags.svg}" alt="flag" width='50px'>
                </h1>
                
            </li>
        `
    }).join('');


    if (countriesData.length > 10) {
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        
    }
    
    if (countriesData.length === 1) {
        countryInfo.innerHTML = country;

        const ukraine = countriesData.map(countryItem =>{
            if (countryItem.name.official === 'Ukraine') {
                beBraveLikeUkraine()
            }
        });
    } else {
        countryList.innerHTML = countriesList;
    }

    

};


function clearContainer() {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
};


function beBraveLikeUkraine() {
    Notiflix.Report.success('Be brave like ukraine 🇺🇦', 'Be brave like ukraine 🇺🇦', 'OK');
};



