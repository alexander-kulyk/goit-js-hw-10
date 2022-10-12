
import './css/styles.css';
import refs from "./js/refs";
import {renderCountriesCard,renderCountry,renderUkraine, clearContainer} from "./js/markup-countries";
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
    Notiflix.Loading.dots('Loading...');
    
    API.fetchCountries(inputValue)
        .then(data =>{
            const countriesData = data;
            if (countriesData === undefined) {
                return;  
            };

            if (countriesData.length > 10) {
                Notiflix.Loading.remove();
                return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            };
            if (countriesData.length === 1) {
                renderCountry(countriesData);
                renderUkraine(countriesData);
                Notiflix.Loading.remove();
                return;
            };
            if (countriesData.length >= 2 || countriesData.length <= 10 ) {
                renderCountriesCard(countriesData);
                Notiflix.Loading.remove();
                return;
            };

            Notiflix.Loading.remove();
            
            
    }).catch(error =>{
         Notiflix.Notify.failure('Oops, there is no country with that name');
        Notiflix.Loading.remove()
    });
    
};



