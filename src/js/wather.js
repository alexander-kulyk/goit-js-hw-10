import Notiflix from 'notiflix';
import refs from "./refs";
import {fetchWatherCapital } from "./api-wather";
import {renderWatherCapital, clearContainerWather,renderWeatherSevenDays } from "./markup-countries";

let capitalContry = '';

const capitalForWAther = countriesData =>{


    if (countriesData.length > 1) {
        clearContainerWather();
        refs.loadMoreWatherBtn.hidden = true;
    }

    capitalContry = countriesData.reduce((acc, country)=>{
        const{capital} = country;
        return acc + capital;

    },'');

    if (capitalContry === 'Kyiv') {
        
        capitalContry = 'Kiev'
    };
    
    if (countriesData.length === 1) {
        takeWatherCapital(capitalContry);
    };
};



async function takeWatherCapital (capitalContry){
    try {
        const resposeWather = await fetchWatherCapital(capitalContry);
        renderWatherCapital(resposeWather);
        refs.loadMoreWatherBtn.hidden = false;
        return

    } catch (error) {
        Notiflix.Notify.failure('Oops, something happened to the weather');
        return;
    };

};

const onClickLoadMoreWatherBtn = async () =>{
    try {
        const resposeWather = await fetchWatherCapital(capitalContry);
        renderWeatherSevenDays(resposeWather)
        console.log(resposeWather);
        refs.loadMoreWatherBtn.hidden = true;
    } catch (error) {
        Notiflix.Notify.failure('Oops, something happened to the weather');
        return;
    };

}

refs.loadMoreWatherBtn.addEventListener('click', onClickLoadMoreWatherBtn)

export  {capitalForWAther};