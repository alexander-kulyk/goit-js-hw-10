import refs from "./refs";
import Notiflix from 'notiflix';

function renderCountriesCard(countriesData) {

    const country = countriesData.map(countryItem =>{
        const{name:{official}, flags:{svg}, capital, population,languages} = countryItem;
        return `
         <h1>${official}</h1>
         <img src="${svg}" alt="flag ${official}" width='100px'>
         <p>capital: ${capital.join('')}</p>
         <p> population: ${population}</p>
         <p>languages: ${Object.values(languages).join('')}</p>
        `
    }).join('');

    const countriesList = countriesData.map(countryItem =>{
        const{name:{official}, flags:{svg}} = countryItem;
        return `
            <li>
                <h1>${official} 
                <img src="${svg}" alt="flag ${official}" width='50px'>
                </h1>
                
            </li>
        `
    }).join('');

    if (countriesData.length > 10) {
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        
    }
    
    if (countriesData.length === 1) {
        refs.countryInfo.innerHTML = country;

        const ukraine = countriesData.map(countryItem =>{
            if (countryItem.name.official === 'Ukraine') {
                beBraveLikeUkraine()
                const rendUkraine = '<p class="ukraine">Be brave like ukraine 🇺🇦</p>'

                refs.countryInfo.insertAdjacentHTML('beforeend',rendUkraine);
            }
        });
    } else {
        refs.countryList.innerHTML = countriesList;
    }
};


function clearContainer() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
};

function beBraveLikeUkraine() {
    Notiflix.Report.success('Be brave like ukraine 🇺🇦', 'Support the Armed Forces of Ukraine 🤘🥷🇺🇦', 'OK');
};

export {renderCountriesCard, clearContainer};