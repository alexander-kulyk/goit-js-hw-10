
import './css/styles.css';
import refs from "./js/refs";
import { renderCountriesCard, clearContainer } from "./js/markup-countries";
import debounce from 'lodash.debounce';
import API from "./js/fetchCountries";
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;


refs.input.addEventListener('input', debounce(onInput,DEBOUNCE_DELAY));

function onInput(evt) {
    const inputValue = evt.target.value.toLowerCase().trim();
    if (inputValue === '') {
        return
        
    }
    clearContainer();
    Notiflix.Loading.dots();
    
    API.fetchCountries(inputValue)
        .then(data =>{
            const countriesData = data;
            if (countriesData === undefined) {
                return;  
            };

            Notiflix.Loading.remove();
            renderCountriesCard(countriesData); 
            
    }).catch(error =>{
        return Notiflix.Notify.failure('Oops, there is no country with that name');
    });
    
};



