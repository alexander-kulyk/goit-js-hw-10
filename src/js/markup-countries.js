import refs from "./refs";
import Notiflix from 'notiflix';
import {fetchWatherCapital} from "./api-wather";

let capitalContry = '';


function renderCountriesCard(countriesData) {
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
    refs.countryList.innerHTML = countriesList;
};

function renderCountry(countriesData) {
    const country = countriesData.map(countryItem =>{
        const{name:{official}, flags:{svg}, capital, population,languages} = countryItem;
        return `
         <h1>${official}</h1>
         <img src="${svg}" alt="flag ${official}" width='100px'>
         <p>capital: ${capital.join('')}</p>
         <p> population: ${population}</p>
         <p>languages: ${Object.values(languages).join(', ')}</p>
        `
    }).join('');

    refs.countryInfo.innerHTML = country;
};

function renderUkraine(countriesData) {
    const ukraine = countriesData.map(countryItem =>{
        if (countryItem.name.official === 'Ukraine') {
            beBraveLikeUkraine()
            const rendUkraine = '<p class="ukraine">Be brave like ukraine 🇺🇦</p>'

            refs.countryInfo.insertAdjacentHTML('beforeend',rendUkraine);
        }
    });
};

function renderWatherCapital(resposeWather) {
    
    const watherCapitalCurrent =  
    `<div class="wather-info-capital">
    <h2>Local time:<br> ${resposeWather.location.localtime}</h2>
        <h3> Current Wather: <br> ${resposeWather.current.condition.text}</h3>
        <img src="https:${resposeWather.current.condition.icon}" alt="${resposeWather.current.condition.text}"  width='50px'>
        <p>Temp today: ${resposeWather.current.temp_c} </p>
        <p>feelslike:  ${resposeWather.current.feelslike_c} </p>
        <p>last updated:  ${resposeWather.current.last_updated} </p>
    </div>`;

    refs.watherContainer.innerHTML = watherCapitalCurrent;
    
};

function renderWeatherSevenDays(resposeWather) {
    const weatherArr = resposeWather.forecast.forecastday;
    const weatherForSevenDays = weatherArr.reduce((acc,itemWeather)=>{
        console.log(itemWeather);
        return acc + `
          <li class="weather-item">
            <p>Date: ${itemWeather.date} </p>
            <p>Current Wather: ${itemWeather.day.condition.text}</p>
            <img src="${itemWeather.day.condition.icon}" alt="${itemWeather.day.condition.text}">
            <p>Temp: ${itemWeather.day.avgtemp_c}</p>
            <p>sunrise: ${itemWeather.astro.sunrise}</p>
            <p>sunset: ${itemWeather.astro.sunset}</p>
    
          </li>`
        },'');
    refs.weatherList.innerHTML = weatherForSevenDays;
};



function clearContainer() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
};

function clearContainerWather() {
    refs.watherContainer.innerHTML = '';
    refs.weatherList.innerHTML = '';
};

function beBraveLikeUkraine() {
    Notiflix.Report.success('Be brave like ukraine 🇺🇦', 'Support the Armed Forces of Ukraine 🤘🥷🇺🇦', 'OK');
};







export {renderCountriesCard,renderCountry,renderUkraine, clearContainer, renderWatherCapital, clearContainerWather, renderWeatherSevenDays};